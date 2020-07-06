<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 1:00 PM
 */

namespace JobSetup\Common\Model;

use Model\BaseModel;

class Industry extends BaseModel
{
    public $table = 'Industry';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getUserAccess()
    {
        return array('get');
    }

    public function getAnonymousAccess()
    {
        return $this->getUserAccess();
    }
}
