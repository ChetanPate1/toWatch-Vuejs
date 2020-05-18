<template lang="html">
<form name="form" v-on:submit.prevent="add(form)">
  
  <div class="form-element" v-if="hideSeriesSelect && form.showId">
    <label for="series">Series Name</label>
    {{ findShow(form.showId).show.title }}
  </div>

  <div class="form-element" v-if="!hideSeriesSelect">
    <label for="series">Series Name</label>
    <span class="dripicons-chevron-down"></span>
    <select name="series" v-model="form.seriesRef" @change="form.season = ''; form.episode = ''">
        <option v-for="item in shows" :value="item.show._id" :key="item._id">
          {{ item.show.title }}
        </option>
    </select>
  </div>

  <!-- <div class="form-element" v-if="form.seriesRef">
    <label for="seasons">Seasons</label>
    <div class="select-series">
        <div class="col-xs-3" v-for="item in shows[form.seriesRef].episodes" :key="item._id">
          <label class="radio" v-bind:class="{'selected' : form.season >= item.season }" >
              <input type="radio" v-model="form.season" v-bind:value="item.season">{{ item.season }}
          </label>
        </div>
        <span class="selected-none" v-bind:class="{'selected': !form.seriesRef }">Select a season</span>
    </div>
  </div> -->

  <!-- <div class="form-element" v-if="form.seriesRef && form.season">
    <label for="seasons">Episodes</label>
    <div class="select-series">
        <div class="col-xs-3" v-for="episode in shows[form.seriesRef].episodes[form.season - 1].episodes"
          v-if="checkAired(episode)"
          :key="episode._id">
          <label class="radio" v-bind:class="{'selected' : form.episode >= episode.Episode }" >
              <input type="radio" v-model="form.episode" v-bind:value="episode.Episode" >
              {{ episode.Episode }}
          </label>
        </div>
        <span class="selected-none" v-bind:class="{'selected': !form.season }">Select a episode</span>
    </div>
  </div> -->

  <button class="button button-sm pull-right"
    type="submit"
    :disabled="!form.seriesRef || !form.season || !form.episode">
    add
  </button>
</form>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

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
  methods: {
    async add(form) {
      await this.$store.dispatch('addToWatching', form);
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
    }
  }
};
</script>

<style lang="scss">
</style>
