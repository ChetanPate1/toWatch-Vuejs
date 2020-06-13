<template lang="html">
<div>
  <popup :title="'Confirm'" :size="'md'" ref="confirmPopup">
    <h4 class="margin-top-0 margin-bottom-20">
      Are you sure you want to delete this watched show?
    </h4>

    <button class="button button-sm red pull-left"
            type="button"
            @click="$refs.confirmPopup.close('cancel')">Cancel
    </button>

    <button class="button button-sm pull-right"
            type="button"
            @click="$refs.confirmPopup.close('yes')">Yes
    </button>
  </popup>

  <div class="container fade-in">
    <div class="col-sm-6 col-md-4" v-for="item in watchedShows" :key="item._id">
      <watched-show-card :data="item"></watched-show-card>
    </div>
    
    <no-content message="You haven't watched any shows yet!" :condition="!watchedShows.length"></no-content>
  </div>
</div>
</template>

<script>
import Popup from './Popup/Popup';
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
    Popup,
    NoContent,
    WatchedShowCard
  }
};
</script>

<style lang="scss"></style>
