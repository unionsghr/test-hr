<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:54 PM
 */

namespace Jobs\Admin\Api;

use Classes\AbstractModuleManager;
use Company\Common\Model\CompanyStructure;

class JobsAdminManager extends AbstractModuleManager
{

    public function initializeUserClasses()
    {
    }

    public function initializeFieldMappings()
    {
    }

    public function initializeDatabaseErrorMappings()
    {

        $this->addDatabaseErrorMapping(
            "CONSTRAINT `Fk_Employee_CompanyStructures` FOREIGN KEY (`department`) 
            REFERENCES `CompanyStructures` (`id`)",
            "Can not delete a company structure while employees are assigned to it"
        );
        $this->addDatabaseErrorMapping(
            "CONSTRAINT `Fk_CompanyStructures_Own` FOREIGN KEY (`parent`) REFERENCES ",
            "Can not delete a parent structure"
        );
    }

    public function setupModuleClassDefinitions()
    {

        $this->addModelClass('JobTitle');
        $this->addModelClass('PayGrade');
        $this->addModelClass('Notches');
        $this->addModelClass('AnnualRent');
        $this->addModelClass('NotchMovement');
        $this->addModelClass('EmployeeSeverance');
        $this->addModelClass('StaffSeverance');
        $this->addModelClass('StaffInfraction');

        //$this->addModelClass('CompanyStructure');
    }
}
