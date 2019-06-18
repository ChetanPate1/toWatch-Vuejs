import { auth, database } from 'firebase';
import { GET_MY_SHOWS, UPDATE_FOUND_SHOWS, EMPTY_FOUND_SHOWS } from '../mutation-types';
import axios from 'axios';
import { generateSeasons } from '../../js/generators';

const state = {
  shows: {},
  foundShows: []
};

const getters = {
  myShows: state => state.shows,
  foundShows: state => state.foundShows
};

const actions = {
  getMyShows({ commit }) {
    const uid = auth().currentUser.uid;
    const myShows = database().ref(`shows/${uid}`);
    myShows.on('value', snapshot => {
      commit('GET_MY_SHOWS', snapshot.val());
    });
  },
  searchForShow({ commit }, { type, showName }) {
    axios
      .get('https://www.omdbapi.com', {
        params: {
          apikey: '7174c422',
          s: showName,
          type
        }
      })
      .then(res => {
        commit('UPDATE_FOUND_SHOWS', res.data.Search);
      });
  },
  saveShow({ commit, dispatch, rootState }, movie) {
    const alreadyAdded = Object.keys(rootState.myShows.shows).filter(id =>
      rootState.myShows.shows[id].imdbID === movie.imdbID);

    if (alreadyAdded.length) {
      const id = alreadyAdded[0];

      commit('EMPTY_FOUND_SHOWS');

      return dispatch("showToast", {
        title: "Already Added!",
        message: `${rootState.myShows.shows[id].Title} already added to my shows.`
      });
    }

    axios
      .get('https://www.omdbapi.com', {
        params: {
          apikey: '7174c422',
          i: movie.imdbID,
          type: 'series'
        }
      })
      .then(res => {
        generateSeasons(res.data).then(show => {
          if (show.episodes.length > 0) {
            const uid = auth().currentUser.uid;
            const ref = database().ref(`shows/${uid}`).push(show);
            ref.set(show);
            ref.update(show);

            commit('EMPTY_FOUND_SHOWS');
          }
        });
      });
  },
  deleteShow({ commit }, { ref, deleteFromWatched }) {
    const uid = auth().currentUser.uid;
    const show = database().ref(`shows/${uid}/${ref}`);
    const watched = database().ref(`watched/${uid}/${ref}`);

    if (deleteFromWatched) {
      watched.remove();
    }
    show.remove();
  },
  updateShow({ dispatch, rootState }, showId) {
    const { imdbID, Title } = rootState.myShows.shows[showId];
    const uid = auth().currentUser.uid;
    const showRef = database().ref(`shows/${uid}/${showId}`);

    axios
      .get('https://www.omdbapi.com', {
        params: {
          apikey: '7174c422',
          i: imdbID,
          type: 'series'
        }
      })
      .then(res => {
        generateSeasons(res.data).then(show => {
          showRef.update(show);
          dispatch("showToast", { title: "Updated", message: `${Title} episode have been updated.` });
        });
      });
  },
  emptyFoundShows({ commit }) {
    commit('EMPTY_FOUND_SHOWS');
  }
};

const mutations = {
  [GET_MY_SHOWS](state, snapshot) {
    state.shows = snapshot;
  },
  [UPDATE_FOUND_SHOWS](state, foundShows) {
    state.foundShows = foundShows;
  },
  [EMPTY_FOUND_SHOWS](state) {
    state.foundShows = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
