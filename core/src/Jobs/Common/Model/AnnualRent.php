<?php

namespace Jobs\Common\Model;

use Model\BaseModel;

class AnnualRent extends BaseModel
{
    public $table = 'AnnualRent';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }
}
