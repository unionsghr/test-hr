create table `EmployeeAttendanceSheets` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `employee` bigint(20) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `status` enum('Approved','Pending','Rejected','Submitted') default 'Pending',
  CONSTRAINT `Fk_EmployeeAttendanceSheets_Employee` FOREIGN KEY (`employee`) REFERENCES `Employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY `EmployeeAttendanceSheetsKey` (`employee`,`date_start`,`date_end`),
  KEY `EmployeeAttendanceSheets_date_end` (`date_end`),
  primary key  (`id`)
) engine=innodb default charset=utf8;

REPLACE INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
  ('Attendance: Overtime Calculation Period', 'Daily', 'Set the period for overtime calculation. (Affects attendance sheets)','["value", {"label":"Value","type":"select","source":[["Daily","Daily"],["Weekly","Weekly"]]}]');



ALTER TABLE `CustomFields` ADD unique key `CustomFields_name` (`type`,`name`);
Alter table `Reports` ADD COLUMN `output` varchar(15) NOT NULL default 'CSV';
Update Reports set output = 'CSV';

create table `CustomFieldValues` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`type` varchar(20) not null,
	`name` varchar(60) not null,
	`object_id` varchar(60) not null,
	`value` text default NULL,
	`updated` timestamp default '0000-00-00 00:00:00',
	`created` timestamp default '0000-00-00 00:00:00',
	primary key  (`id`),
	UNIQUE key `CustomFields_type_name_object_id` (`type`,`name`,`object_id`),
	INDEX `CustomFields_type_object_id` (`type`,`object_id`)
) engine=innodb default charset=utf8;


ALTER TABLE `CustomFields` ADD COLUMN `field_type` varchar(20) NULL;
ALTER TABLE `CustomFields` ADD COLUMN `field_label` varchar(50) NULL;
ALTER TABLE `CustomFields` ADD COLUMN `field_validation` varchar(50) NULL;
ALTER TABLE `CustomFields` ADD COLUMN `field_options` varchar(500) NULL;
ALTER TABLE `CustomFields` ADD COLUMN `display_order` int(11) default 0;



create table `DataImport` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(60) not null,
	`dataType` varchar(60) not null,
	`details` text default NULL,
	`columns` text default NULL,
	`updated` timestamp default '0000-00-00 00:00:00',
	`created` timestamp default '0000-00-00 00:00:00',
	primary key  (`id`)
) engine=innodb default charset=utf8;


create table `DataImportFiles` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(60) not null,
	`data_import_definition` varchar(200) not null,
	`status` varchar(15) null,
	`file` varchar(100) null,
	`details` text default NULL,
	`updated` timestamp default '0000-00-00 00:00:00',
	`created` timestamp default '0000-00-00 00:00:00',
	primary key  (`id`)
) engine=innodb default charset=utf8;


INSERT INTO `DataImport` (`id`, `name`, `dataType`, `details`, `columns`, `updated`, `created`) VALUES
(1, 'Sage50 Import - Employee Data', 'Sage50Employees', '', '[{"name":"employee_id","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"Yes","id":"columns_7"},{"name":"title","title":"title","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_1"},{"name":"initial","title":"Initial","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_2"},{"name":"first_name","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_3"},{"name":"middle_name","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_4"},{"name":"middle_name","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_5"},{"name":"last_name","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_6"},{"name":"address1","title":"Address1","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_8"},{"name":"address3","title":"Address3","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_10"},{"name":"address2","title":"Address2","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_9"},{"name":"address4","title":"Address4","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_11"},{"name":"address5","title":"Address5","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_12"},{"name":"postal_code","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_13"},{"name":"home_phone","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_14"},{"name":"mobile_phone","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_15"},{"name":"private_email","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_16"},{"name":"gender","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_17"},{"name":"marital_status","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_18"},{"name":"previous_surname","title":"Previous Surname","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_19"},{"name":"birthday","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_20"},{"name":"disabled","title":"Disabled","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_21"},{"name":"nationality","title":"Nationality","type":"Reference","dependOn":"Nationality","dependOnField":"name","isKeyField":"Yes","idField":"No","id":"columns_22"},{"name":"ethnicity","title":"Ethnicity","type":"Normal","dependOn":"Ethnicity","dependOnField":"name","isKeyField":"Yes","idField":"No","id":"columns_23"},{"name":"EmergencyContact/name","title":"","type":"Attached","dependOn":"EmergencyContact","dependOnField":"name","isKeyField":"Yes","idField":"No","id":"columns_24"},{"name":"EmergencyContact/relationship","title":"","type":"Attached","dependOn":"EmergencyContact","dependOnField":"relationship","isKeyField":"No","idField":"No","id":"columns_25"},{"name":"EmergencyContact/home_phone","title":"","type":"Attached","dependOn":"EmergencyContact","dependOnField":"home_phone","isKeyField":"No","idField":"No","id":"columns_26"},{"name":"tax_code","title":"Tax Code","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_27"},{"name":"wk1_mth1_basis","title":"Wk1Mth1 Basis","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_28"},{"name":"NI_category","title":"NI Category","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_29"},{"name":"nic_num","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_30"},{"name":"ssn_num","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_31"},{"name":"job_title","title":"","type":"Reference","dependOn":"JobTitle","dependOnField":"name","isKeyField":"Yes","idField":"No","id":"columns_32"},{"name":"employment_status","title":"","type":"Reference","dependOn":"EmploymentStatus","dependOnField":"name","isKeyField":"Yes","idField":"No","id":"columns_33"},{"name":"pay_frequency","title":"Pay Frequency","type":"Reference","dependOn":"PayFrequency","dependOnField":"name","isKeyField":"Yes","idField":"No","id":"columns_34"},{"name":"contracted_hours","title":"Contracted Hours","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_35"},{"name":"joined_date","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_36"},{"name":"termination_date","title":"","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_37"},{"name":"CompanyStructure/title","title":"","type":"Reference","dependOn":"CompanyStructure","dependOnField":"title","isKeyField":"Yes","idField":"No","id":"columns_38"},{"name":"cost_centre_reference","title":"Cost Centre","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_39"},{"name":"employee_notes","title":"Employee Notes","type":"Normal","dependOn":"NULL","dependOnField":"","isKeyField":"No","idField":"No","id":"columns_40"}]', '2016-06-03 00:26:32', '2016-06-03 00:26:32');


create table `UserReports` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `details` text default null,
  `parameters` text default null,
  `query` text default null,
  `paramOrder` varchar(500) NOT NULL,
  `type` enum('Query','Class') default 'Query',
  `report_group` varchar(500) NULL,
  `output` varchar(15) NOT NULL default 'CSV',
  primary key  (`id`),
  UNIQUE KEY `UserReports_Name` (`name`)
) engine=innodb default charset=utf8;


REPLACE INTO `UserReports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`,`output`) VALUES
  ('Leaves Report', 'This report list your leave applications, date range and leave status', '[\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Leave Status","type":"select","source":[["NULL","All Statuses"],["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"],["Cancellation Requested","Cancellation Requested"],["Cancelled","Cancelled"]]}]\r\n]', 'EmployeeLeavesReport', '["date_start","date_end","status"]', 'Class','Leave Management','CSV');

REPLACE INTO `UserReports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`,`output`) VALUES
  ('Time Entry Report', 'View your time entries by date range and project',
   '[\r\n[ "client", {"label":"Select Client","type":"select","allow-null":true,"null-label":"Not Selected","remote-source":["Client","id","name"]}],\r\n[ "project", {"label":"Or Project","type":"select","allow-null":true,"null-label":"All Projects","remote-source":["Project","id","name","getAllProjects"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]',
   'EmployeeTimesheetReport', '["client","project","date_start","date_end","status"]', 'Class','Time Management','CSV');

REPLACE INTO `UserReports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`,`output`) VALUES
  ('Attendance Report', 'View your attendance entries by date range', '[\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]', 'EmployeeAttendanceReport', '["date_start","date_end"]', 'Class','Time Management','CSV');

REPLACE INTO `UserReports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`,`output`) VALUES
  ('Time Tracking Report', 'View your working hours and attendance details for each day for a given period ', '[\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]', 'EmployeeTimeTrackReport', '["date_start","date_end"]', 'Class','Time Management','CSV');


REPLACE INTO `UserReports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`,`output`) VALUES
  ('Travel Request Report', 'View travel requests for a specified period',
   '[\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Status","type":"select","source":[["NULL","All Statuses"],["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"],["Cancellation Requested","Cancellation Requested"],["Cancelled","Cancelled"]]}]\r\n]',
   'TravelRequestReport',
   '["date_start","date_end","status"]', 'Class', 'Travel and Expense Management','CSV');

REPLACE INTO `UserReports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`,`output`) VALUES
  ('Expense Report', 'View expenses for a specified period',
   '[\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Status","type":"select","source":[["NULL","All Statuses"],["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"],["Cancellation Requested","Cancellation Requested"],["Cancelled","Cancelled"]]}]\r\n]',
   'ExpenseReport',
   '["date_start","date_end","status"]', 'Class','Travel and Expense Management','CSV');


REPLACE INTO `UserReports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`,`output`) VALUES
  ('Time Sheet Report', 'This report list all employee time sheets by employee and date range',
   '[\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}],\r\n[ "status", {"label":"Status","allow-null":true,"null-label":"All Status","type":"select","source":[["Approved","Approved"],["Pending","Pending"],["Rejected","Rejected"]]}]\r\n]',
   'EmployeeTimeSheetData',
   '["date_start","date_end","status"]', 'Class','Time Management','CSV');



REPLACE INTO `UserReports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`,`output`) VALUES
  ('Client Project Time Report', 'View your time entries for projects under a given client',
   '[\r\n[ "client", {"label":"Select Client","type":"select","allow-null":false,"remote-source":["Client","id","name"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]',
   'ClientProjectTimeReport', '["client","date_start","date_end","status"]', 'Class','Time Management','PDF');


REPLACE INTO `Reports` (`name`, `details`, `parameters`, `query`, `paramOrder`, `type`,`report_group`,`output`) VALUES
  ('Employee Time Entry Report', 'View employee time entries by date range and project',
   '[\r\n[ "employee", {"label":"Employee","type":"select2multi","allow-null":true,"null-label":"All Employees","remote-source":["Employee","id","first_name+last_name"]}],\r\n[ "client", {"label":"Select Client","type":"select","allow-null":true,"null-label":"Not Selected","remote-source":["Client","id","name"]}],\r\n[ "project", {"label":"Or Project","type":"select","allow-null":true,"null-label":"All Projects","remote-source":["Project","id","name","getAllProjects"]}],\r\n[ "date_start", {"label":"Start Date","type":"date"}],\r\n[ "date_end", {"label":"End Date","type":"date"}]\r\n]',
   'EmployeeTimesheetReport', '["employee","client","project","date_start","date_end","status"]', 'Class','Time Management','CSV');


Alter table `Projects` MODIFY COLUMN `status` enum('Active','On Hold','Completed', 'Dropped') default 'Active';

REPLACE INTO `Settings` (`name`, `value`, `description`, `meta`) VALUES
('System: Reset Module Names', '0', 'Select this to reset module names in Database','["value", {"label":"Value","type":"select","source":[["1","Yes"],["0","No"]]}]');


