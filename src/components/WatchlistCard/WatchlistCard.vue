<template lang="html">
  <div class="watchlist-card" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
     <h2>{{ heading }}</h2>
     <h4>{{ details }}</h4>
     <h5>On {{ subHeading }}</h5>
     <h6>Next <small>Aired Episode</small></h6>

     <frost-glass :img-src="imgSrc" >
        <countdown-timer :to="nextAired" ></countdown-timer>
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
    nextAired: Number,
    imgSrc: String
  },
  components: {
    FrostGlass,
    CountdownTimer
  }
}
</script>

<style src="./WatchlistCard.scss" lang="scss"></style>
