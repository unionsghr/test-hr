<?php
$moduleName = 'jobsetup';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';
?><div class="span9">

	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
        <li class="active"><a id="tabEmployementType" href="#tabPageEmployementType"><?=t('Edit Employment Types')?></a></li>
        <li ><a id="tabExperienceLevel" href="#tabPageExperienceLevel"><?=t('Edit Experience Levels')?></a></li>
        <li ><a id="tabJobFunction" href="#tabPageJobFunction"><?=t('Edit Job Functions')?></a></li>
        <li ><a id="tabEducationLevel" href="#tabPageEducationLevel"><?=t('Edit Education Levels')?></a></li>
		<li ><a id="tabBenifit" href="#tabPageBenifit"><?=t('Edit Benefits')?></a></li>
		<li ><a id="tabMedicalCondition" href="#tabPageMedicalCondition"><?=t('Edit Medical Conditions')?></a></li>
		<li ><a id="tabMedicalSymptom" href="#tabPageMedicalSymptom"><?=t('Edit Health Symptoms')?></a></li>
	</ul>

	<div class="tab-content">
		<?php
		$list = array("EmployementType","ExperienceLevel","JobFunction","EducationLevel","Benifit","MedicalCondition","MedicalSymptom");
		foreach($list as $item){
		?>
		<div class="tab-pane<?=($item=="EmployementType"?" active":"")?>" id="tabPage<?=$item?>">
			<div id="<?=$item?>" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="<?=$item?>Form" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<?php
		}
		?>
	</div>

</div>
<script>
var modJsList = new Array();

<?php
$list = array("EmployementType","Industry","ExperienceLevel","JobFunction","EducationLevel","Benifit","MedicalCondition","MedicalSymptom");
foreach($list as $item){
?>
modJsList['tab<?=$item?>'] = new <?=$item?>Adapter('<?=$item?>','<?=$item?>');
modJsList['tab<?=$item?>'].setRemoteTable(true);
<?php
}
?>
var modJs = modJsList['tabEmployementType'];

</script>
<?php include APP_BASE_PATH.'footer.php';?>
