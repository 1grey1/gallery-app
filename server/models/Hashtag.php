<?php

namespace app\models;

use yii\base\InvalidConfigException;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "hashtag".
 *
 * @property int $id
 * @property string $name
 *
 * @property Picture[] $pictures
 */
class Hashtag extends ActiveRecord
{
    /**
     * @return string
     */
    public static function tableName():string
    {
        return '{{%hashtag}}';
    }

    /**
     * @return string[]
     */
    public function fields(): array
    {
        return [
            'id',
            'name'
        ];
    }

    /**
     * @return ActiveQuery
     * @throws InvalidConfigException
     */
    public function getPictures(): ActiveQuery
    {
        return $this
            ->hasMany(Picture::class, ['id' => 'picture_id'])
            ->viaTable('picture_hashtag', ['hashtag_id' => 'id']);
    }
}
