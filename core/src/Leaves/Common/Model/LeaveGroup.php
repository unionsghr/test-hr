<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 2:24 PM
 */

namespace Leaves\Common\Model;

use Model\BaseModel;

class LeaveGroup extends BaseModel
{
    public $table = 'LeaveGroups';
    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }
}
