<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:39 PM
 */

namespace Forms\Common\Model;

class EmployeeFormApproval extends EmployeeForm
{
    // @codingStandardsIgnoreStart
    public function Find($whereOrderBy, $bindarr = false, $pkeysArr = false, $extra = array())
    {
        // @codingStandardsIgnoreEnd
        return $this->findApprovals(new EmployeeForm(), $whereOrderBy, $bindarr, $pkeysArr, $extra);
    }
}
