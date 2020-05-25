import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import mostPopular from './modules/most-popular';
import showCollection from './modules/show-collection';
import watching from './modules/watching';
import watchedShows from './modules/watched-shows';
import watchedMovies from './modules/watched-movies';
import lookups from './modules/lookups';
import toast from './modules/toast';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    mostPopular,
    showCollection,
    watching,
    watchedShows,
    watchedMovies,
    lookups,
    toast
  }
});
