<?php

namespace app\models;

use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "access_token".
 *
 * @property int $id
 * @property string $created_at
 * @property string $token
 * @property int $user_id
 *
 * @property User $user
 */
class AccessToken extends ActiveRecord
{
    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%access_token}}';
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            [['token'], 'required'],
            [['token'], 'trim'],
            [['token'], 'string', 'max' => 128],

            [['user_id'], 'required'],
            [['user_id'], 'integer'],
            [['user_id'], 'exist', 'targetClass' => User::class, 'targetAttribute' => 'id'],

            [['user_id', 'token'], 'unique', 'targetAttribute' => ['user_id', 'token']],
        ];
    }

    /**
     * @return string[]
     */
    public function fields(): array
    {
        return [
            'id',
            'created_at',
            'token',
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
