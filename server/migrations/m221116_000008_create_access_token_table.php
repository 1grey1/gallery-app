<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%access_token}}`.
 */
class m221116_000008_create_access_token_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%access_token}}', [
            'id' => $this->primaryKey()->unsigned(),
            'created_at' => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP'),
            'token' => $this->string(128)->notNull(),
            'user_id' => $this->integer()->unsigned()->notNull(),
        ]);

        // creates index for column `user_id`
        $this->createIndex(
            'idx-access_token-user_id',
            'access_token',
            'user_id'
        );

        // add foreign key for table `user`
        $this->addForeignKey(
            'fk-access_token-user_id',
            'access_token',
            'user_id',
            'user',
            'id',
            'CASCADE'
        );

        $this->execute('ALTER TABLE access_token ADD UNIQUE INDEX user_token (user_id, token)');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%access_token}}');
    }
}
