<template lang="html">
<div class="container" v-bind:class="{'container-lg' : watchlistSize() > 3 }">
   <div class="row">
      <div class="col-xs-12">
         <popup :shows="myShows"></popup>
      </div>

      <div class="col-xs-12 col-sm-6 fade-in"
         v-for="(item, key, index) in watchlist"
         v-bind:class="{'col-md-3' : watchlistSize() > 3, 'col-md-4' : watchlistSize() < 3 }"
         :key="index">
         <watchlist-card
            :heading="myShows[item.showId].series"
            :sub-heading="concatSubHeading(item.on)"
            :details="currentEpisodeName(item, item.on)"
            :id="key"
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

import { objSize } from '../js/helper-functions';
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
      ]),
      addAbleShows(){

      }
   },
   mounted() {
      this.$store.dispatch('getMyShows').then(() => {
         this.$store.dispatch('getWatchlist');
      });
   },
   methods: {
      watchlistSize(){
         return objSize(this.watchlist);
      },
      concatSubHeading(on) {
         return `Season ${ on.season } Episode ${ on.episode }`;
      },
      currentEpisodeName(item, on) {
         return item.unwatched['season_'+ on.season][on.episode - 1].name;
      },
      nextAired(watchlist) {
         let show = this.myShows[watchlist.showId];
         let numberOfSeasons = objSize(show.seasons);
         let latestSeason = show.seasons[`season_${numberOfSeasons}`];

         let nextAired = latestSeason.filter((episode) => {
            if (episode.airDate - this.today > 0){
               return episode.airDate;
            }
         });

         return nextAired[0].airDate;
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
