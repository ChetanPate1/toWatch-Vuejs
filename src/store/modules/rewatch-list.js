import { auth, database } from 'firebase';
import { GET_REWATCHLIST, TOGGLE_REWATCHED } from '../mutation-types';
import { initWatchlist } from '../../js/generators';

const state = {
  rewatchlist: {}
};

const getters = {
  rewatchlist: state => state.rewatchlist
};

const actions = {
  getRewatchlist({ commit }) {
    const uid = auth().currentUser.uid;
    const rewatchlist = database().ref(`rewatchlist/${uid}`);

    rewatchlist.on('value', snapshot => {
      commit('GET_REWATCHLIST', snapshot.val());
    });
  },
  addToRewatchlist({ state, dispatch, rootState }, series) {
    let show = rootState.myShows.shows[series.seriesRef];
    let initSeries = initWatchlist(show, series);
    const uid = auth().currentUser.uid;
    const ref = database().ref(`rewatchlist/${uid}`);
    let exists = [];

    if (state.rewatchlist) {
      exists = Object.keys(state.rewatchlist).filter(r => state.rewatchlist[r].showId === series.seriesRef);
    }

    if (exists.length) {
      dispatch('showToast', {
        title: 'Series already added!',
        message: `${show.Title} is already added to your rewatchlist.`
      });
    } else {
      let rewatch = ref.push(initSeries);
      rewatch.set(initSeries);
      rewatch.update(initSeries);
      dispatch('showToast', { title: 'Added', message: `${show.Title} added to rewatchlist.` });
    }

  },
  deleteRewatchlist({ dispatch, getters }, { id, seriesRef }) {
    const uid = auth().currentUser.uid;
    const item = database().ref(`rewatchlist/${uid}/${id}`);
    item.remove();

    dispatch('showToast', {
      title: 'Deleted',
      message: `${getters.myShows[seriesRef].Title} deleted from rewatchlist.`
    });
  },
  toggleRewatched({ rootState }, { rewatchlistId, seriesRef, episode, season }) {
    const show = rootState.myShows.shows[seriesRef];
    const updatedShow = initWatchlist(show, { seriesRef, episode, season });
    const uid = auth().currentUser.uid;
    const ref = database().ref(`rewatchlist/${uid}/${rewatchlistId}`);
    ref.update(updatedShow);
  }
};

const mutations = {
  [GET_REWATCHLIST](state, snapshot) {
    state.rewatchlist = snapshot;
  },
  [TOGGLE_REWATCHED](state, { rewatchlistId, episodeNumber, seasonNumber }) {
    let episodeIndex = episodeNumber - 1;
    state.rewatchlist[rewatchlistId].unwatched[`season_${seasonNumber}`][episodeIndex].watched = !state.rewatchlist[rewatchlistId].unwatched[`season_${seasonNumber}`][episodeIndex].watched;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
