<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 2:22 PM
 */

namespace Leaves\Common\Model;

use Model\BaseModel;

class HoliDay extends BaseModel
{
    public $table = 'HoliDays';
    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }
}
