<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 6:19 AM
 */

namespace Candidates\Common\Model;

use Classes\IceResponse;
use Model\BaseModel;

class Call extends BaseModel
{
    public $table = 'Calls';

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
        $candidate = new Candidate();
        $candidate->Load('id = ?', [$obj->candidate]);
        $obj->job = $candidate->jobId;
        return new IceResponse(IceResponse::SUCCESS, $obj);
    }
}
