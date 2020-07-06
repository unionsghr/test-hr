<?php
function payroll(){

  $mysqli =  mysqli_connect("localhost", "root", "", "hrmdatatest_utb");
    if (mysqli_connect_errno($mysqli)) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
 
  $query ="SELECT * FROM salaries";
  $res = mysqli_query($mysqli, $query); 

  $documentRef = substr(base_convert(uniqid(sha1(mt_rand())), 16, 36), 0, 2) . time();
  $trans_ref = rand();
  $date_created = Date('Y-m-d');
  $account_number = $creditnet = array();
  while ($row = mysqli_fetch_assoc($res)) {

    $creditnet[] = $row['net_salary'];
    $account_number[] = $row['account_no'];
    $branch[] = $row['branch_code'];
  }

  $creditnet = array_merge($creditnet);
  $account_number = array_merge($account_number);
  $branch_code = array_merge($branch);

  // echo json_encode($creditnet). '<br>'; die();
  // echo json_encode($account_number). '<br>'; die();
  
  $data_count = (count($account_number) - 1);  
  // echo json_encode($debit_count); die();
  $i = 0;
  while ($i < $data_count){
  // echo $debit_count; die();  
  
  $credits = array();
  $credits_merge = array();
  while ($i < $data_count){
          
  $credit_merge[] = array_push($credits,
        array(              
          'creditAmount'=> (round(($creditnet[$i]), 2)),
          'creditAccount' => trim($account_number[$i]),
          'creditCurrency' => 'SLL',
          'creditNarration' => "Net Salary",
          'creditProdRef' => 'NS_' . $trans_ref,
          'creditBranch' => $branch_code[$i]
    )
        );
     $i++;
    }

  }

    // echo json_encode($credits); die();

  
  // echo json_encode($final_creditnet); die();
  $query_cr = "SELECT * from salaries_credit";
  $res_cr = mysqli_query($mysqli, $query_cr);
  while ($row = mysqli_fetch_assoc($res_cr)) {               

  $component_amount_cr[]= $row['component_amount']; 
  $component_type_cr[]= $row['component_type'];
  $branch_code_cr[] = $row['branch_code'];  
  $general_ledger_cr[] = $row['general_ledger']; 
}

  $comp_amount_cr = array_merge($component_amount_cr);
  $comp_type_cr = array_merge($component_type_cr);
  $branch_cd = array_merge($branch_code_cr);
  $g_ledger_cr = array_merge($general_ledger_cr);

  $d = 0;
  $credit_count = count($comp_type_cr);

  $amount_cr = $type_cr = $branch_cr = $gl_cr = 0;
  while($d < $credit_count){

    $amount_cr = $comp_amount_cr;
    $type_cr = $comp_type_cr;
    $branch_cr = $branch_cd;
    $gl_cr = $g_ledger_cr;
    
    $d++;
  }

  // echo json_encode($branch_cr); die();
  // echo json_encode($final_creditnet); die();

  $i = 0;
  $creditdata = array();
  $creditdata_ = array();

while ($i < $credit_count){
  
$creditdata_[] = array_push($creditdata,
array(              
      'creditAmount'=> (round(($amount_cr[$i]), 2)),
      'creditAccount' => $gl_cr[$i],
      'creditCurrency' => 'SLL',
      'creditNarration' => $type_cr[$i],
      'creditProdRef' => 'NS_' . $trans_ref,
      'creditBranch' => $branch_cr[$i]
)
);
$i++;
}
    
$final_credits = array_merge($creditdata,$credits);

// echo json_encode($final_credits); die();


  // QUERY FOR DEBIT DATA ----- START
    // $query = 'SELECT * from'. 'final_salaries'. 'where type = '."D";
    $query = "SELECT * from salaries_debit";
    // echo $query; die();
    $res = mysqli_query($mysqli, $query);

    while ($row = mysqli_fetch_assoc($res)) { 

    $component_amount[]= $row['component_amount']; 
    $component_type[]= $row['component_type'];
    $branch_code[] = $row['branch_code'];  
    $general_ledger[] = $row['general_ledger']; 

}

    $comp_amount = array_merge($component_amount);
    $comp_type = array_merge($component_type);
    $branch = array_merge($branch_code);
    $g_ledger = array_merge($general_ledger);

    $d = 0;
    $debit_count = count($comp_type);
    $amount = $type = $branch_cd = $gl = 0;
    while($d < $debit_count){

      $amount = $comp_amount;
      $type = $comp_type;
      $branch_cd = $branch;
      $gl = $g_ledger;
      
      $d++;
    }

      // echo $debit_count; die();

          $i = 0;
          $debitdata = array();
          $debitdata_ = array();
      while ($i < $debit_count){
          
       $debitdata_[] = array_push($debitdata,
        array(              
              'debitAmount'=> (round(($amount[$i]), 2)),
              'debitAccount' => $gl[$i],
              'debitCurrency' => 'SLL',
              'debitNarration' => $type[$i],
              'debitProdRef' => 'BS_' . $trans_ref,
              'debitBranch' => $branch_cd[$i]
              )
        );
     $i++;
    }
    
    // echo json_encode($debitdata); die();  
    // END OF DEBIT DATA 


// echo json_encode($creditdata); die();


      $data1 = array(
              'approvedBy' => 'Admin',
              'channelCode' => 'HRP',
              'transType'=> "SAL",
              'debitAccounts' => $debitdata,
              'creditAccounts' => $final_credits,
              'referenceNo'=> $documentRef,
              'postedBy' => 'USG'

      );

      // echo json_encode($data1); die();



      $myfile = fopen("Payroll_Report_".$trans_ref."_".$date_created.".txt", "w") or die("Unable to open file!");
      // $txt = "Mickey Mouse\n";
      // fwrite($myfile, $txt);
      $txt = json_encode($data1);
      fwrite($myfile, $txt);
      fclose($myfile);

      $myfile = fopen("Payroll_Report_".$trans_ref."_".$date_created.".json", "w") or die("Unable to open file!");
      // $txt = "Mickey Mouse\n";
      // fwrite($myfile, $txt);
      $txt = json_encode($data1);
      fwrite($myfile, $txt);
      fclose($myfile);

      

      $curl = curl_init();

  curl_setopt_array($curl, array(
  CURLOPT_URL => "http://192.168.1.225:8680/core/api/v1.0/account/performBulkPayment",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "PUT",
  CURLOPT_POSTFIELDS =>json_encode($data1),
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json",
    "x-api-key: 20171411891",
    "x-api-secret: 141116517"
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

// return new IceResponse(IceResponse::SUCCESS, $response);
}
 
 function email(){

$mysqli = mysqli_connect("localhost", "root", "", "hrmdatatest_utb");
    if (mysqli_connect_errno($mysqli)) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
     
  $date_query = "SELECT * From payroll";

    $date_res = mysqli_query($mysqli, $date_query);

    while ($row = mysqli_fetch_assoc($date_res) ) {

    $date_start = $row['date_start'];
    $date_end = $row['date_end'];      
      # code...
    }

// echo $date_start. " to ". $date_end; die();

    $query = "SELECT users.*, salaries.*  FROM  users, salaries where users.employee = salaries.employee";

    $res = mysqli_query($mysqli, $query);

    $email = $username = array();

    while ($row = mysqli_fetch_assoc($res)) {               

    $email[] = $row['email']; 
    $username[] = $row['username'];
   
}

// echo json_encode($email); die();

  $email = array_merge($email);
  $username = array_merge($username);


// echo '<strong>'. $email .'</strong>'; die();
  $email_count = count($email);

// echo $email_count; die();

  $i = 0;

  while ( $i <= $email_count) {

  $final_email = $email[$i];
  $final_username = $username[$i];
  # code...
  // echo json_encode ($final_username); die();
$to_email = $email[$i];
$subject = "UTB Monthly Payslip";
$body = "Hi " . $username[$i] .",". "


Please be informed that your payslip for the period  $date_start  to  $date_end is ready. 

Login to Download here: http://localhost/utb_hr/app/?g=modules&n=reports&m=module_User_Reports


If you have any question, do not hesitate to contact HR.

Best Regards,
UTB HR.

";
$headers = "From: UTB HR";
 
// if (mail($to_email, $subject, $body, $headers)) {
//     echo "Email successfully sent to $to_email...";
// } else {
//     echo "Email sending failed...";
// }
  $i++;
}

} 

  payroll();
  // email();
    
    header("Location:http://localhost/utb_hr/app/?g=admin&n=payroll&m=admin_Payroll");
  ?>
