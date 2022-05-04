<?php
// use Utils\LogManager;

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
$currentUser = $data->currentUser;
// $id = '5';
$sql = "UPDATE employeeforms set status = 'Approved', approval_date = CURRENT_DATE, approved_by = $currentUser where id = '$id'";

$result = mysqli_query($mysqli, $sql);


//select employee id
$sql = "select employee from employeeforms where id = '$id'";
$employee = mysqli_query($mysqli, $sql);
$data = mysqli_fetch_assoc($employee);
$employee_id = $data['employee'];



//select employee details
$sql = "select first_name, work_email,private_email FROM employees where id = '$employee_id'";
$employee = mysqli_query($mysqli, $sql);
$data = mysqli_fetch_assoc($employee);
// print_r($data);
// die();

//get the firstname,work email and private email
$firstname = $data['first_name'];
$work_email = $data['work_email'];
$private_email = $data['private_email'];

$body = " ";
$semi_rand = md5(time());
$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

$message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
  "Content-Transfer-Encoding: 7bit\n\n" . $body . "\n\n";

// Email body content 
$htmlContent = ' 
    <h3>Dear ' . $firstname . ',</h3> 
    <p>An Hr form has been sent to you, Kindly visit the the Hr app to access it .</p> 
';

$message .= "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
  "Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n";


$headers = "From: HR - UNION SYSTEMS GLOBAL Ltd";
// Headers for attachment  
$headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\"";


//if both emails are available use the work email else use the available email
if (isset($work_email) && isset($private_email)) {

  $email = $work_email;
  $subject = "Hr Form";
  if (mail($email, $subject, $message, $headers)) {
    $message_code = "111";
  } else {
    $message_code = "000";
  }
} elseif (isset($work_email)) {
  $email = $work_email;
  $subject = "Hr Form";
  if (mail($email, $subject, $message, $headers)) {
    $message_code = "111";
  } else {
    $message_code = "000";
  }
} elseif (isset($private_email)) {
  $email = $private_email;
  $subject = "Hr Form";
  if (mail($email, $subject, $message, $headers)) {
    $message_code = "111";
  } else {
    $message_code = "000";
  }
} else {
  $message_code = "222";
}

$message = json_encode(
  array(
    "responseCode" => $message_code,
    "data"=> $data
  )

);

exit($message);


