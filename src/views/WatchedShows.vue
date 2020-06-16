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
    
    <div class="row">
      <div class="col-xs-12">
        <loader :show="requesting"></loader>
      </div>
    </div>

    <reached-end :show="reachedEnd">
      Reached End
    </reached-end>
    <no-content message="You haven't watched any shows yet!" :condition="!watchedShows.length"></no-content>
  </div>
</div>
</template>

<script>
import Popup from '@/components/Popup/Popup';
import NoContent from '@/components/NoContent/NoContent';
import WatchedShowCard from '@/components/WatchedShowCard/WatchedShowCard';
import Loader from '@/components/Loader/Loader';
import ReachedEnd from '@/components/ReachedEnd/ReachedEnd';

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
  mounted() {
    this.$store.dispatch('watchedShows/getWatchedShows', {
      currentPage: 1
    });

    this.initScroll();
  },
  computed: {
    ...mapState({
      watchedShows: ({ watchedShows }) => watchedShows.watchedShows,
      currentPage: ({ watchedShows }) => watchedShows.currentPage,
      reachedEnd: ({ watchedShows }) => {
        const { pageSize, currentPage, totalPages } = watchedShows;
        
        if (watchedShows.watchedShows.length < pageSize) {
          return false;
        }

        return totalPages == currentPage;
      },
      requesting: ({ watchedShows }) => watchedShows.requesting
    })
  },
  methods: {
    initScroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$store.dispatch('watchedShows/getWatchedShows', {
            currentPage: this.currentPage + 1
          });
        }
      };
    }
  },
  components: {
    Popup,
    NoContent,
    WatchedShowCard,
    Loader,
    ReachedEnd
  }
};
</script>

<style lang="scss">

</style>
