<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:49 PM
 */

namespace JobPositions\Common\Model;

use Candidates\Common\Model\Application;
use Classes\IceResponse;
use Model\BaseModel;
use Utils\SessionUtils;

/**
 * Class Job
 * @package JobPositions\Common\Model
 *
 * @property $id;
 * @property $title;
 */
class Job extends BaseModel
{

    public $table = 'Job';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getManagerAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }

    public function getAnonymousAccess()
    {
        return array("get","element");
    }

    public function executePreSaveActions($obj)
    {
        $user = SessionUtils::getSessionObject('user');
        $obj->postedBy = $user->id;
        return new IceResponse(IceResponse::SUCCESS, $obj);
    }

    public function getAppliedJobs($params)
    {
        $application = new Application();
        $applications = $application->Find("candidate = ?", array($params[0]));
        $jobs = array();
        foreach ($applications as $app) {
            $job = new Job();
            $job->Load("id = ?", array($app->job));
            $jobs[] = $job;
        }
        return $jobs;
    }

    public function fieldValueMethods()
    {
        return ['getAppliedJobs'];
    }
}
