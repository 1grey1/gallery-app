<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%effect}}`.
 */
class m221116_000002_create_effect_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%effect}}', [
            'id' => $this->primaryKey()->unsigned(),
            'name' => $this->string(128)->notNull()->unique(),
            'css_filter' => $this->string(128)->null(),
            'range_min' => $this->integer()->unsigned()->null(),
            'range_max' => $this->integer()->unsigned()->null(),
            'step' => $this->float()->null(),
            'start' => $this->integer()->unsigned()->null(),
            'unit' => $this->string(8)->null(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%effect}}');
    }
}
