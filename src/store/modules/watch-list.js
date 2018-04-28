import firebase from 'firebase';
import * as types from '../mutation-types';
import { timeNow, objSize } from '@/js/helperFunctions';

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
   addToWatchlist({commit}, seriesKey){

   },
   toggleWatched ({ episode, seasonKey }) {

   },
   setCurrentSeason ({ commit },{ season, currentSeason }) {
      console.log(season, currentSeason);
      let count = 1, j = 1;
      let totalEpisodes = objSize(season);
      let nextSeason = parseInt(currentSeason, 0) + 1;
      let on = { episode: 1, season: currentSeason };

      for (j; j < totalEpisodes; j++) {
         if(season[j].watched){
            count++;
         }
         if (!season[j].watched) {
            count + 1;
         }
      }

      if(count === objSize(season)){
         on.season = nextSeason.toString();
         on.episode = 1;
      }else {
         on.episode = count;
      }

      commit('SET_CURRENT_SEASON', on);
   }
}

const mutations = {
   [types.GET_WATCHLIST](state, snapshot) {
      state.watchlist = snapshot;
   },
   [types.SET_CURRENT_SEASON](state, on) {
      console.log(on);
   }
}

export default {
   state,
   getters,
   mutations,
   actions
}
