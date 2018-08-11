<template lang="html">
<form v-on:submit.prevent="findShow">
   <div class="form-element search">
      <button type="button" class="dripicons-cross" @click="emptyFoundMovies" v-if="foundMovies.length"></button>
      <div class="loader" v-bind:class="{'show' : sendStatus.loader }"></div>
      <input type="text" name="name" v-model="name" placeholder="'Movie Name, Year'">
      <button type="submit" class="dripicons-search" :disabled="sendStatus.disableButton"></button>

      <div class="search-results" v-bind:class="{'show' : foundMovies }">
         <div class="search-result" v-for="(movie, index) in foundMovies">
            <img class="underlay-image" v-bind:src="movie.Poster">
            <div class="col-xs-4">
               <img class="poster img-responsive" v-bind:src="movie.Poster" >
            </div>
            <div class="col-xs-8">
               <h3>{{ movie.Title }}</h3>
               <p>{{ movie.Plot }}</p>
               <button class="button pull-right" type="button" @click="addMovie(movie)" :disabled="sendStatus.disableButton">Add to Collection</button>
            </div>
         </div>
      </div>
   </div>
</form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'SearchMovies',
   data() {
      return {
         name: '',
         sendStatus: {
            disableButton: false,
            loader: false,
            validation: ''
         }
      }
   },
   computed: {
      ...mapGetters([
         'foundMovies'
      ]),
      ...mapActions([
         'findMovies',
         'saveMovie',
         'emptyFoundMovies'
      ])
   },
   methods: {
      addMovie(movie) {
         this.sendStatus.disableButton = true;

         this.$store.dispatch('saveMovie', movie)
            .then(() => {
               this.name = '';
               setTimeout(() => {
                  this.sendStatus.disableButton = false;
               }, 1000);
            });
      },
      findShow(){
         this.sendStatus.disableButton = true;
         console.log('find');
         this.$store.dispatch('findMovies', this.name)
            .then(() => {
               this.sendStatus.disableButton = false;
            });
      }
   }
}
</script>

<style lang="scss">
.search-results{
   width: 100%;
   border-radius: 6px;
   box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.7);
   transition: all 500ms ease;
   transform: translate(-100%, 0);
   height: auto;
   overflow-y: auto;
   opacity: 0;
   background-color: #ffffff;

   .poster{
      margin-top: 20px;
      box-shadow: 0 20px 65px 6px rgba(0, 0, 0, 0.4);
   }

   .search-result{
      position: relative;
      margin: 0 0 5px 0;
      background-color: #ffffff;
      display: block;
      float: left;
      width: 100%;
      padding: 10px 15px;
      border-radius: 5px;
      overflow: hidden;

      .underlay-image{
         position: absolute;
         left: -15px;
         top: 0;
         width: 106%;
         filter: blur(4px);
         opacity: 0.4;
      }

      @media(max-width: 500px){
         padding-top: 20px;
         min-height: 60px;

         .number, .name{
            padding: 4px 0 0 0;
            font-size: 12px;
            line-height: 1;
         }
         .name{
            padding: 4px 10px 0 0;
         }
      }
   }

   &.show{
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
      opacity: 1;
   }
}
</style>
