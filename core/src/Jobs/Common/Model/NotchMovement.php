<?php

namespace Jobs\Common\Model;

use Model\BaseModel;
use Classes\IceResponse;
use Employees\Common\Model\Employee;
//use Model\BaseModel;

class NotchMovement extends BaseModel
{
    public $table = 'NotchMovement';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
        }

         public function getUserAccess (){

            return array("get","element");

        }



        public function validateSave($obj)
        {
        if ($obj->id == $obj->parent && !empty($obj->parent)) {
            return new IceResponse(
                IceResponse::ERROR,
                "A Company structure unit can not be the parent of the same unit"
            );
        }

        $heads = json_decode($obj->heads);
        foreach ($heads as $head) {
            $employee = new Employee();
            $employee->Load('id = ?', array($head));
            if (!empty($obj->id) && $employee->department != $obj->id) {
                $companyStructure = new CompanyStructure();
                $companyStructure->Load("id = ?", array($employee->department));

                return new IceResponse(
                    IceResponse::ERROR,
                    "An employee who is not attached to a company structure can not be the 
                    head of the company structure. ".
                    "Please remove ".$employee->first_name.' '.$employee->last_name
                    ." from list of heads as this person is attached to ".
                    $companyStructure->title
                );
            }
        }

        return new IceResponse(IceResponse::SUCCESS, "");
    }

    public static function getAllChildCompanyStructures($companyStructureId)
    {
        $structures = array();
        $companyStructure = new CompanyStructure();
        $companyStructure->Load("id = ?", array($companyStructureId));

        if ($companyStructure->id != $companyStructureId || empty($companyStructure->id)) {
            return new IceResponse(IceResponse::ERROR, array());
        }

        self::getChildCompanyStructures($companyStructure, $structures);

        $structures[$companyStructure->id] = $companyStructure;

        return new IceResponse(IceResponse::SUCCESS, array_values($structures));
    }




    
}
