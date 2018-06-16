<template lang="html">
<div>
   <button class="button pull-right margin-bottom-30" @click="open = true">Track a show</button>

   <div class="popup-background" v-bind:class="{ 'open': open }" @click="open = false">
      <div class="content" @click.stop>
         <button class="close-button" @click.stop="open = false" type="button">
            <span class="dripicons-cross"></span>
         </button>

         <form name="form" v-on:submit.prevent="add(form)" >
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
                        <input type="radio" v-model="form.episode" v-bind:value="episode.number " >
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
      </div>
   </div>
</div>

</template>

<script>
import { mapActions } from 'vuex';

export default {
   name: 'Popup',
   data() {
      return {
         open: false,
         form: {
            seriesRef: '',
            season: '',
            episode: ''
         },
         today: new Date().getTime()
      }
   },
   props: {
      shows: Object
   },
   computed: {
      ...mapActions([
         'addToWatchlist'
      ])
   },
   methods: {
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
   }
}
</script>

<style lang="scss">
.popup-background{
   position: fixed;
   top: 0;
   right: 0;
   z-index: 2000;
   background-color: transparentize(#000000, 0.8);
   width: 100%;
   height: 100%;
   transition: opacity 500ms ease;
   -ms-transform: translate(100%, 0);
   transform: translate3d(100%, 0, 0);

   .content{
      position: absolute;
      right: 50px;
      top: 120px;
      display: block;
      width: 100%;
      max-width: 400px;
      min-height: 200px;
      border-radius: 7px;
      padding: 40px 30px 20px 30px;
      background-color: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 0 30px 65px -30px rgba(0, 0, 0, 0.3);
      transition: all 500ms ease;
      -ms-transform: translate(0, -100%);
      transform: translate3d(0, -100%, 0);

      .close-button{
         position: absolute;
         top: 10px;
         right: 10px;
         background-color: transparent;
         line-height: 1;
         border: none;
         padding: 10px;
         font-size: 20px;
         opacity: 0.6;

         &:hover{
            opacity: 1;
         }
      }
   }

   h3{
      font-weight: bold;
      margin-bottom: 30px;
      margin-top: 10px;
   }

   .button{
      margin-top: 20px;
      min-width: 50%;
      float: right;
   }

   &.open{
      opacity: 1;
      -ms-transform: translate(0, 0);
      transform: translate3d(0, 0, 0);

      .content{
         -ms-transform: translate(0, 0);
         transform: translate3d(0, 0, 0);
      }
   }
}
</style>
