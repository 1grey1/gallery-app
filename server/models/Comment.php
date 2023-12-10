<?php

namespace app\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "comment".
 *
 * @property int $id
 * @property string $created_at
 * @property string $message
 * @property int $user_id
 * @property int $picture_id
 *
 * @property User $user
 */
class Comment extends ActiveRecord
{
    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%comment}}';
    }
    
    /**
     * @return array
     */
    public function rules():array
    {
        return [
            [['message'], 'required'],
            [['message'], 'trim'],
            [['message'], 'string'],

            [['user_id'], 'required'],
            [['user_id'], 'integer'],
            [['user_id'], 'exist', 'targetClass' => User::class, 'targetAttribute' => 'id'],

            [['picture_id'], 'required'],
            [['picture_id'], 'integer'],
            [['picture_id'], 'exist', 'targetClass' => Picture::class, 'targetAttribute' => 'id'],
        ];
    }

    /**
     * @return string[]
     */
    public function fields(): array
    {
        return [
            'id',
            'message',
            'user',
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getUser(): ActiveQuery
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }
}
