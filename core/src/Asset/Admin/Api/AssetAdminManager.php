<?php
namespace Asset\Admin\Api;

use Classes\AbstractModuleManager;

class AssetAdminManager extends AbstractModuleManager
{
    public function initializeUserClasses()
    {
    }

    public function initializeFieldMappings()
    {
    }

    public function initializeDatabaseErrorMappings()
    {
    }

    public function setupModuleClassDefinitions()
    {
        $this->addModelClass('AssetType');
        $this->addModelClass('CompanyAsset');
    }

    public function setupRestEndPoints()
    {
    }

    public function getDashboardItemData()
    {
    }

    public function initQuickAccessMenu()
    {
    }

    public function initCalculationHooks()
    {
    }
}
