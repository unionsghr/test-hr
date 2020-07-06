<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 1:02 PM
 */

namespace JobSetup\Common\Model;

use Model\BaseModel;

class EducationLevel extends BaseModel
{
    public $table = 'EducationLevel';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array();
    }
}
