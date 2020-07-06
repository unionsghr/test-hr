<?php
namespace Performance\Common\Model;

use Classes\BaseService;
use Classes\IceResponse;
use Model\BaseModel;

class ReviewFeedback extends BaseModel
{
    public $table = 'ReviewFeedbacks';

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
        $review = new PerformanceReview();
        $review->Load('id = ?', array($obj->review));
        $obj->subject = $review->employee;


        $currentEmpId = BaseService::getInstance()->getCurrentProfileId();

        $cemployee = BaseService::getInstance()->getElement('Employee', $currentEmpId, null, true);
        $employee = BaseService::getInstance()->getElement('Employee', $obj->employee, null, true);
        //Send a notification to employee
        $notificationMsg = $cemployee->first_name . " " . $cemployee->last_name.
            " requested you to provide a feedback for a performance review";
        $moduleUrl = 'g=modules&n=performance&m=module_Performance#tabReviewFeedback';
        BaseService::getInstance()->notificationManager->addNotification(
            $employee->id,
            $notificationMsg,
            '{"type":"url","url":"'.$moduleUrl.'"}',
            'Feedback',
            null,
            false,
            true
        );

        return new IceResponse(IceResponse::SUCCESS, $obj);
    }

    public function executePreUpdateActions($obj)
    {
        if ($obj->status !== 'Submitted') {
            return new IceResponse(IceResponse::SUCCESS, $obj);
        }

        $review = new PerformanceReview();
        $review->Load('id = ?', array($obj->review));
        $employee = BaseService::getInstance()->getElement('Employee', $obj->employee, null, true);
        //Send a notification to employee
        $notificationMsg = $employee->first_name . " " . $employee->last_name.
            " submitted the performance review feedback";
        $moduleUrl = 'g=modules&n=performance&m=module_Performance#tabCoordinatedPerformanceReview';
        BaseService::getInstance()->notificationManager->addNotification(
            $review->coordinator,
            $notificationMsg,
            '{"type":"url","url":"'.$moduleUrl.'"}',
            'Feedback',
            null,
            false,
            true
        );

        $obj->employee = null;
        $obj->Save();

        return new IceResponse(IceResponse::SUCCESS, $obj);
    }
}
