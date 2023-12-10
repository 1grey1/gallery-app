<?php

namespace app\controllers;

use Yii;
use yii\db\ActiveRecordInterface;
use yii\filters\Cors;
use yii\helpers\Json;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\ServerErrorHttpException;
use yii\web\UploadedFile;

class UserController extends ActiveController
{
    public $modelClass = 'app\models\User';

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
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');
        $model->avatar = UploadedFile::getInstanceByName('avatar');
        $filePath = null;

        if ($model->avatar) {
            $filePath = uniqid("{$model->avatar->baseName}_") . '.' . $model->avatar->extension;
            $model->avatar_path = $filePath;
        }

        if ($model->password_hash) {
            $model->password_hash = Yii::$app->getSecurity()->generatePasswordHash($model->password_hash);
        }

        if ($model->save()) {
            $model->avatar->saveAs('uploads/avatars/' . $filePath);
            $response = Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = implode(',', $model->getPrimaryKey(true));
            $response->getHeaders()->set('Location', Url::toRoute(['view', 'id' => $id], true));
        } elseif ($model->hasErrors()) {
            $response = Yii::$app->getResponse();
            $response->getHeaders()->set('errors', Json::encode($model->errors));
        } elseif (!$model->hasErrors()) {
            throw new ServerErrorHttpException('Failed to create the object for unknown reason.');
        }

        return $model;
    }
}
