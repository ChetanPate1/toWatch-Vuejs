<template lang="html">
<div>
  <popup :title="'Confirm'" :size="'md'" ref="confirmPopup">
    <h4 class="margin-top-0 margin-bottom-30">
      Are you sure you want to delete this movie?
    </h4>

    <button class="button button-sm red pull-left"
            type="button"
            @click="$refs.confirmPopup.close('cancel')">Cancel
    </button>

    <button class="button button-sm pull-right"
            type="button"
            @click="$refs.confirmPopup.close('yes')">Yes
    </button>
  </popup>

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
    </div>

    <div class="row">
      <div class="col-xs-12">
        <loader :show="requesting"></loader>
      </div>
    </div>
    
    <reached-end :show="reachedEnd">
      Reached End
    </reached-end>

    <no-content message="Your movie collection is empty!" :condition="!collection.length"></no-content>
  </div>
</div>
</template>

<script>
import Popup from '@/components/Popup/Popup';
import SearchMovies from '@/components/Search/SearchMovies';
import MovieCard from '@/components/MovieCard/MovieCard';
import NoContent from '@/components/NoContent/NoContent';
import Loader from '@/components/Loader/Loader';
import ReachedEnd from '@/components/ReachedEnd/ReachedEnd';

import { mapState } from 'vuex';

export default {
  name: 'MovieCollection',
  async mounted() {
    await this.$store.dispatch('movieCollection/getMovieCollection', {
      currentPage: 1
    });

    this.initScroll();
  },
  computed: {
    ...mapState({
      collection: ({ movieCollection }) => movieCollection.collection,
      currentPage:  ({ movieCollection }) => movieCollection.currentPage,
      reachedEnd: ({ movieCollection }) => {
        const { collection, pageSize, currentPage, totalPages } = movieCollection;
        
        if (collection.length < pageSize) {
          return false;
        }

        return totalPages == currentPage;
      },
      requesting: ({ movieCollection }) => movieCollection.requesting
    })
  },
  methods: {
    initScroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$store.dispatch('movieCollection/getMovieCollection', {
            currentPage: this.currentPage + 1
          });
        }
      };
    }
  },
  components: {
    Popup,
    SearchMovies,
    MovieCard,
    NoContent,
    Loader,
    ReachedEnd
  }
};
</script>

<style lang="scss"></style>