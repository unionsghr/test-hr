<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 8/16/18
 * Time: 7:42 AM
 */

namespace Performance\User\Api;

use Classes\BaseService;
use Classes\IceResponse;
use Classes\SubActionManager;

class PerformanceActionManager extends SubActionManager
{
    public function viewFullPerformanceReview($req)
    {

        $employeeId = BaseService::getInstance()->getCurrentUserProfileId();
        $performanceReview = BaseService::getInstance()->getElement('PerformanceReview', $req->id);

        if ($performanceReview->employee != $employeeId) {
            return new IceResponse(IceResponse::ERROR, "You do not have permissions to view review summary");
        }

        $adminActionManager = new \Performance\Admin\Api\PerformanceActionManager();
        $adminActionManager->setUser(BaseService::getInstance()->user);
        $adminActionManager->setBaseService(BaseService::getInstance());
        $adminActionManager->setEmailSender(BaseService::getInstance()->getEmailSender());

        $response = $adminActionManager->viewFullPerformanceReview($req, false);
        $data = $response->getData();

        return new IceResponse(IceResponse::SUCCESS, [$data[0], []]);
    }
}
