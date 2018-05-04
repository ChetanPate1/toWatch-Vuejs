import firebase from 'firebase';
import * as types from '../mutation-types';
import { timeNow, objSize, isFutureTime } from '@/js/helperFunctions';
import { initWatchlist } from '../../js/generators';

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
   addToWatchlist({ rootState }, series){
      let show = rootState.myShows.shows[series.seriesRef];
      let initSeries = initWatchlist(show, series);

      const uid = firebase.auth().currentUser.uid;
      const ref = firebase.database().ref(`watchlist/${ uid }`).push(initSeries);
      ref.set(initSeries);
      ref.update(initSeries);
   },
   toggleWatched ({ commit, dispatch }, { watchlistId, show, episodeDetails }) {
      let episodeNumber = episodeDetails.number - 1;
      let seasonNumber = episodeDetails.season;
      let currentEpisode = show.on.episode;
      let currentSeason = show.on.season;
      let isCurrentSeason = currentSeason === seasonNumber;
      let isOneMoreOrOneLess = episodeNumber === currentEpisode || episodeNumber === currentEpisode - 1;
      let seasonKey =  `season_${ seasonNumber }`;
      let seasonDetails = show.unwatched[seasonKey];

      if(!isCurrentSeason || !isFutureTime(episodeDetails.airDate) || !isOneMoreOrOneLess){
         return;
      }

      commit('TOGGLE_WATCHED', {
         watchlistId,
         episodeNumber,
         seasonNumber
      });

      dispatch('setCurrentSeason', {
         watchlistId,
         seasonDetails,
         show,
         currentSeason
      });
   },
   setCurrentSeason ({ commit }, { watchlistId, seasonDetails, show, currentSeason }) {
      var nextSeason = currentSeason + 1;
      var isLastSeason = show.unwatched['season_'+ nextSeason] == undefined;
      var numberOfSeasons = objSize(show.unwatched) + currentSeason;
      var count = 0, on = { season: currentSeason };

      let countWatched = new Promise((resolve, reject) => {
         show.unwatched[`season_${currentSeason}`].forEach((episode) => {
            if(episode.watched){
               count++;
            }
         });

         if(count == seasonDetails.length){
            on.season = nextSeason;
            on.episode = 1;
         }else {
            on.episode = count;
         }

         return resolve(on);
      });

      countWatched.then((on) => {
         commit('SET_CURRENT_SEASON', { watchlistId , on });
      });
   }
}

const mutations = {
   [types.GET_WATCHLIST](state, snapshot) {
      state.watchlist = snapshot;
   },
   [types.TOGGLE_WATCHED](state, { watchlistId, episodeNumber, seasonNumber }) {
      state.watchlist[watchlistId].unwatched[`season_${seasonNumber}`][episodeNumber].watched = !state.watchlist[watchlistId].unwatched[`season_${seasonNumber}`][episodeNumber].watched;
   },
   [types.SET_CURRENT_SEASON](state, { watchlistId, on }) {
      state.watchlist[watchlistId].on = on;
   }
}

export default {
   state,
   getters,
   mutations,
   actions
}
