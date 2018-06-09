<template lang="html">
<div class="container">
   <div class="row">
      <div class="col-md-4" v-for="movie in watchedMovies">
         <div class="table-row">
            {{ movie.title }}
         </div>
      </div>
      <no-content :message="noContentMessage" :condition="!watchedMovies"></no-content>
   </div>
</div>
</template>

<script>
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
      NoContent
   }
}
</script>

<style lang="scss">
.table-row{
   display: inline-block;
   width: 100%;
   background-color: #ffffff;
   border-radius: 6px;
   padding: 15px 20px;
   margin-bottom: 10px;
   box-shadow: 0 8px 40px -10px rgba(0, 0, 0, 0.2);

   .col-10{
      float: left;
      width: 10%;
   }

   .col-20{
      float: left;
      width: 20%;
   }

   .col-50{
      float: left;
      width: 50%;
   }
}
</style>
