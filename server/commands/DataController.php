<?php

namespace app\commands;

use app\models\AccessToken;
use app\models\Effect;
use app\models\User;
use Yii;
use yii\console\Controller;
use yii\console\ExitCode;
use yii\helpers\BaseInflector;

class DataController extends Controller
{
    const EFFECTS = [
        [
            'name' => 'none',
            'css_filter' => null,
            'range_min' => null,
            'range_max' => null,
            'step' => null,
            'start' => null,
            'unit' => null,
        ],
        [
            'name' => 'chrome',
            'css_filter' => 'grayscale',
            'range_min' => 0,
            'range_max' => 1,
            'step' => 0.1,
            'start' => 1,
            'unit' => null,
        ],
        [
            'name' => 'sepia',
            'css_filter' => 'sepia',
            'range_min' => 0,
            'range_max' => 1,
            'step' => 0.1,
            'start' => 1,
            'unit' => null,
        ],
        [
            'name' => 'marvin',
            'css_filter' => 'invert',
            'range_min' => 0,
            'range_max' => 100,
            'step' => 1,
            'start' => 100,
            'unit' => '%',
        ],
        [
            'name' => 'phobos',
            'css_filter' => 'blur',
            'range_min' => 0,
            'range_max' => 3,
            'step' => 0.1,
            'start' => 3,
            'unit' => 'px',
        ],
        [
            'name' => 'heat',
            'css_filter' => 'brightness',
            'range_min' => 1,
            'range_max' => 3,
            'step' => 0.1,
            'start' => 3,
            'unit' => null,
        ]
    ];

    public function actionImport(): int
    {
        define('ENTITIES', [
            'effect',
        ]);

        foreach (ENTITIES as $entity) {
            $pluralize_entity = (new BaseInflector())->pluralize($entity);
            $entity_const = strtoupper($pluralize_entity);
            print $pluralize_entity . ":\n";

            if (defined("self::$entity_const")) {
                foreach (constant("self::$entity_const") as $item) {
                    $serviceClass = '\app\services\\' . (new BaseInflector())->camelize(ucfirst($entity)) . 'Service';
                    $serviceClassMethod = 'dc_create';

                    if (class_exists($serviceClass) && method_exists($serviceClass, $serviceClassMethod)) {
                        var_dump((new $serviceClass())->{$serviceClassMethod}($item));
                    }
                }
            }

            print "\n";
        }

        return ExitCode::OK;
    }
}
