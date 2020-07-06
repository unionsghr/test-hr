<?php
namespace Expenses\Admin\Api;

use Expenses\Common\Model\EmployeeExpense;

class ExpensePayrollUtils
{
    public function getApprovedExpensesTotal($employeeId, $startDate, $endDate)
    {
        $employeeExpense = new EmployeeExpense();
        $expenses = $employeeExpense->Find(
            'employee = ? and expense_date >= ? and expense_date <= ? and status = ?',
            array(
                $employeeId,
                $startDate,
                $endDate,
                'Approved'
            )
        );

        $total = 0;
        foreach ($expenses as $expense) {
            $total += floatval($expense->amount);
        }

        return $total;
    }
}
