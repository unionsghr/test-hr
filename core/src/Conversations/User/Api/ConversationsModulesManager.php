<?php
namespace Conversations\User\Api;

use Classes\AbstractModuleManager;

class ConversationsModulesManager extends AbstractModuleManager
{

    public function initializeUserClasses()
    {
    }

    public function initializeFieldMappings()
    {
    }

    public function initializeDatabaseErrorMappings()
    {
    }

    public function setupModuleClassDefinitions()
    {
        $this->addModelClass("Conversation");
        $this->addModelClass("ConversationUserStatus");
    }
}
