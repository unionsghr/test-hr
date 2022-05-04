<?php
include_once 'dbConfig.php';

function filterData(&$str)
{
  $str = preg_replace("/\t/", "\\t", $str);
  $str = preg_replace("/\r?\n/", "\\n", $str);
  if (strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"';
}

// Excel file name for download 
$fileName = "PayrollColumns_" . date('Y-m-d') . ".xls";

// Column names 
$fields = array(
  'ID',
  'NAME',
  'COMPONENT GL',
  'COMPONENT TYPE',
  'CALCULATION GROUP'
);

// Display column names as first row 
$excelData = implode("\t", array_values($fields)) . "\n";

// Fetch records from database 
$query = $db->query("SELECT payrollcolumns.id,payrollcolumns.name,payrollcolumns.salarycomponent_gl,salarycomponenttype.name component_type,deductiongroup.name cal_grp 
from payrollcolumns,deductiongroup,salarycomponenttype 
where deductiongroup.id = payrollcolumns.deduction_group and salarycomponenttype.code = payrollcolumns.payment_deduction;");
if ($query->num_rows > 0) {
  // Output each row of the data 
  while ($row = $query->fetch_assoc()) {
    // $status = ($row['status'] == 1)?'Active':'Inactive'; 
    $lineData = array(
      $row['id'],
      $row['name'],
      $row['salarycomponent_gl'],
      $row['component_type'],
      $row['cal_grp']
    );
    array_walk($lineData, 'filterData');
    $excelData .= implode("\t", array_values($lineData)) . "\n";
  }
} else {
  $excelData .= 'No records found...' . "\n";
}

// Headers for download 
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=\"$fileName\"");

// Render excel data 
echo $excelData;

exit;
