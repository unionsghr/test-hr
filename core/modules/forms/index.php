<?php
/*
 Copyright (c) 2018 [Glacies UG, Berlin, Germany] (http://glacies.de)
 Developer: Thilina Hasantha (http://lk.linkedin.com/in/thilinah | https://github.com/thilinah)
 */

$moduleName = 'forms';
$moduleGroup = 'modules';
define('MODULE_PATH',dirname(__FILE__));

include APP_BASE_PATH.'header.php';
$additionalJs = array();

include APP_BASE_PATH.'modulejslibs.inc.php';


$options = array();
$options['setRemoteTable'] = 'true';
$options['setShowAddNew'] = 'false';

$moduleBuilder = new \Classes\ModuleBuilder\ModuleBuilder();
$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
	'EmployeeForm','EmployeeForm','My Forms','EmployeeFormAdapter','{"status": "Approved"}','',true,$options
));
echo \Classes\UIManager::getInstance()->renderModule($moduleBuilder);


?>
<?php
include APP_BASE_PATH.'footer.php';
