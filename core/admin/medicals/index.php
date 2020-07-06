<?php
$moduleName = 'Medicals';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';
$user = \Classes\BaseService::getInstance()->getCurrentUser();
?><div class="span9">

	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
		<li class="active"><a id="tabStaffMedical" href="#tabPageStaffMedical"><?=t('Staff Records')?></a></li>
		<li class=""><a id="tabDependantMedical" href="#tabPageDependantMedical"><?=t('Dependent Records')?></a></li>
        
    </ul>
 
	<div class="tab-content">
		<div class="tab-pane active" id="tabPageStaffMedical">
			<div id="StaffMedical" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="StaffMedicalForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>

		<div class="tab-pane" id="tabPageDependantMedical">
			<div id="DependantMedical" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="DependantMedicalForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		
	</div>

</div>
<script>
var modJsList = new Array();

modJsList['tabStaffMedical'] = new StaffMedicalAdapter('StaffMedical','StaffMedical');
modJsList['tabStaffMedical'].setRemoteTable(true);
modJsList['tabDependantMedical'] = new DependantMedicalAdapter('DependantMedical','DependantMedical');
modJsList['tabDependantMedical'].setRemoteTable(true);

var modJs = modJsList['tabStaffMedical'];

</script>
<?php include APP_BASE_PATH.'footer.php';?>
