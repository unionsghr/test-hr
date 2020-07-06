create table `LeaveTypes` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`supervisor_leave_assign` enum('Yes','No') default 'Yes',
	`employee_can_apply` enum('Yes','No') default 'Yes',
	`apply_beyond_current` enum('Yes','No') default 'Yes',
	`leave_accrue` enum('No','Yes') default 'No',
	`carried_forward` enum('No','Yes') default 'No',
	`default_per_year` decimal(10,3) NOT NULL,
	`carried_forward_percentage` int(11) NULL default 0,
	`carried_forward_leave_availability` int(11) NULL default 365,
	`propotionate_on_joined_date` enum('No','Yes') default 'No',
	`send_notification_emails` enum('Yes','No') default 'Yes',
	`leave_group` bigint(20) NULL,
	`leave_color` varchar(10) NULL,
	primary key  (`id`),
	unique key (`name`)
) engine=innodb default charset=utf8;

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
	`leave_group` bigint(20) NULL,
	primary key  (`id`)
) engine=innodb default charset=utf8;


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

create table `LeavePeriods` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`date_start` date default '0000-00-00',
	`date_end` date default '0000-00-00',
	`status` enum('Active','Inactive') default 'Inactive',
	primary key  (`id`)
) engine=innodb default charset=utf8;

create table `WorkDays` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`status` enum('Full Day','Half Day','Non-working Day') default 'Full Day',
	`country` bigint(20) DEFAULT NULL,
	primary key  (`id`),
	unique key `workdays_name_country` (`name`,`country`)
) engine=innodb default charset=utf8;

create table `HoliDays` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`dateh` date default '0000-00-00',
	`status` enum('Full Day','Half Day') default 'Full Day',
	`country` bigint(20) DEFAULT NULL,
	primary key  (`id`),
	unique key `holidays_dateh_country` (`dateh`,`country`)
) engine=innodb default charset=utf8;

create table `EmployeeLeaves` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`employee` bigint(20) NOT NULL,
	`leave_type` bigint(20) NOT NULL,
	`leave_period` bigint(20) NOT NULL,
	`date_start` date default '0000-00-00',
	`date_end` date default '0000-00-00',
	`details` text default null,
	`status` enum('Approved','Pending','Rejected','Cancellation Requested','Cancelled') default 'Pending',
	`attachment` varchar(100) NULL,
	CONSTRAINT `Fk_EmployeeLeaves_Employee` FOREIGN KEY (`employee`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `Fk_EmployeeLeaves_LeaveTypes` FOREIGN KEY (`leave_type`) REFERENCES `LeaveTypes` (`id`),
	CONSTRAINT `Fk_EmployeeLeaves_LeavePeriods` FOREIGN KEY (`leave_period`) REFERENCES `LeavePeriods` (`id`),
	primary key  (`id`)
) engine=innodb default charset=utf8;

create table `EmployeeLeaveLog` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`employee_leave` bigint(20) NOT NULL,
	`user_id` bigint(20) NULL,
	`data` varchar(500) NOT NULL,
	`status_from` enum('Approved','Pending','Rejected','Cancellation Requested','Cancelled') default 'Pending',
	`status_to` enum('Approved','Pending','Rejected','Cancellation Requested','Cancelled') default 'Pending',
	`created` timestamp default '0000-00-00 00:00:00',
	CONSTRAINT `Fk_EmployeeLeaveLog_EmployeeLeaves` FOREIGN KEY (`employee_leave`) REFERENCES `EmployeeLeaves` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT `Fk_EmployeeLeaveLog_Users` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
	primary key  (`id`)
) engine=innodb default charset=utf8;

create table `EmployeeLeaveDays` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`employee_leave` bigint(20) NOT NULL,
	`leave_date` date default '0000-00-00',
	`leave_type` enum('Full Day','Half Day - Morning','Half Day - Afternoon','1 Hour - Morning','2 Hours - Morning','3 Hours - Morning','1 Hour - Afternoon','2 Hours - Afternoon','3 Hours - Afternoon') NOT NULL,
	CONSTRAINT `Fk_EmployeeLeaveDays_EmployeeLeaves` FOREIGN KEY (`employee_leave`) REFERENCES `EmployeeLeaves` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	primary key  (`id`)
) engine=innodb default charset=utf8;




create table `Documents` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(100) NOT NULL,
	`details` text default null,
  `expire_notification` enum('Yes','No') default 'Yes',
  `expire_notification_month` enum('Yes','No') default 'Yes',
  `expire_notification_week` enum('Yes','No') default 'Yes',
  `expire_notification_day` enum('Yes','No') default 'Yes',
  `created` DATETIME default '0000-00-00 00:00:00',
  `updated` DATETIME default '0000-00-00 00:00:00',
	primary key  (`id`)
) engine=innodb default charset=utf8;


create table `EmployeeDocuments` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`employee` bigint(20) NOT NULL,
	`document` bigint(20) NULL,
	`date_added` date NOT NULL,
	`valid_until` date NOT NULL,
	`status` enum('Active','Inactive','Draft') default 'Active',
	`details` text default null,
	`attachment` varchar(100) NULL,
  `expire_notification_last` int(4) NULL,
	CONSTRAINT `Fk_EmployeeDocuments_Documents` FOREIGN KEY (`document`) REFERENCES `Documents` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT `Fk_EmployeeDocuments_Employee` FOREIGN KEY (`employee`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
	primary key  (`id`),
  KEY `KEY_EmployeeDocuments_valid_until` (`valid_until`),
  KEY `KEY_EmployeeDocuments_valid_until_status` (`valid_until`,`status`,`expire_notification_last`)
) engine=innodb default charset=utf8;






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

create table `Timezones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) not null default '',
  `details` varchar(255) not null default '',
  primary key  (`id`)
) engine=innodb default charset=utf8;







INSERT INTO `WorkDays` (`id`, `name`, `status`, `country`) VALUES
(1, 'Monday', 'Full Day',NULL),
(2, 'Tuesday', 'Full Day',NULL),
(3, 'Wednesday', 'Full Day',NULL),
(4, 'Thursday', 'Full Day',NULL),
(5, 'Friday', 'Full Day',NULL),
(6, 'Saturday', 'Non-working Day',NULL),
(7, 'Sunday', 'Non-working Day',NULL);

REPLACE INTO `Reports` (`id`, `name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
(1, 'Employee Details Report', 'This report list all employee details and you can filter employees by department, employment status or job title', '[\r\n[ "department", {"label":"Department","type":"select2","remote-source":["CompanyStructure","id","title"],"allow-null":true}],\r\n[ "employment_status", {"label":"Employment Status","type":"select2","remote-source":["EmploymentStatus","id","name"],"allow-null":true}],\r\n[ "job_title", {"label":"Job Title","type":"select2","remote-source":["JobTitle","id","name"],"allow-null":true}]\r\n]', 'Select id, employee_id as ''Employee ID'',\r\nconcat(`first_name`,'' '',`middle_name`,'' '', `last_name`) as ''Name'',\r\n(SELECT name from Nationality where id = nationality) as ''Nationality'',\r\nbirthday as ''Birthday'',\r\ngender as ''Gender'',\r\nmarital_status as ''Marital Status'',\r\nssn_num as ''SSN Number'',\r\nnic_num as ''NIC Number'',\r\nother_id as ''Other IDs'',\r\ndriving_license as ''Driving License Number'',\r\n(SELECT name from EmploymentStatus where id = employment_status) as ''Employment Status'',\r\n(SELECT name from JobTitles where id = job_title) as ''Job Title'',\r\n(SELECT name from PayGrades where id = pay_grade) as ''Pay Grade'',\r\nwork_station_id as ''Work Station ID'',\r\naddress1 as ''Address 1'',\r\naddress2 as ''Address 2'',\r\ncity as ''City'',\r\n(SELECT name from Country where code = country) as ''Country'',\r\n(SELECT name from Province where id = province) as ''Province'',\r\npostal_code as ''Postal Code'',\r\nhome_phone as ''Home Phone'',\r\nmobile_phone as ''Mobile Phone'',\r\nwork_phone as ''Work Phone'',\r\nwork_email as ''Work Email'',\r\nprivate_email as ''Private Email'',\r\njoined_date as ''Joined Date'',\r\nconfirmation_date as ''Confirmation Date'',\r\n(SELECT title from CompanyStructures where id = department) as ''Department'',\r\n(SELECT concat(`first_name`,'' '',`middle_name`,'' '', `last_name`,'' [Employee ID:'',`employee_id`,'']'') from Employees e1 where e1.id = e.supervisor) as ''Supervisor'' \r\nFROM Employees e _where_', '["department","employment_status","job_title"]', 'Query'),
(2, 'Employee Leaves Report', 'This report list all employee leaves by employee, date range and leave status', '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Leave Status","type":"select","source":[["NULL","All Statuses"],["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"],["Cancellation Requested","Cancellation Requested"],["Cancelled","Cancelled"]]}]\r\n]', 'EmployeeLeavesReport', '["employee","date_start","date_end","status"]', 'Class'),
(3, 'Employee Time Entry Report', 'This report list all employee time entries by employee, date range and project', '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "project", {"label":"Project","type":"select","allow-null":true,"remote-source":["Project","id","name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]', 'EmployeeTimesheetReport', '["employee","date_start","date_end","status"]', 'Class'),
(4, 'Employee Attendance Report', 'This report list all employee attendance entries by employee and date range', '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]', 'EmployeeAttendanceReport', '["employee","date_start","date_end"]', 'Class'),
(5, 'Employee Time Tracking Report', 'This report list employee working hours and attendance details for each day for a given period ', '[\r\n[ "employee", {"label":"Employee","type":"select2","allow-null":false,"remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]', 'EmployeeTimeTrackReport', '["employee","date_start","date_end"]', 'Class');

REPLACE INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
('Active Employee Report', 'This report list employees who are currently active based on joined date and termination date ',
'[\r\n[ "department", {"label":"Department","type":"select2","remote-source":["CompanyStructure","id","title"],"allow-null":true}]\r\n]',
 'ActiveEmployeeReport',
 '["department"]', 'Class');

REPLACE INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
('New Hires Employee Report', 'This report list employees who are joined between given two dates ',
'[[ "department", {"label":"Department","type":"select2","remote-source":["CompanyStructure","id","title"],"allow-null":true}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]',
 'NewHiresEmployeeReport',
 '["department","date_start","date_end"]', 'Class');

REPLACE INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
('Terminated Employee Report', 'This report list employees who are terminated between given two dates ',
'[[ "department", {"label":"Department","type":"select2","remote-source":["CompanyStructure","id","title"],"allow-null":true}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]',
 'TerminatedEmployeeReport',
 '["department","date_start","date_end"]', 'Class');

REPLACE INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
  ('Employee Leave Entitlement', 'This report list employees leave entitlement for current leave period by department or by employee ',
   '[[ "department", {"label":"Department","type":"select2","remote-source":["CompanyStructure","id","title"],"allow-null":true,"validation":"none"}],\r\n[ "employee", {"label":"Employee","type":"select2","allow-null":true,"validation":"none","remote-source":["Employee","id","first_name+last_name"]}]]',
   'EmployeeLeaveEntitlementReport',
   '["department","employee"]', 'Class');

REPLACE INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`) VALUES
  ('Travel Request Report', 'This report list employees travel requests for a specified period',
   '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Status","type":"select","source":[["NULL","All Statuses"],["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"],["Cancellation Requested","Cancellation Requested"],["Cancelled","Cancelled"]]}]\r\n]',
   'TravelRequestReport',
   '["employee","date_start","date_end","status"]', 'Class');


REPLACE INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
('Leave: Share Calendar to Whole Company', '1', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]'),
('Leave: CC Emails', '',  'Every email sent though leave module will be CC to these comma seperated list of emails addresses',''),
('Leave: BCC Emails', '',  'Every email sent though leave module will be BCC to these comma seperated list of emails addresses',''),
('Notifications: Send Document Expiry Emails', '1', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]'),
('Notifications: Copy Document Expiry Emails to Manager', '1', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]'),
('Expense: Pre-Approve Expenses', '0', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]');

REPLACE INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
  ('Travel: Pre-Approve Travel Request', '0', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]');


REPLACE INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
  ('Attendance: Use Department Time Zone', '0', '','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]');


INSERT INTO `LeavePeriods` (`id`, `name`, `date_start`, `date_end`, `status`) VALUES
  (1, 'Year 2013', '2013-01-01', '2013-12-31', 'Active'),
  (2, 'Year 2014', '2014-01-01', '2014-12-31', 'Active'),
  (3, 'Year 2015', '2015-01-01', '2015-12-31', 'Active'),
  (4, 'Year 2016', '2016-01-01', '2016-12-31', 'Active');

INSERT INTO `LeaveTypes` (`id`, `name`, `supervisor_leave_assign`, `employee_can_apply`, `apply_beyond_current`, `leave_accrue`, `carried_forward`, `default_per_year`) VALUES
  (1, 'Annual leave', 'No', 'Yes', 'No', 'No', 'No', 14),
  (2, 'Casual leave', 'Yes', 'Yes', 'No', 'No', 'No', 7),
  (3, 'Medical leave', 'Yes', 'Yes', 'Yes', 'No', 'No', 7);


INSERT INTO `Crons` (`name`,`class`, `lastrun`, `frequency`, `time`, `type`, `status`) VALUES
  ('Email Sender Task', 'EmailSenderTask', NULL, 1, 1, 'Minutely', 'Enabled'),
  ('Document Expire Alert', 'DocumentExpiryNotificationTask', NULL, 1, 1, 'Minutely', 'Enabled');




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

UPDATE `Settings` set value = '1' where name = 'System: Reset Modules and Permissions';


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