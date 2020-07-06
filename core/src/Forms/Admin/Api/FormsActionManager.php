<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:36 PM
 */

namespace Forms\Admin\Api;

use Classes\BaseService;
use Classes\IceResponse;
use Classes\SubActionManager;
use Forms\Common\Model\EmployeeForm;
use Forms\Common\Model\Form;

class FormsActionManager extends SubActionManager
{
    public function getFormData($req)
    {
        $empForm = new EmployeeForm();
        $empForm->Load("id = ?", array($req->id));

        $cfs = BaseService::getInstance()->customFieldManager->getCustomFields(
            'EmployeeForm',
            $empForm->id
        );
        foreach ($cfs as $cf) {
            $key = $cf->name;
            $val = $cf->value;
            $empForm->$key = $val;
        }

        $data = $empForm;

        $form = new Form();
        $form->Load("id = ?", array($empForm->form));
        if (empty($form->id)) {
            return new IceResponse(IceResponse::ERROR, "Form Definition not Found");
        }

        $res = array();
        $res['form'] = $form;
        $res['data'] = $data;

        return new IceResponse(IceResponse::SUCCESS, $res);
    }
}
