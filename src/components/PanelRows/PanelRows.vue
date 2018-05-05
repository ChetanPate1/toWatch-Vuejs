<template>
   <div>
      <div class="panel-row"
         v-for="episode in season"
         :key="episode.number"
         :class="{ 'disabled' : !episode.watched }">

         <div class="col-35">
            <span class="aired-by">
               <i class="dripicons-feed"></i> {{ aired(episode.airDate).by }}
            </span>
         </div>
         <div class="col-45">
            Episode {{ episode.number }}
         </div>
         <div class="col-20" @click="watched(episode)">
            <span class="dripicons-preview" :class="{ 'active' : episode.watched }"></span>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
   name: 'PanelRows',
   data() {
      return {
         timeNow: new Date().getTime()
      }
   },
   props: {
      watchlistId: String,
      watchlistItem: Object,
      season: Array
   },
   methods: {
      ...mapActions([
         'toggleWatched',
         'setCurrentSeason'
      ]),
      watched(episodeDetails){
         let show = this.watchlistItem;
         let watchlistId = this.watchlistId;

         this.$store.dispatch('toggleWatched', {
            watchlistId,
            show,
            episodeDetails
         });
      },
      aired(date) {
         date = parseInt(date, 0);
         let delta = Math.abs((date - this.timeNow))/1000;
         let isAired = date - this.timeNow < 0;
         let aired = { isAired: isAired };

         if( isAired ){
            aired.by = `- ${ Math.ceil(delta / 86400) } days`;
            if(Math.ceil(delta / 86400) > 30){
               aired.by = 'aired';
            }
         }else {
            aired.by = 'not aired';
         }

         return aired;
      }
   }
}
</script>

<style src="./PanelRows.scss" lang="scss"></style>
