<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%comment}}`.
 */
class m221116_000004_create_comment_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%comment}}', [
            'id' => $this->primaryKey()->unsigned(),
            'created_at' => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP'),
            'message' => $this->string(512)->notNull(),
            'user_id' => $this->integer()->unsigned()->notNull(),
            'picture_id' => $this->integer()->unsigned()->notNull(),
        ]);

        // creates index for column `user_id`
        $this->createIndex(
            'idx-comment-user_id',
            'comment',
            'user_id'
        );

        // add foreign key for table `user`
        $this->addForeignKey(
            'fk-comment-user_id',
            'comment',
            'user_id',
            'user',
            'id',
            'CASCADE'
        );

        // creates index for column `picture_id`
        $this->createIndex(
            'idx-comment-picture_id',
            'comment',
            'picture_id'
        );

        // add foreign key for table `picture`
        $this->addForeignKey(
            'fk-comment-picture_id',
            'comment',
            'picture_id',
            'picture',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%comment}}');
    }
}
