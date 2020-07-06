<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:50 PM
 */

namespace JobPositions\Admin\Api;

use Classes\AbstractModuleManager;
use JobPositions\Common\Model\Job;

class JobPositionsAdminManager extends AbstractModuleManager
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

        $this->addModelClass('Job');
    }

    public function getDashboardItemData()
    {
        $data = array();
        $job = new Job();
        $data['numberOfJobs'] = $job->Count("status = 'Active'");
        return $data;
    }
}
