import firebase from 'firebase';
import * as types from '../mutation-types';
import { initWatchlist } from '../../js/generators';

const state = {
  rewatchlist: {},
  rewatchDetails: {}
};

const getters = {
  rewatchlist: state => state.rewatchlist,
  rewatchDetails: state => state.rewatchDetails
};

const actions = {
  getRewatchlist({ commit }) {
    const uid = firebase.auth().currentUser.uid;
    const rewatchlist = firebase.database().ref(`rewatchlist/${uid}`);

    rewatchlist.on('value', snapshot => {
      commit('GET_REWATCHLIST', snapshot.val());
    });
  },
  getRewatchDetails({ commit }, ref) {
    const uid = firebase.auth().currentUser.uid;
    const rewatchDetails = firebase.database().ref(`rewatchlist/${uid}/${ref}`);

    rewatchDetails.on('value', snapshot => {
      commit('GET_REWATCH_DETAILS', snapshot.val());
    });
  },
  addToRewatchlist({ dispatch, rootState }, series) {
    let show = rootState.myShows.shows[series.seriesRef];
    let initSeries = initWatchlist(show, series);
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`rewatchlist/${uid}`).push(initSeries);
    dispatch("showToast", { title: "Added", message: `${show.Title} added to rewatchlist.` });

    ref.set(initSeries);
    ref.update(initSeries);
  },
  deleteRewatchlist({ dispatch, getters, state }, { id, seriesRef }) {
    const uid = firebase.auth().currentUser.uid;
    const item = firebase.database().ref(`rewatchlist/${uid}/${id}`);
    dispatch("showToast", { title: "Deleted", message: `${getters.myShows[seriesRef].Title} deleted from rewatchlist.` });

    item.remove();
  },
  toggleRewatched({ rootState }, { rewatchlistId, seriesRef, episode, season }) {
    const show = rootState.myShows.shows[seriesRef];
    const updatedShow = initWatchlist(show, { seriesRef, episode, season });
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`rewatchlist/${uid}/${rewatchlistId}`);
    ref.update(updatedShow);
  }
};

const mutations = {
  [types.GET_REWATCHLIST](state, snapshot) {
    state.rewatchlist = snapshot;
  },
  [types.GET_REWATCH_DETAILS](state, snapshot) {
    state.rewatchDetails = snapshot;
  },
  [types.TOGGLE_REWATCHED](state, { rewatchlistId, episodeNumber, seasonNumber }) {
    let episodeIndex = episodeNumber - 1;
    state.rewatchlist[rewatchlistId].unwatched[`season_${seasonNumber}`][episodeIndex].watched = !state.rewatchlist[rewatchlistId].unwatched[`season_${seasonNumber}`][episodeIndex].watched;
  },
  [types.SET_REWATCHLIST_CURRENT_SEASON](state, { rewatchlistId, on }) {
    state.rewatchlist[rewatchlistId].on = on;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
