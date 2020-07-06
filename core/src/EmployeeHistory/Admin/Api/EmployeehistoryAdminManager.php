<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:02 PM
 */

namespace EmployeeHistory\Admin\Api;

use Classes\AbstractModuleManager;
use Classes\BaseService;
use Classes\HistoryManager;

class EmployeehistoryAdminManager extends AbstractModuleManager implements HistoryManager
{

    public function initializeUserClasses()
    {
        BaseService::getInstance()->setupHistoryManager('Employee', $this);
    }

    public function initializeFieldMappings()
    {
    }

    public function initializeDatabaseErrorMappings()
    {
    }

    public function setupModuleClassDefinitions()
    {
        $this->addModelClass('EmployeeDataHistory');
    }

    public function addHistory($type, $employeeId, $field, $oldValue, $newValue)
    {

        $this->addHistoryGeneric($type, 'EmployeeDataHistory', 'employee', $employeeId, $field, $oldValue, $newValue);
    }
}
