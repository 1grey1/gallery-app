<?php

namespace app\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "effect".
 *
 * @property int $id
 * @property string $name
 * @property string $css_filter
 * @property int $range_min
 * @property int $range_max
 * @property float $step
 * @property int $start
 * @property string $unit
 */
class Effect extends ActiveRecord
{
    public static function tableName(): string
    {
        return '{{%effect}}';
    }

    public function fields(): array
    {
        return [
            'id',
            'name',
            'css_filter',
            'range_min',
            'range_max',
            'step',
            'start',
            'unit',
        ];
    }
}
