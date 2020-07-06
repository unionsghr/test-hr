<?php
namespace Candidates\Admin\Api;

use Candidates\Common\Model\Candidate;
use Candidates\Rest\CandidateRestEndPoint;
use Classes\AbstractModuleManager;
use Classes\UIManager;

class CandidatesAdminManager extends AbstractModuleManager
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
            "Duplicate entry|for key 'job'",
            "This candidate has already applied for the job"
        );
    }

    public function setupModuleClassDefinitions()
    {
        $this->addModelClass('Candidate');
        $this->addModelClass('Application');
        $this->addModelClass('Interview');
        $this->addModelClass('Call');
        $this->addModelClass('HiringPipeline');
    }

    public function setupRestEndPoints()
    {

        \Classes\Macaw::get(REST_API_PATH.'candidate/(:any)', function ($pathParams) {
            $candidateRestEndPoint = new CandidateRestEndPoint();
            $candidateRestEndPoint->process('get', $pathParams);
        });
    }

    public function getDashboardItemData()
    {
        $data = array();
        $candidate = new Candidate();
        $data['numberOfCandidates'] = $candidate->Count("1 = 1");
        return $data;
    }

    public function initQuickAccessMenu()
    {
        UIManager::getInstance()->addQuickAccessMenuItem(
            "Candidates",
            "fa-users",
            CLIENT_BASE_URL."?g=admin&n=candidates&m=admin_Recruitment",
            array("Admin","Manager")
        );
    }
}
