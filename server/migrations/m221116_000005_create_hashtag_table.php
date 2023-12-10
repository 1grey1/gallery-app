<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%hashtag}}`.
 */
class m221116_000005_create_hashtag_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%hashtag}}', [
            'id' => $this->primaryKey()->unsigned(),
            'name' => $this->string(128)->notNull()->unique(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%hashtag}}');
    }
}
