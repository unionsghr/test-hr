<?php
/*
 Copyright (c) 2018 [Glacies UG, Berlin, Germany] (http://glacies.de)
 Developer: Thilina Hasantha (http://lk.linkedin.com/in/thilinah | https://github.com/thilinah)
 */

$moduleName = 'jobpositions';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';
?><div class="span9">

	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
		<li class="active"><a id="tabJob" href="#tabPageJob"><?=t('Job Positions')?></a></li>
	</ul>

	<div class="tab-content">
		<div class="tab-pane active" id="tabPageJob">
			<div id="Job" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="JobForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>

	</div>

</div>
<script>
var modJsList = new Array();

modJsList['tabJob'] = new JobAdapter('Job');

var modJs = modJsList['tabJob'];

</script>
<?php include APP_BASE_PATH.'footer.php';?>
