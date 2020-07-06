<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 8/11/18
 * Time: 7:59 AM
 */

namespace Performance\Common\Model;

use Classes\BaseService;

class CoordinatedPerformanceReview extends PerformanceReview
{

    public function getUserAccess()
    {
        $course = new PerformanceReview();
        $course->Load('id = ?', array($this->course));

        if ($this->coordinator === BaseService::getInstance()->getCurrentUser()->id) {
            return array("get","element","save");
        }
        return array("get","element");
    }

    // @codingStandardsIgnoreStart
    public function Find($whereOrderBy, $bindarr = false, $pkeysArr = false, $extra = array())
    {
        // @codingStandardsIgnoreEnd
        $profileId = BaseService::getInstance()->getCurrentProfileId();
        $review = new PerformanceReview();
        $reviews = $review->Find("coordinator = ?", array($profileId));

        return $reviews;
    }
}
