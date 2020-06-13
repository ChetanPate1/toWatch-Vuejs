<template lang="html">
<form v-on:submit.prevent="findShow">
  <div class="form-element search dark">
    <button type="button" class="dripicons-cross"
        @click="empty"
        v-if="foundMovies.length">
    </button>
    <div class="loader" :class="{'show' : sendStatus.loader }"></div>
    <input type="text" name="name" v-model="name" placeholder="'Movie Name, Year'">
    <button type="submit" class="dripicons-search"
        :disabled="sendStatus.disableButton">
    </button>

    <div class="search-results" :class="{'show' : foundMovies }">
      <search-result-item 
        v-for="(movie, index) in foundMovies" :key="index"
        :poster="movie.Poster"
        :title="movie.Title"
        :plot="movie.Plot"
        :year="movie.Year"
        @click="addMovie(movie)"
        :disabled="sendStatus.disableButton"
      ></search-result-item>
    </div>
  </div>
</form>
</template>

<script>
import SearchResultItem from './SearchResultItem';
import { mapState } from 'vuex';

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
    };
  },
  computed: {
    ...mapState({
      foundMovies: ({ movies }) => movies.foundMovies
    })
  },
  methods: {
    async addMovie(movie) {
      this.sendStatus.disableButton = true;
      await this.$store.dispatch('movieCollection/saveToMovieCollectionMovie', movie);
      this.name = '';
      this.sendStatus.disableButton = false;
      this.empty();
    },
    async findShow() {
      this.sendStatus.disableButton = true;
      await this.$store.dispatch('movies/findMovies', this.name);
      this.sendStatus.disableButton = false;
    },
    empty() {
      this.$store.dispatch('movies/emptyFoundMovies');
    }
  },
  components: {
    SearchResultItem
  }
};
</script>

<style lang="scss">
.search-results {
  width: 100%;
  border-radius: 6px;
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.7);
  transition: all 500ms ease;
  transform: translate(-100%, 0);
  height: auto;
  overflow-y: auto;
  opacity: 0;

  .poster {
    border-radius: 5px;
    margin-top: 20px;
    box-shadow: 0 20px 65px 6px rgba(0, 0, 0, 0.4);
  }

  &.show {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    opacity: 1;
  }
}
</style>
