<?php

namespace app\controllers;

use app\services\HashtagService;
use Yii;
use yii\db\ActiveRecordInterface;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\Cors;
use yii\helpers\Url;
use yii\rest\ActiveController;
use yii\web\ServerErrorHttpException;
use yii\web\UploadedFile;

class PictureController extends ActiveController
{
    public $modelClass = 'app\models\Picture';

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator'] = ['class' => HttpBasicAuth::class];
        $behaviors['authenticator']['except'] = ['options'];

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => [Yii::$app->params['origin']],
                'Access-Control-Request-Method' => ['GET', 'POST'],
                'Access-Control-Request-Headers' => ['Authorization'],
                'Access-Control-Expose-Headers' => ['X-Pagination-Total-Count']
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
        $model->imageFile = UploadedFile::getInstanceByName('filename');
        $filePath = uniqid("{$model->imageFile->baseName}_") . '.' . $model->imageFile->extension;
        $model->url = $filePath;

        if ($model->save()) {
            $model->imageFile->saveAs('uploads/pictures/' . $filePath);
            $hashtags = explode(' ', Yii::$app->getRequest()->getBodyParams()['hashtags'] ?? '');
            (new HashtagService())->processHashtags($hashtags, $model->id);

            $response = Yii::$app->getResponse();
            $response->setStatusCode(201);
            $id = implode(',', $model->getPrimaryKey(true));
            $response->getHeaders()->set('Location', Url::toRoute(['view', 'id' => $id], true));
        } elseif (!$model->hasErrors()) {
            throw new ServerErrorHttpException('Failed to create the object for unknown reason.');
        }

        return $model;
    }
}
