import { auth, database } from 'firebase';
import { GET_WATCHLIST } from '../mutation-types';
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
  addToWatchlist({ dispatch, rootState, getters }, series) {
    const show = rootState.myShows.shows[series.seriesRef];
    const initSeries = initWatchlist(show, series);
    const uid = auth().currentUser.uid;
    const ref = database().ref(`watchlist/${uid}`);
    let exists = [];

    dispatch('getWatchlist').then(() => {
      const w = getters.watchlist;

      if (w) {
        exists = Object.keys(w).filter(v => w[v].showId === series.seriesRef);
      }

      if (exists.length) {
        dispatch("showToast", {
          title: "Series already added!",
          message: `${show.Title} is already added to your watchlist.`
        });
      } else {
        const watchlist = ref.push(initSeries);
        watchlist.set(initSeries);
        watchlist.update(initSeries);

        dispatch("showToast", {
          title: "Added",
          message: `${show.Title} added to watchlist.`
        });
      }
    });
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
  deleteWatchlist({ dispatch, rootState }, { id, seriesRef }) {
    const uid = auth().currentUser.uid;
    const watchlistItem = database().ref(`watchlist/${uid}/${id}`);

    watchlistItem.remove();

    dispatch("showToast", {
      title: "Deleted",
      message: `${rootState.myShows.shows[seriesRef].Title} deleted from watchlist.`
    });
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
  [GET_WATCHLIST](state, snapshot) {
    state.watchlist = snapshot;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
