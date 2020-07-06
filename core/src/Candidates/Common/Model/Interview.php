<?php
namespace Candidates\Common\Model;

use Classes\IceResponse;
use Model\BaseModel;

class Interview extends BaseModel
{
    public $table = 'Interviews';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getManagerAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }

    public function getAnonymousAccess()
    {
        return array();
    }

    public function getUserOnlyMeAccess()
    {
        return array("element");
    }

    public function executePreSaveActions($obj)
    {
        if (empty($obj->job)) {
            $candidate = new Candidate();
            $candidate->Load('id = ?', [$obj->candidate]);
            $obj->job = $candidate->jobId;
        }
        $obj->scheduleUpdated = 0;
        if (strtotime($obj->scheduled) > time()) {
            $obj->scheduleUpdated = 1;
        }

        return new IceResponse(IceResponse::SUCCESS, $obj);
    }

    public function executePreUpdateActions($obj)
    {
        $prvObj = new Interview();
        $prvObj->Load('id = ?', [$obj->id]);

        if (strtotime($obj->scheduled) > time() && strtotime($prvObj->scheduled) !== strtotime($obj->scheduled)) {
            $obj->scheduleUpdated = 1;
        }
        return new IceResponse(IceResponse::SUCCESS, $obj);
    }
}
