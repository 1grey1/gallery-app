<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'HA-MD-t2GB0aE-XQ0ocfu40ehEKFmrlj',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => false,
        ],
        'errorHandler' => [
            // 'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => \yii\symfonymailer\Mailer::class,
            'viewPath' => '@app/mail',
            // send all mails to a file by default.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'user',
                    'pluralize' => false,
                    'only' => ['create', 'options']
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'token',
                    'pluralize' => false,
                    'only' => ['create', 'options']
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'logout',
                    'pluralize' => false,
                    'only' => ['delete', 'options']
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'picture',
                    'pluralize' => false,
                    'only' => ['index', 'view', 'create', 'options']
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'comment',
                    'pluralize' => false,
                    'only' => ['create', 'options']
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'effect',
                    'pluralize' => false,
                    'only' => ['index', 'options']
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'like',
                    'pluralize' => false,
                    'only' => ['create', 'delete', 'options']
                ],
            ],
        ],
    ],
    'params' => $params,
    'language' => 'en',
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;
