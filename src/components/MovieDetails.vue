<template lang="html">
<div class="container-fluid">
   {{movieDetails}}
</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'MoviesDetails',
   data() {
      return {

      }
   },
   computed: {
      ...mapGetters([
         'movieDetails',
      ]),
      ...mapActions([
         'getMovieDetails'
      ])
   },
   mounted() {
      this.$store.dispatch('getMovieDetails', this.$route.params.reference);
   },
   components: {}
}
</script>

<style lang="scss"></style>
