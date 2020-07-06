<?php
namespace Performance\Common\Model;

use Model\BaseModel;

class ReviewTemplate extends BaseModel
{
    public $table = 'ReviewTemplates';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getManagerAccess()
    {
        return array("get","element","save");
    }

    public function getUserAccess()
    {
        return array();
    }

    public function getAnonymousAccess()
    {
        return array();
    }
}
