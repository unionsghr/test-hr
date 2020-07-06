<?php

$moduleName = 'leave_charts';
$moduleGroup = 'admin';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';
?>
<link href="<?=BASE_URL.'bower_components/vis/dist/vis-timeline-graph2d.min.css?v='.$jsVersion?>" rel="stylesheet" type="text/css">
<script src="<?=BASE_URL.'bower_components/vis/dist/vis.js?v='.$jsVersion?>"></script>
<script src="<?=BASE_URL.'bower_components/handlebars/handlebars.js?v='.$jsVersion?>"></script>

<script id="item-template" type="text/x-handlebars-template">
    <table style="text-align: left;">
        <tr>
            <td colspan="3" style="font-weight: bold;">{{employee}}</td>
        </tr>
        <tr>
            <td><img src="{{image}}" class="img-circle" style="width:45px;height: 45px;"></td>
            <td colspan="2">
                {{details}}
            </td></tr>
        </tr>
    </table>
</script>

<div class="span9">


	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
		<li class="active"><a id="tabLeaveTimeline" href="#tabPageLeaveTimeline"><?=t('Leave Timeline')?></a></li>
	</ul>

	<div class="tab-content">
		<div class="tab-pane active reviewBlock" id="tabPageLeaveTimeline" style="height:100%;position: relative;">
            <div class="alert ice-warning alert-dismissible show" role="alert">
                <strong><?=t('Note')?></strong>&nbsp;<?=t('You can drag the chart both sides to view other dates on timeline')?>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="visualizationLeaveTimeline" style="position: relative;overflow-y: scroll;height:100%">
            </div>

		</div>
	</div>

</div>
<script>
var modJsList = new Array();
modJsList['tabLeaveTimeline'] = new LeaveTimelineAdapter('LeaveTimeline');
modJsList['tabLeaveTimeline'].setShowAddNew(false);
var modJs = modJsList['tabLeaveTimeline'];
</script>

<?php include APP_BASE_PATH.'footer.php';?>
