<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:57 PM
 */

namespace JobSetup\Common\Model;

use Model\BaseModel;

class EmployementType extends BaseModel
{
    public $table = 'EmployementType';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }
}
