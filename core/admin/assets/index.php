<?php
 
$moduleName = 'assets';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';

$customFields = \Classes\BaseService::getInstance()->getCustomFields("CompanyAsset");

$companyAssetOptions = [];
$companyAssetOptions['setRemoteTable'] = 'true';
$companyAssetOptions['setCustomFields'] = json_encode($customFields);


$moduleBuilder = new \Classes\ModuleBuilder\ModuleBuilder();
$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
    'AssetType','AssetType','Asset Types','AssetTypeAdapter','','',true
));

$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
    'CompanyAsset','CompanyAsset','Company Assets','CompanyAssetAdapter','','',false, $companyAssetOptions
));

if ($user->user_level === 'Admin') {
    $assetCustomFieldOptions = [];
    $assetCustomFieldOptions['setRemoteTable'] = 'true';
    $assetCustomFieldOptions['setTableType'] = '\'CompanyAsset\'';

    $moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
        'AssetCustomField',
        'CustomField',
        'Custom Fields',
        'CustomFieldAdapter',
        '{"type":"CompanyAsset"}',
        '',
        false,
        $assetCustomFieldOptions
    ));
}

echo \Classes\UIManager::getInstance()->renderModule($moduleBuilder);

include APP_BASE_PATH.'footer.php';
