<?php
/*
 Copyright (c) 2018 [Glacies UG, Berlin, Germany] (http://glacies.de)
 Developer: Thilina Hasantha (http://lk.linkedin.com/in/thilinah | https://github.com/thilinah)
 */

$moduleName = 'imprest';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';

$customFields = \Classes\BaseService::getInstance()->getCustomFields("EmployeeTravelRecord");

$travelRequestOptions = [];
$travelRequestOptions['setRemoteTable'] = 'true';
$travelRequestOptions['setCustomFields'] = json_encode($customFields);



$moduleBuilder = new \Classes\ModuleBuilder\ModuleBuilder();

$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
	'EmployeeTravelRecord',
	'EmployeeTravelRecord',
	'Imprest Requests',
	'EmployeeTravelRecordAdminAdapter',
	'',
	'',
	true,
    $travelRequestOptions
));

if ($user->user_level === 'Admin') {
    $travelCustomFieldOptions = [];
    $travelCustomFieldOptions['setRemoteTable'] = 'true';
    $travelCustomFieldOptions['setTableType'] = '\'EmployeeTravelRecord\'';

    $moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
        'TravelCustomField',
        'CustomField',
        'Custom Fields',
        'CustomFieldAdapter',
        '{"type":"EmployeeTravelRecord"}',
        '',
        false,
        $travelCustomFieldOptions
    ));
}

echo \Classes\UIManager::getInstance()->renderModule($moduleBuilder);


$itemName = 'TravelRequest';
$moduleName = 'Imprest Management';
$itemNameLower = strtolower($itemName);


include APP_BASE_PATH.'footer.php';
