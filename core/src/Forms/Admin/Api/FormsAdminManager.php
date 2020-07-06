<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:39 PM
 */

namespace Forms\Admin\Api;

use Classes\AbstractModuleManager;

class FormsAdminManager extends AbstractModuleManager
{

    public function initializeUserClasses()
    {
        if (defined('MODULE_TYPE') && MODULE_TYPE != 'admin') {
            $this->addUserClass("EmployeeForm");
        }
    }

    public function initializeFieldMappings()
    {
    }

    public function initializeDatabaseErrorMappings()
    {
    }

    public function setupModuleClassDefinitions()
    {

        $this->addModelClass('Form');
        $this->addModelClass('EmployeeForm');
    }
}
