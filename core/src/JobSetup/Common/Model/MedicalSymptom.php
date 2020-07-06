<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 1:03 PM
 */

namespace JobSetup\Common\Model;

use Model\BaseModel;

class MedicalSymptom extends BaseModel
{
    public $table = 'MedicalSymptom';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }
}
