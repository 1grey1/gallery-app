<?php

namespace app\controllers;

use Yii;
use yii\filters\auth\HttpBasicAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;

class EffectController extends ActiveController
{
    public $modelClass = 'app\models\Effect';

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator'] = ['class' => HttpBasicAuth::class];
        $behaviors['authenticator']['except'] = ['options'];

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => [Yii::$app->params['origin']],
                'Access-Control-Request-Method' => ['GET'],
                'Access-Control-Request-Headers' => ['Authorization'],
            ],
        ];
        return $behaviors;
    }
}
