<?php

$moduleName = 'leaves';
$moduleGroup = 'modules';
define('MODULE_PATH',dirname(__FILE__));
include APP_BASE_PATH.'header.php';
include APP_BASE_PATH.'modulejslibs.inc.php';
$leavePeriod = \Leaves\Common\Model\LeavePeriod::getCurrentLeavePeriod()->getData();
if(!empty($leavePeriod)){
	$leavePeriodId = $leavePeriod->id;
}
?><div class="span9">
	<ul class="nav nav-tabs" id="modTab" style="margin-bottom:0px;margin-left:5px;border-bottom: none;">
		<li class="active"><a id="tabEmployeeLeaveAll" href="#tabPageEmployeeLeaveAll"><?=t('All My Leaves')?></a></li>
		<li class=""><a id="tabEmployeeLeaveEntitlement" href="#tabPageEmployeeLeaveEntitlement"><?=t('Leave Entitlement')?></a></li>
		<li class=""><a id="tabEmployeeLeaveApproved" href="#tabPageEmployeeLeaveApproved"><?=t('Approved Leave')?></a></li>
		<li class=""><a id="tabEmployeeLeavePending" href="#tabPageEmployeeLeavePending"><?=t('Pending Leave')?></a></li>
		<li class=""><a id="tabSubEmployeeLeaveAll" href="#tabPageSubEmployeeLeaveAll"><?=t('Subordinate Leave')?></a></li>
		<li class=""><a id="tabSubEmployeeLeaveCancel" href="#tabPageSubEmployeeLeaveCancel"><?=t('Cancellation Requests')?></a></li>
		<li class=""><a id="tabEmployeeLeaveApproval" href="#tabPageEmployeeLeaveApproval"><?=t('Approval Requests')?></a></li>
	</ul>

	<div class="tab-content">
		<div class="tab-pane active" id="tabPageEmployeeLeaveAll">
			<div id="EmployeeLeaveAll" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="EmployeeLeaveAllForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
        <div class="tab-pane active" id="tabPageEmployeeLeaveEntitlement">
            <div id="EmployeeLeaveEntitlement" data-content="List" style="padding-left:5px;padding:20px;" class="reviewBlock">
                <div class="row search-controls" style="padding-bottom:25px;display:none;">
                    <div class="col-lg-4 col-md-4"></div>
                    <div class="col-lg-5 col-md-5">

                    </div>
                    <div class="col-lg-3 col-md-3">
                        <input id="EmployeeLeaveEntitlement_search" type="text" class="form-control" placeholder="Search for...">
                    </div>

                </div>
                <div id="EmployeeLeaveEntitlement_error" class="alert alert-warning" role="alert" style="display: none;">

                </div>
                <div class="row objectList flex-container">
                </div>
                <nav aria-label="">
                    <ul class="pager">
                        <li id="loadMoreEmployeeLeaveEntitlement" style="display:none;"><a href="#" style="font-size:14px;">Load More <span aria-hidden="true">&rarr;</span></a></li>
                    </ul>
                </nav>
            </div>
        </div>
		<div class="tab-pane" id="tabPageEmployeeLeaveApproved">
			<div id="EmployeeLeaveApproved" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="EmployeeLeaveApprovedForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageEmployeeLeavePending">
			<div id="EmployeeLeavePending" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="EmployeeLeavePendingForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageSubEmployeeLeaveAll">
			<div id="SubEmployeeLeaveAll" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="SubEmployeeLeaveAllForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageSubEmployeeLeaveCancel">
			<div id="SubEmployeeLeaveCancel" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="SubEmployeeLeaveCancelForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
		<div class="tab-pane" id="tabPageEmployeeLeaveApproval">
			<div id="EmployeeLeaveApproval" class="reviewBlock" data-content="List" style="padding-left:5px;">

			</div>
			<div id="EmployeeLeaveApprovalForm" class="reviewBlock" data-content="Form" style="padding-left:5px;display:none;">

			</div>
		</div>
	</div>

</div>
<script>
var modJsList = new Array();

modJsList['tabEmployeeLeaveAll'] = new EmployeeLeaveAdapter('EmployeeLeave','EmployeeLeaveAll','','date_start desc');
modJsList['tabEmployeeLeaveAll'].setRemoteTable(true);
modJsList['tabEmployeeLeaveApproved'] = new EmployeeApprovedLeaveAdapter('EmployeeLeave','EmployeeLeaveApproved',{"status":"Approved"},'date_start desc');
modJsList['tabEmployeeLeaveApproved'].setShowAddNew(false);
modJsList['tabEmployeeLeaveApproved'].setRemoteTable(true);
modJsList['tabEmployeeLeavePending'] = new EmployeeLeaveAdapter('EmployeeLeave','EmployeeLeavePending',{"status":"Pending"},'date_start desc');
modJsList['tabEmployeeLeavePending'].setShowAddNew(false);
modJsList['tabEmployeeLeavePending'].setShowAddNew(false);
modJsList['tabEmployeeLeavePending'].setRemoteTable(true);
modJsList['tabSubEmployeeLeaveAll'] = new SubEmployeeLeaveAdapter('EmployeeLeave','SubEmployeeLeaveAll','','date_start desc');
modJsList['tabSubEmployeeLeaveAll'].setShowAddNew(false);
modJsList['tabSubEmployeeLeaveAll'].setRemoteTable(true);
modJsList['tabSubEmployeeLeaveAll'].preSetFilterExternal(<?='{"status":"Pending","leave_period":"'.$leavePeriodId.'"}'?>);
modJsList['tabSubEmployeeLeaveCancel'] = new SubEmployeeLeaveAdapter('EmployeeLeave','SubEmployeeLeaveCancel',{"status":"Cancellation Requested"},'date_start desc');
modJsList['tabSubEmployeeLeaveCancel'].setShowAddNew(false);
modJsList['tabSubEmployeeLeaveCancel'].setRemoteTable(true);
modJsList['tabEmployeeLeaveEntitlement'] = new EmployeeLeaveEntitlementAdapter('EmployeeLeaveEntitlement','EmployeeLeaveEntitlement');
modJsList['tabEmployeeLeaveEntitlement'].setShowAddNew(false);
modJsList['tabEmployeeLeaveEntitlement'].setSearchBox($("#EmployeeLeaveEntitlement_search"));
modJsList['tabEmployeeLeaveEntitlement'].setShowEdit(false);
modJsList['tabEmployeeLeaveEntitlement'].setShowDelete(false);
modJsList['tabEmployeeLeaveEntitlement'].setPageSize(100);
modJsList['tabEmployeeLeaveApproval'] = new EmployeeLeaveApprovalAdapter('EmployeeLeaveApprove','EmployeeLeaveApproval');
modJsList['tabEmployeeLeaveApproval'].setShowAddNew(false);
modJsList['tabEmployeeLeaveApproval'].setRemoteTable(true);

var modJs = modJsList['tabEmployeeLeaveAll'];

</script>
<div class="modal" id="leaveStatusModel" tabindex="-1" role="dialog" aria-labelledby="messageModelLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><li class="fa fa-times"/></button>
		<h3 style="font-size: 17px;">Save</h3>
	</div>
	<div class="modal-body">
		<form id="leaveStatusForm">
		<div class="control-group">
			<label class="control-label" for="leave_status">Leave Status</label>
			<div class="controls">
			  	<select class="form-control" type="text" id="leave_status" name="leave_status" value="">
				  	<option value="Approved">Approved</option>
				  	<option value="Pending">Pending</option>
				  	<option value="Rejected">Rejected</option>
				  	<option value="Cancelled">Cancelled</option>
			  	</select>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="leave_status">Status Change Note</label>
			<div class="controls">
			  	<textarea id="leave_reason" class="form-control" name="leave_reason" maxlength="500"></textarea>
			</div>
		</div>
		</form>
	</div>
	<div class="modal-footer">
 		<button class="btn btn-primary" onclick="modJs.changeLeaveStatus();">Change Leave Status</button>
 		<button class="btn" onclick="modJs.closeLeaveStatus();">Not Now</button>
	</div>
</div>
</div>
</div>
<?php include APP_BASE_PATH.'footer.php';?>
