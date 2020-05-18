import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import mostPopular from './modules/most-popular';
import showCollection from './modules/show-collection';
import watching from './modules/watching';
import rewatchlist from './modules/rewatch-list';
import watched from './modules/watched';
import watchedMovies from './modules/watched-movies';
import toast from './modules/toast';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    mostPopular,
    showCollection,
    watching,
    rewatchlist,
    watched,
    watchedMovies,
    toast
  }
});
