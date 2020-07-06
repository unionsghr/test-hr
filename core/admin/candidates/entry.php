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
	$user = new \Users\Common\Model\User();
	$user->id = "-1";
	$user->user_level = "Anonymous";
	$user->username = "anonymous";
	$user->email = "anonymous@web-stalk.com";
	\Utils\SessionUtils::saveSessionObject('user', $user);
}

$fileService = \Classes\FileService::getInstance();

$job = new \JobPositions\Common\Model\Job();
$job->Load("code = ?",array($_GET['ref']));

$jobMapping = '{"country":["Country","id","name"],"company":["CompanyStructure","id","name"],"employementType":["EmployementType","id","name"],"experienceLevel":["ExperienceLevel","id","name"],"jobFunction":["JobFunction","id","name"],"educationLevel":["EducationLevel","id","name"],"currency":["CurrencyType","id","name"]}';


if(empty($job->id)){
	$jobs = $job->Find("status = ? order by closingDate",array('Active'));
    $jobsArr = array();
    foreach($jobs as $j){
        $enrichedJob = $baseService->getElement('Job', $j->id, $jobMapping, true);
        $jobsArr[] = $enrichedJob;
    }

    $meta = new stdClass();
    $meta->title = \Classes\SettingsManager::getInstance()->getSetting('Company: Name');
    $meta->description = "Open positions at ".\Classes\SettingsManager::getInstance()->getSetting('Company: Name');
    $meta->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $meta->imageUrl = \Classes\UIManager::getInstance()->getCompanyLogoUrl();


}else{
    /*
    $jobs = $job->Find("status = ? order by closingDate limit 10",array('Active'));
    $jobsArr = array();
    foreach($jobs as $j){
        $enrichedJob = $baseService->getElement('Job', $j->id, $jobMapping, true);
        $jobsArr[] = $enrichedJob;
    }
    */

//Mapping Vars


    $hiringManager = null;
    if (!empty($job->hiringManager) && (empty($job->showHiringManager) || $job->showHiringManager === 'Yes')) {
        $hiringManager = new \Employees\Common\Model\Employee();
        $hiringManager->Load('id = ?', [$job->hiringManager]);
        $hiringManager = \Classes\FileService::getInstance()->updateSmallProfileImage($hiringManager);
    }

    $countryName = "country_Name";
    $employementTypeName = "employementType_Name";
    $experienceLevelName = "experienceLevel_Name";
    $industryName = "industry_Name";
    $jobFunctionName = "jobFunction_Name";
    $educationLevelName = "educationLevel_Name";

    $enrichedJob = $baseService->getElement('Job', $job->id, $jobMapping, true);

    if(!empty($job->attachment)){
        $job->attachment = $fileService->getFileUrl($job->attachment);
    }

    $comapny = null;


    $currency = null;
    if(!empty($job->currency)){
        $currency = new \Metadata\Common\Model\CurrencyType();
        $currency->Load("id = ?",array($job->currency));
    }


//parse benifitseta
    $benifits = NULL;
    if(!empty($job->benefits)){
        $benifits = json_decode($job->benefits, true);
    }

    $parser = new \cebe\markdown\Markdown();
    $job->description = $parser->parse($job->description);
    $job->requirements = $parser->parse($job->requirements);

//Add meta data
    $meta = new stdClass();
    $meta->title = $job->title;
    $meta->description = trim(preg_replace('/\s\s+/', ' ', $job->shortDescription));
    $meta->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $meta->imageUrl = \Classes\UIManager::getInstance()->getCompanyLogoUrl();
}
$companyName = \Classes\SettingsManager::getInstance()->getSetting('Company: Name');
$logoFileUrl = \Classes\UIManager::getInstance()->getCompanyLogoUrl();
include APP_BASE_PATH.'entry_header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';

?>
<style type="text/css">
	.job-content-header {
		background: #fbfbfb;
		padding:1px 10px;
	}

	.job-content-header h1{
		font-size: 24px;
	}

	.job-content-header h2{
		font-size: 20px;
	}

	.job-content-description{
		padding: 5px 20px;
		font-size: 14px;
	}

	.job-content-description img{
		max-width: 560px;
	}

	.company-block{
		box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
		padding: 5px;
		background: #FFF;
		margin-top:10px;
		margin-left:10px;
	}

	.company-name{
		font-weight: bold;
		text-decoration: underline;
	}

    .btn {
        border-radius: 3px;
    }

</style>


<?php
if(!empty($job->id)) {
    include MODULE_PATH."/job.single.php";
}else{
    include MODULE_PATH."/job.list.php";
}
?>

<?php include APP_BASE_PATH.'entry_footer.php';?>
