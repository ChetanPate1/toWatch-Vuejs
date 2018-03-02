<template lang="html">
  <div class="container">
     <div class="row">
        <div class="col-xs-12">
           <button class="button pull-right margin-bottom-30" @click="openPopup">Track a show</button>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 fade-in" v-for="(item, index) in watchlist" :key="index">
           <watchlist-card
              :heading="myShows[item.showId].series"
              :sub-heading="concatSubHeading(item.on)"
              :details="''"
              :next-aired="nextAired(item)"
              :img-src="myShows[item.showId].imgSrc" >
           </watchlist-card>
        </div>
        <no-content :message="noContentMessage" :condition="!watchlist"></no-content>
     </div>
  </div>
</template>

<script>
import WatchlistCard from './WatchlistCard/WatchlistCard';
import NoContent from './NoContent/NoContent';
import { objSize } from '../js/helperFunctions';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'WatchList',
  data() {
    return {
      today: new Date().getTime(),
      noContentMessage: 'Your watch list is empty!'
    }
  },
  computed: {
    ...mapGetters([
      'watchlist',
      'myShows'
    ]),
    ...mapActions([
      'getWatchlist',
      'getMyShows'
    ])
  },
  mounted() {
    this.$store.dispatch('getWatchlist');
    this.$store.dispatch('getMyShows');
  },
  methods: {
    openPopup() {

    },
    concatSubHeading(on) {
      return `Season ${ on.season } Episode ${ on.episode }`;
    },
    nextAired(watchlist) {
      let nextAired, i = 1;
      let show = this.myShows[watchlist.showId];
      let seasons = objSize(show.seasons);
      let latestSeason = show.seasons['season_' + seasons];
      let latestSeasonSize = objSize(latestSeason);

      for (i; i <= latestSeasonSize; i++) {
         if (latestSeason[i].airDate - this.today > 0){
            return latestSeason[i].airDate;
         }
      }
   }
  },
  components: {
    WatchlistCard,
    NoContent
  }
}
</script>

<style lang="scss"></style>
