<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$mysqli = mysqli_connect("localhost", "root", "", "hrmdata");
if (mysqli_connect_errno($mysqli)) {
  // echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
// Takes raw data from the request
$json = file_get_contents('php://input');

//get the data here
$data = json_decode($json);

$employee_id = $data->employee_id;


//select the id and notch of the new employee
$sql = " select id,notches from employees where id = $employee_id;";
$result = mysqli_query($mysqli, $sql);
$row = mysqli_fetch_assoc($result);

//get the values of the notch and employee id
$notch_id = $row['notches'];
// $emp_id = $row['id'];

//add one to get the new employee id
// $new_empId = $emp_id + 1;



//use the notch from the employee to get the salary component from the notch table
$sql = " SELECT salary_component FROM `notches` where id = $notch_id;";
$result = mysqli_query($mysqli, $sql);
$salary_compo = mysqli_fetch_assoc($result);

$component_vals1 = $salary_compo['salary_component'];
$data = array($component_vals1);
$dataVals = json_decode($component_vals1);

//check to see if employee already exist in the employeesalary table
//use the notch from the employee to the salary component from the notch table
$sql = " SELECT * FROM `employeesalary` where employee = $employee_id;";
$result_emp_components = mysqli_query($mysqli, $sql);
$emp_components = mysqli_fetch_assoc($result_emp_components);

if(count($emp_components)>0){
  $sql = " DELETE from employeesalary where employee = $employee_id;";
  mysqli_query($mysqli, $sql);
}

//count for add new employee salary
$i = 0;

//add all employee salary for employee based on the salary components
while ($i < count($dataVals)) {


    $sql = " INSERT into employeesalary (employee, component, working_days)
  VALUES ($employee_id, $dataVals[$i], 22);";
    mysqli_query($mysqli, $sql);
  
  $i++;
}



die();



$message = json_encode(
  array(
    "responseCode" => "000"

  )

);

exit($message);
