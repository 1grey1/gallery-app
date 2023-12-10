<?php

namespace app\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "picture_like".
 *
 * @property int $id
 * @property string $created_at
 * @property int $user_id
 * @property int $picture_id
 *
 * @property User $user
 * @property Picture $picture
 */
class PictureLike extends ActiveRecord
{
    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%picture_like}}';
    }

    /**
     * @return array
     */
    public function rules():array
    {
        return [
            [['user_id'], 'required'],
            [['user_id'], 'integer'],
            [['user_id'], 'exist', 'targetClass' => User::class, 'targetAttribute' => 'id'],

            [['picture_id'], 'required'],
            [['picture_id'], 'integer'],
            [['picture_id'], 'exist', 'targetClass' => Picture::class, 'targetAttribute' => 'id'],

            [['user_id', 'picture_id'], 'unique', 'targetAttribute' => ['user_id', 'picture_id']],
        ];
    }

    public function fields(): array
    {
        return [
            'id',
            'created_at',
            'user_id',
            'picture_id',
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getUser(): ActiveQuery
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getPicture(): ActiveQuery
    {
        return $this->hasOne(Picture::class, ['id' => 'picture_id']);
    }
}
