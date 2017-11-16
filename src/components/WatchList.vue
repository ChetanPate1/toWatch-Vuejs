<template lang="html">
  <div class="container">
     <div class="row">
        <div class="col-xs-12">
           <button class="button pull-right margin-bottom-30" @click="openPopup">Track a show</button>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 fade-in" v-for="watchlist in Watchlist" >
           <watchlist-card
              heading="''"
              sub-heading="'Season 1 Episode 1'"
              details="''"
              img-src="''" >

              <!-- <frost-glass imgsrc="WatchlistCtrl.shows.$getRecord( watchlist.showId ).imgSrc" >
                 <countdown-timer to="WatchlistCtrl.nextAired( watchlist )" ></countdown-timer>
              </frost-glass> -->
           </watchlist-card>
        </div>
        <no-content :message="noContentMessage" :condition="true"></no-content>
     </div>
  </div>

</template>

<script>
import WatchlistCard from './WatchlistCard/WatchlistCard';
import NoContent from './NoContent/NoContent';

export default {
  name: 'WatchList',
  data() {
    return {
      Watchlist: [],
      noContentMessage: 'Your watch list is empty!'
    }
  },
  methods: {
    openPopup() {

    }
  },
  components: {
    WatchlistCard,
    NoContent
  }
}
</script>

<style lang="css">
</style>
