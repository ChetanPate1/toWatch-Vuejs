// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import * as firebase from 'firebase';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
/* eslint-disable no-new */
firebase.initializeApp({
  apiKey: "AIzaSyBThnFs67ZrJ6J0z6IXkGzT16077IGXk9c",
  authDomain: "towatch-b9155.firebaseapp.com",
  databaseURL: "https://towatch-b9155.firebaseio.com",
  projectId: "towatch-b9155",
  storageBucket: "towatch-b9155.appspot.com",
  messagingSenderId: "989986376535"
});

new Vue({
 store,
 el: '#app',
 router,
 template: '<App/>',
 components: { App }
});
