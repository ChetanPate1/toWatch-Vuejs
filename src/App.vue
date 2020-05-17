<template>
  <div id="app">
    <toast
      v-for="(toast, index) in toasts"
      :key="index"
      :title="toast.title"
      :message="toast.message"
      :show="toast.show"
      :timestamp="toast.timestamp"
    ></toast>

    <navigation-bar></navigation-bar>
    <router-view/>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar/NavigationBar';
import Toast from './components/Toast/Toast';

import { mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters(['toasts'])
  },
  components: {
    NavigationBar,
    Toast
  }
};
</script>

<style src="./style/main.scss" lang="scss"></style>
