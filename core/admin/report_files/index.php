<?php

$moduleName = 'report_files';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';

$moduleBuilder = new \Classes\ModuleBuilder\ModuleBuilder();

$options = array();
$options['setRemoteTable'] = 'true';
$options['setShowAddNew'] = 'false';

$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
	'ReportFile','ReportFile','Report Files','ReportFileAdapter','','id desc',true, $options
));


echo \Classes\UIManager::getInstance()->renderModule($moduleBuilder);

include APP_BASE_PATH.'footer.php';
