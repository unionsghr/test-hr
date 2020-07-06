<?php
/*
 Copyright (c) 2018 [Glacies UG, Berlin, Germany] (http://glacies.de)
 Developer: Thilina Hasantha (http://lk.linkedin.com/in/thilinah | https://github.com/thilinah)
 */

$moduleName = 'candidates';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));

$additionalJs = array();
//$additionalJs[] = BASE_URL.'/admin/cvbuilder/js/jquery.media.js?v='.$jsVersion;
//$additionalJs[] = BASE_URL.'/admin/cvbuilder/js/jquery.metadata.js?v='.$jsVersion;

include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';


?><div class="span9">

	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
		<li class="active"><a id="tabCandidate" href="#tabPageCandidate"><?=t('Candidates')?></a></li>
	</ul>

	<div class="tab-content">
		<div class="tab-pane active" id="tabPageCandidate">
			<div id="Candidate" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="CandidateForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
	</div>

</div>
<script>
var modJsList = [];
modJsList['tabCandidate'] = new CandidateAdapter('Candidate', 'Candidate', '', 'updated desc');
modJsList['tabCandidate'].setRemoteTable(true);

var modJs = modJsList['tabCandidate'];

</script>
<?php include APP_BASE_PATH.'footer.php';?>
