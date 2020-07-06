<?php

$moduleName = 'performance';
$moduleGroup = 'modules';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
$additionalJs = array();
include APP_BASE_PATH.'modulejslibs.inc.php';


$options = array();
$options['setRemoteTable'] = 'false';
$options['setShowAddNew'] = 'false';

$moduleBuilder = new \Classes\ModuleBuilder\ModuleBuilder();
$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
    'PerformanceReview','PerformanceReview','Self Assessments','PerformanceReviewAdapter','','',true, $options
));

$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
    'CoordinatedPerformanceReview','CoordinatedPerformanceReview','Performance Reviews Coordinated by Me','CoordinatedPerformanceReviewAdapter','','',false, $options
));

$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
    'ReviewFeedback','ReviewFeedback','Provide Feedback','ReviewFeedbackAdapter','','',false, $options
));

echo \Classes\UIManager::getInstance()->renderModule($moduleBuilder);

include APP_BASE_PATH.'footer.php';
