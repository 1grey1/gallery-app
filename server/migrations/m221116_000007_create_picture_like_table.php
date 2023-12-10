<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%picture_like}}`.
 */
class m221116_000007_create_picture_like_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%picture_like}}', [
            'id' => $this->primaryKey()->unsigned(),
            'created_at' => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP'),
            'user_id' => $this->integer()->unsigned()->notNull(),
            'picture_id' => $this->integer()->unsigned()->notNull(),
        ]);

        // creates index for column `user_id`
        $this->createIndex(
            'idx-picture_like-user_id',
            'picture_like',
            'user_id'
        );

        // add foreign key for table `user`
        $this->addForeignKey(
            'fk-picture_like-user_id',
            'picture_like',
            'user_id',
            'user',
            'id',
            'CASCADE'
        );

        // creates index for column `picture_id`
        $this->createIndex(
            'idx-picture_like-picture_id',
            'picture_like',
            'picture_id'
        );

        // add foreign key for table `picture`
        $this->addForeignKey(
            'fk-picture_like-picture_id',
            'picture_like',
            'picture_id',
            'picture',
            'id',
            'CASCADE'
        );

        $this->execute('ALTER TABLE picture_like ADD UNIQUE INDEX user_picture (user_id, picture_id)');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%picture_like}}');
    }
}
