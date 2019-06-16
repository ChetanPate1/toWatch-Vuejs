import { auth, database } from 'firebase';
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
    const uid = auth().currentUser.uid;
    const watchlist = database().ref(`watchlist/${uid}`);

    watchlist.on('value', snapshot => {
      commit('GET_WATCHLIST', snapshot.val());
    });
  },
  addToWatchlist({ dispatch, rootState }, series) {
    const show = rootState.myShows.shows[series.seriesRef];
    const initSeries = initWatchlist(show, series);
    const uid = auth().currentUser.uid;
    const ref = database().ref(`watchlist/${uid}`).push(initSeries);
    dispatch("showToast", { title: "Added", message: `${show.Title} added to watchlist.` });

    ref.set(initSeries);
    ref.update(initSeries);
  },
  updatedWatched({ state, rootState }, watchlistId) {
    const watchlistItem = state.watchlist[watchlistId];
    const showId = watchlistItem.showId;
    const uid = auth().currentUser.uid;
    const ref = database().ref(`watched/${uid}/${showId}`);
    const watched = {
      show: rootState.myShows.shows[showId].Title,
      watched: watchlistItem.unwatched,
      on: watchlistItem.on
    };

    ref.update(watched);
  },
  deleteWatchlist({ dispatch, getters }, { id, seriesRef }) {
    const uid = auth().currentUser.uid;
    const watchlistItem = database().ref(`watchlist/${uid}/${id}`);
    dispatch("showToast", { title: "Deleted", message: `${getters.myShows[seriesRef].Title} deleted from watchlist.` });

    watchlistItem.remove();
  },
  toggleWatched({ dispatch, rootState }, { watchlistId, seriesRef, episode, season }) {
    const show = rootState.myShows.shows[seriesRef];
    const updatedShow = initWatchlist(show, { seriesRef, episode, season });
    const uid = auth().currentUser.uid;
    const ref = database().ref(`watchlist/${uid}/${watchlistId}`);

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
};
