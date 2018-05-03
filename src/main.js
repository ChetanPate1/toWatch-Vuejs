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
   apiKey: "AIzaSyAMCU6AWLekinzJm7Vv_dlC_AOkkKc90-c",
   authDomain: "to-watch-dev.firebaseapp.com",
   databaseURL: "https://to-watch-dev.firebaseio.com",
   projectId: "to-watch-dev",
   storageBucket: "to-watch-dev.appspot.com",
   messagingSenderId: "208820479575"
});

new Vue({
   store,
   el: '#app',
   router,
   template: '<App/>',
   components: { App }
});
