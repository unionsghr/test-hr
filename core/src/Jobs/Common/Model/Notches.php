<?php

namespace Jobs\Common\Model;

use Model\BaseModel;

class Notches extends BaseModel
{
    public $table = 'Notches';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }
}
