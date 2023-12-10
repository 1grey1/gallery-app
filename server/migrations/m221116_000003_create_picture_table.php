<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%picture}}`.
 */
class m221116_000003_create_picture_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%picture}}', [
            'id' => $this->primaryKey()->unsigned(),
            'created_at' => $this->timestamp()->notNull()->defaultExpression('CURRENT_TIMESTAMP'),
            'url' => $this->string(128)->null(),
            'description' => $this->string(512)->null(),
            'scale' => $this->string(128)->notNull(),
            'effect_id' => $this->integer()->unsigned()->notNull(),
            'effect_level' => $this->float()->null(),
            'user_id' => $this->integer()->unsigned()->notNull(),
        ]);

        // creates index for column `effect_id`
        $this->createIndex(
            'idx-picture-effect_id',
            'picture',
            'effect_id'
        );

        // add foreign key for table `effect`
        $this->addForeignKey(
            'fk-picture-effect_id',
            'picture',
            'effect_id',
            'effect',
            'id',
            'CASCADE'
        );

        // creates index for column `user_id`
        $this->createIndex(
            'idx-picture-user_id',
            'picture',
            'user_id'
        );

        // add foreign key for table `user`
        $this->addForeignKey(
            'fk-picture-user_id',
            'picture',
            'user_id',
            'user',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%picture}}');
    }
}
