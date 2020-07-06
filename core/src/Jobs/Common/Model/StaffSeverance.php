<?php

namespace Jobs\Common\Model;

use Model\BaseModel;

class StaffSeverance extends BaseModel
{
    public $table = 'StaffSeverance';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }
}
