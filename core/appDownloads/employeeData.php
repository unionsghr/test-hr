<?php
include_once 'dbConfig.php'; 

function filterData(&$str){ 
    $str = preg_replace("/\t/", "\\t", $str); 
    $str = preg_replace("/\r?\n/", "\\n", $str); 
    if(strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"'; 
} 
 
// Excel file name for download 
$fileName = "Employees_" . date('Y-m-d') . ".xls"; 
 
// Column names 
$fields = array(
    'ID', 
    'EMPLOYEE ID',
    'FIRST NAME', 
    'MIDDLE NAME',
    'LAST NAME', 
    'MOBILE PHONE',
    'DEPARTMENT',
    'GENDER', 
    // 'SUPERVISOR',
    'STATUS'
); 
 
// Display column names as first row 
$excelData = implode("\t", array_values($fields)) . "\n"; 
 
// Fetch records from database 
$query = $db->query("SELECT * FROM vw_employeedata ORDER BY id ASC"); 
if($query->num_rows > 0){ 
    // Output each row of the data 
    while($row = $query->fetch_assoc()){ 
        // $status = ($row['status'] == 1)?'Active':'Inactive'; 
        $lineData = array(
            $row['id'], 
            $row['employee_id'], 
            $row['first_name'], 
            $row['middle_name'],
            $row['last_name'],              
            $row['mobile_phone'],             
            $row['department_'],
            $row['gender'], 
            // $row['supervisor'], 
            $row['status']); 
        array_walk($lineData, 'filterData'); 
        $excelData .= implode("\t", array_values($lineData)) . "\n"; 
    } 
}else{ 
    $excelData .= 'No records found...'. "\n"; 
} 
 
// Headers for download 
header("Content-Type: application/vnd.ms-excel"); 
header("Content-Disposition: attachment; filename=\"$fileName\""); 
 
// Render excel data 
echo $excelData; 
 
exit;