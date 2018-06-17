<template lang="html">
<div class="container" v-bind:class="{'container-lg' : watchlistSize() > 3 }">
   <popup ref="popup">
      <form name="form" v-on:submit.prevent="add(form)">
         <div class="form-element">
            <label for="series">Series Name</label>
            <span class="dripicons-chevron-down"></span>
            <select name="series" v-model="form.seriesRef" @change="form.season = ''; form.episode = ''">
               <option v-for="(show, key, index) in myShows" v-bind:value="key"
                  v-if="(show.status == 'In Development' || show.status == 'Running')" >
                  {{ show.series }}
               </option>
            </select>
         </div>

         <div class="form-element" v-if="form.seriesRef">
            <label for="seasons">Seasons</label>
            <div class="select-series">
               <div class="col-xs-3" v-for="(season, key, index) in myShows[form.seriesRef].seasons">
                  <label class="radio" v-bind:class="{'selected' : form.season >= index + 1 }" >
                     <input type="radio" v-model="form.season" v-bind:value="index + 1" >
                     {{ index + 1 }}
                  </label>
               </div>
               <span class="selected-none" v-bind:class="{'selected': !form.seriesRef }">Select a season</span>
            </div>
         </div>

         <div class="form-element" v-if="form.seriesRef && form.season">
            <label for="seasons">Episodes</label>
            <div class="select-series">
               <div class="col-xs-3" v-for="episode in myShows[form.seriesRef].seasons[`season_${form.season}`]"
                  v-if="checkAired(episode)">
                  <label class="radio" v-bind:class="{'selected' : form.episode >= episode.number }" >
                     <input type="radio" v-model="form.episode" v-bind:value="episode.number" >
                     {{ episode.number }}
                  </label>
               </div>
               <span class="selected-none" v-bind:class="{'selected': !form.season }">Select a episode</span>
            </div>
         </div>

         <button class="button"
            type="submit"
            :disabled="!form.seriesRef || !form.season || !form.episode">
            add
         </button>
      </form>
   </popup>

   <div class="row">
      <div class="col-xs-6">
         <button class="button" type="button" name="button margin-bottom-10" @click="isEditMode = true">Manage</button>
      </div>
      <div class="col-xs-6">
         <button class="button pull-right margin-bottom-30" @click="$refs.popup.open()">Track a show</button>
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

import { objSize } from '../js/helper-functions';
import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'WatchList',
   data() {
      return {
         today: new Date().getTime(),
         noContentMessage: 'Your watch list is empty!',
         isEditMode: false,
         popupOpen: false,
         form: {
            seriesRef: '',
            season: '',
            episode: ''
         },
         today: new Date().getTime()
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
         'deleteWatchlist',
         'addToWatchlist'
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
      },
      add(form){
         this.$store.dispatch('addToWatchlist', form)
            .then(() => {
               this.open = false;
               this.form = {
                  seriesRef: '',
                  season: '',
                  episode: ''
               };
            });
      },
      checkAired(episode) {
         if(typeof episode === 'object'){
            let date = parseInt(episode.airDate);
            return date - this.today < 0 || episode.number == 1;
         }else {
            return false;
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
