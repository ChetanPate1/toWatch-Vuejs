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
   updatedWatched({ state }, watchlistId){
      const watchlistItem = state.watchlist[watchlistId];
      const showId = watchlistItem.showId;
      let watched = {
         watched: watchlistItem.unwatched,
         on: watchlistItem.on
      };

      const uid = firebase.auth().currentUser.uid;
      const ref = firebase.database().ref(`watched/${ uid }/${ showId }`);
      ref.update(watched);
   },
   deleteWatchlist({ state }, watchlistId){
      const uid = firebase.auth().currentUser.uid;
      const watchlistItem = firebase.database().ref(`watchlist/${ uid }/${ watchlistId }`);
      watchlistItem.remove();
   },
   toggleWatched ({ commit, dispatch, state }, { watchlistId, show, episodeDetails }) {
      let episodeNumber = episodeDetails.number;
      let seasonNumber = episodeDetails.season;
      let onEpisode = show.on.episode;
      let onSeason = show.on.season;
      let seasonKey = `season_${ seasonNumber }`;
      let seasonDetails = show.unwatched[seasonKey];
      let isValidSeason = onSeason === seasonNumber;
      var prevSeason = [];
      var isOneMoreOrOneLess = episodeNumber === onEpisode || episodeNumber === onEpisode - 1;
      var isLastEpisodePrevSeason = false;

      if(onSeason - 1 < 1){
         prevSeason = show.unwatched['season_1'];
      }else {
         prevSeason = show.unwatched[`season_${onSeason - 1}`];
      }

      let prevSeasonLastEpisode = prevSeason[prevSeason.length - 1];

      isOneMoreOrOneLess = isOneMoreOrOneLess|| episodeNumber === prevSeasonLastEpisode.number;
      isLastEpisodePrevSeason = episodeNumber === prevSeasonLastEpisode.number && prevSeasonLastEpisode.season === onSeason - 1;
      isValidSeason = isValidSeason || onSeason - 1 === seasonNumber;

      if(!isValidSeason || !isFutureTime(episodeDetails.airDate) || !isOneMoreOrOneLess){
         return;
      }

      if(episodeNumber === prevSeason.length){
         if(isLastEpisodePrevSeason){
            if(episodeDetails.watched){
               seasonNumber = onSeason - 1;
               onSeason = onSeason - 1;
            }
         }else {
            seasonNumber = onSeason;
            onSeason = onSeason + 1;
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
      })
      .then(() => {
         const uid = firebase.auth().currentUser.uid;
         const ref = firebase.database().ref(`watchlist/${ uid }/${ watchlistId }`);
         ref.update(state.watchlist[watchlistId]);

         dispatch('updatedWatched', watchlistId);
      });
   },
   setCurrentSeason ({ commit }, { watchlistId, seasonDetails, show, onSeason }) {
      var nextSeason = onSeason + 1;
      var isLastSeason = show.unwatched['season_'+ nextSeason] == undefined;
      var count = 0, on = { season: onSeason };

      show.unwatched[`season_${onSeason}`].forEach((episode) => {
         if(episode.watched){
            count++;
         }
      });

      if(count == seasonDetails.length){
         if(isLastSeason){
            on.name = 'TBA';
         }else {
            on.name = show.unwatched['season_'+ on.season].filter((episode) => {
               if(episode.number === on.episode){
                  return episode.name;
               }
            });
         }
         on.season = nextSeason;
         on.episode = 1;
      }else {
         on.episode = count + 1;
         on.name = show.unwatched['season_'+ on.season].filter((episode) => {
            if(episode.number === on.episode){
               return episode.name;
            }
         });
      }

      commit('SET_CURRENT_SEASON', { watchlistId , on });
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
