<?php
namespace Candidates\Common\Email;

use Classes\Email\EmailSender;
use Classes\SettingsManager;
use Classes\SubActionManager;
use Utils\LogManager;

class CandidatesEmailSender
{

    /** @var EmailSender */
    protected $emailSender = null;
    /** @var SubActionManager */
    protected $subActionManager = null;

    public function __construct($emailSender, $subActionManager)
    {
        $this->emailSender = $emailSender;
        $this->subActionManager = $subActionManager;
    }

    public function sendDataUpdateRequestEmail($candidate, $job, $company, $url)
    {

        $params = array();
        $params['url'] = $url;
        $params['name'] = $candidate->first_name;
        $params['company'] = SettingsManager::getInstance()->getSetting("Company: Name");
        $params['companyInfo'] = SettingsManager::getInstance()->getSetting("Company: Description");
        $params['job'] = $job->title;
        $params['jobCompany'] = $company->name;

        $email = $this->subActionManager->getEmailTemplate("infoUpdateRequest.html");

        $emailTo = $candidate->email;

        if (!empty($emailTo)) {
            if (!empty($this->emailSender)) {
                LogManager::getInstance()->debug("[infoUpdateRequest] sending email to $emailTo : ".$email);
                $this->emailSender->sendEmailWithoutWrap(
                    "Profile Update Request",
                    $emailTo,
                    $email,
                    $params
                );
            }
        } else {
            LogManager::getInstance()->info("[infoUpdateRequest] email is empty");
        }
    }

    public function sendNewCandidateUserEmail($jobTitle, $candidate)
    {
        $params = array();
        $params['name'] = $candidate->first_name;
        $params['company'] = SettingsManager::getInstance()->getSetting("Company: Name");
        $params['job'] = $jobTitle;

        $email = $this->subActionManager->getEmailTemplate(
            "newCandidateUserEmail.html",
            APP_BASE_PATH.'admin/candidates'
        );

        $emailTo = $candidate->email;

        if (empty($emailTo) || empty($this->emailSender)) {
            LogManager::getInstance()->debug("[newCandidateUserEmail] recipient address is not provided");
            return false;
        }

        LogManager::getInstance()->debug("[newCandidateUserEmail] sending email to $emailTo : ".$email);
        return $this->emailSender->sendEmail(
            sprintf("Thank you for Applying at %s", $params['company']),
            $emailTo,
            $email,
            $params
        );
    }

    public function sendNewCandidateManagerEmail($jobTitle, $candidate, $managerName, $emailTo)
    {
        $params = array();
        $params['name'] = $candidate->first_name;
        $params['email'] = $candidate->email;
        $params['manager'] = $managerName;
        $params['company'] = SettingsManager::getInstance()->getSetting("Company: Name");
        $params['job'] = $jobTitle;

        $email = $this->subActionManager->getEmailTemplate(
            "newCandidateManagerEmail.html",
            APP_BASE_PATH.'admin/candidates'
        );

        if (empty($emailTo) || empty($this->emailSender)) {
            LogManager::getInstance()->debug("[sendNewCandidateManagerEmail] recipient address is not provided");
            return false;
        }

        LogManager::getInstance()->debug("[sendNewCandidateManagerEmail] sending email to $emailTo : ".$email);
        return $this->emailSender->sendEmail(
            sprintf("New application for %s", $params['job']),
            $emailTo,
            $email,
            $params
        );
    }

    public function interviewScheduledManagerEmail($jobTitle, $candidate, $managerName, $emailTo, $interview)
    {
        $params = array();
        $params['name'] = $candidate->first_name;
        $params['email'] = $candidate->email;
        $params['manager'] = $managerName;
        $params['job'] = $jobTitle;
        $params['time'] = date('Y-m-d H:i', strtotime($interview->scheduled));
        $params['notes'] = nl2br($interview->notes);

        $email = $this->subActionManager->getEmailTemplate(
            "interviewScheduledManager.html",
            APP_BASE_PATH.'admin/candidates'
        );

        if (empty($emailTo) || empty($this->emailSender)) {
            LogManager::getInstance()->debug("[interviewScheduledManagerEmail] recipient address is not provided");
            return false;
        }

        LogManager::getInstance()->debug("[interviewScheduledManagerEmail] sending email to $emailTo : ".$email);
        return $this->emailSender->sendEmail(
            sprintf("Interview Scheduled - %s (%s)", $params['job'], $params['name']),
            $emailTo,
            $email,
            $params
        );
    }

    public function interviewScheduledInterviewerEmail(
        $jobTitle,
        $candidate,
        $managerName,
        $managerEmail,
        $emailTo,
        $interview,
        $interviewer
    ) {
        $params = array();
        $params['user'] = $interviewer->first_name;
        $params['name'] = $candidate->first_name;
        $params['email'] = $candidate->email;
        $params['managername'] = $managerName;
        $params['manageremail'] = $managerEmail;
        $params['job'] = $jobTitle;
        $params['time'] = date('Y-m-d H:i', strtotime($interview->scheduled));
        $params['notes'] = nl2br($interview->notes);

        $email = $this->subActionManager->getEmailTemplate(
            "interviewScheduledInterviewer.html",
            APP_BASE_PATH.'admin/candidates'
        );

        if (empty($emailTo) || empty($this->emailSender)) {
            LogManager::getInstance()->debug("[interviewScheduledInterviewerEmail] recipient address is not provided");
            return false;
        }

        LogManager::getInstance()->debug("[interviewScheduledInterviewerEmail] sending email to $emailTo : ".$email);
        return $this->emailSender->sendEmail(
            sprintf("Interview Invitation - %s (%s)", $params['job'], $params['name']),
            $emailTo,
            $email,
            $params
        );
    }
}
