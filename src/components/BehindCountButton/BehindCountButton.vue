<template>
   <button class="more-button" type="button" name="more" :class="{ 'open' : open }">
      <span class="dripicons-plus"></span>
      <span class="behind">{{ behindCount }}</span>
   </button>
</template>

<script>
import { objSize, timeNow } from '@/js/helperFunctions';
export default {
   name: 'BehindCountButton',
   props: {
      open: Boolean,
      unWatched: Object,
      currentSeason: Number
   },
   computed: {
      behindCount(){
         let currentSeasonNum = parseInt(this.currentSeason, 0);
         let seasonsLimit = objSize(this.unWatched) + currentSeasonNum;
         let count = 0, j = 1, totalEpisodes = 0, season;
         for (currentSeasonNum; currentSeasonNum < seasonsLimit; currentSeasonNum++) {
            season = this.unWatched['season_' + currentSeasonNum];
            totalEpisodes = objSize(season);
            for (j; j < totalEpisodes; j++) {
               if(!season[j].watched && season[j].airDate - timeNow() < 0){
                  count++;
               }
            }
            j = 1;
         }
         return (count > 0) ? '-'+ count : count;
      }
   }
}
</script>
<style src="./BehindCountButton.scss" lang="scss"></style>
