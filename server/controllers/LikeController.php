<?php

namespace app\controllers;

use Yii;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;

class LikeController extends ActiveController
{
    public $modelClass = 'app\models\PictureLike';

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator'] = ['class' => HttpBasicAuth::class];
        $behaviors['authenticator']['except'] = ['options'];

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => [Yii::$app->params['origin']],
                'Access-Control-Request-Method' => ['POST', 'DELETE'],
                'Access-Control-Request-Headers' => ['Authorization'],
            ],
        ];
        return $behaviors;
    }
}
