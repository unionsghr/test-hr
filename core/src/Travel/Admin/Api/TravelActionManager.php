<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/20/17
 * Time: 8:13 AM
 */

namespace Travel\Admin\Api;

use Classes\Approval\ApproveAdminActionManager;

class TravelActionManager extends ApproveAdminActionManager
{

    public function getModelClass()
    {
        return "EmployeeTravelRecord";
    }

    public function getItemName()
    {
        return "Imprest Request";
    }

    public function getModuleName()
    {
        return "Imprest Management";
    }

    public function getModuleTabUrl()
    {
        return "g=modules&n=travel&m=module_Travel_Management#tabEmployeeTravelRecord";
    }

    public function getModuleSubordinateTabUrl()
    {
        return "g=modules&n=travel&m=module_Travel_Management#tabSubordinateEmployeeTravelRecord";
    }

    public function getModuleApprovalTabUrl()
    {
        return "g=modules&n=travel&m=module_Travel_Management#tabEmployeeTravelRecordApproval";
    }

    public function getLogs($req)
    {
        return parent::getLogs($req);
    }

    public function changeStatus($req)
    {
        return parent::changeStatus($req);
    }
}
