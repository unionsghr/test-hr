<?php

namespace Jobs\Common\Model;

use Model\BaseModel;

class StaffInfraction extends BaseModel
{
    public $table = 'StaffInfraction';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }
}
