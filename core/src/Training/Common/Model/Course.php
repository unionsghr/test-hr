<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/20/17
 * Time: 7:44 AM
 */

namespace Training\Common\Model;

use Model\BaseModel;

class Course extends BaseModel
{
    public $table = 'Courses';

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
        return array("get", "element");
    }
}
