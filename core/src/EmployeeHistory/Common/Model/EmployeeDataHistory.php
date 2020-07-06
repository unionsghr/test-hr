<?php
/**
 * Created by PhpStorm.
 * User: Thilina
 * Date: 8/19/17
 * Time: 12:01 PM
 */

namespace EmployeeHistory\Common\Model;

use Classes\BaseService;
use FieldNames\Common\Model\FieldNameMapping;
use Model\BaseModel;

class EmployeeDataHistory extends BaseModel
{

    public $table = 'EmployeeDataHistory';

    private static $map;

    public function getAdminAccess()
    {
        return array("get","element","save","delete");
    }

    public function getManagerAccess()
    {
        return array("get","element","save");
    }

    public function getUserAccess()
    {
        return array();
    }

    public function postProcessGetData($obj)
    {

        $employee = BaseService::getInstance()->getItemFromCache('Employee', $obj->employee);
        $desc = "";
        if (!empty($employee)) {
            $desc = "[d]".self::getFiledName($obj->field)."[/d] updated from [p]".$obj->old_value."[/p] to [p]".
                $obj->new_value."[/p]";
        }
        $obj->description = $desc;

        $obj->created = gmdate('Y-m-d H:i:s', strtotime($obj->created));

        return $obj;
    }

    private static function getFiledName($name)
    {
        if (empty(self::$map)) {
            $fieldValue = new FieldNameMapping();
            $mappings  = $fieldValue->Find("type = ?", array('Employee'));
            self::$map = array();
            foreach ($mappings as $v) {
                self::$map[$v->name] = $v->textMapped;
            }
        }

        if (isset(self::$map[$name])) {
            return self::$map[$name];
        }

        return $name;
    }
}
