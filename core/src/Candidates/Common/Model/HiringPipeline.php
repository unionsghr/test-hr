<?php

namespace Candidates\Common\Model;

use Model\BaseModel;

class HiringPipeline extends BaseModel
{
    public $table = 'HiringPipeline';

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
}
