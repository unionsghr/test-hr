<?php

use Classes\FileService;

ini_set('max_execution_time', 0);

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$mysqli = mysqli_connect("localhost", "root", "", "hrmdata");

//connect to the database 
if (mysqli_connect_errno($mysqli)) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

// Takes raw data from the request
$json = file_get_contents('php://input');


//get the message and department of the last announcement
$sql = "SELECT message,attachment,department FROM conversations ORDER BY id DESC LIMIT 1;";
$result = mysqli_query($mysqli, $sql);
$row = mysqli_fetch_assoc($result);


//get the message,department and attachment
$announcement = $row['message'];
$department = $row['department'];
$attachment = $row['attachment'];

//json decode the array
$department_vals = json_decode($department);

$file = "";
//getting the file
if (isset($attachment)) {

  $sql = "select filename FROM files where name = '$attachment';";
  $result = mysqli_query($mysqli, $sql);
  $row = mysqli_fetch_assoc($result);
  $filename = $row['filename'];
  $file = 'C:/xampp/htdocs/rokel_hrm/app/data/' . $filename;
}


//if announcement has department then get the employees from each department else send announcement to all employees
if (count($department_vals) > 0) {


  //count for sending employee emails
  $i = 0;

  //this while loop will get all employees based on the department
  while ($i < count($department_vals)) {

    //select employees 
    $sql = "select first_name, work_email,private_email FROM employees where department = $department_vals[$i];";
    // $sql1 = "select first_name,work_email,private_email FROM employees where department = '253';";
    $result = mysqli_query($mysqli, $sql);

    //array for holding employees in a particular department
    $emp_data = array();

    //get each employee detail and put it in the emp_data array
    while ($row = mysqli_fetch_assoc($result)) {
      $a = array($row['first_name'], $row['work_email'], $row['private_email']);
      array_push($emp_data, $a);
    }


    //count for send employees email
    $n = 0;

    while ($n < count($emp_data)) {

      $headers = "From: HR - UNION SYSTEMS GLOBAL Ltd";




      // Email body content 
      $htmlContent = ' 
      <h4>Dear ' . $emp_data[$n][0] . ', </h4> 
      <p>' . $announcement . '</p> 
      ';

      $body = " ";
      $semi_rand = md5(time());
      $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

      $message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
        "Content-Transfer-Encoding: 7bit\n\n" . $body . "\n\n";

      // Headers for attachment  
      $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\"";

      // Preparing attachment
      if (is_file($file)) {
        // print($file);
        // die();
        $message .= "--{$mime_boundary}\n";
        $fp = @fopen($file, "rb");
        $data = @fread($fp, filesize($file));

        @fclose($fp);
        $data = chunk_split(base64_encode($data));
        $message .= "Content-Type: application/octet-stream; name=\"" . basename($file) . "\"\n" .
          "Content-Description: " . basename($file) . "\n" .
          "Content-Disposition: attachment;\n" . " filename=\"" . basename($file) . "\"; size=" . filesize($file) . ";\n" .
          "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
      }

      // $message .= "--{$mime_boundary}--";
      // Multipart boundary  
      $message .= "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
        "Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n";

      //if both emails are available use the work email else use the available email
      if (isset($emp_data[$n][1]) && isset($emp_data[$n][2])) {
        $email = $emp_data[$n][1];
        $subject = "Announcement from the Hr";
        // $message = $announcement;

        if (mail($email, $subject, $message, $headers)) {
          $message_code = "111";
        } else {
          $message_code = "000";
        }
      } elseif (isset($emp_data[$n][1])) {
        $email = $emp_data[$n][1];
        $subject = "Announcement from the Hr";
        // $message = $announcement;

        if (mail($email, $subject, $message, $headers)) {
          $message_code = "111";
        } else {
          $message_code = "000";
        }
      } elseif (isset($emp_data[$n][2])) {
        $email = $emp_data[$n][2];
        $subject = "Announcement from the Hr";
        // $message = $announcement;

        if (mail($email, $subject, $message, $headers)) {
          $message_code = "111";
        } else {
          $message_code = "000";
        }
      }



      $n++;
    }
    // print_r($row);
    // die();


    $i++;
  }

} else {

  //select  all employees 
  $sql = "select first_name, work_email,private_email FROM employees;";
  // $sql1 = "select first_name,work_email,private_email FROM employees where department = '253';";
  $result = mysqli_query($mysqli, $sql);

  //array for holding employees in a particular department
  $emp_data = array();

  //get each employee detail and put it in the emp_data array
  while ($row = mysqli_fetch_assoc($result)) {
    $a = array($row['first_name'], $row['work_email'], $row['private_email']);
    array_push($emp_data, $a);
  }



  //count for send employees email
  $n = 0;

  while ($n < count($emp_data)) {

    $headers = "From: HR - UNION SYSTEMS GLOBAL Ltd";




    // Email body content 
    $htmlContent = ' 
      <h4>Dear ' . $emp_data[$n][0] . ', </h4> 
      <p>' . $announcement . '</p> 
      ';

    $body = " ";
    $semi_rand = md5(time());
    $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";

    $message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
    "Content-Transfer-Encoding: 7bit\n\n" . $body . "\n\n";

    // Headers for attachment  
    $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\"";

    // Preparing attachment
    if (is_file($file)) {
      // print($file);
      // die();
      $message .= "--{$mime_boundary}\n";
      $fp = @fopen($file, "rb");
      $data = @fread($fp, filesize($file));

      @fclose($fp);
      $data = chunk_split(base64_encode($data));
      $message .= "Content-Type: application/octet-stream; name=\"" . basename($file) . "\"\n" .
      "Content-Description: " . basename($file) . "\n" .
        "Content-Disposition: attachment;\n" . " filename=\"" . basename($file) . "\"; size=" . filesize($file) . ";\n" .
        "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n";
    }

    // $message .= "--{$mime_boundary}--";
    // Multipart boundary  
    $message .= "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" .
    "Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n";

    //if both emails are available use the work email else use the available email
    if (isset($emp_data[$n][1]) && isset($emp_data[$n][2])
    ) {
      $email = $emp_data[$n][1];
      $subject = "Announcement from the Hr";
      // $message = $announcement;

      if (mail($email, $subject, $message, $headers)) {
        $message_code = "111";
      } else {
        $message_code = "000";
      }
    } elseif (isset($emp_data[$n][1])) {
      $email = $emp_data[$n][1];
      $subject = "Announcement from the Hr";
      // $message = $announcement;

      if (mail($email, $subject, $message, $headers)) {
        $message_code = "111";
      } else {
        $message_code = "000";
      }
    } elseif (isset($emp_data[$n][2])) {
      $email = $emp_data[$n][2];
      $subject = "Announcement from the Hr";
      // $message = $announcement;

      if (mail($email, $subject, $message, $headers)) {
        $message_code = "111";
      } else {
        $message_code = "000";
      }
    }



    $n++;
  }
}


$message = json_encode(
  array(
    "responseCode" => $message_code

  )

);

exit($message);
