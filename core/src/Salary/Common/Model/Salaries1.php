<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 11:11 PM
 */
 
namespace Salary\Common\Model;

use Model\BaseModel;

class Salaries1 extends BaseModel
{
    public $table = 'salaries1';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getManagerAccess()
    {
        return array();
    }

    public function getUserAccess()
    {
        return array();
    }

    public function getUserOnlyMeAccess()
    {
        return array("get", "element");
    }

    public function getUserOnlyMeSwitchedAccess()
    {
        return array();
    }
}
