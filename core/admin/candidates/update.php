<?php
/*
 Copyright (c) 2018 [Glacies UG, Berlin, Germany] (http://glacies.de)
 Developer: Thilina Hasantha (http://lk.linkedin.com/in/thilinah | https://github.com/thilinah)
 */

$moduleName = 'candidates';
define('MODULE_PATH',dirname(__FILE__));

include APP_BASE_PATH.'includes.inc.php';
$user = \Utils\SessionUtils::getSessionObject('user');
if(empty($user)){
    $user = new User();
    $user->id = "-1";
    $user->user_level = "Anonymous";
    $user->username = "anonymous";
    $user->email = "anonymous@web-stalk.com";
    SessionUtils::saveSessionObject('user', $user);
}

if(!isset($_REQUEST['hash'])){
    exit();
}

$candidate = new \Candidates\Common\Model\Candidate();
$candidate->Load("hash = ?",array($_GET['hash']));
if(empty($candidate->id)){
    exit();
}

\Classes\BaseService::getInstance()->audit("Candidate View", "Candidate [$candidate->id] $candidate->first_name visited update link.");

$_GET['action'] = 'new';

$fileService = \Classes\FileService::getInstance();



//Mapping Vars
$countryName = "country_Name";
$employementTypeName = "employementType_Name";
$experienceLevelName = "experienceLevel_Name";
$industryName = "industry_Name";
$jobFunctionName = "jobFunction_Name";
$educationLevelName = "educationLevel_Name";



//Add meta data
$meta = new stdClass();
$meta->title = "Updating Candidate Information";
$meta->description = $meta->title;
$meta->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$meta->imageUrl = "";

include APP_BASE_PATH.'entry_header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';

?>


<div class="row">
    <div class="col-md-3">

    </div>
    <div class="col-md-6">
        <div id="CandidateForm" class="reviewBlock" data-content="Form" style="padding-left:5px;">

        </div>
    </div>

</div>
<div class="col-md-3"></div>
<div class="row">
    <script>
        var modJsList = new Array();
        modJsList['tabCandidate'] = new CandidateAdapter('Candidate');
        modJsList['tabCandidate'].setRemoteTable(true);
        //modJsList['tabCandidate'].setShowFormOnPopup (true);
        modJsList['tabCandidate'].setJobCode('<?=$_GET['ref']?>');
        modJsList['tabCandidate'].setIsJobApplication(true);
        var modJs = modJsList['tabCandidate'];
        //modJs.showFullForm();
        modJs.newInitObject = <?=json_encode($candidate)?>;

    </script>
    <?php include APP_BASE_PATH.'entry_footer.php';?>
