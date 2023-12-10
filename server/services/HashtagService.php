<?php

namespace app\services;

use app\models\Hashtag;
use app\models\PictureHashtag;

class HashtagService
{
    /**
     * @param array $hashtags
     * @param int $picture_id
     * @return void
     */
    public function processHashtags(array $hashtags, int $picture_id): void
    {
        foreach (array_filter($hashtags) as $hashtag_item) {
            if (!$hashtag = Hashtag::findOne(['name' => $hashtag_item])) {
                $hashtag = new Hashtag();
                $hashtag->name = $hashtag_item;
                $hashtag->save();
            }

            if ($hashtag->canGetProperty('id')) {
                $picture_hashtag = new PictureHashtag();
                $picture_hashtag->picture_id = $picture_id;
                $picture_hashtag->hashtag_id = $hashtag->id;
                $picture_hashtag->save();
            }
        }
    }
}
