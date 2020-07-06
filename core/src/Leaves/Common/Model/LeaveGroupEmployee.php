<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 2:24 PM
 */

namespace Leaves\Common\Model;

use Classes\IceResponse;
use Model\BaseModel;

class LeaveGroupEmployee extends BaseModel
{
    public $table = 'LeaveGroupEmployees';
    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }

    public function validateSave($obj)
    {
        $objExisting = new LeaveGroupEmployee();
        $objExisting->Load("employee = ? and leave_group = ?", array($obj->employee, $obj->leave_group));
        if (!empty($obj->employee)
            && $objExisting->employee == $obj->employee
            && $objExisting->leave_group == $obj->leave_group
        ) {
            return new IceResponse(
                IceResponse::ERROR,
                "Duplicate entry"
            );
        }

        return new IceResponse(IceResponse::SUCCESS, "");
    }
}
