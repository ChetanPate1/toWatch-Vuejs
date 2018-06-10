<template lang="html">
<div class="container">
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
         'getWatedMovies',
         'saveMovies'
      ])
   },
   mounted() {
      this.$store.dispatch('getWatchedMovies');
   },
   components: {
      ShowTable,
      ShowTableRow,
      NoContent
   }
}
</script>

<style lang="scss"></style>
