<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 2:34 PM
 */

namespace Leaves\Common\Model;

use Classes\BaseService;
use Classes\IceResponse;
use Classes\SettingsManager;
use Model\BaseModel;

class EmployeeLeave extends BaseModel
{
    public $table = 'EmployeeLeaves';
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
        return array("element","delete");
    }

    public function executePreDeleteActions($obj)
    {
        $user = BaseService::getInstance()->getCurrentUser();
        if ($obj->status !== 'Pending' && $user->user_level !== 'Admin') {
            return new IceResponse(IceResponse::ERROR, 'You are not allowed to delete this leave');
        }
        return new IceResponse(IceResponse::SUCCESS, null);
    }

    public function allowIndirectMapping()
    {
        if (SettingsManager::getInstance()->getSetting("Leave: Allow Indirect Admins to Approve") == "1") {
            return true;
        }
        return false;
    }

    public function getDisplayName()
    {
        return "Leave Request";
    }
}
