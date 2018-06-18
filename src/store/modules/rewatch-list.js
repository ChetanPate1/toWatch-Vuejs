import firebase from 'firebase';
import * as types from '../mutation-types';
import { timeNow, objSize, isFutureTime } from '@/js/helper-functions';
import { initWatchlist } from '../../js/generators';

const state = {
   rewatchlist: {}
}

const getters = {
   rewatchlist: state => state.rewatchlist
}

const actions = {
   getRewatchlist({ commit }) {
      const uid = firebase.auth().currentUser.uid;
      const rewatchlist = firebase.database().ref(`rewatchlist/${ uid }`);

      rewatchlist.on('value', snapshot => {
         commit('GET_REWATCHLIST', snapshot.val());
      });
   },
   addToRewatchlist({ rootState }, series){
      let show = rootState.myShows.shows[series.seriesRef];
      let initSeries = initWatchlist(show, series);
      const uid = firebase.auth().currentUser.uid;
      const ref = firebase.database().ref(`rewatchlist/${ uid }`).push(initSeries);
      ref.set(initSeries);
      ref.update(initSeries);
   },
   deleteRewatchlist({ state }, rewatchlistId){
      const uid = firebase.auth().currentUser.uid;
      const item = firebase.database().ref(`rewatchlist/${ uid }/${ rewatchlistId }`);
      item.remove();
   },
   toggleWatched ({ commit, dispatch, state }, { rewatchlistId, show, episodeDetails }) {
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
         rewatchlistId,
         episodeNumber,
         seasonNumber
      });

      dispatch('setCurrentSeason', {
         rewatchlistId,
         seasonDetails,
         show,
         onSeason,
         episodeNumber
      })
      .then(() => {
         const uid = firebase.auth().currentUser.uid;
         const ref = firebase.database().ref(`rewatchlist/${ uid }/${ rewatchlistId }`);
         ref.update(state.rewatchlist[rewatchlistId]);

         dispatch('updatedWatched', watchlistId);
      });
   },
   setCurrentSeason ({ commit, rootState }, { rewatchlistId, seasonDetails, show, onSeason, episodeNumber }) {
      let showStatus = rootState.myShows.shows[show.showId].status;
      var nextSeason = onSeason + 1;
      var count = 0, on = { season: onSeason };
      const unwatched = show.unwatched;
      let lastSeason = unwatched[`season_${objSize(unwatched)}`];
      let lastEpisodeLastSeason = lastSeason[lastSeason.length - 1];
      let isLastEpisodeLastSeason = onSeason == lastEpisodeLastSeason.season && lastEpisodeLastSeason.number == episodeNumber;

      if(isLastEpisodeLastSeason){

         commit('SET_CURRENT_SEASON', { rewatchlistId , on });
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

      commit('SET_CURRENT_SEASON', { rewatchlistId , on });
   }
}

const mutations = {
   [types.GET_REWATCHLIST](state, snapshot) {
      state.rewatchlist = snapshot;
   },
   [types.TOGGLE_WATCHED](state, { rewatchlistId, episodeNumber, seasonNumber }) {
      let episodeIndex = episodeNumber - 1;
      state.rewatchlist[rewatchlistId].unwatched[`season_${seasonNumber}`][episodeIndex].watched = !state.rewatchlist[rewatchlistId].unwatched[`season_${seasonNumber}`][episodeIndex].watched;
   },
   [types.SET_CURRENT_SEASON](state, { rewatchlistId, on }) {
      state.rewatchlist[rewatchlistId].on = on;
   }
}

export default {
   state,
   getters,
   mutations,
   actions
}
