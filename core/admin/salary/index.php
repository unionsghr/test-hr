<?php

$moduleName = 'salary';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';

$moduleBuilder = new \Classes\ModuleBuilder\ModuleBuilder();

$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
	'SalaryComponentType','SalaryComponentType','Salary Component Types','SalaryComponentTypeAdapter','','',true
));
$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
	'SalaryComponent','SalaryComponent','Salary Components','SalaryComponentAdapter','',''
));
$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
	'EmployeeSalary','EmployeeSalary','Employee Salary Components','EmployeeSalaryAdapter','','',false,array("setRemoteTable"=>"true"))
);
$moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
	'Salaries','Salaries','Staff Salaries Entry','SalariesAdapter','',''
));
// $moduleBuilder->addModuleOrGroup(new \Classes\ModuleBuilder\ModuleTab(
// 	'Contract','Contract','Contract Staff (Salaries) Entry','ContractAdapter','',''
// ));


echo \Classes\UIManager::getInstance()->renderModule($moduleBuilder);

include APP_BASE_PATH.'footer.php';
