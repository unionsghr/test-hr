<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 2:29 PM
 */

namespace Leaves\User\Api;

use Classes\Approval\ApprovalStatus;
use Classes\BaseService;
use Classes\IceConstants;
use Classes\IceResponse;
use Classes\SettingsManager;
use Classes\SubActionManager;
use Employees\Common\Model\Employee;
use Leaves\Admin\Api\LeaveUtil;
use Leaves\Common\LeavesEmailSender;
use Leaves\Common\Model\EmployeeLeave;
use Leaves\Common\Model\EmployeeLeaveDay;
use Leaves\Common\Model\EmployeeLeaveLog;
use Leaves\Common\Model\HoliDay;
use Leaves\Common\Model\LeaveGroupEmployee;
use Leaves\Common\Model\LeavePeriod;
use Leaves\Common\Model\LeaveRule;
use Leaves\Common\Model\LeaveStartingBalance;
use Leaves\Common\Model\LeaveType;
use Leaves\Common\Model\WorkDay;
use Metadata\Common\Model\Country;
use Users\Common\Model\User;
use Utils\CalendarTools;
use Utils\LogManager;

class LeavesActionManager extends SubActionManager
{

    const FULLDAY = 1;
    const HALFDAY = 0;
    const NOTWORKINGDAY = 2;

    protected $leavesEmailSender;

    public function createLeaveEmailSender()
    {
        // LogManager::getInstance()->info("=====lgUser====>");
        return new LeavesEmailSender(
            $this->emailSender,
            $this,
            APP_BASE_PATH.'modules/leaves'
        );
    }

    private function isLeaveNotificationsEnabled($leaveTypeId)
    {
        $leaveType = new LeaveType();
        $leaveType->Load("id = ?", array($leaveTypeId));
        if (!empty($leaveType->id) && $leaveType->send_notification_emails == "No") {
            return false;
        }

        return true;
    }

    public function addLeave($req)
    {

        $leaveTypeTemp = new LeaveType();
        $allowedLeaveTypes = $leaveTypeTemp->getUserLeaveTypes();
        $allowed = false;
        foreach ($allowedLeaveTypes as $leaveTypeTemp) {
            if ($leaveTypeTemp->id == $req->leave_type) {
                $allowed = true;
            }
        }

        if (!$allowed) {
            return new IceResponse(IceResponse::ERROR, "You are not entitled to apply for this type of a leave");
        }

        //Find Current leave period
        $leaveCounts = array();
        $currentLeavePeriodResp = LeaveUtil::getCurrentLeavePeriodWithError($req->date_start, $req->date_end);
        if ($currentLeavePeriodResp->getStatus() != IceResponse::SUCCESS) {
            return new IceResponse(IceResponse::ERROR, $currentLeavePeriodResp->getData());
        } else {
            $currentLeavePeriod = $currentLeavePeriodResp->getData();
        }

        $employee = $this->baseService->getElement('Employee', $this->getCurrentProfileId(), null, true);
        $rule = LeaveUtil::getLeaveRule($employee, $req->leave_type, $currentLeavePeriod);

        if ($this->user->user_level == 'Manager' && $this->getCurrentProfileId() != $this->user->employee) {
            //Admin is updating information for an employee
            if ($rule->supervisor_leave_assign == "No") {
                return new IceResponse(
                    IceResponse::ERROR,
                    "You are not allowed to apply this type of a leave behalf of an employee"
                );
            }
        } elseif ($this->user->user_level == 'Employee') {
            if ($rule->employee_can_apply == "No") {
                return new IceResponse(
                    IceResponse::ERROR,
                    "You are not allowed to apply for this type of leave"
                );
            }
        }

        $leaveMatrix = $this->getAvailableLeaveMatrixForEmployeeLeaveType(
            $employee,
            $currentLeavePeriod,
            $req->leave_type
        );

        $availableLeaveDays = floatval($leaveMatrix[10]);

        $days = json_decode($req->days);
        $employeeLeaveDays = [];
        foreach ($days as $day => $type) {
            $employeeLeaveDay = new EmployeeLeaveDay();
            $employeeLeaveDay->leave_date = date("Y-m-d", strtotime($day));
            $employeeLeaveDay->leave_type = $type;
            $employeeLeaveDays[] = $employeeLeaveDay;
        }

        $leaveDayCount = LeaveUtil::countLeaveAmountByDays($employeeLeaveDays);

        $leaveBalanceCheck = $this->hasEnoughLeaveBalance($availableLeaveDays, $leaveDayCount, $rule);
        if ($leaveBalanceCheck->getStatus() !== IceResponse::SUCCESS) {
            return $leaveBalanceCheck;
        }

        //Validate leave days
        $overlapResponse = $this->leaveDaysOverLapping($days, $employee);
        if ($overlapResponse->getStatus() !== IceResponse::SUCCESS) {
            return $overlapResponse;
        }

        //Adding Employee Leave
        $employeeLeave = new EmployeeLeave();
        $employeeLeave->employee = $employee->id;
        $employeeLeave->leave_type = $req->leave_type;
        $employeeLeave->leave_period = $currentLeavePeriod->id;
        $employeeLeave->date_start = $req->date_start;
        $employeeLeave->date_end = $req->date_end;
        $employeeLeave->details = $req->details;
        $employeeLeave->status = "Pending";
        $employeeLeave->details = $req->details;
        $employeeLeave->attachment = isset($req->attachment)?$req->attachment:"";

        $ok = $employeeLeave->Save();

        if (!$ok) {
            LogManager::getInstance()->info($employeeLeave->ErrorMsg());
            return new IceResponse(IceResponse::ERROR, "Error occurred while applying leave.");
        }

        foreach ($employeeLeaveDays as $employeeLeaveDay) {
            $employeeLeaveDay->employee_leave = $employeeLeave->id;
            $employeeLeaveDay->Save();
        }

        $directAppr = ApprovalStatus::getInstance()->isDirectApproval($employee->id);

        if (!$directAppr && SettingsManager::getInstance()->getSetting('Leave: Enable Multi Level Approvals') == '1') {
            ApprovalStatus::getInstance()->initializeApprovalChain('EmployeeLeave', $employeeLeave->id);
        }

        if (!empty($this->emailSender) && $this->isLeaveNotificationsEnabled($req->leave_type) == true) {
            $leavesEmailSender = $this->createLeaveEmailSender();
            $leavesEmailSender->sendLeaveApplicationEmail($employee);
            $leavesEmailSender->sendLeaveApplicationSubmittedEmail($employee);
        }

        $this->baseService->audit(
            IceConstants::AUDIT_ACTION,
            "Leave applied \ start:".$employeeLeave->date_start."\ end:".$employeeLeave->date_end
        );
        $notificationMsg = $employee->first_name." ".$employee->last_name
            ." applied for a leave. Visit leave module to approve or reject";

        $this->baseService->notificationManager->addNotification(
            $employee->supervisor,
            $notificationMsg,
            '{"type":"url","url":"g=modules&n=leaves&m=module_Leaves#tabSubEmployeeLeaveAll"}',
            IceConstants::NOTIFICATION_LEAVE
        );
        return new IceResponse(IceResponse::SUCCESS, $employeeLeave);
    }

    public function cancelLeave($req)
    {

        $employee = $this->baseService->getElement('Employee', $this->getCurrentProfileId(), null, true);

        $employeeLeave = new EmployeeLeave();
        $employeeLeave->Load("id = ?", array($req->id));
        if ($employeeLeave->id != $req->id) {
            return new IceResponse(IceResponse::ERROR, "Leave not found");
        }

        if (!$employeeLeave->allowIndirectMapping()) {
            if ($this->user->user_level != 'Admin' && $this->getCurrentProfileId() != $employeeLeave->employee) {
                return new IceResponse(IceResponse::ERROR, "Only an admin or owner of the leave can do this");
            }
        }

        if ($employeeLeave->status != 'Approved') {
            return new IceResponse(IceResponse::ERROR, "Only an approved leave can be cancelled");
        }

        $employeeLeave->status = 'Cancellation Requested';
        $ok = $employeeLeave->Save();
        if (!$ok) {
            LogManager::getInstance()->error("Error occured while cancelling the leave:".$employeeLeave->ErrorMsg());
            return new IceResponse(
                IceResponse::ERROR,
                "Error occured while cancelling the leave. Please contact admin."
            );
        }

        $employeeLeaveLog = new EmployeeLeaveLog();
        $employeeLeaveLog->employee_leave = $employeeLeave->id;
        $employeeLeaveLog->user_id = $this->baseService->getCurrentUser()->id;
        $employeeLeaveLog->status_from = 'Approved';
        $employeeLeaveLog->status_to = $employeeLeave->status;
        $employeeLeaveLog->created = date("Y-m-d H:i:s");
        $employeeLeaveLog->data = "Leave cancellation request sent";
        $ok = $employeeLeaveLog->Save();
        if (!$ok) {
            LogManager::getInstance()->info($employeeLeaveLog->ErrorMsg());
        }

        if (!empty($this->emailSender) && $this->isLeaveNotificationsEnabled($employeeLeave->leave_type) == true) {
            $leavesEmailSender = $this->createLeaveEmailSender();
            $leavesEmailSender->sendLeaveApplicationEmail($employee, true);
        }

        $this->baseService->audit(
            IceConstants::AUDIT_ACTION,
            IceConstants::AUDIT_ACTION,
            "Leave cancellation \ start:".$employeeLeave->date_start."\ end:".$employeeLeave->date_end
        );
        $notificationMsg = $employee->first_name." ".$employee->last_name
            ." cancelled a leave. Visit leave module to approve";

        $this->baseService->notificationManager->addNotification(
            $employee->supervisor,
            $notificationMsg,
            '{"type":"url","url":"g=modules&n=leaves&m=module_Leaves#tabSubEmployeeLeaveCancel"}',
            IceConstants::NOTIFICATION_LEAVE
        );
        return new IceResponse(IceResponse::SUCCESS, $employeeLeave);
    }

    public function getEntitlement($req)
    {
        $employee = $this->baseService->getElement('Employee', $this->getCurrentProfileId(), null, true);
        return $this->getEntitlementByEmployee($employee);
    }

    public function getEntitlementByEmployee($employee)
    {
        $leaveEntitlementArray = array();

        $leaveGroupIds = LeaveUtil::getEmployeeLeaveGroups($employee->id);

        $leaveType = new LeaveType();
        if (empty($leaveGroupIds)) {
            $leaveTypes = $leaveType->Find("leave_group IS NULL", array());
        } else {
            $leaveTypes = $leaveType->Find(
                "leave_group IS NULL or leave_group in (".implode(',', $leaveGroupIds).")",
                array()
            );
        }

        //Find Current leave period

        $currentLeavePeriodResp = LeaveUtil::getCurrentLeavePeriodWithError(date('Y-m-d'), date('Y-m-d'));
        if ($currentLeavePeriodResp->getStatus() != IceResponse::SUCCESS) {
            return new IceResponse(IceResponse::ERROR, $currentLeavePeriodResp->getData());
        } else {
            $currentLeavePeriod = $currentLeavePeriodResp->getData();
        }

        foreach ($leaveTypes as $leaveType) {
            //$rule = LeaveUtil::getLeaveRule($employee, $leaveType->id);
            $leaveMatrix = $this->getAvailableLeaveMatrixForEmployeeLeaveType(
                $employee,
                $currentLeavePeriod,
                $leaveType->id
            );

            $leaves = array();
            $leaves['id'] = $leaveType->id;
            $leaves['name'] = $leaveType->name;
            $leaves['totalLeaves'] = floatval($leaveMatrix[0]);
            $leaves['pendingLeaves'] = floatval($leaveMatrix[1]);
            $leaves['approvedLeaves'] = floatval($leaveMatrix[2]);
            $leaves['rejectedLeaves'] = floatval($leaveMatrix[3]);
            $leaves['cancelRequestedLeaves'] = floatval($leaveMatrix[5]);
            $leaves['deductedFromLeaveCarriedForward'] = floatval($leaveMatrix[7]);
            $leaves['availableLeaves'] = round($leaveMatrix[10], 3);
            $leaves['currentPeriodTotal'] = round(floatval($leaveMatrix[4]['currentPeriodTotal']), 3);
            $leaves['tobeAccrued'] = round(
                floatval($leaveMatrix[4]['currentPeriodTotal'])
                - floatval($leaveMatrix[4]['accrued']),
                3
            );

            $leaves['isCarriedForwardExpired'] = $leaveMatrix[4]['isCarriedForwardExpired'];
            $leaves['rule'] = $leaveMatrix[4]['rule'];
            $leaves['accrued'] = round(floatval($leaveMatrix[4]['accrued']), 3);
            $leaves['carriedForward'] = floatval($leaveMatrix[4]['carriedForward']);
            $leaves['carriedForwardAvailable'] = floatval($leaveMatrix[4]['carriedForwardAvailable']);
            $leaves['totalForAccrual'] = floatval($leaveMatrix[4]['totalForAccrual']);
            $leaves['deductedFromLeaveCarriedForward'] = floatval($leaves['deductedFromLeaveCarriedForward']);
            $leaves['expiredFromLeaveCarriedForward'] = 0;
            if ($leaves['isCarriedForwardExpired']) {
                $leaves['expiredFromLeaveCarriedForward']
                    = floatval($leaves['carriedForward'] - $leaves['deductedFromLeaveCarriedForward']);
            }

            $leaves['carriedForwardLeaveExpireDate'] = empty($leaveMatrix[8]) ? '' : $leaveMatrix[8];
            $leaves['paidTimeOff'] = $leaveMatrix[9];


            //Ratios

            $leaves['totalToAvailableRatio'] = ($leaves['totalLeaves'] > 0
                && $leaves['totalLeaves'] > $leaves['availableLeaves'])
                ? round(($leaves['availableLeaves'] / $leaves['totalLeaves']) * 100)
                : 0;

            $leaves['carriedForwardAvailableRatio'] = 0;
            if ($leaves['carriedForward'] > 0) {
                $leaves['carriedForwardAvailableRatio']
                    = $leaves['carriedForwardAvailable'] <= $leaves['carriedForward']
                    ? round(($leaves['carriedForwardAvailable'] / $leaves['carriedForward']) * 100)
                    : 0;
            }

            $leaves['carriedForwardExpiredRatio'] = 0;
            if ($leaves['carriedForward'] > 0 && $leaves['isCarriedForwardExpired']) {
                $leaves['carriedForwardExpiredRatio']
                    = $leaves['expiredFromLeaveCarriedForward'] <= $leaves['carriedForward']
                    ? round(($leaves['expiredFromLeaveCarriedForward'] / $leaves['carriedForward']) * 100)
                    : 0;
            }

            $leaves['approvedRatio'] = 0;
            if ($leaves['totalLeaves'] > 0) {
                $leaves['approvedRatio'] = $leaves['approvedLeaves'] <= $leaves['totalLeaves']
                    ? round(($leaves['approvedLeaves'] / $leaves['totalLeaves']) * 100)
                    : 0;
            }

            $leaves['pendingRatio'] = 0;
            if ($leaves['totalLeaves'] > 0) {
                $leaves['pendingRatio'] = $leaves['pendingLeaves'] <= $leaves['totalLeaves']
                    ? round(($leaves['pendingLeaves'] / $leaves['totalLeaves']) * 100)
                    : 0;
            }

            $leaves['rejectedRatio'] = 0;
            if ($leaves['totalLeaves'] > 0) {
                $leaves['rejectedRatio'] = $leaves['rejectedLeaves'] <= $leaves['totalLeaves']
                    ? round(($leaves['rejectedLeaves'] / $leaves['totalLeaves']) * 100)
                    : 0;
            }

            $leaves['accruedRatio'] = 0;
            if ($leaveType->leave_accrue == "Yes" && $leaves['currentPeriodTotal'] > 0) {
                $leaves['accruedRatio'] = $leaves['accrued'] <= $leaves['currentPeriodTotal']
                    ? round(($leaves['accrued'] / $leaves['currentPeriodTotal']) * 100)
                    : 0;
            }

            $leaves['leaveAccrueVisibility'] = $leaveType->leave_accrue === 'Yes' ? 'block' : 'none';
            $leaves['carriedForwardVisibility'] = $leaveType->carried_forward === 'Yes' ? 'block' : 'none';
            $leaves['carriedForwardLeaveExpireDateVisibility'] = empty($leaveMatrix[8]) ? 'none' : 'block';

            $leaveEntitlementArray[] = $leaves;
        }

        return new IceResponse(IceResponse::SUCCESS, $leaveEntitlementArray);
    }

    public function getLeaveDays($req)
    {

        //Find Current leave period
        $leaveCounts = array();
        $currentLeavePeriodResp = LeaveUtil::getCurrentLeavePeriodWithError($req->start_date, $req->end_date);
        if ($currentLeavePeriodResp->getStatus() != IceResponse::SUCCESS) {
            return new IceResponse(IceResponse::ERROR, $currentLeavePeriodResp->getData());
        } else {
            $currentLeavePeriod = $currentLeavePeriodResp->getData();
        }

        $employee = $this->baseService->getElement('Employee', $this->getCurrentProfileId(), null, true);
        $rule = LeaveUtil::getLeaveRule($employee, $req->leave_type, $currentLeavePeriod);

        if ($this->user->user_level == 'Admin' && $this->getCurrentProfileId() != $this->user->employee) {
            //Admin is updating information for an employee
            if ($rule->supervisor_leave_assign == "No") {
                return new IceResponse(
                    IceResponse::ERROR,
                    "You are not allowed to assign this type of leaves as admin"
                );
            }
        } else {
            if ($rule->employee_can_apply == "No") {
                return new IceResponse(IceResponse::ERROR, "You are not allowed to apply for this type of leaves");
            }
        }

        $leaveMatrix = $this->getAvailableLeaveMatrixForEmployeeLeaveType(
            $employee,
            $currentLeavePeriod,
            $req->leave_type
        );

        $leaves = array();
        $leaves['totalLeaves'] = floatval($leaveMatrix[0]);
        $leaves['pendingLeaves'] = floatval($leaveMatrix[1]);
        $leaves['approvedLeaves'] = floatval($leaveMatrix[2]);
        $leaves['rejectedLeaves'] = floatval($leaveMatrix[3]);
        $leaves['cancelRequestedLeaves'] = floatval($leaveMatrix[5]);
        $leaves['deductedFromLeaveCarriedForward'] = floatval($leaveMatrix[7]);
        $leaves['availableLeaves'] = floatval($leaveMatrix[10]);

        //=== Resolve Employee Country
        $employeeCountry = null;

        if (!empty($employee->country)) {
            $country = new Country();
            $country->Load("code = ?", array($employee->country));
            $employeeCountry = $country->id;
        }

        //============================


        $startDate = $req->start_date;
        $endDate = $req->end_date;
        $days = array();
        $days = $this->getDays($startDate, $endDate);
        $dayMap = array();
        foreach ($days as $day) {
            $dayMap[$day] = $this->getDayWorkTime($day, $employeeCountry);
        }

        return new IceResponse(IceResponse::SUCCESS, array($dayMap,$leaves,$rule));
    }

    public function getLeaveDaysReadonly($req)
    {
        $leaveId = $req->leave_id;
        $leaveLogs = array();

        $employeeLeave = new EmployeeLeave();
        $employeeLeave->Load("id = ?", array($leaveId));

        if (empty($employeeLeave->id)) {
            return new IceResponse(IceResponse::ERROR, 'Leave request not found', 404);
        }

        $currentLeavePeriodResp = LeaveUtil::getCurrentLeavePeriodWithError(
            $employeeLeave->date_start,
            $employeeLeave->date_end
        );
        if ($currentLeavePeriodResp->getStatus() != IceResponse::SUCCESS) {
            return new IceResponse(IceResponse::ERROR, $currentLeavePeriodResp->getData());
        } else {
            $currentLeavePeriod = $currentLeavePeriodResp->getData();
        }

        $employee = $this->baseService->getElement('Employee', $employeeLeave->employee, null, true);
        $rule = LeaveUtil::getLeaveRule($employee, $employeeLeave->leave_type, $currentLeavePeriod);

        $currentLeavePeriodResp = LeaveUtil::getCurrentLeavePeriodWithError(
            $employeeLeave->date_start,
            $employeeLeave->date_end
        );
        if ($currentLeavePeriodResp->getStatus() != IceResponse::SUCCESS) {
            return new IceResponse(IceResponse::ERROR, $currentLeavePeriodResp->getData());
        } else {
            $currentLeavePeriod = $currentLeavePeriodResp->getData();
        }

        $leaveMatrix = $this->getAvailableLeaveMatrixForEmployeeLeaveType(
            $employee,
            $currentLeavePeriod,
            $employeeLeave->leave_type
        );

        $leaves = array();
        $leaves['totalLeaves'] = floatval($leaveMatrix[0]);
        $leaves['pendingLeaves'] = floatval($leaveMatrix[1]);
        $leaves['approvedLeaves'] = floatval($leaveMatrix[2]);
        $leaves['rejectedLeaves'] = floatval($leaveMatrix[3]);
        $leaves['cancelRequestedLeaves'] = floatval($leaveMatrix[5]);
        $leaves['deductedFromLeaveCarriedForward'] = floatval($leaveMatrix[7]);
        $leaves['availableLeaves'] = floatval($leaveMatrix[10]);
        $leaves['attachment'] = $employeeLeave->attachment;

        $employeeLeaveDay = new EmployeeLeaveDay();
        $days = $employeeLeaveDay->Find("employee_leave = ?", array($leaveId));

        $employeeLeaveLog = new EmployeeLeaveLog();
        $logsTemp = $employeeLeaveLog->Find("employee_leave = ? order by created", array($leaveId));
        foreach ($logsTemp as $empLeaveLog) {
            $t = array();
            $t['time'] = $empLeaveLog->created;
            $t['status_from'] = $empLeaveLog->status_from;
            $t['status_to'] = $empLeaveLog->status_to;
            $t['time'] = $empLeaveLog->created;
            $userName = null;
            if (!empty($empLeaveLog->user_id)) {
                $lgUser = new User();
                $lgUser->Load("id = ?", array($empLeaveLog->user_id));

                LogManager::getInstance()->info("=====lgUser====>".$lgUser);
                if ($lgUser->id == $empLeaveLog->user_id) {
                    if (!empty($lgUser->employee)) {
                        $lgEmployee = new Employee();
                        $lgEmployee->Load("id = ?", array($lgUser->employee));
                        $userName = $lgEmployee->first_name." ".$lgEmployee->last_name;
                    } else {
                        $userName = $lgUser->userName;
                    }
                }
            }

            if (!empty($userName)) {
                $t['note'] = $empLeaveLog->data." (by: ".$userName.")";
            } else {
                $t['note'] = $empLeaveLog->data;
            }

            $leaveLogs[] = $t;
        }

        return new IceResponse(IceResponse::SUCCESS, array($days,$leaves,$leaveId,$employeeLeave,$leaveLogs));
    }

    private function getDays($start, $end)
    {
        $days = array();
        $curent = $start;
        while (strtotime($curent)<=strtotime($end)) {
            $days[] = $curent;
            $curent = date("Y-m-d", strtotime("+1 day", strtotime($curent)));
        }
        return $days;
    }

    private function getDayWorkTime($day, $countryId)
    {
        $holiday = $this->getHoliday($day, $countryId);
        if (!empty($holiday)) {
            if ($holiday->status == 'Full Day') {
                return self::NOTWORKINGDAY;
            } else {
                return self::HALFDAY;
            }
        }

        $workday = $this->getWorkDay($day, $countryId);
        if (empty($workday)) {
            return self::FULLDAY;
        }

        if ($workday->status == 'Full Day') {
            return self::FULLDAY;
        } elseif ($workday->status == 'Half Day') {
            return self::HALFDAY;
        } else {
            return self::NOTWORKINGDAY;
        }
    }

    private function getWorkDay($day, $countryId)
    {
        $dayName = date("l", strtotime($day));
        $workDay = new WorkDay();
        if (empty($countryId)) {
            $workDay->Load("name = ? and country IS NULL", array($dayName));
            if ($workDay->name == $dayName) {
                return $workDay;
            }
        } else {
            $workDay->Load("name = ? and country = ?", array($dayName, $countryId));
            if ($workDay->name == $dayName) {
                return $workDay;
            } else {
                $workDay = new WorkDay();
                $workDay->Load("name = ? and country IS NULL", array($dayName));
                if ($workDay->name == $dayName) {
                    return $workDay;
                }
            }
        }

        return null;
    }

    private function getHoliday($day, $countryId)
    {
        $hd = new HoliDay();
        if (empty($countryId)) {
            $hd->Load("dateh = ? and country IS NULL", array($day));
            if ($hd->dateh == $day) {
                return $hd;
            }
        } else {
            $hd->Load("dateh = ? and country = ?", array($day, $countryId));
            if ($hd->dateh == $day) {
                return $hd;
            } else {
                $hd = new HoliDay();
                $hd->Load("dateh = ? and country IS NULL", array($day));
                if ($hd->dateh == $day) {
                    return $hd;
                }
            }
        }

        return null;
    }

    /**
     * @param $availableLeaveDays
     * @param $leaveDayCount
     * @param $rule
     * @return IceResponse
     */
    public function hasEnoughLeaveBalance($availableLeaveDays, $leaveDayCount, $rule)
    {
        if ($this->user->user_level !== 'Admin'
            && $availableLeaveDays < floatval($leaveDayCount)
            && $rule->apply_beyond_current === 'No'
        ) {
            return new IceResponse(
                IceResponse::ERROR,
                "You don't have enough leave balance to apply for this leave"
            );
        }

        return new IceResponse(IceResponse::SUCCESS);
    }

    /**
     * @param $days
     * @param $employee
     * @return IceResponse
     */
    public function leaveDaysOverLapping($days, $employee)
    {
        // TODO - need to match and check leave day type (e.g: if full day don't allow any leave)
        foreach ($days as $day => $type) {
            $sql = "select ld.id as leaveId from EmployeeLeaveDays ld"
                . " join EmployeeLeaves el on ld.employee_leave = el.id where el.employee = ?"
                . " and ld.leave_date = ? and ld.leave_type = ? and el.status <> 'Rejected'"
                . " and el.status <> 'Cancelled'";
            $rs = $this->baseService->getDB()->Execute(
                $sql,
                array($employee->id, date("Y-m-d", strtotime($day)), $type)
            );

            foreach ($rs as $k => $v) {
                return new IceResponse(
                    IceResponse::ERROR,
                    "This leave is overlapping with another leave you have already applied"
                );
            }
        }

        return new IceResponse(IceResponse::SUCCESS);
    }

    private function getAvailableLeaveMatrixForEmployee($employee, $currentLeavePeriod)
    {

        //Iterate all leave types and create leave matrix
        /**
         * [[Leave Type],[Total Available],[Pending],[Approved],[Rejected]]
         */
        $leaveType = new LeaveType();
        $leaveTypes = $leaveType->Find("1=1", array());

        foreach ($leaveTypes as $leaveType) {
            $employeeLeaveQuota = new \stdClass();

            $rule = LeaveUtil::getLeaveRule($employee, $leaveType->id, $currentLeavePeriod);
            $employeeLeaveQuota->avalilable = floatval($rule->default_per_year) + floatval($rule->pto);
            $pending = LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves($employee->id, $currentLeavePeriod->id, $leaveType->id, 'Pending')
            );
            $approved = LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves($employee->id, $currentLeavePeriod->id, $leaveType->id, 'Approved')
            );
            $rejected = LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves($employee->id, $currentLeavePeriod->id, $leaveType->id, 'Rejected')
            );

            $leaveCounts[$leaveType->name] = array(0,$pending,$approved,$rejected);
        }

        return $leaveCounts;
    }

    private function getAvailableLeaveMatrixForEmployeeLeaveType($employee, $currentLeavePeriod, $leaveTypeId)
    {

        /**
         * [Total Available],[Pending],[Approved],[Rejected],
         * [Available],[Cancellation Requested],[Cancelled], [carriedForwardAvailable]
         */

        $rule = LeaveUtil::getLeaveRule($employee, $leaveTypeId, $currentLeavePeriod);
        //$available = $rule->default_per_year;
        $availableLeaves = $this->getAvailableLeaveCount($employee, $rule, $currentLeavePeriod, $leaveTypeId);
        $total = $availableLeaves[0];
        $leaveData = $availableLeaves[1];
        $previousLeavePeriodRule = $availableLeaves[2];
        $pending = LeaveUtil::countLeaveAmounts(
            LeaveUtil::getEmployeeLeaves(
                $employee->id,
                $currentLeavePeriod->id,
                $leaveTypeId,
                'Pending'
            )
        );
        $pending += LeaveUtil::countLeaveAmounts(
            LeaveUtil::getEmployeeLeaves(
                $employee->id,
                $currentLeavePeriod->id,
                $leaveTypeId,
                'Processing'
            )
        );
        $approved = LeaveUtil::countLeaveAmounts(
            LeaveUtil::getEmployeeLeaves($employee->id, $currentLeavePeriod->id, $leaveTypeId, 'Approved')
        );
        $rejected = LeaveUtil::countLeaveAmounts(
            LeaveUtil::getEmployeeLeaves($employee->id, $currentLeavePeriod->id, $leaveTypeId, 'Rejected')
        );
        $cancelRequested = LeaveUtil::countLeaveAmounts(
            LeaveUtil::getEmployeeLeaves(
                $employee->id,
                $currentLeavePeriod->id,
                $leaveTypeId,
                'Cancellation Requested'
            )
        );
        $cancelled = LeaveUtil::countLeaveAmounts(
            LeaveUtil::getEmployeeLeaves(
                $employee->id,
                $currentLeavePeriod->id,
                $leaveTypeId,
                'Cancelled'
            )
        );

        //get details of the leave applied during leave carry forward period
        $countsDuringLeaveCarryForwardPeriod = [
            'pending' => 0,
            'approved' => 0,
            'cancelRequested' => 0,
            'cancelled' => 0,
        ];

        $deductedFromCarryForwarded = 0;

        $expectedCurrentDate = null;
        if ($previousLeavePeriodRule->carried_forward === 'Yes'
            && $previousLeavePeriodRule->carried_forward_leave_availability.'' !== '0'
            && !empty($previousLeavePeriodRule->carried_forward_leave_availability)
        ) {
            $availabilityPeriod = intval($previousLeavePeriodRule->carried_forward_leave_availability);
            if ($availabilityPeriod === 365) {
                $availabilityPeriod = 360;
            }

            $expectedCurrentDate = CalendarTools::addMonthsToDateTime(
                $currentLeavePeriod->date_start,
                ($availabilityPeriod / 30),
                'Y-m-d'
            );

            $countsDuringLeaveCarryForwardPeriod['pending'] = LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves(
                    $employee->id,
                    $currentLeavePeriod->id,
                    $leaveTypeId,
                    'Pending',
                    $expectedCurrentDate
                ),
                $expectedCurrentDate
            );

            $countsDuringLeaveCarryForwardPeriod['pending'] += LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves(
                    $employee->id,
                    $currentLeavePeriod->id,
                    $leaveTypeId,
                    'Processing',
                    $expectedCurrentDate
                ),
                $expectedCurrentDate
            );

            $countsDuringLeaveCarryForwardPeriod['approved'] = LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves(
                    $employee->id,
                    $currentLeavePeriod->id,
                    $leaveTypeId,
                    'Approved',
                    $expectedCurrentDate
                ),
                $expectedCurrentDate
            );

            $countsDuringLeaveCarryForwardPeriod['cancelRequested'] = LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves(
                    $employee->id,
                    $currentLeavePeriod->id,
                    $leaveTypeId,
                    'Cancellation Requested',
                    $expectedCurrentDate
                ),
                $expectedCurrentDate
            );
        }
        //Try to deduct leave taken during leave carry forward period using carry forwarded leave balance
        $leaveData["carriedForwardAvailable"] = 0;
        $totalLeaveTakenDuringCarryForwardPeriod = $countsDuringLeaveCarryForwardPeriod['pending']
            + $countsDuringLeaveCarryForwardPeriod['approved']
            + $countsDuringLeaveCarryForwardPeriod['cancelRequested'];

        if ($totalLeaveTakenDuringCarryForwardPeriod <= $leaveData["carriedForward"]) {
            $leaveData["carriedForwardAvailable"] = round(
                $leaveData["carriedForward"] - $totalLeaveTakenDuringCarryForwardPeriod,
                3
            );

            if ($leaveData["carriedForwardAvailable"] < 0) {
                $leaveData["carriedForwardAvailable"] = 0;
            }
            $deductedFromCarryForwarded = $totalLeaveTakenDuringCarryForwardPeriod;
        } else {
            $leaveData["carriedForwardAvailable"] = 0;
            $deductedFromCarryForwarded = $leaveData["carriedForward"];
        }

        $leaveData["paidTimeOff"] = round(floatval($rule->pto), 3);



        // Add available carried forwarded leave balance to total available from current period
        $total = round($total + $leaveData["carriedForward"], 3);


        $leaveData["isCarriedForwardExpired"] = false;
        if ($previousLeavePeriodRule->carried_forward === 'Yes'
            && $previousLeavePeriodRule->carried_forward_leave_availability.'' !== '0'
            && !empty($previousLeavePeriodRule->carried_forward_leave_availability)
        ) {
            //Leave carry forward is enabled
            try {
                $time = new \DateTime($expectedCurrentDate);
                $time = $time->sub(new \DateInterval('P1D'));
                $expectedCurrentDate = $time->format('Y-m-d');
            } catch (\Exception $e) {
            }

            if (strtotime($this->getTodayDateWithTimeZoneConsiderations()) > strtotime($expectedCurrentDate)) {
                $leaveData["isCarriedForwardExpired"] = true;
                $leaveData["carriedForwardAvailable"] = 0;
                $availableCount = $total - $leaveData["carriedForward"] + $deductedFromCarryForwarded
                    - ($pending + $approved + $cancelRequested);
            } else {
                $availableCount = $total - ($pending + $approved + $cancelRequested);
            }
        } else {
            $availableCount = $total - ($pending + $approved + $cancelRequested);
            $expectedCurrentDate = '';
        }

        if ($rule instanceof LeaveRule) {
            $leaveData["rule"] = 'Leave Rule: '.$rule->id;
        } else {
            $leaveData["rule"] = 'Leave Type: '.$rule->id;
        }

        return [
            $total,
            $pending,
            $approved,
            $rejected,
            $leaveData,
            $cancelRequested,
            $cancelled,
            $deductedFromCarryForwarded,
            $expectedCurrentDate,
            $leaveData["paidTimeOff"] ? $leaveData["paidTimeOff"]  : 0,
            round($availableCount, 3),
        ];
    }

    public function getTodayDateWithTimeZoneConsiderations()
    {
        return date('Y-m-d');
    }

    /*
     * Find available leave counts considering Leaves Accrued and Carried Forward
     */
    public function getAvailableLeaveCount($employee, $rule, $currentLeavePeriod, $leaveTypeId)
    {
        $availableLeaveArray = array();

        $currentLeaves = floatval($rule->default_per_year);
        $leaveDaysBeforePropotionation = $currentLeaves;
        if ($rule->propotionate_on_joined_date == "Yes") {
            //If the employee joined in current leave period, his leaves should be calculated proportional
            // to joined date
            if ($employee->joined_date != "0000-00-00 00:00:00" && !empty($employee->joined_date)) {
                if (strtotime($currentLeavePeriod->date_start) < strtotime($employee->joined_date)) {
                    $currentLeaves = floatval(
                        $currentLeaves
                        * CalendarTools::getNumberOfDaysBetweenDates(
                            $currentLeavePeriod->date_end,
                            $employee->joined_date
                        ) / CalendarTools::getNumberOfDaysBetweenDates(
                            $currentLeavePeriod->date_end,
                            $currentLeavePeriod->date_start
                        )
                    );
                }
            }
        }

        $availableLeaveArray["currentPeriodTotal"] = $currentLeaves;

        $availableLeaveArray["total"] = round($currentLeaves, 3);

        LogManager::getInstance()->info("Leaves after proportionate on joined date :".$currentLeaves);

        if ($rule->leave_accrue == "Yes") {
            $lastDayOfCurrentMonth = date("Y-m-t");
            //Take employee joined date into account
            $startDate = $currentLeavePeriod->date_start;

            $numberOfMonthsInLeavePeriod = CalendarTools::getNumberOfMonthsBetweenDates(
                $currentLeavePeriod->date_start,
                $currentLeavePeriod->date_end
            );

            if ($employee->joined_date != "0000-00-00 00:00:00" && !empty($employee->joined_date)
                && strtotime($currentLeavePeriod->date_start) < strtotime($employee->joined_date)
                && strtotime($employee->joined_date) < strtotime($currentLeavePeriod->date_end)
            ) {
                $leaveDaysPerMonth = floatval($leaveDaysBeforePropotionation / $numberOfMonthsInLeavePeriod);

                // If the employee joined in the current Month and if its not the first day of the month
                $leaveAccruedForFirstMonth = 0;
                $shouldCalculateFirstMonthLeave = false;
                if (date('j', strtotime($employee->joined_date)) !== '1') {
                    // Total days for current month
                    $datediffPeriod = date('t');
                    // Days till the end of the month
                    $datediffFromStart = $datediffPeriod - date('j', strtotime($employee->joined_date));

                    $leaveAccruedForFirstMonth = floatval(($leaveDaysPerMonth * $datediffFromStart)/$datediffPeriod);
                    $shouldCalculateFirstMonthLeave = true;
                    // Fist days of the next month
                    $startDate = date('Y-m-01', strtotime('+1 month', strtotime($employee->joined_date)));
                } else {
                    $startDate = $employee->joined_date;
                }

                $leaveAccruedAfterFirstMonth = 0;


                if (strtotime(date('Y-m-d')) > strtotime($startDate)) {
                    $numberOfMonthsPassed = CalendarTools::getNumberOfMonthsBetweenDates(
                        $startDate,
                        $lastDayOfCurrentMonth
                    );
                    $leaveAccruedAfterFirstMonth = $leaveDaysPerMonth * $numberOfMonthsPassed;
                }


                if ($shouldCalculateFirstMonthLeave) {
                    $numberOfMonthsPassed = CalendarTools::getNumberOfMonthsBetweenDates(
                        $startDate,
                        $currentLeavePeriod->date_end
                    );
                    // leave collected till end of the period after first month
                    $leaveAccruedForFirstMonth = $currentLeaves - $leaveDaysPerMonth * $numberOfMonthsPassed;
                }

                $totalLeaveCollected = $leaveAccruedAfterFirstMonth + $leaveAccruedForFirstMonth;
                if ($currentLeaves > $totalLeaveCollected) {
                    $currentLeaves = $totalLeaveCollected;
                }
            } else {
                $leaveDaysPerMonth = floatval($currentLeaves / $numberOfMonthsInLeavePeriod);
                //Number of months passed at the end of the current month
                $numberOfMonthsPassed = CalendarTools::getNumberOfMonthsBetweenDates(
                    $startDate,
                    $lastDayOfCurrentMonth
                );
                $currentLeaves = $leaveDaysPerMonth * $numberOfMonthsPassed;
            }
        }

        $availableLeaveArray["accrued"] = round($currentLeaves, 3);

        $availableLeaveArray["carriedForward"] = 0;

        $previousLeavePeriods = $this->getPreviousLeavePeriodsForChainCarryForwardCalculation(
            $employee,
            $currentLeavePeriod,
            $rule
        );


        // Go through each previous leave period and get out carried forwarded leave amounts
        // For the oldest leave period carried forward amount is 0
        $leavesCarriedForwardPrevious = 0;
        $prevRule = null;
        $lastProcessedLeaveRule = null;
        foreach ($previousLeavePeriods as $leavePeriod) {
            $prevRule = LeaveUtil::getLeaveRule($employee, $leaveTypeId, $leavePeriod);
            $leaveDaysFromPeriod = LeaveUtil::getNumberOfLeaveForFromLeavePeriod(
                $employee,
                $leavePeriod,
                $prevRule
            );

            $leavesTaken = LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves(
                    $employee->id,
                    $leavePeriod->id,
                    $leaveTypeId,
                    'Pending'
                )
            );
            $leavesTaken += LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves(
                    $employee->id,
                    $leavePeriod->id,
                    $leaveTypeId,
                    'Processing'
                )
            );
            $leavesTaken += LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves($employee->id, $leavePeriod->id, $leaveTypeId, 'Approved')
            );
            $leavesTaken += LeaveUtil::countLeaveAmounts(
                LeaveUtil::getEmployeeLeaves(
                    $employee->id,
                    $leavePeriod->id,
                    $leaveTypeId,
                    'Cancellation Requested'
                )
            );

            $amountWhichCanbeDeductedFromCarryForward = 0;

            if ($lastProcessedLeaveRule === null) {
                $lastProcessedLeaveRule = $prevRule;
            }

            $expectedCurrentDate = null;
            if ($lastProcessedLeaveRule->carried_forward === 'Yes'
                && $lastProcessedLeaveRule->carried_forward_leave_availability.'' !== '0'
                && !empty($lastProcessedLeaveRule->carried_forward_leave_availability)
            ) {
                $availabilityPeriod = intval($lastProcessedLeaveRule->carried_forward_leave_availability);
                if ($availabilityPeriod === 365) {
                    $availabilityPeriod = 360;
                }

                $expectedCurrentDate = CalendarTools::addMonthsToDateTime(
                    $leavePeriod->date_start,
                    ($availabilityPeriod / 30),
                    'Y-m-d'
                );

                $amountWhichCanbeDeductedFromCarryForward = LeaveUtil::countLeaveAmounts(
                    LeaveUtil::getEmployeeLeaves(
                        $employee->id,
                        $leavePeriod->id,
                        $leaveTypeId,
                        'Pending',
                        $expectedCurrentDate
                    ),
                    $expectedCurrentDate
                );

                $amountWhichCanbeDeductedFromCarryForward += LeaveUtil::countLeaveAmounts(
                    LeaveUtil::getEmployeeLeaves(
                        $employee->id,
                        $leavePeriod->id,
                        $leaveTypeId,
                        'Processing',
                        $expectedCurrentDate
                    ),
                    $expectedCurrentDate
                );

                $amountWhichCanbeDeductedFromCarryForward += LeaveUtil::countLeaveAmounts(
                    LeaveUtil::getEmployeeLeaves(
                        $employee->id,
                        $leavePeriod->id,
                        $leaveTypeId,
                        'Approved',
                        $expectedCurrentDate
                    ),
                    $expectedCurrentDate
                );

                $amountWhichCanbeDeductedFromCarryForward += LeaveUtil::countLeaveAmounts(
                    LeaveUtil::getEmployeeLeaves(
                        $employee->id,
                        $leavePeriod->id,
                        $leaveTypeId,
                        'Cancellation Requested',
                        $expectedCurrentDate
                    ),
                    $expectedCurrentDate
                );
            }

            if ($leavesCarriedForwardPrevious > $amountWhichCanbeDeductedFromCarryForward) {
                $actuallyDeductedFromCarryForwarded = $amountWhichCanbeDeductedFromCarryForward;
            } else {
                $actuallyDeductedFromCarryForwarded =  $leavesCarriedForwardPrevious;
            }

            // Pass the carried forward amount to next leave period
            $leavesCarriedForwardPrevious = $leaveDaysFromPeriod - $leavesTaken + $actuallyDeductedFromCarryForwarded;
            $leavesCarriedForwardPrevious = LeaveUtil::adjustMaxAndPercentageLeaveCarryForwardAmount(
                $employee,
                $leavePeriod,
                $leaveTypeId,
                $leavesCarriedForwardPrevious
            );

            $lastProcessedLeaveRule = $prevRule;
        }

        if ($prevRule === null) {
            $prevRule = $rule;
        }


        $availableLeaveArray["carriedForward"] = round($leavesCarriedForwardPrevious, 3);
        if ($this->checkCarriedForwardLeaveAvailability($currentLeavePeriod, $prevRule)) {
            $availableLeaveArray["carriedForwardAvailable"] = $availableLeaveArray["carriedForward"];
        } else {
            $availableLeaveArray["carriedForwardAvailable"] = 0;
        }
        $currentLeaves = round($currentLeaves, 3);

        return array($currentLeaves + floatval($rule->pto), $availableLeaveArray, $prevRule);
    }


    private function getPreviousLeavePeriodsForChainCarryForwardCalculation(
        $employee,
        $currentLeavePeriod,
        $rule
    ) {

        if ($rule->carried_forward === 'No'
            || strtotime($currentLeavePeriod->date_start) <= strtotime($employee->joined_date)
        ) {
            return [];
        }

        $leavePeriod = new LeavePeriod();

        if (LeaveUtil::isCountryBasedLeavePeriodsEnabled()) {
            $countryId = Employee::getCurrentEmployeeCompanyStructureCountry();
            $leavePeriods = $leavePeriod->Find(
                'id <> ? and date_end >= ? and date_start < ? and country = ? order by date_start',
                array(
                    $currentLeavePeriod->id,
                    $employee->joined_date,
                    $currentLeavePeriod->date_start,
                    $countryId
                )
            );
        } else {
            $leavePeriods = $leavePeriod->Find(
                'id <> ? and date_end >= ? and date_start < ? order by date_start',
                array(
                    $currentLeavePeriod->id,
                    $employee->joined_date,
                    $currentLeavePeriod->date_start,
                )
            );
        }

        return $leavePeriods;
    }

    public function checkCarriedForwardLeaveAvailability($currentLeavePeriod, $rule)
    {
        if ($rule->carried_forward_leave_availability.'' !== '0'
            && !empty($rule->carried_forward_leave_availability)
        ) {
            $availabilityPeriod = intval($rule->carried_forward_leave_availability);
            if ($availabilityPeriod === 365) {
                $availabilityPeriod = 360;
            }

            $expectedCurrentDate = CalendarTools::addMonthsToDateTime(
                $currentLeavePeriod->date_start,
                ($availabilityPeriod/30),
                'Y-m-d'
            );

            if (strtotime(date('Y-m-d')) >= strtotime($expectedCurrentDate)) {
                return false;
            }
        }
        return true;
    }

    public function getSubEmployeeLeaves($req)
    {
        $employee = $this->baseService->getElement('Employee', $this->getCurrentProfileId(), null, true);

        $subordinate = new Employee();
        $subordinates = $subordinate->Find("supervisor = ?", array($employee->id));

        $subordinatesIds = "";
        foreach ($subordinates as $sub) {
            if ($subordinatesIds != "") {
                $subordinatesIds.=",";
            }
            $subordinatesIds.=$sub->id;
        }
        $subordinatesIds.="";

        $mappingStr = $req->sm;
        $map = json_decode($mappingStr);
        $employeeLeave = new EmployeeLeave();
        $list = $employeeLeave->Find("employee in (".$subordinatesIds.")", array());
        if (!$list) {
            LogManager::getInstance()->info($employeeLeave->ErrorMsg());
        }
        if (!empty($mappingStr)) {
            $list = $this->baseService->populateMapping($list, $map);
        }
        return new IceResponse(IceResponse::SUCCESS, $list);
    }

    public function changeLeaveStatus($req)
    {
        $employee = $this->baseService->getElement('Employee', $this->getCurrentProfileId(), null, true);

        $subordinate = new Employee();
        $subordinates = $subordinate->Find("supervisor = ?", array($employee->id));

        $subordinatesIds = array();
        foreach ($subordinates as $sub) {
            $subordinatesIds[] = $sub->id;
        }

        $employeeLeave = new EmployeeLeave();
        $employeeLeave->Load("id = ?", array($req->id));
        if ($employeeLeave->id != $req->id) {
            return new IceResponse(IceResponse::ERROR, "Leave not found");
        }

        //Check if this needs to be multi-approved
        //ajax
        $employee_id = $req -> id;
        $apStatus = 0;
        if ($req->status == "Approved") {
            $apStatus = 1;
            LogManager::getInstance()->info("====>Check for first Approvals ".$employee_id."<====");
            EmployeeLeave::apileaveapproval($employee_id);
        }

        if ($req->status == "Approved" || $req->status == "Rejected") {
            $approvalResp = ApprovalStatus::getInstance()->updateApprovalStatus(
                'EmployeeLeave',
                $employeeLeave->id,
                BaseService::getInstance()->getCurrentProfileId(),
                $apStatus
            );

            if ($approvalResp->getStatus() == IceResponse::SUCCESS) {
                $obj = $approvalResp->getObject();
                $currentAp  = $obj[0];
                $nextAp     = $obj[1];
                $sendApprovalEmailto = null;
                if (empty($currentAp) && empty($nextAp)) {
                    //No multi level approvals
                    LogManager::getInstance()->debug($employeeLeave->id."|No multi level approvals|");
                    if ($req->status == "Approved") {
                        $req->status = "Approved";
                        LogManager::getInstance()->info("====>NO MULTI-LEVEL APPROVALS ".$employee_id."<====");
                        EmployeeLeave::apileaveapproval($employee_id);
                    }
                } elseif (empty($currentAp) && !empty($nextAp)) {
                    //Approval process is defined, but this person is a supervisor
                    LogManager::getInstance()->debug(
                        $employeeLeave->id."|Approval process is defined, but this person is a supervisor|"
                    );
                    $sendApprovalEmailto = $nextAp->approver;
                    if ($req->status == "Approved") {
                        $req->status = "Processing";
                    }
                } elseif (!empty($currentAp) && empty($nextAp)) {
                    //All multi level approvals completed, now we can approve
                    LogManager::getInstance()->debug(
                        $employeeLeave->id."|All multi level approvals completed, now we can approve|"
                    );
                    if ($req->status == "Approved") {
                        $req->status = "Approved";
                        LogManager::getInstance()->info("====>ALL MULTI-LEVEL APPROVALS COMPLETED ".$employee_id."<====");
                        EmployeeLeave::apileaveapproval($employee_id);
                    }
                } else { 
                    //
                    //Current employee is an approver and we have another approval level left
                    LogManager::getInstance()->debug(
                        $employeeLeave->id."|Current employee is an approver and we have another approval level left|"
                    );
                    $sendApprovalEmailto = $nextAp->approver;
                    if ($req->status == "Approved") {
                        $req->status = "Processing";
                    }
                }
            } else {
                return $approvalResp;
            }
        }

        $oldLeaveStatus = $employeeLeave->status;
        $employeeLeave->status = $req->status;

        if ($oldLeaveStatus == $req->status && $req->status != "Processing") {
            return new IceResponse(IceResponse::SUCCESS, "");
        }

        $ok = $employeeLeave->Save();
        if (!$ok) {
            LogManager::getInstance()->info($employeeLeave->ErrorMsg());
            return new IceResponse(
                IceResponse::ERROR,
                "Error occurred while saving leave information. Please contact admin"
            );
        }

        $employeeLeaveLog = new EmployeeLeaveLog();
        $employeeLeaveLog->employee_leave = $employeeLeave->id;
        $employeeLeaveLog->user_id = $this->baseService->getCurrentUser()->id;
        $employeeLeaveLog->status_from = $oldLeaveStatus;
        $employeeLeaveLog->status_to = $employeeLeave->status;
        $employeeLeaveLog->created = date("Y-m-d H:i:s");
        $employeeLeaveLog->data = isset($req->reason)?$req->reason:"";
        $ok = $employeeLeaveLog->Save();
        if (!$ok) {
            LogManager::getInstance()->info($employeeLeaveLog->ErrorMsg());
        }

        if (!empty($this->emailSender)
            && $oldLeaveStatus != $employeeLeave->status
            && $this->isLeaveNotificationsEnabled($employeeLeave->leave_type) == true
        ) {
            $leavesEmailSender = $this->createLeaveEmailSender();
            $leavesEmailSender->sendLeaveStatusChangedEmail($employee, $employeeLeave);
        }

        $this->baseService->audit(
            IceConstants::AUDIT_ACTION,
            "Leave status changed \ from:".$oldLeaveStatus."\ to:".$employeeLeave->status." \ id:".$employeeLeave->id
        );

        if ($employeeLeave->status != "Pending") {
            $notificationMsg = "Your leave status has been changed to $employeeLeave->status by "
                .$employee->first_name." ".$employee->middle_name." ".$employee->last_name;
            if (!empty($req->reason)) {
                $notificationMsg.=" (Note:".$req->reason.")";
            }
        }

        $this->baseService->notificationManager->addNotification(
            $employeeLeave->employee,
            $notificationMsg,
            '{"type":"url","url":"g=modules&n=leaves&m=module_Leaves#tabEmployeeLeaveApproved"}',
            IceConstants::NOTIFICATION_LEAVE
        );

        if (!empty($sendApprovalEmailto)) {
            $employee = $this->baseService->getElement(
                'Employee',
                BaseService::getInstance()->getCurrentProfileId(),
                null,
                true
            );

            $notificationMsg = "You have been assigned ".$employeeLeave->getDisplayName()
                ." for approval by ".$employee->first_name." ".$employee->middle_name." ".$employee->last_name;

            $this->baseService->notificationManager->addNotification(
                $sendApprovalEmailto,
                $notificationMsg,
                '{"type":"url","url":"g=modules&n=leaves&m=module_Leaves"}',
                IceConstants::NOTIFICATION_LEAVE,
                null,
                false,
                true
            );
        }

        return new IceResponse(IceResponse::SUCCESS, "");
    }
}
