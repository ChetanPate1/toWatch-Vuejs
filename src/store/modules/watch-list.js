import firebase from 'firebase';
import * as types from '../mutation-types';

const state = {
   watchlist: {}
}

const getters = {
   watchlist: state => state.watchlist
}

const actions = {
   getWatchlist({ commit }) {
      const uid = firebase.auth().currentUser.uid;
      const watchlist = firebase.database().ref(`watchlist/${ uid }`);
      watchlist.on('value', snapshot => {
         commit('GET_WATCHLIST', snapshot.val());
      });
   },
   addToWatchlist({commit}, seriesKey){

   },
   toggleWatched (state, { episode, seasonKey }) {

   },
   setCurrentSeason (state, { on }) {

   }
}

const mutations = {
   [types.GET_WATCHLIST](state, snapshot) {
      state.watchlist = snapshot;
   }
}

export default {
   state,
   getters,
   mutations,
   actions
}
