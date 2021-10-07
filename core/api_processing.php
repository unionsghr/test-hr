

<?php
echo "ygjhkj";
 

function callAPI($value='')
{
  # code...
  $request = new HttpRequest();
$request->setUrl('http://union.ngrok.io/core/api/v1.0/account/0122012176900/transfer');
$request->setMethod(HTTP_METH_PUT);

$request->setHeaders(array(
  'Postman-Token' => 'c1fa907e-633c-44b1-b16a-1d82b56e7a8e',
  'cache-control' => 'no-cache',
  'x-api-secret' => '141117101',
  'x-api-key' => '20171411240',
  'Content-Type' => 'application/x-www-form-urlencoded'
));


$request->setContentType('application/x-www-form-urlencoded');
$request->setPostFields(array(
  'destinationAccountId' => '0127001818500',
  'amount' => '2',
  'documentRef' => 'ret',
  'narration' => 'narration',
  'postBy' => 'UNIONADMIN',
  'appBy' => 'UG',
  'customerTel' => '+233206242008',
  'transBy' => 'Owner',
  'undefined' => null
));

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
}

?>

<html>
<p>Testing api</p>

<button onclick="callAPI();">Click me.</button>

<p> Testing API integration </p>

</html>
