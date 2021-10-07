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

// // Takes raw data from the request
$json = file_get_contents('php://input');

$data = json_decode($json);

$id = isset($data->id) ? $data->id : 0;

$sql = "SELECT payroll, round(SUM(basic),2) as basic, round(SUM(honorarium),2) as honorarium, round(SUM(car),2) as car, round(sum(transport),2) as transport, round(SUM(lunch),2) as lunch, round(SUM(monthly_rent),2) as rent, round(SUM(gross_salary),2) as gross_salary, round(SUM(nassit_5),2) as employee_nassit, round(SUM(nassit10_deduct),2) as employer_nassit, round(SUM(medical_excess),2) as medical_excess, round(SUM(union_dues),2) as union_dues, round(SUM(paye),2) as paye, round(SUM(witholding_tax),2) as witholding_tax, round(sum(total_deduction),2) as total_deduction, round(SUM(net_salary),2) as net_salary, round(SUM(net_salary_contract),2) as net_salary_contract, verified_by, approved_by, finalized_date FROM vw_final_salaries WHERE payroll = '$id' GROUP BY payroll
";

$result = mysqli_query($mysqli, $sql);
$row = mysqli_fetch_assoc($result);

$sql_ = "SELECT status from payroll where id = '$id'";
$result_ = mysqli_query($mysqli, $sql_);
$row_ = mysqli_fetch_assoc($result_);

$message = json_encode(
    array(
        "responseCode" => "000",
        "message" => "Successful",
        "data" => $row,
        "data1" => $row_,
    )

);

exit($message);
