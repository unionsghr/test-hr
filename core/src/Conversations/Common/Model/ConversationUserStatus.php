<?php
namespace Conversations\Common\Model;

use Model\BaseModel;

class ConversationUserStatus extends BaseModel
{
    public $table = 'ConversationUserStatus';

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }
}
