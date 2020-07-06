<?php
namespace Expenses\Rest;

use Classes\BaseService;
use Classes\Data\Query\DataQuery;
use Classes\IceResponse;
use Classes\RestEndPoint;
use Classes\Upload\Uploader;
use Employees\Common\Model\Employee;
use Expenses\Common\Model\EmployeeExpense;
use Users\Common\Model\User;

class ExpensesRestEndPoint extends RestEndPoint
{
    const ELEMENT_NAME = 'EmployeeExpense';

    public function getExpenseCategories(User $user)
    {
        $query = new DataQuery('ExpensesCategory');
        $query->setLength(500);
        return $this->listByQuery($query);
    }

    public function getExpensePaymentMethods(User $user)
    {
        $query = new DataQuery('ExpensesPaymentMethod');
        $query->setLength(500);
        return $this->listByQuery($query);
    }

    public function getUserExpenses(User $user)
    {
        $employee = new Employee();
        $employee->Load('id = ?', [$user->employee]);

        $employeeExpense = new EmployeeExpense();
        $employeeExpenseList = $employeeExpense->Find(
            'employee = ? order by expense_date desc limit 100',
            [$employee->id]
        );

        $expenseList = [];
        $employeeExpenseList = BaseService::getInstance()->populateMapping(
            $employeeExpenseList,
            [
                "payment_method" => [
                        "ExpensesPaymentMethod",
                        "id",
                        "name"
                    ],
                "category" => [
                        "ExpensesCategory",
                        "id",
                        "name"
                    ],
                "currency" => [
                        "CurrencyType",
                        "id",
                        "code"
                    ]
                ]
        );
        foreach ($employeeExpenseList as $expense) {
            $expense = BaseService::getInstance()->cleanUpAll($expense);
            $expense = BaseService::getInstance()->cleanUpApprovalModelParameters($expense);
            $expenseList[] = $expense;
        }

        return new IceResponse(IceResponse::SUCCESS, ['data' => $expenseList]);
    }

    public function addExpense(User $user)
    {
        $expenseData = $this->getRequestBody();
        $expenseData['employee'] = $user->employee;

        $response = BaseService::getInstance()->addElement('EmployeeExpense', $expenseData);
        if ($response->getStatus() === IceResponse::SUCCESS) {
            $expense = $response->getData();
            $expense = BaseService::getInstance()->cleanUpAll($expense);
            $expense = BaseService::getInstance()->cleanUpApprovalModelParameters($expense);

            return new IceResponse(IceResponse::SUCCESS, $expense, 201);
        }

        return $response;
    }
}
