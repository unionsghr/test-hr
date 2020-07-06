<?php
namespace Payroll\Admin\Api;

use Classes\Email\EmailSender;
use Employees\Common\Model\Employee;
use Payroll\Common\Model\Payroll;
use Classes\SubActionManager;
use Utils\LogManager;

class PayrollEmailSender
{

    protected $emailSender = null;
    protected $subActionManager = null;

    public function __construct(EmailSender $emailSender, SubActionManager $subActionManager)
    {
        $this->emailSender = $emailSender;
        $this->subActionManager = $subActionManager;
    }

    public function sendPayrollEmail(Employee $user, $employee = null)
    {

        $params = array();
        if (!empty($employee)) {
            $params['name'] = $employee->first_name." ".$employee->middle_name." ".$employee->last_name;
        } 

        $params['url'] = CLIENT_BASE_URL;
        $params['email'] = $user->work_email;
        // $params['name'] = $user->name;
        $params['department'] = $user->department;
        $params['date_start'] = $user->date_start;
        $params['date_end'] = $user->date_end;
        // $params['username'] = $user->username;

        $email = $this->subActionManager->getEmailTemplate('payslip.html');

        $emailTo = null;
        if (!empty($user)) {
            $emailTo = $user->email;
        }

        if (!empty($emailTo)) {
            if (!empty($this->emailSender)) {
                LogManager::getInstance()->info("[sendWelcomeUserEmail] sending email to $emailTo : ".$email);
                return $this->emailSender->sendEmail("Your Hrm Account is ready", $emailTo, $email, $params);
            }
        } else {
            LogManager::getInstance()->info("[sendWelcomeUserEmail] email is empty");
        }
        
        return false;
    }
}
