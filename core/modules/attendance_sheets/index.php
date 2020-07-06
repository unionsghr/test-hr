<?php
/*
 Copyright (c) 2018 [Glacies UG, Berlin, Germany] (http://glacies.de)
 Developer: Thilina Hasantha (http://lk.linkedin.com/in/thilinah | https://github.com/thilinah)
 */

$moduleName = 'attendance_sheets';
$moduleGroup = 'modules';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';

$eid = \Classes\BaseService::getInstance()->getCurrentProfileId();
$mapping = '{"nationality":["Nationality","id","name"],"employment_status":["EmploymentStatus","id","name"],"job_title":["JobTitle","id","name"],"pay_grade":["PayGrade","id","name"],"country":["Country","code","name"],"province":["Province","id","name"],"department":["CompanyStructure","id","title"],"supervisor":["Employee","id","first_name+middle_name+last_name"]}';

$employeeEnriched = \Classes\BaseService::getInstance()->getElement('Employee',$eid,$mapping,true);
$employeeEnriched = \Classes\BaseService::getInstance()->cleanUpAdoDB($employeeEnriched);


$moduleSettings = array();
$moduleSettings['overtimeCalculationPeriod'] = \Classes\SettingsManager::getInstance()->getSetting(
	'Attendance: Overtime Calculation Period'
);
$moduleSettings['overtimeStartHour'] = \Classes\SettingsManager::getInstance()->getSetting(
	'Attendance: Overtime Start Hour'
);
$moduleSettings['employee'] = $employeeEnriched;

?>
<div class="span9">

	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
		<li class="active"><a id="tabEmployeeTimeSheetAll" href="#tabPageEmployeeTimeSheetAll"><?=t('All My Attendance Sheets')?></a></li>
		<li class=""><a id="tabEmployeeTimeSheetApproved" href="#tabPageEmployeeTimeSheetApproved"><?=t('Approved Attendance Sheets')?></a></li>
		<li class=""><a id="tabEmployeeTimeSheetPending" href="#tabPageEmployeeTimeSheetPending"><?=t('Pending Attendance Sheets')?></a></li>
		<li class=""><a id="tabSubEmployeeTimeSheetAll" href="#tabPageSubEmployeeTimeSheetAll"><?=t('Subordinate Attendance Sheets')?></a></li>
	</ul>

	<div class="tab-content">
		<div class="tab-pane active" id="tabPageEmployeeTimeSheetAll">
			<div id="EmployeeTimeSheetAll" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="EmployeeTimeSheetAllForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageEmployeeTimeSheetApproved">
			<div id="EmployeeTimeSheetApproved" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="EmployeeTimeSheetApprovedForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageEmployeeTimeSheetPending">
			<div id="EmployeeTimeSheetPending" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="EmployeeTimeSheetPendingForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageSubEmployeeTimeSheetAll">
			<div id="SubEmployeeTimeSheetAll" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="SubEmployeeTimeSheetAllForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
	</div>

</div>
<script>
var modJsList = new Array();

modJsList['tabEmployeeTimeSheetAll'] = new EmployeeTimeSheetAdapter('EmployeeAttendanceSheet','EmployeeTimeSheetAll','','date_start desc');
modJsList['tabEmployeeTimeSheetAll'].setShowAddNew(false);
modJsList['tabEmployeeTimeSheetAll'].setRemoteTable(true);
modJsList['tabEmployeeTimeSheetAll'].setSettings(<?=json_encode($moduleSettings)?>);

modJsList['tabEmployeeTimeSheetApproved'] = new EmployeeTimeSheetAdapter('EmployeeAttendanceSheet','EmployeeTimeSheetApproved',{"status":"Approved"});
modJsList['tabEmployeeTimeSheetApproved'].setShowAddNew(false);
modJsList['tabEmployeeTimeSheetApproved'].setRemoteTable(true);
modJsList['tabEmployeeTimeSheetApproved'].setSettings(<?=json_encode($moduleSettings)?>);

modJsList['tabEmployeeTimeSheetPending'] = new EmployeeTimeSheetAdapter('EmployeeAttendanceSheet','EmployeeTimeSheetPending',{"status":"Pending"});
modJsList['tabEmployeeTimeSheetPending'].setShowAddNew(false);
modJsList['tabEmployeeTimeSheetPending'].setRemoteTable(true);
modJsList['tabEmployeeTimeSheetPending'].setSettings(<?=json_encode($moduleSettings)?>);

modJsList['tabSubEmployeeTimeSheetAll'] = new SubEmployeeTimeSheetAdapter('EmployeeAttendanceSheet','SubEmployeeTimeSheetAll','','date_start desc');
modJsList['tabSubEmployeeTimeSheetAll'].setShowAddNew(false);
modJsList['tabSubEmployeeTimeSheetAll'].setRemoteTable(true);
modJsList['tabSubEmployeeTimeSheetAll'].setSettings(<?=json_encode($moduleSettings)?>);

modJsList['tabEmployeeTimeEntry'] = new EmployeeTimeEntryAdapter('Attendance','Attendance','','');
modJsList['tabEmployeeTimeEntry'].setShowAddNew(false);
modJsList['tabEmployeeTimeEntry'].setAllProjectsAllowed(<?=$allowAllProjects?>);
modJsList['tabEmployeeTimeEntry'].setEmployeeProjects(<?=json_encode($employeeProjects)?>);
modJsList['tabEmployeeTimeEntry'].setSettings(<?=json_encode($moduleSettings)?>);


var modJs = modJsList['tabEmployeeTimeSheetAll'];

</script>
<div class="modal" id="TimeSheetStatusModel" tabindex="-1" role="dialog" aria-labelledby="messageModelLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><li class="fa fa-times"/></button>
		<h3 style="font-size: 17px;">Change Timesheet Status</h3>
	</div>
	<div class="modal-body">
		<form id="TimeSheetStatusForm">
		<div class="control-group">
			<label class="control-label" for="timesheet_status">Timesheet Status</label>
			<div class="controls">
			  	<select class="" type="text" id="timesheet_status" name="timesheet_status">
				  	<option value="Approved">Approved</option>
				  	<option value="Pending">Pending</option>
				  	<option value="Rejected">Rejected</option>
				  	<option value="Submitted">Submitted</option>
			  	</select>
			</div>
		</div>
		</form>
	</div>
	<div class="modal-footer">
 		<button class="btn btn-primary" onclick="modJs.changeTimeSheetStatus();">Change Status</button>
 		<button class="btn" onclick="modJs.closeTimeSheetStatus();">Not Now</button>
	</div>
</div>
</div>
</div>


<?php include APP_BASE_PATH.'footer.php';?>
