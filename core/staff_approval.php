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
$json = file_get_contents('php://input');
// echo $json;
// die();

// Converts it into a PHP object
$data = json_decode($json);
// $id = "755";
$id = $data->id_;
$status = $data->status_;
$currentUser = $data->currentUser;
// $status = "Approved";
$query_bank = "SELECT * from employeebankdetails where id = '1'";
$res_bank = mysqli_query($mysqli, $query_bank);
while ($row = mysqli_fetch_assoc($res_bank)) {

    $noCrTrans = $row['noCrTrans'];
    $noDbTrans = $row['noDbTrans'];
    $subProduct = $row['subProduct'];
    $subSector = $row['subSector'];
    $subSegment = $row['subSegment'];
    $totalCrtrans = $row['totalCrTrans'];
    $totalDbtrans = $row['totalDbTrans'];
}

// echo $totalCrtrans."->".$totalDbtrans."->".$totalDbtrans;die();

$query = "SELECT * from employees where approval_status = 'Approved' AND status = 'Active' and id = $id";
$res = mysqli_query($mysqli, $query);

if ($status == 'Approved') {
    $sql = " UPDATE employees SET approval_status = 'Approved', approved_date = CURRENT_DATE, approved_by = $currentUser WHERE id = $id";
    $result = mysqli_query($mysqli, $sql);
    // $row = mysqli_fetch_assoc($result);

    while ($row = mysqli_fetch_assoc($res)) {

        $city = $row['city'];
        $country = $row['country'];
        $dateofbirth = $row['birthday'];
        $nin_expiry_date = $row['nin_expiry_date'];
        $email = $row['work_email'];
        $first_name = $row['first_name'];
        $middle_name = $row['middle_name'];
        $last_name = $row['last_name'];
        $home_address1 = $row['address1'];
        $home_address2 = $row['address2'];
        $nin_issue_date = $row['nin_issue_date'];
        $nationality = $row['nationality'];
        $phone_numer = $row['mobile_phone'];
        $profile_image = $row['profile_image'];
        $signature = $row['signature'];
        $place_of_birth = $row['place_of_birth'];
        $gender = $row['gender'];
        $tin = $row['tin_no'];
        $branch = $row['branch'];
        $nin = $row['nic_num'];

    }

    //   echo $city." ".$first_name." ".$middle_name." ".$last_name." ".$country ; die();

    // $new_profile = $profile_image
    $profile_path = 'C:/xampp/htdocs/rokel_hr/app/data/'.$profile_image.'.jpg';
// $profile_path = 'C:/xampp/htdocs/rokel_hr/app/data/'.$profile_image.'.jpg' || 'C:/xampp/htdocs/rokel_hr/app/data/'.$profile_image.'.png' || 'C:/xampp/htdocs/rokel_hr/app/data/'.$profile_image.'.jpeg';
 
// get the extension of the image to generate base64 string
$profile_type = pathinfo($profile_path, PATHINFO_EXTENSION);
 
// get the file data
$profile_data = file_get_contents($profile_path);
 
// get base64 encoded code of the image
$profile_code = base64_encode($profile_data);
 
// create base64 string of image
// echo $profile_code;

$signature_path = 'C:/xampp/htdocs/rokel_hr/app/data/'.$signature.'.jpg';
// $signature_path = 'C:/xampp/htdocs/rokel_hr/app/data/'.$signature.'.jpg' || $signature_path = 'C:/xampp/htdocs/rokel_hr/app/data/'.$signature.'.png' || $signature_path = 'C:/xampp/htdocs/rokel_hr/app/data/'.$signature.'.jpeg';
 
// get the extension of the image to generate base64 string
$signature_type = pathinfo($signature_path, PATHINFO_EXTENSION);
 
// get the file data
$signature_data = file_get_contents($signature_path);
 
// get base64 encoded code of the image
$signature_code = base64_encode($signature_data);
 
// create base64 string of image

// echo $profile_code;

// echo $signature_code;

// die();

// $sql_profile = " UPDATE employees SET 	profile_imagebase64 = $profile_image, signature_base64 = $signature WHERE id = $id";
// $result = mysqli_query($mysqli, $sql_profile);


    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://192.168.1.225:9096/account/openAccountNew',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => '{
        "city": "' . $city . '",
        "userName": "BANKOWNER",
        "companyName": null,
        "constitutionCode": null,
        "corporateTin": null,
        "createdAccountNumber": null,
        "createdCustomerNumber": null,
        "custCategory": "ID",
        "custType": "I",
        "dateOfIncorporation": "' . $dateofbirth . '",
        "docRef": null,
        "domicileCountry": null,
        "fingerPrint": null,
        "kycDoc": null,
        "mandate": null,
        "natureOfBusiness": null,
        "noCrTrans": "' . $noCrTrans . '",
        "noDbTrans": "' . $noCrTrans . '",
        "occupation": null,
        "postedBy": null,
        "preferredLanguage": null,
        "proofOfAddress": "HR",
        "reason": null,
        "relationDetails": [
            {
                "approvalPanel": null,
                "countryOfResidence": "' . $country . '",
                "dob": "' . $dateofbirth . '",
                "documentExpiry": "' . $nin_expiry_date . '",
                "documentId": "' . $nin . '",
                "documenttype": "National ID",
                "email": "' . $email . '",
                "firstName": "' . $first_name . '",
                "homeAddress": "' . $home_address1 . '",
                "homeAddress1": "' . $home_address2 . '",
                "issueAuthority": null,
                "issueDate": "' . $nin_issue_date . '",
                "lastName": "' . $last_name . '",
                "nationality": "' . $nationality . '",
                "otherName": "' . $middle_name . '",
                "personalPhone": "' . $phone_numer . '",
                "picture":  "' . $profile_code . '",
                "placeOfBirth": "' . $place_of_birth . '",
                "sex": "M",
                "signature": "' . $signature_code . '",
                "staffCategory": "N",
                "suffix": "stg",
                "tin": "' . $tin . '",
                "title": null,
                "workAddress": "sng"
            }
        ],
        "relationshipManagerCode": "001",
        "residenceStatus": null,
        "rfId": null,
        "riskCode": null,
        "sourceOfFunds": null,
        "sourceOfWorth": null,
        "subProduct": "' . $subProduct . '",
        "subSector": "' . $subSector . '",
        "subSegment": "' . $subSegment . '",
        "terminal": null,
        "totalCrTrans": "' . $totalCrtrans . '",
        "totalDbTrans": "' . $totalDbtrans . '",
        "userBranch": "' . $branch . '",
        "worthValue": ""
    }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);

    // echo $response;die();

    $res = json_decode($response);

    // echo "Account Number-> ".$res -> accountNumber. "Customer Number-> " .$res -> customerNumber;die();
    $bank_acc_no = $res->accountNumber;
    $customerNumber = $res->customerNumber;

    $query_br = "UPDATE employees set bank_acc_no = LPAD($bank_acc_no, 18, '0'), customerNumber = '$customerNumber'  where id = $id";
    $res_br = mysqli_query($mysqli, $query_br);

} elseif ($status == 'Rejected') {
    $sql = " UPDATE employees SET approval_status = 'Rejected', approved_date = CURRENT_DATE WHERE id = $id";
    $result = mysqli_query($mysqli, $sql);
    $row = mysqli_fetch_assoc($result);

} else {
    // echo ("Undefined");
    exit(json_encode([
        'responseCode' => "999",
        "message" => "Status not identified",
        "data" => null,
    ]));
}


