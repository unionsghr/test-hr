<?php
namespace Reports\Admin\Reports;

use Company\Common\Model\CompanyStructure;
use Reports\Admin\Api\CSVReportBuilder;
use Reports\Admin\Api\CSVReportBuilderInterface;
use Utils\LogManager;

class PayrollReport extends CSVReportBuilder implements CSVReportBuilderInterface
{
  
    public function getMainQuery()
    { 

        $query = "SELECT 
        /*employee_id as 'EMPLOYEE ID',
        first_name as 'FIRST NAME',
        middle_name as 'MIDDLE NAME',
        last_name as 'LAST NAME',
        (SELECT name from PayGrades where id = pay_grade) as 'PAY GRADE',
        (SELECT name from Notches where id = notches) as 'NOTCH',
        bank_acc_no as 'ACCOUNT NUMBER',
        nassit_no as 'NASSIT No.',
        (SELECT br_description from Branches where br_code = branch) as 'BRANCH',        
       */ sum(basic) as 'BASIC SALARY',
       'Basic Salary' AS `component_type`,
        'D' AS `flag`,
        branch AS `branch`,
        '143000000001' AS `general_ledger`,
        'Permanent' AS `status`
        -- FROM vw_final_salaries
        /*casual_labour as 'CASUAL LABOUR',
        duty_allowance as 'DUTY ALLOWANCE',
        overtime as 'OVERTIME',
        transport as 'TRANSPORT',
        lunch as 'LUNCH',
        rent as 'RENT',
        stewards_allowance as 'STEWARDS ALLOWANCE',
        displacement_allowance as 'DISPLACEMENT ALLOWANCE',
        audit_allowance as 'AUDIT ALLOWANCE',
        word_processing as 'WORD PROCESSING',
        sundry_allowance as 'SUNDRY ALLOWANCE',
        bonus as 'BONUS',
        car_allowance as 'CAR ALLOWANCE',
        gross_salary as 'GROSS SALARY',
        nassit_5 as 'EMPLOYEE NASSIT',
        nassit10_deduct as 'EMPLOYER NASSIT',
        medical_excess as 'MEDICAL EXCESS',
        staff_association as 'STAFF ASSOCIATION',            
        paye as 'PAYE',
        witholding_tax as 'WITHOLDING TAX',
        total_deduction as 'TOTAL DEDUCTION',
        net_salary as 'NET SALARY',
        (SELECT name from EmploymentStatus where id = employment_status) as 'EMPLOYMENT STATUS'
        */-- payroll as 'PAYROLL'
        
        
        FROM vw_final_salaries ";

        return $query;
        
    }

    public function getWhereQuery($request)
    {
        $query = "";
        $params = array();

        // if ($request['employment_status']){
        //     $params = array();
        //     // $query = "where ((termination_date is NULL or termination_date = '0001-01-01 00:00:00' 
        //     // or termination_date = '0000-00-00 00:00:00') and recruitment_date < NOW()) or 
        //     // (termination_date > NOW() and recruitment_date < NOW())";
        //     $emp_status = $this->getChildCompanyStuctures($request['employment_status']);
        //     $query = "where employment_status in (".implode(",", $emp_status)
        //         .")";
        // } else 
        {
            $depts = $this->getChildCompanyStuctures($request['payroll']);
            $query = "where payroll in (".implode(",", $depts)
                .")";
                //  and (((termination_date is NULL or termination_date = '0001-01-01 00:00:00' 
                // or termination_date = '0000-00-00 00:00:00') and recruitment_date < NOW()) 
                // or (termination_date > NOW() and recruitment_date < NOW()))";
        }


        return array($query, $params);
    }

    public function getChildCompanyStuctures($companyStructId)
    {
        $childIds = array();
        $childIds[] = $companyStructId;
        $nodeIdsAtLastLevel = $childIds;
        $count = 0;
        // do {
        //     $count++;
        //     $companyStructTemp = new CompanyStructure();
        //     if (empty($nodeIdsAtLastLevel) || empty($childIds)) {
        //         break;
        //     }
        //     $idQuery = "parent in (".implode(",", $nodeIdsAtLastLevel).") and id not in(".implode(",", $childIds).")";
        //     LogManager::getInstance()->debug($idQuery);
        //     $list = $companyStructTemp->Find($idQuery, array());
        //     if (!$list) {
        //         LogManager::getInstance()->debug($companyStructTemp->ErrorMsg());
        //     }
        //     $nodeIdsAtLastLevel = array();
        //     foreach ($list as $item) {
        //         $childIds[] = $item->id;
        //         $nodeIdsAtLastLevel[] = $item->id;
        //     }
        // } while (count($list) > 0 && $count < 10);

        return $childIds;
    }
}
