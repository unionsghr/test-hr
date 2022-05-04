<?php

namespace Medical\Common\Model;

use Model\BaseModel;

class DependantMedical extends BaseModel
{
    // public $table = 'Dependantmedical';

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
        return array("get");
    }

    public function getUserOnlyMeAccess()
    {
        return array("element","save","delete");
    }
}
