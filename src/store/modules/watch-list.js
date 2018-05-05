import firebase from 'firebase';
import * as types from '../mutation-types';
import { timeNow, objSize, isFutureTime } from '@/js/helper-functions';
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
      let episodeNumber = episodeDetails.number;
      let seasonNumber = episodeDetails.season;
      let onEpisode = show.on.episode;
      let onSeason = show.on.season;

      let prevSeason = show.unwatched[`season_${onSeason - 1}`];
      let prevSeasonLastEpisode = prevSeason[prevSeason.length - 1];
      let isCurrentSeasonOrOneLess = onSeason === seasonNumber || onSeason - 1 === seasonNumber;

      let isOneMoreOrOneLess = episodeNumber === onEpisode || episodeNumber === onEpisode - 1 || episodeNumber === prevSeasonLastEpisode.number;
      let isLastEpisodePrevSeason = episodeNumber === prevSeasonLastEpisode.number && prevSeasonLastEpisode.season === onSeason - 1;
      let seasonKey = `season_${ seasonNumber }`;
      let seasonDetails = show.unwatched[seasonKey];

      if(!isCurrentSeasonOrOneLess || !isFutureTime(episodeDetails.airDate) || !isOneMoreOrOneLess){
         return;
      }
      //this season or (one less && is last episode), one plus or minus 1 episode
      if(episodeNumber === prevSeason.length){
         if(isLastEpisodePrevSeason){
            seasonNumber = onSeason - 1;
            onSeason = onSeason - 1;
         }
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
         onSeason
      });
   },
   setCurrentSeason ({ commit }, { watchlistId, seasonDetails, show, onSeason }) {
      var nextSeason = onSeason + 1;
      var isLastSeason = show.unwatched['season_'+ nextSeason] == undefined;
      var numberOfSeasons = objSize(show.unwatched) + onSeason;
      var count = 0, on = { season: onSeason };

      let countWatched = new Promise((resolve, reject) => {
         show.unwatched[`season_${onSeason}`].forEach((episode) => {
            if(episode.watched){
               count++;
            }
         });

         if(count == seasonDetails.length){
            on.season = nextSeason;
            on.episode = 1;
         }else {
            on.episode = count + 1;
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
      let episodeIndex = episodeNumber - 1;
      state.watchlist[watchlistId].unwatched[`season_${seasonNumber}`][episodeIndex].watched = !state.watchlist[watchlistId].unwatched[`season_${seasonNumber}`][episodeIndex].watched;
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
