<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 2:32 PM
 */

namespace Leaves\Common;

use Classes\SettingsManager;
use Employees\Common\Model\Employee;
use Leaves\Common\Model\EmployeeLeave;
use Utils\LogManager;

class LeavesEmailSender
{

    protected $emailSender = null;
    protected $subActionManager = null;
    protected $modulePath = null;

    public function __construct($emailSender, $subActionManager, $modulePath = null)
    {
        $this->emailSender = $emailSender;
        $this->subActionManager = $subActionManager;
        $this->modulePath = $modulePath;
    }

    private function getEmployeeSupervisor($employee)
    {

        if (empty($employee->supervisor)) {
            LogManager::getInstance()->info("Employee supervisor is empty");
            return null;
        }

        $sup = new Employee();
        $sup->Load("id = ?", array($employee->supervisor));
        if ($sup->id != $employee->supervisor) {
            LogManager::getInstance()->info("Employee supervisor not found");
            return null;
        }

        return $sup;
    }

    private function getEmployeeById($id)
    {
        $sup = new Employee();
        $sup->Load("id = ?", array($id));
        if ($sup->id != $id) {
            LogManager::getInstance()->info("Employee not found");
            return null;
        }

        return $sup;
    }

    public function sendLeaveApplicationEmail($employee, $cancellation = false)
    {

        $sup = $this->getEmployeeSupervisor($employee);
        if (empty($sup)) {
            return false;
        }

        $params = array();
        $params['supervisor'] = $sup->first_name." ".$sup->last_name;
        $params['name'] = $employee->first_name." ".$employee->last_name;
        $params['url'] = CLIENT_BASE_URL;
        $params['indirect'] = "Direct";

        if ($cancellation) {
            $email = $this->subActionManager->getEmailTemplate('leaveCancelled.html', $this->modulePath);
        } else {
            $email = $this->subActionManager->getEmailTemplate('leaveApplied.html', $this->modulePath);
        }

        $user = $this->subActionManager->getUserFromProfileId($sup->id);

        $emailTo = null;
        if (!empty($user)) {
            $emailTo = $user->email;
        }

        if (!empty($emailTo)) {
            if (!empty($this->emailSender)) {
                $ccList = array();
                $ccListStr = SettingsManager::getInstance()->getSetting("Leave: CC Emails");
                if (!empty($ccListStr)) {
                    $arr = explode(",", $ccListStr);
                    $count = count($arr)<=4?count($arr):4;
                    for ($i = 0; $i<$count; $i++) {
                        if (filter_var($arr[$i], FILTER_VALIDATE_EMAIL)) {
                            $ccList[] = $arr[$i];
                        }
                    }
                }

                $bccList = array();
                $bccListStr = SettingsManager::getInstance()->getSetting("Leave: BCC Emails");
                if (!empty($bccListStr)) {
                    $arr = explode(",", $bccListStr);
                    $count = count($arr)<=4?count($arr):4;
                    for ($i = 0; $i<$count; $i++) {
                        if (filter_var($arr[$i], FILTER_VALIDATE_EMAIL)) {
                            $bccList[] = $arr[$i];
                        }
                    }
                }
                if ($cancellation) {
                    $this->emailSender->sendEmail(
                        "Leave Cancellation Request Received",
                        $emailTo,
                        $email,
                        $params,
                        $ccList,
                        $bccList
                    );
                } else {
                    $this->emailSender->sendEmail(
                        "Leave Application Received",
                        $emailTo,
                        $email,
                        $params,
                        $ccList,
                        $bccList
                    );
                }
            }
        } else {
            LogManager::getInstance()->info("[sendLeaveApplicationEmail] email is empty");
        }

        //Send approval emails to indirect supervisors
        $employeeLeave = new EmployeeLeave();
        if ($employeeLeave->allowIndirectMapping()) {
            if (!empty($employee->indirect_supervisors)) {
                $indirectSupervisors = json_decode($employee->indirect_supervisors, true);
                $params = array();

                $params['name'] = $employee->first_name." ".$employee->last_name;
                $params['url'] = CLIENT_BASE_URL;
                $params['indirect'] = "Indirect";
                foreach ($indirectSupervisors as $is) {
                    $supervisor = new Employee();
                    $supervisor->Load("id = ?", array($is));
                    $params['supervisor'] = $supervisor->first_name." ".$supervisor->last_name;
                    $user = $this->subActionManager->getUserFromProfileId($is);

                    $emailTo = null;
                    if (!empty($user)) {
                        $emailTo = $user->email;
                    }

                    if (!empty($emailTo)) {
                        if (!empty($this->emailSender)) {
                            $ccList = array();
                            $bccList = array();

                            if ($cancellation) {
                                $this->emailSender->sendEmail(
                                    "Leave Cancellation Request Received from an Indirect Report",
                                    $emailTo,
                                    $email,
                                    $params,
                                    $ccList,
                                    $bccList
                                );
                            } else {
                                $this->emailSender->sendEmail(
                                    "Leave Application Received from an Indirect Report",
                                    $emailTo,
                                    $email,
                                    $params,
                                    $ccList,
                                    $bccList
                                );
                            }
                        }
                    } else {
                        LogManager::getInstance()->info("[sendLeaveApplicationEmail] indirect email is empty");
                    }
                }
            }
        }
    }

    public function sendLeaveApplicationSubmittedEmail($employee)
    {

        $params = array();
        $params['name'] = $employee->first_name." ".$employee->last_name;

        $email = $this->subActionManager->getEmailTemplate('leaveSubmittedForReview.html', $this->modulePath);

        $user = $this->subActionManager->getUserFromProfileId($employee->id);

        $emailTo = null;
        if (!empty($user)) {
            $emailTo = $user->email;
        }

        if (!empty($emailTo)) {
            if (!empty($this->emailSender)) {
                $this->emailSender->sendEmail("Leave Application Submitted", $emailTo, $email, $params);
            }
        } else {
            LogManager::getInstance()->info("[sendLeaveApplicationSubmittedEmail] email is empty");
        }
    }

    public function sendLeaveStatusChangedEmail($employee, $leave)
    {

        $emp = $this->getEmployeeById($leave->employee);

        $params = array();
        $params['name'] = $emp->first_name." ".$emp->last_name;
        $params['startdate'] = $leave->date_start;
        $params['enddate'] = $leave->date_end;
        $params['status'] = $leave->status;

        $email = $this->subActionManager->getEmailTemplate('leaveStatusChanged.html', $this->modulePath);

        $user = $this->subActionManager->getUserFromProfileId($emp->id);

        $emailTo = null;
        if (!empty($user)) {
            $emailTo = $user->email;
        }

        if (!empty($emailTo)) {
            if (!empty($this->emailSender)) {
                $this->emailSender->sendEmail("Leave Application ".$leave->status, $emailTo, $email, $params);
            }
        } else {
            LogManager::getInstance()->info("[sendLeaveStatusChangedEmail] email is empty");
        }
    }
}
