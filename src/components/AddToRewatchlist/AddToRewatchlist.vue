<template lang="html">
<form name="form" v-on:submit.prevent="add(form)">
  <div class="form-element">
    <label for="series">Series Name</label>
    <span class="dripicons-chevron-down"></span>
    <select name="series" v-model="form.seriesRef" @change="form.season = ''; form.episode = ''">
        <option v-for="(show, key, index) in shows" v-bind:value="key">
          {{ show.Title }}
        </option>
    </select>
  </div>

  <div class="form-element" v-if="form.seriesRef">
    <label for="seasons">Seasons</label>
    <div class="select-series">
        <div class="col-xs-3" v-for="(season, key, index) in shows[form.seriesRef].episodes">
          <label class="radio" v-bind:class="{'selected' : form.season >= season.season }" >
              <input type="radio" v-model="form.season" v-bind:value="season.season" >
              {{ season.season }}
          </label>
        </div>
        <span class="selected-none" v-bind:class="{'selected': !form.seriesRef }">Select a season</span>
    </div>
  </div>

  <div class="form-element" v-if="form.seriesRef && form.season">
    <label for="seasons">Episodes</label>
    <div class="select-series">
        <div class="col-xs-3" v-for="season in shows[form.seriesRef].episodes[form.season - 1].episodes">
          <label class="radio" v-bind:class="{'selected' : form.episode >= season.Episode }" >
              <input type="radio" v-model="form.episode" v-bind:value="season.Episode" >
              {{ season.Episode }}
          </label>
        </div>
        <span class="selected-none" v-bind:class="{'selected': !form.season }">Select a episode</span>
    </div>
  </div>

  <button class="button button-sm pull-right"
    type="submit"
    :disabled="!form.seriesRef || !form.season || !form.episode">
    add
  </button>
</form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
   name: 'AddToRewatchlist',
   data() {
      return {
         form: {
            seriesRef: '',
            season: '',
            episode: ''
         },
         today: new Date().getTime()
      };
   },
   props: {
      shows: Object
   },
   computed: {
      ...mapActions(['addToRewatchlist'])
   },
   methods: {
      add(form) {
         this.$store.dispatch('addToRewatchlist', form).then(() => {
            this.form = {
               seriesRef: '',
               season: '',
               episode: ''
            };
            this.$parent.close();
         });
      }
   }
};
</script>

<style lang="scss">
</style>
