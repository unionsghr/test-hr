function callAPI(){
	var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://union.ngrok.io/core/api/v1.0/account/0122012176900/transfer",
    "method": "PUT",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-api-key": "20171411240",
      "x-api-secret": "141117101",
      "cache-control": "no-cache",
      "Postman-Token": "6dece716-fcc0-4acc-add0-dc6b80e7d2c7"
    },
    "data": {
      "destinationAccountId": "exp_gl",
      "amount": "amount",
      "documentRef": "transaction_no",
      "narration": "notes",
      "postBy": "UNIONADMIN",
      "appBy": "UG",
      "customerTel": "+233206242008",
      "transBy": "employee"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

}