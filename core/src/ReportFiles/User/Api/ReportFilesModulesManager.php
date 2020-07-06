<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 6:23 PM
 */

namespace ReportFiles\User\Api;

use Classes\AbstractModuleManager;

class ReportFilesModulesManager extends AbstractModuleManager
{

    public function initializeUserClasses()
    {
        if (defined('MODULE_TYPE') && MODULE_TYPE != 'admin') {
            $this->addUserClass("ReportFile");
        }
    }

    public function initializeFieldMappings()
    {
        $this->addFileFieldMapping('ReportFile', 'attachment', 'name');
    }

    public function initializeDatabaseErrorMappings()
    {
    }

    public function setupModuleClassDefinitions()
    {
    }
}
