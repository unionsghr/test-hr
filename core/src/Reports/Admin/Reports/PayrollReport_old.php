<?php
namespace Reports\Admin\Reports;

use Classes\BaseService;
use Reports\Admin\Api\ClassBasedReportBuilder;
use Reports\Admin\Api\ReportBuilderInterface;

class PayrollReport extends ClassBasedReportBuilder implements ReportBuilderInterface
{

    public function getData($report, $request)
    {
        $filters = [];

        if (!empty($request['department']) && $request['department'] !== "NULL") {
            $filters['department'] = $request['department'];
        }

        if (!empty($request['type']) && $request['type'] !== "NULL") {
            $filters['type'] = $request['type'];
        }

        if (!empty($request['employee']) && $request['employee'] !== "NULL") {
            $filters['employee'] = $request['employee'];
        }

        $mapping = [
            "department" => ["CompanyStructure","id","title"],
            "employee" => ["Employee","id","first_name+middle_name+last_name"],
            // "code" => ["Employee","id","first_name+middle_name+last_name"],
        ];
 
        $reportColumns = [
            ['label' => 'Employee', 'column' => 'employee'],
            ['label' => 'Account Number', 'column' => 'account_no'],
            ['label' => 'NASSIT Number', 'column' => 'nassit_no'],
            ['label' => 'Notch', 'column' => 'notch'],
            ['label' => 'Working Days', 'column' => 'working_days'],
            ['label' => 'Basic Salary', 'column' => 'basic_salary'],
            ['label' => 'Car Allowance', 'column' => 'car_allowance'],
            ['label' => 'Honorarium', 'column' => 'honorarium'],
            ['label' => 'Transport', 'column' => 'transport'],
            ['label' => 'Lunch', 'column' => 'lunch'],
            ['label' => 'Rent Witheld', 'column' => 'rent_witheld'],
            ['label' => 'Monthly Rent', 'column' => 'monthly_rent'],
            ['label' => 'Employee NASSIT', 'column' => 'nassit'],
            ['label' => 'Medical Excess', 'column' => 'medical_excess'],
            ['label' => 'Union Dues', 'column' => 'union_dues'],
            ['label' => 'Basic After Nassit', 'column' => 'basic_after_nassit'],
            ['label' => 'Total Allowance', 'column' => 'total_allowance'],
            ['label' => 'Gross Salary', 'column' => 'gross_salary'],
            ['label' => 'Taxable Basic', 'column' => 'taxable_basic'],
            ['label' => 'Taxable Income', 'column' => 'taxable_income'],
            ['label' => 'PAYE', 'column' => 'paye'],
            ['label' => 'Taxable Allowance', 'column' => 'taxable_allowance'],
            ['label' => 'Total Deduction', 'column' => 'total_deduction'],
           
        ];

        $customFieldsList = BaseService::getInstance()->getCustomFields('salaries');

        foreach ($customFieldsList as $customField) {
            $reportColumns[] = [
                'label' => $customField->field_label,
                'column' => $customField->name,
            ];
        }

        $entries = BaseService::getInstance()->get('Salaries', null, $filters);
        $data = [];
        foreach ($entries as $item) {
            $item =  BaseService::getInstance()->enrichObjectMappings($mapping, $item);
            $item =  BaseService::getInstance()->enrichObjectCustomFields('Salaries', $item);
            $data[] = $item;
        }

        $mappedColumns = array_keys($mapping);


        $reportData = [];
        $reportData[] = array_column($reportColumns, 'label');

        foreach ($data as $item) {
            $row = [];
            foreach ($reportColumns as $column) {
                if (in_array($column['column'], $mappedColumns)) {
                    $row[] = $item->{$column['column'].'_Name'};
                } else {
                    $row[] = $item->{$column['column']};
                }
            }
            $reportData[] = $row;
        }

        return $reportData;
    }
}
