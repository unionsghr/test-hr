<?php

namespace Performance\Admin\Api;

use Classes\AbstractModuleManager;

class PerformanceAdminManager extends AbstractModuleManager
{
    public function initializeUserClasses()
    {
        if (defined('MODULE_TYPE') && MODULE_TYPE != 'admin') {
            $this->addUserClass("PerformanceReview");
            $this->addUserClass("ReviewFeedback");
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
        $this->addModelClass('PerformanceReview');
        $this->addModelClass('ReviewFeedback');
        $this->addModelClass('ReviewTemplate');
        $this->addModelClass('CoordinatedPerformanceReview');
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
