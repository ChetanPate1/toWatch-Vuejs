<template lang="html">
<div class="container-fluid">
   <div class="row margin-bottom-20">
      <div class="col-xs-12">
         <search-movies></search-movies>
      </div>
   </div>

   <div class="row">
      <div class="col-sm-3 col-md-2" v-for="(movie, key, index) in watchedMovies">
         <movie-card
            :heading="movie.Title"
            :img-src="movie.Poster"
            :shows="watchedMovies"
            :reference="key"
            :key="index"
            :deleteable="true">
         </movie-card>
      </div>
      <no-content :message="noContentMessage" :condition="!watchedMovies"></no-content>
   </div>
</div>
</template>

<script>
import SearchMovies from './SearchMovies/SearchMovies';
import MovieCard from './MovieCard/MovieCard';
import ShowTableRow from './ShowTable/ShowTableRow';
import NoContent from './NoContent/NoContent';
import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'WatchedMovies',
   data() {
      return {
         noContentMessage: 'Your watched movies list is empty!'
      }
   },
   computed: {
      ...mapGetters([
         'watchedMovies',
      ]),
      ...mapActions([
         'getWatchedMovies'
      ])
   },
   mounted() {
      this.$store.dispatch('getWatchedMovies');
   },
   components: {
      SearchMovies,
      MovieCard,
      ShowTableRow,
      NoContent
   }
}
</script>

<style lang="scss"></style>
