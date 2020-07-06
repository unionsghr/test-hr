<?php
$moduleName = 'training';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';
$user = \Classes\BaseService::getInstance()->getCurrentUser();
?><div class="span9">

	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
		<li class="active"><a id="tabCourse" href="#tabPageCourse"><?=t('Courses')?></a></li>
		<li class=""><a id="tabTrainingSession" href="#tabPageTrainingSession"><?=t('Training Sessions')?></a></li>
        <li class=""><a id="tabEmployeeTrainingSession" href="#tabPageEmployeeTrainingSession"><?=t('Employee Training Sessions')?></a></li>
    </ul>

	<div class="tab-content">
		<div class="tab-pane active" id="tabPageCourse">
			<div id="Course" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="CourseForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageTrainingSession">
			<div id="TrainingSession" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="TrainingSessionForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageEmployeeTrainingSession">
			<div id="EmployeeTrainingSession" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="EmployeeTrainingSessionForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
	</div>

</div>
<script>
var modJsList = new Array();

modJsList['tabCourse'] = new CourseAdapter('Course','Course');
modJsList['tabCourse'].setRemoteTable(true);
modJsList['tabTrainingSession'] = new TrainingSessionAdapter('TrainingSession','TrainingSession');
modJsList['tabTrainingSession'].setRemoteTable(true);
modJsList['tabEmployeeTrainingSession'] = new EmployeeTrainingSessionAdapter('EmployeeTrainingSession','EmployeeTrainingSession');
modJsList['tabEmployeeTrainingSession'].setRemoteTable(true);

var modJs = modJsList['tabCourse'];

</script>
<?php include APP_BASE_PATH.'footer.php';?>
