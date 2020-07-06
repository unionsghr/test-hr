<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 1:04 PM
 */

namespace JobSetup\Admin\Api;

use Classes\AbstractModuleManager;
use JobPositions\Common\Model\Job;

class JobSetupAdminManager extends AbstractModuleManager
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
        $this->addModelClass('EmployementType');
        $this->addModelClass('Industry');
        $this->addModelClass('ExperienceLevel');
        $this->addModelClass('JobFunction');
        $this->addModelClass('EducationLevel');
        $this->addModelClass('Benifit');
        $this->addModelClass('MedicalCondition');
        $this->addModelClass('MedicalSymptom');
    }

    public function getDashboardItemData()
    {
        $data = array();
        $job = new Job();
        $data['numberOfJobs'] = $job->Count("status = 'Active'");
        return $data;
    }
}
