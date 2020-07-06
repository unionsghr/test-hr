<?php
ini_set('error_log', 'data/icehrm.log');

define('APP_NAME', 'UTB Hrm');
define('FB_URL', 'Hrm');
define('TWITTER_URL', 'Hrm');

define('CLIENT_NAME', 'app');
define('APP_BASE_PATH', 'C:/xampp/htdocs/utb_hr/core/');
define('CLIENT_BASE_PATH', 'C:/xampp/htdocs/utb_hr/app/');
define('BASE_URL','http://localhost/utb_hr/web/');
define('CLIENT_BASE_URL','http://localhost/utb_hr/app/');

define('APP_DB', 'hrmdatatest_utb');
define('APP_USERNAME', 'root');
define('APP_PASSWORD', '');
define('APP_HOST', 'localhost');
define('APP_CON_STR', 'mysqli://'.APP_USERNAME.':'.APP_PASSWORD.'@'.APP_HOST.'/'.APP_DB);

//file upload
define('FILE_TYPES', 'jpg,png,jpeg');
define('MAX_FILE_SIZE_KB', 10 * 1024);
 