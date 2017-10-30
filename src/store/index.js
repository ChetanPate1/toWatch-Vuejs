import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import mostPopular from './modules/most-popular';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    mostPopular
  }
});
