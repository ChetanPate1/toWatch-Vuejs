import firebase from 'firebase';
import * as types from '../mutation-types';
import { initWatchlist } from '../../js/generators';

const state = {
  watchlist: {}
};

const getters = {
  watchlist: state => state.watchlist
};

const actions = {
  getWatchlist({ commit }) {
    const uid = firebase.auth().currentUser.uid;
    const watchlist = firebase.database().ref(`watchlist/${uid}`);

    watchlist.on('value', snapshot => {
      commit('GET_WATCHLIST', snapshot.val());
    });
  },
  addToWatchlist({ rootState }, series) {
    const show = rootState.myShows.shows[series.seriesRef];
    const initSeries = initWatchlist(show, series);
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`watchlist/${uid}`).push(initSeries);

    ref.set(initSeries);
    ref.update(initSeries);
  },
  updatedWatched({ state }, watchlistId) {
    const watchlistItem = state.watchlist[watchlistId];
    const showId = watchlistItem.showId;
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`watched/${uid}/${showId}`);
    let watched = {
      watched: watchlistItem.unwatched,
      on: watchlistItem.on
    };

    ref.update(watched);
  },
  deleteWatchlist({ state }, watchlistId) {
    const uid = firebase.auth().currentUser.uid;
    const watchlistItem = firebase.database().ref(`watchlist/${uid}/${watchlistId}`);
    watchlistItem.remove();
  },
  toggleWatched({ dispatch, rootState }, { watchlistId, seriesRef, episode, season }) {
    const show = rootState.myShows.shows[seriesRef];
    const updatedShow = initWatchlist(show, { seriesRef, episode, season });
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`watchlist/${uid}/${watchlistId}`);

    ref.update(updatedShow);

    dispatch('updatedWatched', watchlistId);
  }
}

const mutations = {
  [types.GET_WATCHLIST](state, snapshot) {
    state.watchlist = snapshot;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
