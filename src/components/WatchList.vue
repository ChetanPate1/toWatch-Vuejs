<template lang="html">
<div class="container" v-bind:class="{'container-lg' : watchlistSize() > 3 }">
   <popup :title="'Add To Watch List'" :size="'md'" ref="popup">
      <add-to-watchlist :shows="myShows"></add-to-watchlist>
   </popup>

   <div class="row">
      <div class="col-xs-6">
         <button class="button" type="button" name="button margin-bottom-10" @click="isEditMode = true">Manage</button>
      </div>
      <div class="col-xs-6">
         <button class="button pull-right margin-bottom-30" @click.prevent="$refs.popup.open()">Track a show</button>
      </div>

      <div class="col-xs-12 col-sm-6 fade-in"
         v-for="(item, key, index) in watchlist"
         v-bind:class="{'col-md-3' : watchlistSize() > 3, 'col-md-4' : watchlistSize() < 3 }"
         :key="index">

         <span v-if="isEditMode" type="button" name="button" @click="deleteItem(key)" class="dripicons-trash margin-bottom-20"></span>

         <watchlist-card
            :heading="myShows[item.showId].series"
            :sub-heading="concatSubHeading(item.on)"
            :details="item.on.name"
            :id="key"
            :watchlist="item"
            :next-aired="nextAired(item)"
            :img-src="myShows[item.showId].imgSrc">
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
import AddToWatchlist from './AddToWatchlist/AddToWatchlist';

import { objSize } from '../js/helper-functions';
import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'WatchList',
   data() {
      return {
         today: new Date().getTime(),
         noContentMessage: 'Your watch list is empty!',
         isEditMode: false,
         popupOpen: false
      }
   },
   computed: {
      ...mapGetters([
         'watchlist',
         'myShows'
      ]),
      ...mapActions([
         'getWatchlist',
         'getMyShows',
         'deleteWatchlist'
      ])
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
      deleteItem(watchlistId){
         this.$store
            .dispatch('deleteWatchlist', watchlistId)
            .then(() => {
               this.isEditMode = false;
            });
      },
      concatSubHeading(on) {
         return `Season ${ on.season } Episode ${ on.episode }`;
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

         return nextAired.length ? nextAired[0].airDate : 0;
      }
   },
   components: {
      WatchlistCard,
      NoContent,
      Popup,
      AddToWatchlist
   }
}
</script>

<style lang="scss"></style>
