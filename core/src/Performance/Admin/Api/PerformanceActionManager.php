<?php
/**
 * Created by PhpStorm.
 * User: dev
 * Date: 8/10/18
 * Time: 8:31 AM
 */

namespace Performance\Admin\Api;

use Classes\BaseService;
use Classes\FileService;
use Classes\IceResponse;
use Classes\SubActionManager;
use Performance\Common\Model\PerformanceReview;
use Performance\Common\Model\ReviewFeedback;
use Performance\Common\Model\ReviewTemplate;

class PerformanceActionManager extends SubActionManager
{
    public function getFormData($req)
    {
        $performanceReview = new PerformanceReview();
        $performanceReview->Load("id = ?", array($req->id));

        $cfs = BaseService::getInstance()->customFieldManager->getCustomFields(
            'PerformanceReview',
            $performanceReview->id
        );
        foreach ($cfs as $cf) {
            $key = $cf->name;
            $val = $cf->value;
            $performanceReview->$key = $val;
        }

        $data = $performanceReview;

        $form = new ReviewTemplate();
        $form->Load("id = ?", array($performanceReview->form));
        if (empty($form->id)) {
            return new IceResponse(IceResponse::ERROR, "Review Template not Found");
        }

        $res = array();
        $res['form'] = $form;
        $res['data'] = $data;

        return new IceResponse(IceResponse::SUCCESS, $res);
    }

    public function getFormDataFeedback($req)
    {
        $review = new ReviewFeedback();
        $review->Load("id = ?", array($req->id));

        $cfs = BaseService::getInstance()->customFieldManager->getCustomFields(
            'ReviewFeedback',
            $review->id
        );
        foreach ($cfs as $cf) {
            $key = $cf->name;
            $val = $cf->value;
            $review->$key = $val;
        }

        $data = $review;

        $form = new ReviewTemplate();
        $form->Load("id = ?", array($review->form));
        if (empty($form->id)) {
            return new IceResponse(IceResponse::ERROR, "Review Template not Found");
        }

        $res = array();
        $res['form'] = $form;
        $res['data'] = $data;

        return new IceResponse(IceResponse::SUCCESS, $res);
    }


    public function viewFullPerformanceReview($req, $checkPermissions = true)
    {
        $map = '{"employee":["Employee","id","first_name+last_name"]'
            .',"coordinator":["Employee","id","first_name+last_name"]}';
        $user = BaseService::getInstance()->getCurrentUser();
        $performanceReview = BaseService::getInstance()->getElement(
            'PerformanceReview',
            $req->id,
            $map
        );

        $reviewEmployee = $this->baseService->getElement(
            'Employee',
            $performanceReview->employee,
            null,
            true
        );

        $isAdmin = $user->user_level === 'Admin';
        $isSubordinate = $reviewEmployee->supervisor === $user->employee;

        if ($checkPermissions && !$isAdmin && !$isSubordinate && $user->employee != $performanceReview->coordinator) {
            return new IceResponse(IceResponse::ERROR, "You do not have permissions to view review summary");
        }

        $cfs = BaseService::getInstance()->customFieldManager->getCustomFields(
            'PerformanceReview',
            $performanceReview->id
        );
        foreach ($cfs as $cf) {
            $key = $cf->name;
            $val = $cf->value;
            $performanceReview->$key = $val;
        }


        $performanceReviewTemplate = new ReviewTemplate();
        $performanceReviewTemplate->Load('id = ?', array($performanceReview->form));

        if ($performanceReviewTemplate->id != $performanceReview->form) {
            return new IceResponse(IceResponse::ERROR, "Review Template not Found");
        }

        $performanceReview->questions = $this->createQuestionnaire($performanceReview, $performanceReviewTemplate);

        $profile = new \stdClass();
        $profile->id = $performanceReview->employee;
        $profile = FileService::getInstance()->updateProfileImage($profile);
        $performanceReview->image = $profile->image;

        if (!empty($performanceReview->notes)) {
            $performanceReview->notes = json_decode($performanceReview->notes, true);
        } else {
            $performanceReview->notes = [];
        }

        $feedback = new ReviewFeedback();
        $feedbacks = $feedback->Find('review = ? and status = ?', array($performanceReview->id, 'Submitted'));
        $enrichedFeedbacks = [];
        foreach ($feedbacks as $feedback) {
            $feedback = BaseService::getInstance()->getElement(
                'ReviewFeedback',
                $feedback->id,
                '{"employee":["Employee","id","first_name+last_name"]}'
            );

            $reviewTemplate = new ReviewTemplate();
            $reviewTemplate->Load('id = ?', array($feedback->form));

            $cfs = BaseService::getInstance()->customFieldManager->getCustomFields(
                'ReviewFeedback',
                $feedback->id
            );
            foreach ($cfs as $cf) {
                $key = $cf->name;
                $val = $cf->value;
                $feedback->$key = $val;
            }

            $feedback->questions = $this->createQuestionnaire($feedback, $reviewTemplate);
            $enrichedFeedbacks[] = $feedback;
        }

        return new IceResponse(IceResponse::SUCCESS, [$performanceReview, $enrichedFeedbacks]);
    }


    protected function createQuestionnaire($data, $template)
    {
        $fields = json_decode($template->items);
        $questions = [];
        foreach ($fields as $field) {
            $value = '';
            switch ($field->field_type) {
                case 'date':
                    $value = date('Y-m-d', strtotime($data->{$field->name}));
                    break;
                case 'datetime':
                    $value = date('Y-m-d H:i', strtotime($data->{$field->name}));
                    break;
                default:
                    $value = $data->{$field->name};
            }
            $questions[$field->field_label] = $value;
        }

        return $questions;
    }
}
