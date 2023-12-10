<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%picture_hashtag}}`.
 * Has foreign keys to the tables:
 *
 * - `{{%picture}}`
 * - `{{%hashtag}}`
 */
class m221116_000006_create_junction_table_for_picture_and_hashtag_tables extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%picture_hashtag}}', [
            'picture_id' => $this->integer()->unsigned(),
            'hashtag_id' => $this->integer()->unsigned(),
            'PRIMARY KEY(picture_id, hashtag_id)',
        ]);

        // creates index for column `picture_id`
        $this->createIndex(
            '{{%idx-picture_hashtag-picture_id}}',
            '{{%picture_hashtag}}',
            'picture_id'
        );

        // add foreign key for table `{{%picture}}`
        $this->addForeignKey(
            '{{%fk-picture_hashtag-picture_id}}',
            '{{%picture_hashtag}}',
            'picture_id',
            '{{%picture}}',
            'id',
            'CASCADE'
        );

        // creates index for column `hashtag_id`
        $this->createIndex(
            '{{%idx-picture_hashtag-hashtag_id}}',
            '{{%picture_hashtag}}',
            'hashtag_id'
        );

        // add foreign key for table `{{%hashtag}}`
        $this->addForeignKey(
            '{{%fk-picture_hashtag-hashtag_id}}',
            '{{%picture_hashtag}}',
            'hashtag_id',
            '{{%hashtag}}',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        // drops foreign key for table `{{%picture}}`
        $this->dropForeignKey(
            '{{%fk-picture_hashtag-picture_id}}',
            '{{%picture_hashtag}}'
        );

        // drops index for column `picture_id`
        $this->dropIndex(
            '{{%idx-picture_hashtag-picture_id}}',
            '{{%picture_hashtag}}'
        );

        // drops foreign key for table `{{%hashtag}}`
        $this->dropForeignKey(
            '{{%fk-picture_hashtag-hashtag_id}}',
            '{{%picture_hashtag}}'
        );

        // drops index for column `hashtag_id`
        $this->dropIndex(
            '{{%idx-picture_hashtag-hashtag_id}}',
            '{{%picture_hashtag}}'
        );

        $this->dropTable('{{%picture_hashtag}}');
    }
}
