<?php

namespace app\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "picture_hashtag".
 *
 * @property int $id
 * @property int $picture_id
 * @property int $hashtag_id
 *
 * @property Picture $picture
 * @property Hashtag $hashtag
 */
class PictureHashtag extends ActiveRecord
{
    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%picture_hashtag}}';
    }

    /**
     * @return ActiveQuery
     */
    public function getPicture(): ActiveQuery
    {
        return $this->hasOne(Picture::class, ['id' => 'picture_id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getHashtag(): ActiveQuery
    {
        return $this->hasOne(Hashtag::class, ['id' => 'hashtag_id']);
    }
}
