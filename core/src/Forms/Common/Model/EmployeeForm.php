<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:37 PM
 */

namespace Forms\Common\Model;

use Classes\BaseService;
use Classes\IceResponse;
use Model\BaseModel;

class EmployeeForm extends BaseModel
{

    public $table = 'EmployeeForms';

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
        return array("element","save","delete");
    }

    public function executePreSaveActions($obj)
    {
        $currentEmpId = BaseService::getInstance()->getCurrentProfileId();

        $cemployee = BaseService::getInstance()->getElement('Employee', $currentEmpId, null, true);
        $employee = BaseService::getInstance()->getElement('Employee', $obj->employee, null, true);

        //Send a notification to employee
        $notificationMsg = "A new HR form has been assigned to you by ".$cemployee->first_name
            . " " . $cemployee->last_name.". Please fill the form";
        $moduleUrl = 'g=modules&n=forms&m=module_Documents';
        BaseService::getInstance()->notificationManager->addNotification(
            $employee->id,
            $notificationMsg,
            '{"type":"url","url":"'.$moduleUrl.'"}',
            'HR Forms',
            null,
            false,
            false
        );

        return new IceResponse(IceResponse::SUCCESS, $obj);
    }

    public function executePreUpdateActions($obj)
    {
        $currentEmpId = BaseService::getInstance()->getCurrentProfileId();
        $lastForm = new EmployeeForm();
        $lastForm->Load("id = ?", array($obj->id));

        if ($lastForm->status == 'Pending' && $obj->status == 'Completed') {
            $employee = BaseService::getInstance()->getElement('Employee', $obj->employee, null, true);
            if (!empty($employee->supervisor) && $employee->id == $currentEmpId) {
                $notificationMsg = "A HR form has been filled and completed by ".$employee->first_name
                    . " " . $employee->last_name.". Please review";
                $moduleUrl = 'g=admin&n=forms&m=admin_Admin#tabEmployeeForm';
                BaseService::getInstance()->notificationManager->addNotification(
                    $employee->supervisor,
                    $notificationMsg,
                    '{"type":"url","url":"'.$moduleUrl.'"}',
                    'HR Forms',
                    null,
                    false,
                    false
                );
            }
        }

        return new IceResponse(IceResponse::SUCCESS, $obj);
    }
}
