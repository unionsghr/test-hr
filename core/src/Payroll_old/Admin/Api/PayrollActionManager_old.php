<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 4:18 PM
 */

namespace Payroll\Admin\Api;

use Classes\BaseService;
use Classes\IceResponse;
use Classes\SubActionManager;
use Company\Common\Model\CompanyStructure;
use Employees\Common\Model\Employee;
use Payroll\Common\Model\Deduction;
use Payroll\Common\Model\Payroll;
use Payroll\Common\Model\PayrollCalculations;
use Payroll\Common\Model\PayrollColumn;
use Payroll\Common\Model\PayrollData;
use Salary\Common\Model\EmployeeSalary;
use Salary\Common\Model\PayrollEmployee;
use Salary\Common\Model\SalaryComponent;
use Utils\LogManager;
use Utils\Math\EvalMath;
  
class PayrollActionManager extends SubActionManager
{

    const REG_HOURS_PER_WEEK = 40;

    protected $calCache = array();

    public function addToCalculationCache($key, $val)
    {
        $this->calCache[$key] = $val;
    }

    public function getFromCalculationCache($key)
    {
        if (isset($this->calCache[$key])) {
            return $this->calCache[$key];
        }

        return null;
    }

    public function calculatePayrollColumn(
        $col,
        $payroll,
        $employeeId,
        $payrollEmployeeId,
        $noColumnCalculations = false
    ) {
    
        $val = $this->getFromCalculationCache($col->id."-".$payroll->id."-".$employeeId);
        if (!empty($val)) {
            return $val;
        }

        if (!empty($col->calculation_hook)) {
            $sum = BaseService::getInstance()->executeCalculationHook(
                array($employeeId, $payroll->date_start, $payroll->date_end),
                $col->calculation_hook,
                $col->calculation_function
            );
            $val = number_format(round($sum, 2), 2, '.', '');         
            $this->addToCalculationCache($col->id."-".$payroll->id."-".$employeeId, $val);
            return $val;
        }

        $sum = 0;

        $payRollEmp = new PayrollEmployee();
        $payRollEmp->Load("id = ?", array($payrollEmployeeId));

        //Salary
        LogManager::getInstance()->info("salary components row:".$col->salary_components);
        if (!empty($col->salary_components) &&
            !empty(json_decode($col->salary_components, true))) {
            $salaryComponent = new SalaryComponent();
            $salaryComponents = $salaryComponent->Find(
                "id in (".implode(",", json_decode($col->salary_components, true)).")",
                array()
            );
            LogManager::getInstance()->info("salary components:".$salaryComponents);
            foreach ($salaryComponents as $salaryComponent) {
                $sum += $this->getTotalForEmployeeSalaryByComponent($employeeId, $salaryComponent->id);
            }
        }

        //Deductions
        // $deductions = array();
        if (!empty($col->deductions) &&
            !empty(json_decode($col->deductions, true))) {
            $deduction = new Deduction();
            if (empty($payRollEmp->deduction_group)) {
                $deductions = $deduction->Find(
                    "id in (".implode(",", json_decode($col->deductions, true)).")",
                    array()
                );
            } else {
                $deductions = $deduction->Find(
                    "deduction_group = ? and id in (".implode(",", json_decode($col->deductions, true)).")",
                    array($payRollEmp->deduction_group)
                );
            }
            
                /////////////////   NEW  ////////////////////////////
            // $execeptionIds = json_decode($payRollEmp->deduction_exemptions, true);
            // foreach ($deductions as $deduct) {
            //     if(in_array($deduct->id, $execeptionIds)){
            //         continue;
            //     }
            //     $sum += $this->calculateDeductionValue($employeeId, $deduct, $payroll);
            // }

////////////////////                 SYSTEM     ////////////////////////////
        //     $allowedDeductions = $this->getAllowedDeductionsForEmployee($employeeId, $payRollEmp->deduction_group);
        //     foreach ($deductions as $deduction) {
        //         if (!in_array($deduction->id, $allowedDeductions)) {
        //             continue;
        //         }
        //     }
        //     foreach ($deductions as $deduction) {
        //         $sum += $this->calculateDeductionValue($employeeId, $deduction, $payroll);
        //     }
        // }

        if (!$noColumnCalculations) {
            $evalMath = new EvalMath();
            $evalMath->evaluate('max(x,y) = (y - x) * ceil(tanh(exp(tanh(y - x)) - exp(0))) + x');
            $evalMath->evaluate('min(x,y) = y - (y - x) * ceil(tanh(exp(tanh(y - x)) - exp(0)))');

            if (!empty($col->add_columns) &&
                !empty(json_decode($col->add_columns, true))) {
                $colIds = json_decode($col->add_columns, true);
                $payrollColumn = new PayrollColumn();
                $payrollColumns = $payrollColumn->Find("id in (".implode(",", $colIds).")", array());
                foreach ($payrollColumns as $payrollColumn) {
                    $sum += $this->calculatePayrollColumn(
                        $payrollColumn,
                        $payroll,
                        $employeeId,
                        $payrollEmployeeId,
                        true
                    );
                }
            }

            if (!empty($col->sub_columns) &&
                !empty(json_decode($col->sub_columns, true))) {
                $colIds = json_decode($col->sub_columns, true);
                $payrollColumn = new PayrollColumn();
                $payrollColumns = $payrollColumn->Find("id in (".implode(",", $colIds).")", array());
                foreach ($payrollColumns as $payrollColumn) {
                    $sum -= $this->calculatePayrollColumn(
                        $payrollColumn,
                        $payroll,
                        $employeeId,
                        $payrollEmployeeId,
                        true
                    );
                }
            }

            if (!empty($col->calculation_columns) &&
                !empty(json_decode($col->calculation_columns, true)) && !empty($col->calculation_function)) {
                $cc = json_decode($col->calculation_columns);
                $func = $col->calculation_function;
                foreach ($cc as $c) {
                    $value = $this->getFromCalculationCache($c->column."-".$payroll->id."-".$employeeId);
                    if (empty($value)) {
                        $value = 0.00;
                    }
                    $func = str_replace($c->name, $value, $func);
                }
                try {
                    $sum += $evalMath->evaluate($func);
                } catch (\Exception $e) {
                    LogManager::getInstance()->info("Error:".$e->getMessage());
                }
            }
        }

        return $sum;
        $val = number_format(round($sum, 2), 2, '.', '');
        
        $val = round($sum, 2);
        $this->addToCalculationCache($col->id."-".$payroll->id."-".$employeeId, $val);
        return $val;
    }

    private function calculateDeductionValue($employeeId, $deduction, $payroll)
    {

        $salaryComponents = array();
        if (!empty($deduction->componentType) && !empty(json_decode($deduction->componentType, true))) {
            $salaryComponent = new SalaryComponent();
            $salaryComponents = $salaryComponent->Find(
                "componentType in (".implode(",", json_decode($deduction->componentType, true)).")",
                array()
            );
        }

        $salaryComponents2 = array();
        if (!empty($deduction->component) && !empty(json_decode($deduction->component, true))) {
            $salaryComponent = new SalaryComponent();
            $salaryComponents2 = $salaryComponent->Find(
                "id in (".implode(",", json_decode($deduction->component, true)).")",
                array()
            );
        }

        $sum = 0;

        $salaryComponentIDs = array();
        foreach ($salaryComponents as $sc) {
            $salaryComponentIDs[] = $sc->id;
            $sum += $this->getTotalForEmployeeSalaryByComponent($employeeId, $sc->id);
        }

        foreach ($salaryComponents2 as $sc) {
            if (!in_array($sc->id, $salaryComponentIDs)) {
                $salaryComponents[] = $sc;
                $sum += $this->getTotalForEmployeeSalaryByComponent($employeeId, $sc->id);
            }
        }

        if (!empty($deduction->payrollColumn)) {
            $columnVal = $this->getFromCalculationCache($deduction->payrollColumn."-".$payroll->id."-".$employeeId);
            if (!empty($columnVal)) {
                $sum += $columnVal;
            }
        }

        $deductionFunction = $this->getDeductionFunction($deduction, $sum);
        if (empty($deductionFunction)) {
            LogManager::getInstance()->error("Deduction function not found");
            return 0;
        }

        $deductionFunction = str_replace("X", $sum, $deductionFunction);

        $evalMath = new EvalMath();
        $val = $evalMath->evaluate($deductionFunction);
        return floatval($val);
    }

    private function getDeductionFunction($deduction, $amount)
    {
        $amount = floatval($amount);
        $ranges = json_decode($deduction->rangeAmounts);
        foreach ($ranges as $range) {
            $lowerLimitPassed = false;
            if ($range->lowerCondition == "No Lower Limit") {
                $lowerLimitPassed = true;
            } elseif ($range->lowerCondition == "gt") {
                if (floatval($range->lowerLimit) < $amount) {
                    $lowerLimitPassed = true;
                }
            } elseif ($range->lowerCondition == "gte") {
                if (floatval($range->lowerLimit) <= $amount) {
                    $lowerLimitPassed = true;
                }
            }

            $upperLimitPassed = false;
            if ($range->upperCondition == "No Upper Limit") {
                $upperLimitPassed = true;
            } elseif ($range->upperCondition == "lt") {
                if (floatval($range->upperLimit) > $amount) {
                    $upperLimitPassed = true;
                }
            } elseif ($range->upperCondition == "lte") {
                if (floatval($range->upperLimit) >= $amount) {
                    $upperLimitPassed = true;
                }
            }

            if ($lowerLimitPassed && $upperLimitPassed) {
                return $range->amount;
            }
        }
        return null;
    }

    private function getTotalForEmployeeSalaryByComponent($employeeId, $salaryComponentId)
    {
        $empSalary = new EmployeeSalary();
        $list = $empSalary->Find("employee = ? and component =?", array($employeeId, $salaryComponentId));
        $sum = 0;
        foreach ($list as $empSalary) {
            $sum += floatval($empSalary->amount);
        }

        return $sum;
    }

    
    // private function getAllowedDeductionsForEmployee($employeeId, $deductionGroup)
    // {
    //     $payrollEmp = new PayrollEmployee();
    //     $payrollEmp->Load("employee = ?", array($employeeId));

    //     $allowed = array();
    //     $deduction = new Deduction();
    //     if (empty($payrollEmp->deduction_allowed) || empty(json_decode($payrollEmp->deduction_allowed, true))) {
    //         $allowed =  $deduction->Find("deduction_group = ?", array($deductionGroup));
    //     } else {
    //         $allowedIds = json_decode($payrollEmp->deduction_allowed, true);
    //         $allowed =  $deduction->Find("id in (".implode(",", $allowedIds).")");
    //     }

    //     $allowedFiltered = array();
    //     $disallowedIds = json_decode($payrollEmp->deduction_exemptions, true);

    //     if (!empty($disallowedIds)) {
    //         foreach ($allowed as $item) {
    //             if (!in_array($item->id, $disallowedIds)) {
    //                 $allowedFiltered[] = $item;
    //             }
    //         }
    //     } else {
    //         $allowedFiltered = $allowed;
    //     }

    //     $allowedIds = array();
    //     foreach ($allowedFiltered as $item) {
    //         $allowedIds[] = $item->id;
    //     }

    //     return $allowedIds;
    // }


    public function getAllData($req)
    {
        $cal = new PayrollCalculations();

        $rowTable = BaseService::getInstance()->getFullQualifiedModelClassName($req->rowTable);
        $columnTable = BaseService::getInstance()->getFullQualifiedModelClassName($req->columnTable);
        $valueTable = BaseService::getInstance()->getFullQualifiedModelClassName($req->valueTable);
        $save = $req->save;

        //Only select employees matching pay frequency

        $payroll = new Payroll();
        $payroll->Load("id = ?", array($req->payrollId));
        $columnList = json_decode($payroll->columns, true);

        //Get Child company structures
        $cssResp = CompanyStructure::getAllChildCompanyStructures($payroll->department);
        error_log(json_encode($cssResp));
        $css = $cssResp->getData();
        $cssIds = array();
        foreach ($css as $c) {
            $cssIds[] = $c->id;
        }

        
        $employeeNamesById = array();
        // $employeeAccountById = array();
        $baseEmp = new Employee();
        $baseEmpList = $baseEmp->Find(
            "department in (".implode(",", $cssIds).") and status = ?",
            array('Active')
        );

        LogManager::getInstance()->info("========baseEmpList======>>".($baseEmpList)."<<=================");

        $empIds = array();
        foreach ($baseEmpList as $baseEmp) {
            $employeeNamesById[$baseEmp->id] = $baseEmp->first_name." ".$baseEmp->middle_name." ".$baseEmp->last_name." ".$baseEmp->bank_acc_no;
            $empIds[] = $baseEmp->id;
        }



        $emp = new $rowTable();
        $emps = $emp->Find(
            "pay_frequency = ? and deduction_group = ? and employee in (".implode(",", $empIds).")",
            array($payroll->pay_period, $payroll->deduction_group)
        );
        if (!$emps) {
            error_log("Error:".$emp->ErrorMsg());
        } else {
            error_log("Employees:".json_encode($emps));
        }

        $employees = array();
        foreach ($emps as $emp) {
            $empNew = new \stdClass();
            $empNew->id = $emp->employee;
            $empNew->payrollEmployeeId = $emp->id;
            $empNew->name = $employeeNamesById[$emp->employee];
            // $empNew->name = $employeeAccountById[$emp->employee];
            $employees[] = $empNew;
        }

        $column = new $columnTable();
        $columns = $column->Find(
            "enabled = ? and id in (".implode(",", $columnList).") order by colorder, id",
            array('Yes')
        );

        $cost = new $valueTable();
        $costs = $cost->Find("payroll = ?", array($req->payrollId));

        //Build value map
        $valueMap = array();
        foreach ($costs as $val) {
            if (!isset($valueMap[$val->employee])) {
                $valueMap[$val->employee] = array();
            }

            $valueMap[$val->employee][$val->payroll_item] = $val;
        }

        //Fill hours worked
        foreach ($employees as $e) {
            if ($payroll->status != "Completed") {
                foreach ($columns as $column) {
                    if (isset($valueMap[$e->id][$column->id]) && $column->editable == "Yes") {
                        $this->addToCalculationCache(
                            $column->id."-".$payroll->id."-".$e->id,
                            $valueMap[$e->id][$column->id]->amount
                        );
                        continue;
                    }
                    $item = new PayrollData();
                    $item->payroll = $req->payrollId;
                    $item->employee = $e->id;
                    $item->payroll_item = $column->id;
                    $item->amount = $this->calculatePayrollColumn($column, $payroll, $e->id, $e->payrollEmployeeId);
                    if ($item->amount == "") {
                        $item->amount =  $column->default_value;
                    }
                    $valueMap[$e->id][$column->id] = $item;
                }
            }
        }

        $values = array();
        foreach ($valueMap as $key => $val) {
            $values = array_merge($values, array_values($val));
        }

        if ($save == "1") {
            foreach ($values as $value) {
                if (empty($value->id)) {
                    $value->Save();
                }
            }
        }

        if ($payroll->status == 'Processing') {
            $payroll->status =  'Completed';
            $payroll->Save();
        }

        if ($payroll->status == 'Completed') {
            $newCols = array();
            foreach ($columns as $col) {
                $col->editable = 'No';
                $newCols[] = $col;
            }
            $columns = $newCols;
        }
        
        return new IceResponse(IceResponse::SUCCESS, array($employees,$columns,$values));
    }

    // public function finalizeData($req){
    //     //Todo: POST Data to core banking platform
    //     // $curl = curl_init();

    //     // curl_setopt_array($curl, array(
    //     // CURLOPT_URL => "http://192.168.1.225:8680/core/api/v1.0/account/004008110815520173/transfer",
    //     // CURLOPT_RETURNTRANSFER => true,
    //     // CURLOPT_ENCODING => "",
    //     // CURLOPT_MAXREDIRS => 10,
    //     // CURLOPT_TIMEOUT => 0,
    //     // CURLOPT_FOLLOWLOCATION => true,
    //     // CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    //     // CURLOPT_CUSTOMREQUEST => "PUT",
    //     // CURLOPT_POSTFIELDS => "destinationAccountId=004005160508200119&amount=100&documentRef=woo&narration=sert745&postBy=UNIONADMIN&appBy=UG&customerTel=233206242008&transBy=USG&appBy=USG",
    //     // CURLOPT_HTTPHEADER => array(
    //     //     "Content-Type: application/x-www-form-urlencoded",
    //     //     "x-api-key: 20171411891",
    //     //     "x-api-secret: 141116517"
    //     // ),
    //     // ));

    //     // $response = curl_exec($curl);

    //     // curl_close($curl);
    //     // echo $response;

    // }

    public function updateAllData($req)
    {

        $resp = $this->updateData($req);

        if ($resp->getStatus() == IceResponse::SUCCESS) {
            $payroll = new Payroll();
            $payroll->Load("id = ?", array($req->payrollId));
            $payroll->status = 'Processing';
            $ok = $payroll->Save();
            if (!$ok) {
                return new IceResponse(IceResponse::ERROR, $payroll->ErrorMsg());
            }
        }
        return $resp;
    }

    public function updateData($req)
    {
        $payroll = new Payroll();
        $payroll->Load("id = ?", array($req->payrollId));
        if ($payroll->status == 'Completed') {
            return new IceResponse(IceResponse::ERROR, true);
        }
        $valueTable = BaseService::getInstance()->getFullQualifiedModelClassName($req->valueTable);
        $payrollId = $req->payrollId;
        foreach ($req as $key => $val) {
            if (!is_array($val)) {
                continue;
            }
            $data = new $valueTable();
            $data->Load("payroll = ? and employee = ? and payroll_item = ?", array($payrollId,$val[1],$val[0]));
            if (empty($data->id)) {
                $data->payroll = $payrollId;
                $data->employee = $val[1];
                $data->payroll_item = $val[0];
            }
            $data->amount = $val[2];
            LogManager::getInstance()->info("Saving payroll data :".json_encode($data));
            $ok = $data->Save();
            if (!$ok) {
                LogManager::getInstance()->error("Error saving payroll data:".$data->ErrorMsg());
            }
        }

        return new IceResponse(IceResponse::SUCCESS, true);
    }
}
