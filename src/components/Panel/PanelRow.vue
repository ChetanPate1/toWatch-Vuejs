<template>
  <div>
    <div class="panel-row" v-for="(episode, index) in season" v-if="index > 0" :key="episode.number" :class="{ 'disabled' : !episode.watched }" >
      <div class="col-35">
        <span class="aired-by"><i class="dripicons-feed"></i> {{ aired(episode.airDate).by }}</span>
      </div>
      <div class="col-45">
        Episode {{ episode.number }}
      </div>
      <div class="col-20" @click="watched(index, episode.airDate)">
        <span class="dripicons-preview" :class="{ 'active' : episode.watched }" ></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { timeNow, objSize } from '../HelperFunctions';

  export default {
    name: 'PanelRow',
    props: {
      season: Array,
      currentSeason: String,
      currentEpisode: Number
    },
    methods: {
      ...mapMutations([
        'toggleWatched',
        'setCurrentSeason'
      ]),
      watched(episode, airDate){
        const season = this.season;
        const currentEpisode = parseInt(this.currentEpisode, 0);
        let isCurrentSeason = this.currentSeason === season[0].toString();
        let isOneMoreOrOneLess = episode === currentEpisode || episode === currentEpisode - 1;
        let seasonKey =  `season_${ season[0] }`;

        if(!isCurrentSeason || !this.aired(airDate).isAired || !isOneMoreOrOneLess){
          return;
        }

        this.$store.commit('toggleWatched', { episode, seasonKey });
        this.countWatched(this.season, this.currentSeason);
      },
      countWatched(season, currentSeason) {
        let count = 1, j = 1;
        let totalEpisodes = objSize(season);
        let nextSeason = parseInt(currentSeason, 0) + 1;
        let on = { episode: 1, season: currentSeason };

        for (j; j < totalEpisodes; j++) {
          if(season[j].watched){
            count++;
          }
          if (!season[j].watched) {
            count + 1;
          }
        }

        if(count === objSize(season)){
          on.season = nextSeason.toString();
          on.episode = 1;
        }else {
          on.episode = count;
        }
        this.$store.commit('setCurrentSeason', { on });
      },
      aired(date) {
        date = parseInt(date, 0);
        let delta = Math.abs((date - timeNow()))/1000;
        let isAired = date - timeNow() < 0;
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

<style src="./PanelRow.scss" lang="scss"></style>
