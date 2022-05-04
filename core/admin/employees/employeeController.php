<?php
include_once 'dbConfig.php';


// $result = $db->query("SELECT * FROM annualrent;");  //This is where I specify what data to query
$sql = "SELECT * FROM annualrent";

$result = mysqli_query($conn, $sql);

$data = array();
while ($enr = mysqli_fetch_assoc($result)) {
  $a = array($enr['id'], $enr['name']);
  array_push($data, $a);
}

echo json_encode($data);

