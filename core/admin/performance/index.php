<?php

$moduleName = 'performance';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';

$options = array();
$options['setRemoteTable'] = 'true';
$options['setShowAddNew'] = 'true';

$moduleBuilder = new \Classes\ModuleBuilder\ModuleBuilder();
$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
    'PerformanceReview','PerformanceReview','Performance Reviews','PerformanceReviewAdminAdapter','','',true, $options
));

$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
    'ReviewFeedback','ReviewFeedback','Review Feedback','ReviewFeedbackAdminAdapter','','',false, $options
));

$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
    'ReviewTemplate','ReviewTemplate','Review Template','ReviewTemplateAdapter','','',false, $options
));

echo \Classes\UIManager::getInstance()->renderModule($moduleBuilder);

include APP_BASE_PATH.'footer.php';
