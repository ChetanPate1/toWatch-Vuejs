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
         onSeason,
         episodeNumber
      })
      .then(() => {
         const uid = firebase.auth().currentUser.uid;
         const ref = firebase.database().ref(`watchlist/${ uid }/${ watchlistId }`);
         ref.update(state.watchlist[watchlistId]);

         dispatch('updatedWatched', watchlistId);
      });
   },
   setCurrentSeason ({ commit, rootState }, { watchlistId, seasonDetails, show, onSeason, episodeNumber }) {
      let showStatus = rootState.myShows.shows[show.showId].status;
      var nextSeason = onSeason + 1;
      var count = 0, on = { season: onSeason };
      const unwatched = show.unwatched;
      let lastSeason = unwatched[`season_${objSize(unwatched)}`];
      let lastEpisodeLastSeason = lastSeason[lastSeason.length - 1];
      let isLastEpisodeLastSeason = onSeason == lastEpisodeLastSeason.season && lastEpisodeLastSeason.number == episodeNumber;

      if(isLastEpisodeLastSeason){
         if(showStatus === 'Running' || showStatus === 'In-Development'){
            on.name = 'TBA';
            on.episode = 1;
            on.season = objSize(unwatched) + 1;
         }else {
            on.name = '';
            on.season = onSeason;
            on.episode = unwatched[`season_${onSeason}`].length - 1
         }

         if(showStatus === 'Running'){
            on.name = 'TBA';
            on.episode = 1;
            on.season = objSize(unwatched) + 1;
         }


         commit('SET_CURRENT_SEASON', { watchlistId , on });
         return;
      }

      unwatched[`season_${onSeason}`].forEach((episode) => {
         if(episode.watched){
            count++;
         }
      });

      if(count == seasonDetails.length){
         on.season = nextSeason;
         on.episode = 1;
         let episode = unwatched['season_'+ on.season].filter(episode => episode.number === on.episode);
         on.name = episode[0].name;
      }else {
         on.episode = count + 1;
         let episode = unwatched['season_'+ on.season].filter(episode => episode.number === on.episode);
         on.name = episode[0].name;
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
