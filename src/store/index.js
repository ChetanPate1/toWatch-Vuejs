import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import mostPopular from './modules/most-popular';
import myShows from './modules/my-shows';
import watchlist from './modules/watch-list';

Vue.use(Vuex);

export default new Vuex.Store({
   modules: {
      auth,
      mostPopular,
      myShows,
      watchlist
   }
});
