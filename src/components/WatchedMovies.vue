<template lang="html">
<div class="container">
   <div class="row margin-bottom-20">
      <div class="col-xs-12">
         <search-movies></search-movies>
      </div>
   </div>

   <div class="row">
      <div class="col-md-4" v-for="movie in watchedMovies">
         <show-table>
            <show-table-row>
               <div class="col-xs-12">
                  {{ movie.title }}
               </div>
            </show-table-row>
         </show-table>
      </div>
      <no-content :message="noContentMessage" :condition="!watchedMovies"></no-content>
   </div>
</div>
</template>

<script>
import SearchMovies from './SearchMovies/SearchMovies';
import ShowTable from './ShowTable/ShowTable';
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
      ShowTable,
      ShowTableRow,
      NoContent
   }
}
</script>

<style lang="scss"></style>
