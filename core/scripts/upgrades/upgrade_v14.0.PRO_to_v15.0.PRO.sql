ALTER table `LeaveTypes` ADD COLUMN `max_carried_forward_amount` decimal(10,3) NULL default 0;
ALTER table `LeaveRules` ADD COLUMN `max_carried_forward_amount` decimal(10,3) NULL default 0;

ALTER table `Documents` ADD COLUMN `sign` enum('Yes','No') default 'Yes' after `expire_notification_day`;
ALTER table `Documents` ADD COLUMN `sign_label` VARCHAR(500) default null after `sign`;

ALTER table `Reports` ADD COLUMN `report_group` varchar(500) NULL;

ALTER table `EmployeeDocuments` ADD COLUMN `signature` text default null after `attachment`;

create table `CompanyDocuments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `details` text default null,
  `valid_until` date NOT NULL,
  `status` enum('Active','Inactive','Draft') default 'Active',
  `notify_employees` enum('Yes','No') default 'Yes',
  `attachment` varchar(100) NULL,
  primary key  (`id`)
) engine=innodb default charset=utf8;


ALTER table `Employees` ADD COLUMN `indirect_supervisors` VARCHAR(250) default null after `supervisor`;

INSERT INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
  ('Leave: Allow Indirect Admins to Approve', '0', 'Allow indirect admins to approve leave requests','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]');

INSERT INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
  ('System: Default Country', '0', 'Set the default Country','[ "value", {"label":"Country","type":"select2","remote-source":["Country","code","name"]}]');

UPDATE Reports set report_group = 'Employee Information' where name = 'Employee Details Report';
UPDATE Reports set report_group = 'Leave Management' where name = 'Employee Leaves Report';
UPDATE Reports set report_group = 'Time Management' where name = 'Employee Time Entry Report';
UPDATE Reports set report_group = 'Time Management' where name = 'Employee Attendance Report';
UPDATE Reports set report_group = 'Time Management' where name = 'Employee Time Tracking Report';
UPDATE Reports set report_group = 'Employee Information' where name = 'Active Employee Report';
UPDATE Reports set report_group = 'Employee Information' where name = 'New Hires Employee Report';
UPDATE Reports set report_group = 'Employee Information' where name = 'Terminated Employee Report';
UPDATE Reports set report_group = 'Leave Management' where name = 'Employee Leave Entitlement';
UPDATE Reports set report_group = 'Travel and Expense Management' where name = 'Travel Request Report';
UPDATE Reports set report_group = 'Travel and Expense Management' where name = 'Expense Report';

INSERT INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`) VALUES
  ('Employee Time Sheet Report', 'This report list all employee time sheets by employee and date range', '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Status","allow-null":true,"null-label":"All Status","type":"select","source":[["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"]]}]\r\n]', 'EmployeeTimeSheetData', '["employee","date_start","date_end","status"]', 'Class','Time Management');



INSERT INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
('Files: Upload Files to S3', '0', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]'),
('Files: Amazon S3 Key for File Upload', '', 'Please provide S3 Key for uploading files',''),
('Files: Amazone S3 Secret for File Upload', '',  'Please provide S3 Secret for uploading files',''),
('Files: S3 Bucket', '',  'Please provide S3 Bucket name for uploading files',''),
('Files: S3 Web Url', '',  'Please provide Url to the s3 bucket','');
