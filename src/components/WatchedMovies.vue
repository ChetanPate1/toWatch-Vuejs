<template lang="html">
<div class="container">
   <div class="row">


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
         'getWatedMovies'
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
</style>
