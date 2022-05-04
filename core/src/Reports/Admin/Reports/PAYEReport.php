<?php
namespace Reports\Admin\Reports;

use Company\Common\Model\CompanyStructure;
use Reports\Admin\Api\CSVReportBuilder;
use Reports\Admin\Api\CSVReportBuilderInterface;
use Utils\LogManager;

class PAYEReport extends CSVReportBuilder implements CSVReportBuilderInterface
{
  
    public function getMainQuery()
    { 

        $query = "SELECT 
        tin_no as 'TIN NUMBER',
        employee_id as 'EMPLOYEE ID',
        -- first_name as 'FIRST NAME',
        -- middle_name as 'MIDDLE NAME',
        -- last_name as 'LAST NAME',
        (SELECT CONCAT(first_name, ' ', middle_name, ' ', last_name )) as 'EMPLOYEE NAME',
        birthday as 'DATE OF BIRTH',
        gender as 'GENDER',
        job_title as 'DESIGNATION',
        
        -- (SELECT name from PayGrades where id = pay_grade) as 'PAY GRADE',
        -- (SELECT name from Notches where id = notches) as 'NOTCH',
        -- bank_acc_no as 'ACCOUNT NUMBER',
        -- nassit_no as 'NASSIT No.',
        -- (SELECT br_description from Branches where br_code = branch) as 'BRANCH',        
        basic as 'BASIC SALARY',
        null as 'RENT ALLOWANCE',
        overtime as 'OVERTIME',
        null as 'COMMISSION',
        null as 'PAYMENT IN LIEU OF NOTICE',
        null as 'OTHER ALLOWANCES',
        -- (duty_allowance + lunch) AS 'OTHER_ALLOWANCES',
        --(select duty_allowance + lunch + stewards_allowance + displacement_allowance + audit_allowance + word_processing + sundry_allowance + car_allowance from vw_final_salaries)  as 'OTHER ALLOWANCES',
        --, lunch, stewards_allowance, displacement_allowance, audit_allowance, word_procesing, sundry_allowance, car_allowance
        null as 'LEAVE PASSAGE ALLOWANCE',
        null as 'BONUS',
        null as 'LEAVE ALLOWANCE IN EXCESS OF BASIC SALARY',
        null as 'BENEFIT IN KIND',
        transport as 'TRANSPORT',
        null as 'CLOTHING ALLOWANCE',
        null as 'STIPEND',
        null as 'OTHER INCOME',
        nassit10_deduct as 'NASSIT CONTRIBUTION',
        gross_salary as 'GROSS INCOME',
        taxable_income as 'TAXABLE INCOME',
        paye as 'PAYE'



        -- honorarium as 'HONORARIUM',
        -- transport as 'TRANSPORT',
        -- lunch as 'LUNCH',
        -- monthly_rent as 'RENT',
        -- gross_salary as 'GROSS SALARY',
        -- nassit_5 as 'EMPLOYEE NASSIT',
        -- nassit10_deduct as 'EMPLOYER NASSIT',
        -- medical_excess as 'MEDICAL EXCESS',
        -- union_dues as 'UNION DUES',            
        -- paye as 'PAYE'
        -- witholding_tax as 'WITHOLDING TAX',
        -- total_deduction as 'TOTAL DEDUCTION',
        -- net_salary as 'NET SALARY',
        -- (SELECT name from EmploymentStatus where id = employment_status) as 'EMPLOYMENT STATUS'
        -- payroll as 'PAYROLL'
        
        
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
