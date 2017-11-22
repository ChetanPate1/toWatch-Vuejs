<template lang="html">
  <div class="watchlist-card" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
     <!-- <button type="button" name="more" class="more-button" v-bind:class="{'open' : open, 'up-to-date': behindCount(seasons, currentseason) == 0 }" ng-click="toggleOpen('open')">
        <span class="dripicons-plus"></span>
        <span class="behind">{{ behindCount(seasons, currentseason) }}</span>
     </button> -->


     <h2>{{ heading }}</h2>
     <h4>{{ details }}</h4>
     <h5>On {{ subHeading }}</h5>
     <h6>Next <small>Aired Episode</small></h6>

     <frost-glass :img-src="''" >
        <countdown-timer :to="0" ></countdown-timer>
     </frost-glass>
  </div>
</template>

<script>
import FrostGlass from '../FrostGlass/FrostGlass';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

export default {
  name: 'WatchlistCard',
  props: {
    heading: String,
    details: String,
    subHeading: String,
    imgSrc: String
  },
  components: {
    FrostGlass,
    CountdownTimer
  }
}
</script>

<style src="./WatchlistCard.scss" lang="scss"></style>
