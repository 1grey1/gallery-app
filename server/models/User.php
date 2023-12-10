<?php

namespace app\models;

use Yii;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $created_at
 * @property string $email
 * @property string $password_hash
 * @property string $username
 * @property string $avatar_path
 */
class User extends ActiveRecord implements IdentityInterface
{
    public $avatar;

    public static function tableName(): string
    {
        return '{{%user}}';
    }

    public function rules(): array
    {
        return [
            [['email'], 'required'],
            [['email'], 'trim'],
            [['email'], 'string', 'max' => 128],
            [['email'], 'email'],
            [['email'], 'unique'],

            [['password_hash'], 'required'],
            [['password_hash'], 'trim'],
            [['password_hash'], 'string', 'max' => 255],

            [['username'], 'required'],
            [['username'], 'trim'],
            [['username'], 'string', 'length' => [2, 128]],

            [['avatar_path'], 'required'],
            [['avatar_path'], 'trim'],
            [['avatar_path'], 'string', 'max' => 128],
            [['avatar_path'], 'unique'],

            [['avatar'], 'file', 'skipOnEmpty' => false, 'extensions' => 'png, jpg, jpeg'],
        ];
    }

    public function fields(): array
    {
        return [
            // название поля "name", атрибут "username"
            'id' => 'id',
            'email' => 'email',
            'name' => 'username',
            'avatar' => 'avatar_path',
        ];
    }

    // IdentityInterface
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(AccessToken::findOne(['token' => $token]));
    }

    public function getId()
    {
        return $this->id;
    }

    public function getAuthKey()
    {
        // TODO: Implement getAuthKey() method.
    }

    public function validateAuthKey($authKey)
    {
        // TODO: Implement validateAuthKey() method.
    }

    public function validatePasswordHash(string $password): bool
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }
}
