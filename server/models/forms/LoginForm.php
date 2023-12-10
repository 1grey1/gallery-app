<?php

namespace app\models\forms;

use app\models\User;
use yii\base\Model;

class LoginForm extends Model
{
    public $email;
    public $password;

    public function rules(): array
    {
        return [
            [['email'], 'trim'],
            [['email'], 'required'],
            [['email'], 'email'],

            [['password'], 'trim'],
            [['password'], 'required'],
            [['password'], 'validatePassword'],
        ];
    }

    public function validatePassword($attribute, $params): void
    {
        if (!$this->hasErrors()) {
            $user = User::findOne(['email' => $this->email]);
            if (!$user || !$user->validatePasswordHash($this->password)) {
                $this->addError($attribute, 'invalid email or password');
            }
        }
    }
}
