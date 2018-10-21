import firebase from 'firebase';
import * as types from '../mutation-types';
import axios from 'axios';
import { generateSeasons } from '../../js/generators';
import { hasDaysPast } from '../../js/helper-functions';

const today = new Date();

const state = {
      shows: {},
      foundShows: []
}

const getters = {
      myShows: state => state.shows,
      foundShows: state => state.foundShows
}

const actions = {
      getMyShows({ commit }) {
            const uid = firebase.auth().currentUser.uid;
            const myShows = firebase.database().ref(`shows/${uid}`);
            myShows.on('value', snapshot => {
                  commit('GET_MY_SHOWS', snapshot.val());
            });
      },
      searchForShow({ commit }, show) {
            axios.get('https://www.episodate.com/api/search?q=' + show)
                  .then(res => {
                        commit('UPDATE_FOUND_SHOWS', res.data.tv_shows);
                  });
      },
      saveShow({ commit }, showPermalink) {
            axios.get('https://www.episodate.com/api/show-details?q=' + showPermalink)
                  .then(function (res) {
                        let showSeasons = generateSeasons(res.data.tvShow);

                        const uid = firebase.auth().currentUser.uid;
                        const ref = firebase.database().ref(`shows/${uid}`).push(showSeasons);
                        ref.set(showSeasons);
                        ref.update(showSeasons);

                        commit('EMPTY_FOUND_SHOWS');
                  });
      },
      deleteShow({ commit }, ref) {
            const uid = firebase.auth().currentUser.uid;
            const show = firebase.database().ref(`shows/${uid}/${ref}`);
            show.remove();
      },
      updateShow({ commit, rootState }, showId) {
            const show = rootState.myShows.shows[showId];

            const uid = firebase.auth().currentUser.uid;
            const showRef = firebase.database().ref(`shows/${uid}/${showId}`);
            if (hasDaysPast(show.lastUpdated, 2) && show.status != 'Ended') {
                  axios.get('https://www.episodate.com/api/show-details?q=' + show.permalink)
                        .then(function (res) {
                              if (res.status == 200 && Object.keys(res.data.tvShow).length) {
                                    let showSeasons = generateSeasons(res.data.tvShow);
                                    showRef.update(showSeasons);
                              }
                        });
            }
      }
}

const mutations = {
      [types.GET_MY_SHOWS](state, snapshot) {
            state.shows = snapshot;
      },
      [types.UPDATE_FOUND_SHOWS](state, foundShows) {
            state.foundShows = foundShows;
      },
      [types.EMPTY_FOUND_SHOWS](state) {
            state.foundShows = [];
      }
}

export default {
      state,
      getters,
      mutations,
      actions
}
