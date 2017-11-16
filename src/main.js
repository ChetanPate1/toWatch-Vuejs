// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import * as firebase from 'firebase';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyBThnFs67ZrJ6J0z6IXkGzT16077IGXk9c",
  authDomain: "towatch-b9155.firebaseapp.com",
  databaseURL: "https://towatch-b9155.firebaseio.com",
  projectId: "towatch-b9155",
  storageBucket: "towatch-b9155.appspot.com",
  messagingSenderId: "989986376535"
});

let app;
firebase.auth().onAuthStateChanged((user) =>{
  if(!app){

    app = new Vue({
      store,
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    });
  }
});
/* eslint-disable no-new */
