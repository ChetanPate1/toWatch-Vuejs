import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import mostPopular from './modules/most-popular';
import myShows from './modules/my-shows';
import watchlist from './modules/watch-list';
import rewatchlist from './modules/rewatch-list';
import watched from './modules/watched';
import watchedMovies from './modules/watched-movies';
import toast from './modules/toast';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    mostPopular,
    myShows,
    watchlist,
    rewatchlist,
    watched,
    watchedMovies,
    toast
  }
});
