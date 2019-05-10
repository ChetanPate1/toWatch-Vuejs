<template lang="html">
<form name="form" v-on:submit.prevent="add(form)">
   <div class="form-element">
      <label for="series">Series Name</label>
      <span class="dripicons-chevron-down"></span>
      <select name="series" v-model="form.seriesRef" @change="form.season = ''; form.episode = ''">
         <option v-for="(show, key, index) in shows" v-bind:value="key"
           v-if="(show.status == 'In Development' || show.status == 'Running')" >
           {{ show.series }}
         </option>
      </select>
   </div>

   <div class="form-element" v-if="form.seriesRef">
      <label for="seasons">Seasons</label>
      <div class="select-series">
         <div class="col-xs-3" v-for="(season, key, index) in shows[form.seriesRef].seasons">
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
         <div class="col-xs-3" v-for="episode in shows[form.seriesRef].seasons[`season_${form.season}`]"
           v-if="checkAired(episode)">
           <label class="radio" v-bind:class="{'selected' : form.episode >= episode.number }" >
               <input type="radio" v-model="form.episode" v-bind:value="episode.number" >
               {{ episode.number }}
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
  name: "AddToWatchlist",
  data() {
    return {
      form: {
        seriesRef: "",
        season: "",
        episode: ""
      },
      today: new Date().getTime()
    };
  },
  props: {
    shows: Object
  },
  computed: {
    ...mapActions(["addToWatchlist"])
  },
  methods: {
    add(form) {
      this.$store.dispatch("addToWatchlist", form).then(() => {
        this.form = {
          seriesRef: "",
          season: "",
          episode: ""
        };
        this.$parent.close();
      });
    },
    checkAired(episode) {
      if (typeof episode === "object") {
        let date = parseInt(episode.airDate);
        return date - this.today < 0 || episode.number == 1;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="css">
</style>
