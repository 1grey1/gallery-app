<?php

namespace app\models;

use yii\base\InvalidConfigException;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "picture".
 *
 * @property int $id
 * @property string $created_at
 * @property string $url
 * @property string $description
 * @property string $scale
 * @property string $effect_level
 * @property int $effect_id
 * @property int $user_id
 *
 * @property User $user
 * @property Comment[] $comments
 * @property Hashtag[] $hashtags
 * @property PictureLike[] $likes
 */
class Picture extends ActiveRecord
{
    public $imageFile;

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%picture}}';
    }

    /**
     * @return array
     */
    public function rules():array
    {
        return [
            [['url'], 'trim'],
            [['url'], 'string', 'max' => 128],

            [['description'], 'trim'],
            [['description'], 'string'],
            [['description'], 'default', 'value' => null],

            [['scale'], 'required'],
            [['scale'], 'trim'],
            [['scale'], 'string'],
            [['scale'], 'in', 'range' => ['25%', '50%', '75%', '100%']],

            [['effect_level'], 'double'],

            [['effect_id'], 'required'],
            [['effect_id'], 'integer'],
            [['effect_id'], 'exist', 'targetClass' => Effect::class, 'targetAttribute' => 'id'],

            [['user_id'], 'required'],
            [['user_id'], 'integer'],
            [['user_id'], 'exist', 'targetClass' => User::class, 'targetAttribute' => 'id'],

            [['imageFile'], 'file', 'skipOnEmpty' => false, 'extensions' => 'png, jpg, jpeg'],
        ];
    }

    /**
     * @return string[]
     */
    public function fields(): array
    {
        return [
            'id',
            'url',
            'description',
            'scale',
            'effect_id',
            'effect_level',
            'user',
            'comments',
            'hashtags',
            'likes',
        ];
    }

    /**
     * @return string[]
     */
    public function extraFields(): array
    {
        return [
            'hashtags',
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getUser(): ActiveQuery
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getComments(): ActiveQuery
    {
        return $this->hasMany(Comment::class, ['picture_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getLikes(): ActiveQuery
    {
        return $this->hasMany(PictureLike::class, ['picture_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     * @throws InvalidConfigException
     */
    public function getHashtags(): ActiveQuery
    {
        return $this
            ->hasMany(Hashtag::class, ['id' => 'hashtag_id'])
            ->viaTable('picture_hashtag', ['picture_id' => 'id']);
    }
}
