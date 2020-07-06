<?php
namespace Asset\Common\Model;

use Model\BaseModel;

class AssetType extends BaseModel
{
    public $table = 'AssetTypes';

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
