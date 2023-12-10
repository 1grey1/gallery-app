<?php

namespace app\commands;

use Workerman\Worker;
use Yii;
use yii\console\Controller;

class WorkerController extends Controller
{
    public function actionIndex()
    {
        // Create a Websocket server
        $ws_worker = new Worker('websocket://' . Yii::$app->params['websocket']);

        // Emmited when a new connection come
        $ws_worker->onConnect = function ($connection) {
            echo "New connection\n";
        };

        // Emmited when data received
        $ws_worker->onMessage = function ($connection, $data) use ($ws_worker) {
            foreach ($ws_worker->connections as $conn) {
                if ($conn->id !== $connection->id) {
                    $conn->send($data);
                }
            }
        };

        // Emmited when connection closed
        $ws_worker->onClose = function ($connection) {
            echo "Connection closed\n";
        };

        Worker::runAll();
    }
}
