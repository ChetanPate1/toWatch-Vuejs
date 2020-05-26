<template lang="html">
<div class="container-fluid fade-in">
  <div class="row margin-bottom-20">
    <div class="col-xs-12">
      <search-movies></search-movies>
    </div>
  </div>

  <div class="row show-layout">
    <div class="col-xs-6 col-sm-3 col-md-2" v-for="item in collection" :key="item._id">
      <movie-card
        :heading="item.movie.title"
        :img-src="item.movie.poster"
        :movie-id="item.movie._id"
        :id="item._id"
        :deleteable="true">
      </movie-card>
    </div>
    <no-content message="Your movie collection is empty!" :condition="!collection.length"></no-content>
  </div>
</div>
</template>

<script>
import SearchMovies from './SearchMovies/SearchMovies';
import MovieCard from './MovieCard/MovieCard';
import NoContent from './NoContent/NoContent';
import { mapState } from 'vuex';

export default {
  name: 'MovieCollection',
  computed: {
    ...mapState({
      collection: ({ movieCollection }) => movieCollection.collection
    })
  },
  async created() {
    await this.$store.dispatch('movieCollection/getMovieCollection');
  },
  components: {
    SearchMovies,
    MovieCard,
    NoContent
  }
};
</script>

<style lang="scss"></style>
