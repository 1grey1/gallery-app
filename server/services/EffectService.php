<?php

namespace app\services;

use app\models\Effect;

class EffectService
{
   public function dc_create(array $effect_item): bool
   {
      $effect = new Effect();

      $effect->name = $effect_item['name'];
      $effect->css_filter = $effect_item['css_filter'];
      $effect->range_min = $effect_item['range_min'];
      $effect->range_max = $effect_item['range_max'];
      $effect->step = $effect_item['step'];
      $effect->start = $effect_item['start'];
      $effect->unit = $effect_item['unit'];

      return $effect->save();
   }
}
