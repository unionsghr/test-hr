<?php

namespace Performance\Common\Model;

use Classes\BaseService;
use Classes\IceResponse;
use Employees\Common\Model\Employee;
use Model\BaseModel;

class PerformanceReview extends BaseModel
{
    public $table = 'PerformanceReviews';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getManagerAccess()
    {
        return array("get","element","save");
    }

    public function getUserAccess()
    {
        return array("get");
    }

    public function getUserOnlyMeAccess()
    {
        return array("element","save");
    }

    public function getAnonymousAccess()
    {
        return array();
    }

    public function executePreSaveActions($obj)
    {
        $employee = new Employee();
        $employee->Load('id = ?', array($obj->employee));
        $obj->name = 'Review for '.$employee->first_name.' '.$employee->last_name.' / from '
            .date('Y-m-d', strtotime($obj->review_period_start)).' to '
            .date('Y-m-d', strtotime($obj->review_period_end));


        $currentEmpId = BaseService::getInstance()->getCurrentProfileId();

        $cemployee = BaseService::getInstance()->getElement('Employee', $currentEmpId, null, true);
        $employee = BaseService::getInstance()->getElement('Employee', $obj->employee, null, true);

        //Send a notification to employee
        $notificationMsg = $cemployee->first_name . " " . $cemployee->last_name.
            " started a performance review for you. Please fill in and submit the self-assessment before the due date";
        $moduleUrl = 'g=modules&n=performance&m=module_Performance';
        BaseService::getInstance()->notificationManager->addNotification(
            $employee->id,
            $notificationMsg,
            '{"type":"url","url":"'.$moduleUrl.'"}',
            'Performance Review',
            null,
            false,
            true
        );

        return new IceResponse(IceResponse::SUCCESS, $obj);
    }
}
