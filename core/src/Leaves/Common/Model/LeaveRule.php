<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 2:22 PM
 */

namespace Leaves\Common\Model;

use Model\BaseModel;

class LeaveRule extends BaseModel
{
    public $table = 'LeaveRules';
    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }
}
