<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 5:38 AM
 */

namespace Candidates\Common\Model;

use Model\BaseModel;

class Application extends BaseModel
{
    public $table = 'Applications';

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
        return array();
    }

    public function getUserOnlyMeAccess()
    {
        return array("element");
    }
}
