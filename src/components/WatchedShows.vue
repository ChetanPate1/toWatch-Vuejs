<template lang="html">
  <div class="container fade-in">
    <div class="col-sm-4" v-for="item in watchedShows" :key="item._id">
      <watched-show-card :data="item"></watched-show-card>
    </div>
    
    <no-content message="You haven't watched any shows yet!" :condition="!watchedShows.length"></no-content>
  </div>
</template>

<script>
import NoContent from './NoContent/NoContent';
import WatchedShowCard from './WatchedShowCard/WatchedShowCard';

import { mapState } from 'vuex';

export default {
  name: 'Watched',
  data() {
    return {
      statusClasses: {
        Running: 'green',
        Ended: 'red'
      }
    };
  },
  computed: {
    ...mapState({
      watchedShows: state => state.watchedShows.watchedShows
    })
  },
  mounted() {
    this.$store.dispatch('watchedShows/getWatchedShows');
  },
  components: {
    NoContent,
    WatchedShowCard
  }
};
</script>

<style lang="scss"></style>
