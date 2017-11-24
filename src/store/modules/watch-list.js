import firebase from 'firebase';
import * as types from '../mutation-types';

const state = {
  watchlist: {}
}

const getters = {
  watchlist: state => state.watchlist
}

const actions = {
  getWatchlist({ commit }, payload) {
    const watchlist = firebase.database().ref(`watchlist/${ payload.uid }`);
    watchlist.on('value', snapshot => {
      commit('GET_WATCHLIST', snapshot.val());
    });
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
