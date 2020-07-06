<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 1:03 PM
 */

namespace JobSetup\Common\Model;

use Model\BaseModel;

class MedicalCondition extends BaseModel
{
    public $table = 'MedicalCondition';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }
}
