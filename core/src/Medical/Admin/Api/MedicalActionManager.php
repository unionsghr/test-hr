<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:06 PM
 */

namespace Medical\Admin\Api;

use Classes\Approval\ApproveAdminActionManager;
use Classes\Approval\ApprovalStatus;
use Classes\Approval\ApproveCommonActionManager;
use Classes\Approval\ApproveModuleActionManager;
use Classes\IceResponse;
use Utils\LogManager;

class MedicalActionManager extends ApproveAdminActionManager
{

    public function getModelClass()
    {
        // LogManager::getInstance()->info("-========---- EXPENSE ACTION MANAGER MODEL CLASS-----=====");

        return "StaffMedical"; 
    }

    public function getItemName()
    {
        return "Medicals";
    }

    public function getModuleName()
    {
        return "Medical Management";
    }

    public function getModuleTabUrl()
    {
        return "g=modules&n=medical&m=module_Finance";
    }

    public function getModuleSubordinateTabUrl()
    {
        return "g=modules&n=expenses&m=module_Finance#tabSubordinateMedicals";
    }

    public function getModuleApprovalTabUrl()
    {
        return "g=modules&n=expenses&m=module_Finance#tabEmployeeExpenseApproval";
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
