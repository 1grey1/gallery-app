<?php

namespace app\controllers;

use app\models\forms\LoginForm;
use app\models\User;
use Yii;
use yii\db\ActiveRecordInterface;
use yii\filters\Cors;
use yii\helpers\Json;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\ServerErrorHttpException;

class TokenController extends ActiveController
{
    public $modelClass = 'app\models\AccessToken';

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => [Yii::$app->params['origin']],
                'Access-Control-Request-Method' => ['POST'],
                'Access-Control-Expose-Headers' => ['errors'],
            ],
        ];
        return $behaviors;
    }

    public function actions(): array
    {
        $actions = parent::actions();
        unset($actions['create']);
        return $actions;
    }

    public function actionCreate(): ActiveRecordInterface
    {
        $model = new $this->modelClass;
        $response = Yii::$app->getResponse();

        $loginForm = new LoginForm();
        $loginForm->load(Yii::$app->getRequest()->getBodyParams(), '');

        if ($loginForm->validate()) {
            $model->token = Yii::$app->getSecurity()->generateRandomString();
            $model->user_id = User::findOne(['email' => $loginForm->email])->id;

            if ($model->save()) {
                $response->setStatusCode(201);
                $id = implode(',', $model->getPrimaryKey(true));
                $response->getHeaders()->set('Location', Url::toRoute(['view', 'id' => $id], true));
            } elseif (!$model->hasErrors()) {
                throw new ServerErrorHttpException('Failed to create the object for unknown reason.');
            }
        } else {
            $response->setStatusCode(422);
            $response->getHeaders()->set('errors', Json::encode($loginForm->errors));
        }

        return $model;
    }
}
