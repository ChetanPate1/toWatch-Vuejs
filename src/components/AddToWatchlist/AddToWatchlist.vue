<template lang="html">
<form name="form" v-on:submit.prevent="add(form)">
  
  <div class="form-element" v-if="hideSeriesSelect && form.showId">
    <label for="series">Series Name</label>
    {{ findShow(form.showId).show.title }}
  </div>

  <div class="form-element" v-if="!hideSeriesSelect">
    <label for="series">Series Name</label>
    <span class="dripicons-chevron-down"></span>
    <select name="series" v-model="form.showId" @change="onChooseShow">
        <option v-for="item in shows" :value="item.show._id" :key="item._id">
          {{ item.show.title }}
        </option>
    </select>
  </div>

  <div class="form-element" v-if="form.showId">
    <label for="seasons">Seasons</label>
    <div class="select-series">
        <div class="col-xs-3" v-for="item in seasons" :key="item._id">
          <label class="radio" :class="{'selected' : form.seasonId == item._id }" >
              <input type="radio" 
                v-model="form.seasonId"
                :value="item._id" 
                @change="onChooseSeason">{{ item.number }}
          </label>
        </div>
        <span class="selected-none" v-bind:class="{'selected': !form.showId }">Select a season</span>
    </div>
  </div>

  <div class="form-element" v-if="form.showId && form.seasonId">
    <label for="seasons">Episodes</label>
    <div class="select-series">
        <div class="col-xs-3" v-for="episode in episodes" :key="episode._id">
          <label class="radio"
            :class="{'selected' : form.episodeId == episode._id }">
              <input type="radio" 
                v-model="form.episodeId"
                :value="episode._id">{{ episode.number }}
          </label>
        </div>
        <span class="selected-none" v-bind:class="{'selected': !form.seasonId }">Select a episode</span>
    </div>
  </div>

  <button class="button button-sm pull-right"
    type="submit"
    :disabled="!form.showId || !form.seasonId || !form.episodeId">
    add
  </button>
</form>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AddToWatchlist',
  data() {
    return {
      form: {
        showId: '',
        seasonId: '',
        episodeId: ''
      },
      today: new Date().getTime()
    };
  },
  props: {
    shows: Array,
    hideSeriesSelect: Boolean
  },
  computed: {
    ...mapGetters({
      episodes: 'lookups/episodes',
      seasons: 'lookups/seasons'
    })
  },
  methods: {
    async add() {
      await this.$store.dispatch('watching/addToWatching', this.form);
      this.form = {
        showId: '',
        seasonId: '',
        episodeId: ''
      };
      this.$parent.close();
    },
    checkAired(episode) {
      if (typeof episode === 'object') {
        let date = new Date(episode.released).getTime();
        return date - this.today < 0 || episode.number == 1;
      } else {
        return false;
      }
    },
    findShow(id) {
      return this.shows.find(item => item.show._id === id);
    },
    async onChooseShow() {
      this.form.seasonId = '';
      this.form.episodeId = '';

      await this.$store.dispatch('lookups/getSeasons', this.form.showId);
    },
    async onChooseSeason() {
      await this.$store.dispatch('lookups/getEpisodes', this.form.seasonId);
    }
  }
};
</script>

<style lang="scss">
</style>
