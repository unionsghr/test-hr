<?php
namespace Leaves\Rest;

use Attendance\Common\Model\Attendance;
use Classes\BaseService;
use Classes\Data\Query\DataQuery;
use Classes\Data\Query\Filter;
use Classes\IceResponse;
use Classes\LanguageManager;
use Classes\PermissionManager;
use Classes\RestEndPoint;
use Employees\Common\Model\Employee;
use Leaves\Admin\Api\LeaveUtil;
use Leaves\Common\LeavesEmailSender;
use Leaves\Common\Model\EmployeeLeave;
use Leaves\User\Api\LeavesActionManager;
use Users\Common\Model\User;
use Utils\LogManager;

class LeaveRestEndPoint extends RestEndPoint
{
    const ELEMENT_NAME = 'EmployeeLeave';

    protected $userLeaveActionManager;

    public function __construct()
    {
        $this->userLeaveActionManager = new LeavesActionManager();
        $this->userLeaveActionManager->setBaseService(BaseService::getInstance());
        $this->userLeaveActionManager->setEmailSender(BaseService::getInstance()->getEmailSender());
    }

    public function getLeaveDetails(User $user, $leaveId)
    {
        $this->userLeaveActionManager->setUser($user);
        $req = new \stdClass();
        $req->leave_id = $leaveId;
        $response = $this->userLeaveActionManager->getLeaveDaysReadonly($req);

        if ($response->getStatus() === IceResponse::SUCCESS) {
            $data = $response->getData();
            $leaveDays = [];
            foreach ($data[0] as $leaveDay) {
                $leaveDays[] = BaseService::getInstance()->cleanUpAll($leaveDay);
            }

            return new IceResponse(
                IceResponse::SUCCESS,
                [
                    'id' => $data[2],
                    'currentBalance' => $data[1],
                    'leave' => BaseService::getInstance()->cleanUpAll($data[3]),
                    'days' => $leaveDays,
                    'logs' => $data[4]
                ]
            );
        }

        return $response;
    }

    public function checkLeave(User $user, $leaveTypeId, $startDate, $endDate)
    {
        $this->userLeaveActionManager->setUser($user);
        $req = new \stdClass();
        $req->leave_type = $leaveTypeId;
        $req->start_date = $startDate;
        $req->end_date = $endDate;
        $response = $this->userLeaveActionManager->getLeaveDays($req);

        if ($response->getStatus() === IceResponse::SUCCESS) {
            $data = $response->getData();

            return new IceResponse(
                IceResponse::SUCCESS,
                [
                    'currentBalance' => $data[1],
                    'leave' => BaseService::getInstance()->cleanUpAll($data[2]),
                    'dayMap' => $data[0],
                ]
            );
        }

        return $response;
    }

    public function getEntitlement(User $user)
    {
        $this->userLeaveActionManager->setUser($user);
        $employee = new Employee();
        $employee->Load('id = ?', [$user->employee]);
        $response = $this->userLeaveActionManager->getEntitlementByEmployee($employee);
        if ($response->getStatus() === IceResponse::SUCCESS) {
            return new IceResponse(IceResponse::SUCCESS, ['data' => $response->getData()]);
        }

        return $response;
    }

    public function getAllMyLeave(User $user)
    {
        $employee = new Employee();
        $employee->Load('id = ?', [$user->employee]);

        $employeeLeave = new EmployeeLeave();
        $employeeLeaveList = $employeeLeave->Find(
            'employee = ? order by date_start desc limit 100',
            [$employee->id]
        );

        $leaveList = [];
        $employeeLeaveList = BaseService::getInstance()->populateMapping(
            $employeeLeaveList,
            [
                "leave_type" => [
                    "LeaveType",
                    "id",
                    "name",
                    "getUserLeaveTypes"
                ],
                "leave_period" => [
                    "LeavePeriod",
                    "id",
                    "name"
                ]]
        );
        foreach ($employeeLeaveList as $leave) {
            $leave = LeaveUtil::enrichEmployeeLeave($leave);
            $leave = BaseService::getInstance()->cleanUpAll($leave);
            $leaveList[] = $leave;
        }

        return new IceResponse(IceResponse::SUCCESS, ['data' => $leaveList]);
    }

    public function apply(User $user)
    {
        $this->userLeaveActionManager->setUser($user);
        $leaveData = $this->getRequestBody();

        $req = new \stdClass();
        $req->leave_type = $leaveData['leave_type'];
        $req->date_start = $leaveData['start'];
        $req->date_end = $leaveData['end'];
        $req->details = $leaveData['details'];
        $req->attachment = $leaveData['attachment'];
        $req->days = json_encode($leaveData['days']);
        $response = $this->userLeaveActionManager->addLeave($req);

        if ($response->getStatus() === IceResponse::SUCCESS) {
            return new IceResponse(
                IceResponse::SUCCESS,
                BaseService::getInstance()->cleanUpAll($response->getData()),
                201
            );
        }

        return $response;
    }
}
