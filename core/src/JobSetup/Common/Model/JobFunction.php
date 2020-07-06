<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 1:01 PM
 */

namespace JobSetup\Common\Model;

use Model\BaseModel;

class JobFunction extends BaseModel
{
    public $table = 'JobFunction';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }
}
