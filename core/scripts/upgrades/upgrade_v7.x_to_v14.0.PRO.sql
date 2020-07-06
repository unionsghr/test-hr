


REPLACE INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
('Employee Time Tracking Report', 'This report list employee working hours and attendance details for each day for a given period ', '[\r\n[ "employee", {"label":"Employee","type":"select2","allow-null":false,"remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]', 'EmployeeTimeTrackReport', '["employee","date_start","date_end"]', 'Class');


ALTER TABLE `LeaveTypes` ADD COLUMN `carried_forward_percentage` int(11) NULL default 0;
ALTER TABLE `LeaveTypes` ADD COLUMN `carried_forward_leave_availability` int(11) NULL default 365;
ALTER TABLE `LeaveTypes` ADD COLUMN `propotionate_on_joined_date` enum('No','Yes') default 'No';

ALTER TABLE `LeaveRules` ADD COLUMN `carried_forward_percentage` int(11) NULL default 0;
ALTER TABLE `LeaveRules` ADD COLUMN `carried_forward_leave_availability` int(11) NULL default 365;
ALTER TABLE `LeaveRules` ADD COLUMN `propotionate_on_joined_date` enum('No','Yes') default 'No';


UPDATE `LeaveTypes` set carried_forward_percentage = 100;
UPDATE `LeaveTypes` set carried_forward_leave_availability = 365;
UPDATE `LeaveTypes` set propotionate_on_joined_date = 'Yes';

UPDATE `LeaveRules` set carried_forward_percentage = 100;
UPDATE `LeaveRules` set carried_forward_leave_availability = 365;
UPDATE `LeaveRules` set propotionate_on_joined_date = 'Yes';



/* 8.4 to 9.0 */


ALTER TABLE  `Modules` ADD  `icon` VARCHAR( 50 ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL AFTER  `name`;

ALTER TABLE  `LeaveTypes` CHANGE  `default_per_year`  `default_per_year` decimal(10,3) NOT NULL;

ALTER TABLE  `EmployeeLeaveDays` CHANGE  `leave_type`  `leave_type` enum('Full Day','Half Day - Morning','Half Day - Afternoon','1 Hour - Morning','2 Hours - Morning','3 Hours - Morning','1 Hour - Afternoon','2 Hours - Afternoon','3 Hours - Afternoon') NOT NULL;

ALTER TABLE `Users` add column `user_roles` text null after user_level;
ALTER TABLE `Modules` add column `user_roles` text null;
ALTER TABLE `Modules` add column `label` varchar(100) NOT NULL after `name`;
ALTER TABLE `Employees` add column `status` enum('Active','Terminated') default 'Active' after `notes`;

create table `LeaveRulesTemp` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`leave_type` bigint(20) NOT NULL,
	`job_title` bigint(20) NULL,
	`employment_status` bigint(20) NULL,
	`employee` bigint(20) NULL,
	`supervisor_leave_assign` enum('Yes','No') default 'Yes',
	`employee_can_apply` enum('Yes','No') default 'Yes',
	`apply_beyond_current` enum('Yes','No') default 'Yes',
	`leave_accrue` enum('No','Yes') default 'No',
	`carried_forward` enum('No','Yes') default 'No',
	`default_per_year` bigint(20) NOT NULL,
	`carried_forward_percentage` int(11) NULL default 0,
	`carried_forward_leave_availability` int(11) NULL default 365,
	`propotionate_on_joined_date` enum('No','Yes') default 'No',
	primary key  (`id`)
) engine=innodb default charset=utf8;

insert into LeaveRulesTemp select * from LeaveRules;

drop table LeaveRules;

create table `LeaveRules` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`leave_type` bigint(20) NOT NULL,
	`job_title` bigint(20) NULL,
	`employment_status` bigint(20) NULL,
	`employee` bigint(20) NULL,
	`supervisor_leave_assign` enum('Yes','No') default 'Yes',
	`employee_can_apply` enum('Yes','No') default 'Yes',
	`apply_beyond_current` enum('Yes','No') default 'Yes',
	`leave_accrue` enum('No','Yes') default 'No',
	`carried_forward` enum('No','Yes') default 'No',
	`default_per_year` decimal(10,3) NOT NULL,
	`carried_forward_percentage` int(11) NULL default 0,
	`carried_forward_leave_availability` int(11) NULL default 365,
	`propotionate_on_joined_date` enum('No','Yes') default 'No',
	primary key  (`id`)
) engine=innodb default charset=utf8;

insert into LeaveRules select * from LeaveRulesTemp;


create table `LeaveGroups` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`details` text default null,
	`created` timestamp NULL default '0000-00-00 00:00:00',
	`updated` timestamp NULL default '0000-00-00 00:00:00',
	primary key  (`id`)
) engine=innodb default charset=utf8;

create table `LeaveGroupEmployees` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`employee` bigint(20) NOT NULL,
	`leave_group` bigint(20) NOT NULL,
	`created` timestamp NULL default '0000-00-00 00:00:00',
	`updated` timestamp NULL default '0000-00-00 00:00:00',
	CONSTRAINT `Fk_LeaveGroupEmployees_Employee` FOREIGN KEY (`employee`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `Fk_LeaveGroupEmployees_LeaveGroups` FOREIGN KEY (`leave_group`) REFERENCES `LeaveGroups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	primary key  (`id`),
	unique key `LeaveGroupEmployees_employee` (`employee`)
) engine=innodb default charset=utf8;


ALTER TABLE  `LeaveRules` ADD COLUMN  `leave_group` bigint(20) NULL;


create table `ImmigrationDocuments` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`details` text default null,
	`required` enum('Yes','No') default 'Yes',
	`alert_on_missing` enum('Yes','No') default 'Yes',
	`alert_before_expiry` enum('Yes','No') default 'Yes',
	`alert_before_day_number` int(11) NOT NULL,
	`created` timestamp NULL default '0000-00-00 00:00:00',
	`updated` timestamp NULL default '0000-00-00 00:00:00',
	primary key  (`id`)
) engine=innodb default charset=utf8;

drop table EmployeeImmigrations;

create table `EmployeeImmigrations` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`employee` bigint(20) NOT NULL,
	`document` bigint(20) NULL,
	`documentname` varchar(150) NOT NULL,
	`valid_until` date NOT NULL,
	`status` enum('Active','Inactive','Draft') default 'Active',
	`details` text default null,
	`attachment1` varchar(100) NULL,
	`attachment2` varchar(100) NULL,
	`attachment3` varchar(100) NULL,
	`created` timestamp NULL default '0000-00-00 00:00:00',
	`updated` timestamp NULL default '0000-00-00 00:00:00',
	CONSTRAINT `Fk_EmployeeImmigrations_Employee` FOREIGN KEY (`employee`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `Fk_EmployeeImmigrations_ImmigrationDocuments` FOREIGN KEY (`document`) REFERENCES `ImmigrationDocuments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
	primary key  (`id`)
) engine=innodb default charset=utf8;


create table `EmployeeTravelRecords` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`employee` bigint(20) NOT NULL,
	`type` enum('Local','International') default 'Local',
	`purpose` varchar(200) NOT NULL,
	`travel_from` varchar(200) NOT NULL,
	`travel_to` varchar(200) NOT NULL,
	`travel_date` datetime NULL default '0000-00-00 00:00:00',
	`return_date` datetime NULL default '0000-00-00 00:00:00',
	`details` varchar(500) default null,
	`attachment1` varchar(100) NULL,
	`attachment2` varchar(100) NULL,
	`attachment3` varchar(100) NULL,
	`created` timestamp NULL default '0000-00-00 00:00:00',
	`updated` timestamp NULL default '0000-00-00 00:00:00',
	CONSTRAINT `Fk_EmployeeTravelRecords_Employee` FOREIGN KEY (`employee`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	primary key  (`id`)
) engine=innodb default charset=utf8;

UPDATE `Settings` set value = '1' where name = 'System: Reset Modules and Permissions';
UPDATE `Settings` set value = '1' where name = 'System: Add New Permissions';


/* 9.0 to 10.x */

ALTER TABLE  `LeaveTypes` ADD COLUMN  `leave_group` bigint(20) NULL;
ALTER TABLE  `Employees` ADD COLUMN  `termination_date` DATETIME default '0000-00-00 00:00:00';
ALTER TABLE  `Employees` ADD COLUMN  `notes` text default null;

REPLACE INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
  ('Attendance: Time-sheet Cross Check', '0',  'Only allow users to add an entry to a timesheet only if they have marked atteandance for the selected period','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]');
REPLACE INTO `Reports` (`id`, `name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
  (2, 'Employee Leaves Report', 'This report list all employee leaves by employee, date range and leave status', '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Leave Status","type":"select","source":[["NULL","All Statuses"],["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"]]}]\r\n]', 'EmployeeLeavesReport', '["employee","date_start","date_end","status"]', 'Class'),
  (3, 'Employee Time Entry Report', 'This report list all employee time entries by employee, date range and project', '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "project", {"label":"Project","type":"select","allow-null":true,"remote-source":["Project","id","name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]', 'EmployeeTimesheetReport', '["employee","date_start","date_end","status"]', 'Class'),
  (4, 'Employee Attendance Report', 'This report list all employee attendance entries by employee and date range', '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]', 'EmployeeAttendanceReport', '["employee","date_start","date_end"]', 'Class');


INSERT INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
  ('Active Employee Report', 'This report list employees who are currently active based on joined date and termination date ',
   '[\r\n[ "department", {"label":"Department","type":"select2","remote-source":["CompanyStructure","id","title"],"allow-null":true}]\r\n]',
   'ActiveEmployeeReport',
   '["department"]', 'Class');


INSERT INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
  ('New Hires Employee Report', 'This report list employees who are joined between given two dates ',
   '[[ "department", {"label":"Department","type":"select2","remote-source":["CompanyStructure","id","title"],"allow-null":true}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]',
   'NewHiresEmployeeReport',
   '["department","date_start","date_end"]', 'Class');

INSERT INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
  ('Terminated Employee Report', 'This report list employees who are terminated between given two dates ',
   '[[ "department", {"label":"Department","type":"select2","remote-source":["CompanyStructure","id","title"],"allow-null":true}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]',
   'TerminatedEmployeeReport',
   '["department","date_start","date_end"]', 'Class');


/* v10.x to v12.x*/

create table `SalaryComponentType` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  primary key  (`id`)
) engine=innodb default charset=utf8;

create table `SalaryComponent` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `componentType` bigint(20) NULL,
  `details` text default null,
  CONSTRAINT `Fk_SalaryComponent_SalaryComponentType` FOREIGN KEY (`componentType`) REFERENCES `SalaryComponentType` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  primary key  (`id`)
) engine=innodb default charset=utf8;

create table `ImmigrationStatus` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  primary key  (`id`)
) engine=innodb default charset=utf8;

create table `Ethnicity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  primary key  (`id`)
) engine=innodb default charset=utf8;

create table `EmployeeImmigrationStatus` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `employee` bigint(20) NOT NULL,
  `status` bigint(20) NOT NULL,
  CONSTRAINT `Fk_EmployeeImmigrationStatus_Employee` FOREIGN KEY (`employee`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Fk_EmployeeImmigrationStatus_Type` FOREIGN KEY (`status`) REFERENCES `ImmigrationStatus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  primary key  (`id`)
) engine=innodb default charset=utf8;

create table `EmployeeEthnicity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `employee` bigint(20) NOT NULL,
  `ethnicity` bigint(20) NOT NULL,
  CONSTRAINT `Fk_EmployeeEthnicity_Employee` FOREIGN KEY (`employee`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Fk_EmployeeEthnicity_Ethnicity` FOREIGN KEY (`ethnicity`) REFERENCES `Ethnicity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  primary key  (`id`)
) engine=innodb default charset=utf8;

create table `RestAccessTokens` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL,
  `hash` varchar(32) default null,
  `token` varchar(500) default null,
  `created` DATETIME default '0000-00-00 00:00:00',
  `updated` DATETIME default '0000-00-00 00:00:00',
  primary key  (`id`),
  unique key `userId` (`userId`)
) engine=innodb default charset=utf8;


create table `FieldNameMappings` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `textOrig` varchar(200) default null,
  `textMapped` varchar(200) default null,
  `display` enum('Form','Table and Form','Hidden') default 'Form',
  `created` DATETIME default '0000-00-00 00:00:00',
  `updated` DATETIME default '0000-00-00 00:00:00',
  primary key  (`id`)
) engine=innodb default charset=utf8;

INSERT INTO `FieldNameMappings` (`type`, `name`, `textOrig`, `textMapped`, `display`) VALUES
  ('Employee', 'employee_id', 'Employee Number', 'Employee Number', 'Table and Form'),
  ('Employee', 'first_name', 'First Name', 'First Name', 'Table and Form'),
  ('Employee', 'middle_name', 'Middle Name', 'Middle Name', 'Form'),
  ('Employee', 'last_name', 'Last Name', 'Last Name', 'Table and Form'),
  ('Employee', 'nationality', 'Nationality', 'Nationality', 'Form'),
  ('Employee', 'ethnicity', 'Ethnicity', 'Ethnicity', 'Form'),
  ('Employee', 'immigration_status', 'Immigration Status', 'Immigration Status', 'Form'),
  ('Employee', 'birthday', 'Date of Birth', 'Date of Birth', 'Form'),
  ('Employee', 'gender', 'Gender', 'Gender', 'Form'),
  ('Employee', 'marital_status', 'Marital Status', 'Marital Status', 'Form'),
  ('Employee', 'ssn_num', 'SSN/NRIC', 'SSN/NRIC', 'Form'),
  ('Employee', 'nic_num', 'NIC', 'NIC', 'Form'),
  ('Employee', 'other_id', 'Other ID', 'Other ID', 'Form'),
  ('Employee', 'driving_license', 'Driving License No', 'Driving License No', 'Form'),
  ('Employee', 'employment_status', 'Employment Status', 'Employment Status', 'Form'),
  ('Employee', 'job_title', 'Job Title', 'Job Title', 'Form'),
  ('Employee', 'pay_grade', 'Pay Grade', 'Pay Grade', 'Form'),
  ('Employee', 'work_station_id', 'Work Station Id', 'Work Station Id', 'Form'),
  ('Employee', 'address1', 'Address Line 1', 'Address Line 1', 'Form'),
  ('Employee', 'address2', 'Address Line 2', 'Address Line 2', 'Form'),
  ('Employee', 'city', 'City', 'City', 'Form'),
  ('Employee', 'country', 'Country', 'Country', 'Form'),
  ('Employee', 'province', 'Province', 'Province', 'Form'),
  ('Employee', 'postal_code', 'Postal/Zip Code', 'Postal/Zip Code', 'Form'),
  ('Employee', 'home_phone', 'Home Phone', 'Home Phone', 'Form'),
  ('Employee', 'mobile_phone', 'Mobile Phone', 'Mobile Phone', 'Table and Form'),
  ('Employee', 'work_phone', 'Work Phone', 'Work Phone', 'Form'),
  ('Employee', 'work_email', 'Work Email', 'Work Email', 'Form'),
  ('Employee', 'private_email', 'Private Email', 'Private Email', 'Form'),
  ('Employee', 'joined_date', 'Joined Date', 'Joined Date', 'Form'),
  ('Employee', 'confirmation_date', 'Confirmation Date', 'Confirmation Date', 'Form'),
  ('Employee', 'termination_date', 'Termination Date', 'Termination Date', 'Form'),
  ('Employee', 'supervisor', 'Supervisor', 'Supervisor', 'Table and Form'),
  ('Employee', 'department', 'Department', 'Department', 'Table and Form'),
  ('Employee', 'notes', 'Notes', 'Notes', 'Form');


create table `CustomFields` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `data` text default null,
  `display` enum('Form','Table and Form','Hidden') default 'Form',
  `created` DATETIME default '0000-00-00 00:00:00',
  `updated` DATETIME default '0000-00-00 00:00:00',
  primary key  (`id`)
) engine=innodb default charset=utf8;


INSERT INTO `CustomFields` (`type`, `name`, `data`,`display`) VALUES
  ('Employee', 'custom1', '', 'Hidden'),
  ('Employee', 'custom2', '', 'Hidden'),
  ('Employee', 'custom3', '', 'Hidden'),
  ('Employee', 'custom4', '', 'Hidden'),
  ('Employee', 'custom5', '', 'Hidden'),
  ('Employee', 'custom6', '', 'Hidden'),
  ('Employee', 'custom7', '', 'Hidden'),
  ('Employee', 'custom8', '', 'Hidden'),
  ('Employee', 'custom9', '', 'Hidden'),
  ('Employee', 'custom10', '', 'Hidden');


Alter table `Employees` MODIFY COLUMN `middle_name` varchar(100) default null;
Alter table `Employees` MODIFY COLUMN `last_name` varchar(100) default null;
Alter table `Employees` MODIFY COLUMN `ssn_num` varchar(100) default NULL;
Alter table `Employees` MODIFY COLUMN `nic_num` varchar(100) default NULL;
Alter table `Employees` MODIFY COLUMN `other_id` varchar(100) default NULL;
Alter table `Employees` MODIFY COLUMN `driving_license` varchar(100) default NULL;
Alter table `Employees` MODIFY COLUMN `work_station_id` varchar(100) default NULL;
Alter table `Employees` MODIFY COLUMN `address1` varchar(100) default NULL;
Alter table `Employees` MODIFY COLUMN `address2` varchar(100) default NULL;
Alter table `Employees` MODIFY COLUMN `city` varchar(150) default NULL;


Alter table `Employees` ADD COLUMN `ethnicity` bigint(20) default null;
Alter table `Employees` ADD COLUMN `immigration_status` bigint(20) default null;


Alter table `EmployeeSalary` MODIFY COLUMN `component` bigint(20) NOT NULL;
Alter table `EmployeeSalary` MODIFY COLUMN `currency` bigint(20) NULL;

INSERT INTO `SalaryComponentType` (`id`,`code`, `name`) VALUES
  (1,'B001', 'Basic'),
  (2,'B002', 'Allowance');


INSERT INTO `SalaryComponent` (`name`, `componentType`) VALUES
  ('Basic Salary', 1),
  ('Fixed Allowance', 1),
  ('Car Allowance', 2),
  ('Telephone Allowance', 2);



/* v12.x to v14.0.PRO */

ALTER TABLE `CompanyStructures` ADD COLUMN `timezone` varchar(100) not null default 'Europe/London';


ALTER TABLE Documents ADD COLUMN `expire_notification` enum('Yes','No') default 'Yes';
ALTER TABLE Documents ADD COLUMN `expire_notification_month` enum('Yes','No') default 'Yes';
ALTER TABLE Documents ADD COLUMN `expire_notification_week` enum('Yes','No') default 'Yes';
ALTER TABLE Documents ADD COLUMN `expire_notification_day` enum('Yes','No') default 'Yes';
ALTER TABLE Documents ADD COLUMN `created` DATETIME default '0000-00-00 00:00:00';
ALTER TABLE Documents ADD COLUMN `updated` DATETIME default '0000-00-00 00:00:00';


ALTER TABLE EmployeeDocuments ADD COLUMN `expire_notification_last` int(4) NULL;
ALTER TABLE EmployeeDocuments ADD KEY `KEY_EmployeeDocuments_valid_until` (`valid_until`);
ALTER TABLE EmployeeDocuments ADD KEY `KEY_EmployeeDocuments_valid_until_status` (`valid_until`,`status`,`expire_notification_last`);


ALTER TABLE EmployeeTravelRecords ADD COLUMN `funding` decimal(10,3) NULL AFTER `details`;
ALTER TABLE EmployeeTravelRecords ADD COLUMN `currency` bigint(20) NULL AFTER `funding`;
ALTER TABLE EmployeeTravelRecords ADD COLUMN `status` enum('Approved','Pending','Rejected','Cancellation Requested','Cancelled') default 'Pending';


create table `LeaveStartingBalance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `leave_type` bigint(20) NOT NULL,
  `employee` bigint(20) NULL,
  `leave_period` bigint(20) NOT NULL,
  `amount` decimal(10,3) NOT NULL,
  `note` text DEFAULT NULL,
  `created` datetime default '0000-00-00 00:00:00',
  `updated` datetime default '0000-00-00 00:00:00',
  primary key  (`id`)
) engine=innodb default charset=utf8;

create table `Crons` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `class` varchar(100) NOT NULL,
  `lastrun` DATETIME default '0000-00-00 00:00:00',
  `frequency` int(4) NOT NULL,
  `time` varchar(50) NOT NULL,
  `type` enum('Minutely','Hourly','Daily','Weekly','Monthly','Yearly') default 'Hourly',
  `status` enum('Enabled','Disabled') default 'Enabled',
  primary key  (`id`),
  key `KEY_Crons_frequency` (`frequency`)
) engine=innodb default charset=utf8;

create table `Emails` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject` varchar(300) NOT NULL,
  `toEmail` varchar(300) NOT NULL,
  `template` text NULL,
  `params` text NULL,
  `cclist` varchar(500) NULL,
  `bcclist` varchar(500) NULL,
  `error` varchar(500) NULL,
  `created` DATETIME default '0000-00-00 00:00:00',
  `updated` DATETIME default '0000-00-00 00:00:00',
  `status` enum('Pending','Sent','Error') default 'Pending',
  primary key  (`id`),
  key `KEY_Emails_status` (`status`),
  key `KEY_Emails_created` (`created`)
) engine=innodb default charset=utf8;


create table `ExpensesCategories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `created` timestamp NULL default '0000-00-00 00:00:00',
  `updated` timestamp NULL default '0000-00-00 00:00:00',
  `pre_approve` enum('Yes','No') default 'Yes',
  primary key  (`id`)
) engine=innodb default charset=utf8;

create table `ExpensesPaymentMethods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `created` timestamp NULL default '0000-00-00 00:00:00',
  `updated` timestamp NULL default '0000-00-00 00:00:00',
  primary key  (`id`)
) engine=innodb default charset=utf8;


create table `EmployeeExpenses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `employee` bigint(20) NOT NULL,
  `expense_date` date NULL default '0000-00-00',
  `payment_method` bigint(20) NOT NULL,
  `transaction_no` varchar(300) NOT NULL,
  `payee` varchar(500) NOT NULL,
  `category` bigint(20) NOT NULL,
  `notes` text,
  `amount` decimal(10,3) NULL,
  `currency` bigint(20) NULL,
  `attachment1` varchar(100) NULL,
  `attachment2` varchar(100) NULL,
  `attachment3` varchar(100) NULL,
  `created` timestamp NULL default '0000-00-00 00:00:00',
  `updated` timestamp NULL default '0000-00-00 00:00:00',
  `status` enum('Approved','Pending','Rejected','Cancellation Requested','Cancelled') default 'Pending',
  CONSTRAINT `Fk_EmployeeExpenses_Employee` FOREIGN KEY (`employee`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Fk_EmployeeExpenses_pm` FOREIGN KEY (`payment_method`) REFERENCES `ExpensesPaymentMethods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Fk_EmployeeExpenses_category` FOREIGN KEY (`category`) REFERENCES `ExpensesCategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  primary key  (`id`)
) engine=innodb default charset=utf8;


create table `Timezones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) not null default '',
  `details` varchar(255) not null default '',
  primary key  (`id`)
) engine=innodb default charset=utf8;



INSERT INTO `Timezones`(`id`, `name`, `details`) VALUES
  (1, 'Pacific/Midway', '(GMT-11:00) Midway Island'),
  (2, 'US/Samoa', '(GMT-11:00) Samoa'),
  (3, 'US/Hawaii', '(GMT-10:00) Hawaii'),
  (4, 'US/Alaska', '(GMT-09:00) Alaska'),
  (5, 'US/Pacific', '(GMT-08:00) Pacific Time (US &amp; Canada)'),
  (6, 'America/Tijuana', '(GMT-08:00) Tijuana'),
  (7, 'US/Arizona', '(GMT-07:00) Arizona'),
  (8, 'US/Mountain', '(GMT-07:00) Mountain Time (US &amp; Canada)'),
  (9, 'America/Chihuahua', '(GMT-07:00) Chihuahua'),
  (10, 'America/Mazatlan', '(GMT-07:00) Mazatlan'),
  (11, 'America/Mexico_City', '(GMT-06:00) Mexico City'),
  (12, 'America/Monterrey', '(GMT-06:00) Monterrey'),
  (13, 'Canada/Saskatchewan', '(GMT-06:00) Saskatchewan'),
  (14, 'US/Central', '(GMT-06:00) Central Time (US &amp; Canada)'),
  (15, 'US/Eastern', '(GMT-05:00) Eastern Time (US &amp; Canada)'),
  (16, 'US/East-Indiana', '(GMT-05:00) Indiana (East)'),
  (17, 'America/Bogota', '(GMT-05:00) Bogota'),
  (18, 'America/Lima', '(GMT-05:00) Lima'),
  (19, 'America/Caracas', '(GMT-04:30) Caracas'),
  (20, 'Canada/Atlantic', '(GMT-04:00) Atlantic Time (Canada)'),
  (21, 'America/La_Paz', '(GMT-04:00) La Paz'),
  (22, 'America/Santiago', '(GMT-04:00) Santiago'),
  (23, 'Canada/Newfoundland', '(GMT-03:30) Newfoundland'),
  (24, 'America/Buenos_Aires', '(GMT-03:00) Buenos Aires'),
  (25, 'Greenland', '(GMT-03:00) Greenland'),
  (26, 'Atlantic/Stanley', '(GMT-02:00) Stanley'),
  (27, 'Atlantic/Azores', '(GMT-01:00) Azores'),
  (28, 'Atlantic/Cape_Verde', '(GMT-01:00) Cape Verde Is.'),
  (29, 'Africa/Casablanca', '(GMT) Casablanca'),
  (30, 'Europe/Dublin', '(GMT) Dublin'),
  (31, 'Europe/Lisbon', '(GMT) Lisbon'),
  (32, 'Europe/London', '(GMT) London'),
  (33, 'Africa/Monrovia', '(GMT) Monrovia'),
  (34, 'Europe/Amsterdam', '(GMT+01:00) Amsterdam'),
  (35, 'Europe/Belgrade', '(GMT+01:00) Belgrade'),
  (36, 'Europe/Berlin', '(GMT+01:00) Berlin'),
  (37, 'Europe/Bratislava', '(GMT+01:00) Bratislava'),
  (38, 'Europe/Brussels', '(GMT+01:00) Brussels'),
  (39, 'Europe/Budapest', '(GMT+01:00) Budapest'),
  (40, 'Europe/Copenhagen', '(GMT+01:00) Copenhagen'),
  (41, 'Europe/Ljubljana', '(GMT+01:00) Ljubljana'),
  (42, 'Europe/Madrid', '(GMT+01:00) Madrid'),
  (43, 'Europe/Paris', '(GMT+01:00) Paris'),
  (44, 'Europe/Prague', '(GMT+01:00) Prague'),
  (45, 'Europe/Rome', '(GMT+01:00) Rome'),
  (46, 'Europe/Sarajevo', '(GMT+01:00) Sarajevo'),
  (47, 'Europe/Skopje', '(GMT+01:00) Skopje'),
  (48, 'Europe/Stockholm', '(GMT+01:00) Stockholm'),
  (49, 'Europe/Vienna', '(GMT+01:00) Vienna'),
  (50, 'Europe/Warsaw', '(GMT+01:00) Warsaw'),
  (51, 'Europe/Zagreb', '(GMT+01:00) Zagreb'),
  (52, 'Europe/Athens', '(GMT+02:00) Athens'),
  (53, 'Europe/Bucharest', '(GMT+02:00) Bucharest'),
  (54, 'Africa/Cairo', '(GMT+02:00) Cairo'),
  (55, 'Africa/Harare', '(GMT+02:00) Harare'),
  (56, 'Europe/Helsinki', '(GMT+02:00) Helsinki'),
  (57, 'Europe/Istanbul', '(GMT+02:00) Istanbul'),
  (58, 'Asia/Jerusalem', '(GMT+02:00) Jerusalem'),
  (59, 'Europe/Kiev', '(GMT+02:00) Kyiv'),
  (60, 'Europe/Minsk', '(GMT+02:00) Minsk'),
  (61, 'Europe/Riga', '(GMT+02:00) Riga'),
  (62, 'Europe/Sofia', '(GMT+02:00) Sofia'),
  (63, 'Europe/Tallinn', '(GMT+02:00) Tallinn'),
  (64, 'Europe/Vilnius', '(GMT+02:00) Vilnius'),
  (65, 'Asia/Baghdad', '(GMT+03:00) Baghdad'),
  (66, 'Asia/Kuwait', '(GMT+03:00) Kuwait'),
  (67, 'Africa/Nairobi', '(GMT+03:00) Nairobi'),
  (68, 'Asia/Riyadh', '(GMT+03:00) Riyadh'),
  (69, 'Europe/Moscow', '(GMT+03:00) Moscow'),
  (70, 'Asia/Tehran', '(GMT+03:30) Tehran'),
  (71, 'Asia/Baku', '(GMT+04:00) Baku'),
  (72, 'Europe/Volgograd', '(GMT+04:00) Volgograd'),
  (73, 'Asia/Muscat', '(GMT+04:00) Muscat'),
  (74, 'Asia/Tbilisi', '(GMT+04:00) Tbilisi'),
  (75, 'Asia/Yerevan', '(GMT+04:00) Yerevan'),
  (76, 'Asia/Kabul', '(GMT+04:30) Kabul'),
  (77, 'Asia/Karachi', '(GMT+05:00) Karachi'),
  (78, 'Asia/Tashkent', '(GMT+05:00) Tashkent'),
  (79, 'Asia/Kolkata', '(GMT+05:30) Kolkata'),
  (80, 'Asia/Kathmandu', '(GMT+05:45) Kathmandu'),
  (81, 'Asia/Yekaterinburg', '(GMT+06:00) Ekaterinburg'),
  (82, 'Asia/Almaty', '(GMT+06:00) Almaty'),
  (83, 'Asia/Dhaka', '(GMT+06:00) Dhaka'),
  (84, 'Asia/Novosibirsk', '(GMT+07:00) Novosibirsk'),
  (85, 'Asia/Bangkok', '(GMT+07:00) Bangkok'),
  (86, 'Asia/Jakarta', '(GMT+07:00) Jakarta'),
  (87, 'Asia/Krasnoyarsk', '(GMT+08:00) Krasnoyarsk'),
  (88, 'Asia/Chongqing', '(GMT+08:00) Chongqing'),
  (89, 'Asia/Hong_Kong', '(GMT+08:00) Hong Kong'),
  (90, 'Asia/Kuala_Lumpur', '(GMT+08:00) Kuala Lumpur'),
  (91, 'Australia/Perth', '(GMT+08:00) Perth'),
  (92, 'Asia/Singapore', '(GMT+08:00) Singapore'),
  (93, 'Asia/Taipei', '(GMT+08:00) Taipei'),
  (94, 'Asia/Ulaanbaatar', '(GMT+08:00) Ulaan Bataar'),
  (95, 'Asia/Urumqi', '(GMT+08:00) Urumqi'),
  (96, 'Asia/Irkutsk', '(GMT+09:00) Irkutsk'),
  (97, 'Asia/Seoul', '(GMT+09:00) Seoul'),
  (98, 'Asia/Tokyo', '(GMT+09:00) Tokyo'),
  (99, 'Australia/Adelaide', '(GMT+09:30) Adelaide'),
  (100, 'Australia/Darwin', '(GMT+09:30) Darwin'),
  (101, 'Asia/Yakutsk', '(GMT+10:00) Yakutsk'),
  (102, 'Australia/Brisbane', '(GMT+10:00) Brisbane'),
  (103, 'Australia/Canberra', '(GMT+10:00) Canberra'),
  (104, 'Pacific/Guam', '(GMT+10:00) Guam'),
  (105, 'Australia/Hobart', '(GMT+10:00) Hobart'),
  (106, 'Australia/Melbourne', '(GMT+10:00) Melbourne'),
  (107, 'Pacific/Port_Moresby', '(GMT+10:00) Port Moresby'),
  (108, 'Australia/Sydney', '(GMT+10:00) Sydney'),
  (109, 'Asia/Vladivostok', '(GMT+11:00) Vladivostok'),
  (110, 'Asia/Magadan', '(GMT+12:00) Magadan'),
  (111, 'Pacific/Auckland', '(GMT+12:00) Auckland'),
  (112, 'Pacific/Fiji', '(GMT+12:00) Fiji');




INSERT INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
  ('Employee Leave Entitlement', 'This report list employees leave entitlement for current leave period by department or by employee ',
   '[[ "department", {"label":"Department","type":"select2","remote-source":["CompanyStructure","id","title"],"allow-null":true,"validation":"none"}],\r\n[ "employee", {"label":"Employee","type":"select2","allow-null":true,"validation":"none","remote-source":["Employee","id","first_name+last_name"]}]]',
   'EmployeeLeaveEntitlementReport',
   '["department","employee"]', 'Class');

REPLACE INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
  ('Travel Request Report', 'This report list employees travel requests for a specified period',
   '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Status","type":"select","source":[["NULL","All Statuses"],["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"],["Cancellation Requested","Cancellation Requested"],["Cancelled","Cancelled"]]}]\r\n]',
   'TravelRequestReport',
   '["employee","date_start","date_end","status"]', 'Class');

REPLACE INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
  ('Expense Report', 'This report list employees expenses for a specified period',
   '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Status","type":"select","source":[["NULL","All Statuses"],["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"],["Cancellation Requested","Cancellation Requested"],["Cancelled","Cancelled"]]}]\r\n]',
   'ExpenseReport',
   '["employee","date_start","date_end","status"]', 'Class');


REPLACE INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
  ('Company: Logo', '', '','[ "value", {"label":"Logo","type":"fileupload","validation":"none"}]'),
  ('Company: Description', 'This is a company using icehrm.com', '','');

REPLACE INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
  ('Notifications: Send Document Expiry Emails', '1', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]'),
  ('Notifications: Copy Document Expiry Emails to Manager', '1', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]'),
  ('Expense: Pre-Approve Expenses', '0', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]'),
  ('Travel: Pre-Approve Travel Request', '0', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]');

REPLACE INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
  ('Attendance: Use Department Time Zone', '0', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]');


INSERT INTO `Crons` (`name`,`class`, `lastrun`, `frequency`, `time`, `type`, `status`) VALUES
  ('Email Sender Task', 'EmailSenderTask', NULL, 1, 1, 'Minutely', 'Enabled'),
  ('Document Expire Alert', 'DocumentExpiryNotificationTask', NULL, 1, 1, 'Minutely', 'Enabled');


INSERT INTO `ExpensesPaymentMethods` (`name`) VALUES
  ('Cash'),
  ('Check'),
  ('Credit Card'),
  ('Debit Card');


INSERT INTO `ExpensesCategories` (`name`) VALUES
  ('Auto - Gas'),
  ('Auto - Insurance'),
  ('Auto - Maintenance'),
  ('Auto - Payment'),
  ('Transportation'),
  ('Bank Fees'),
  ('Dining Out'),
  ('Entertainment'),
  ('Hotel / Motel'),
  ('Insurance'),
  ('Interest Charges'),
  ('Loan Payment'),
  ('Medical'),
  ('Mileage'),
  ('Rent'),
  ('Rental Car'),
  ('Utility');