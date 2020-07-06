<?php

namespace Jobs\Common\Model;

use Model\BaseModel;

class EmployeeSeverance extends BaseModel
{
    public $table = 'EmployeeSeverance';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }
}
