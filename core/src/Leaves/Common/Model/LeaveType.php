<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 1:43 PM
 */

namespace Leaves\Common\Model;

use Classes\BaseService;
use Leaves\Admin\Api\LeaveUtil;
use Model\BaseModel;

class LeaveType extends BaseModel
{
    public $table = 'LeaveTypes';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function isProcessMappings()
    {
        return true;
    }

    public function getUserLeaveTypes()
    {
        $ele = new LeaveType();
        $employeeId = BaseService::getInstance()->getCurrentProfileId();

        $leaveGroupIds = LeaveUtil::getEmployeeLeaveGroups($employeeId);


        if (empty($leaveGroupIds)) {
            $list = $ele->Find('leave_group IS NULL', array());
        } else {
            $list = $ele->Find("leave_group IS NULL or leave_group in (".implode(',', $leaveGroupIds).")", array());
        }

        return $list;
    }

    public function fieldValueMethods()
    {
        return ['getUserLeaveTypes'];
    }
}
