<template lang="html">
<div class="container" v-bind:class="{'container-lg' : watchlistSize() > 3 }">
   <div class="row">
      <div class="col-xs-12">
         <popup :shows="myShows"></popup>
      </div>

      <div class="col-xs-12 col-sm-6 fade-in"
         v-for="(item, index) in watchlist"
         v-bind:class="{'col-md-3' : watchlistSize() > 3, 'col-md-4' : watchlistSize() < 3 }"
         :key="index">
         <watchlist-card
            :heading="myShows[item.showId].series"
            :sub-heading="concatSubHeading(item.on)"
            :details="currentEpisodeName(item, item.on)"
            :watchlist="item"
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
import Popup from './Popup/Popup';

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
      this.$store.dispatch('getMyShows');
      this.$store.dispatch('getWatchlist');
   },
   methods: {
      watchlistSize(){
         return objSize(this.watchlist);
      },
      concatSubHeading(on) {
         return `Season ${ on.season } Episode ${ on.episode }`;
      },
      currentEpisodeName(item, on) {
         return item.unwatched['season_'+ on.season][on.episode].name;
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
      NoContent,
      Popup
   }
}
</script>

<style lang="scss"></style>
