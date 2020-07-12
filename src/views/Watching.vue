<template lang="html">
<div>
  <popup title="Add To Watch List" size="md" ref="popup">
    <add-to-watchlist ref="addToWatchlist" :show="selectedShow"></add-to-watchlist>
  </popup>

  <popup :title="'Confirm'" :size="'md'" ref="confirmPopup">
    <h4 class="margin-top-0 margin-bottom-20">
      Are you sure you want to delete this show?
    </h4>

    <div class="margin-bottom-30">
      <switch-group
        v-model="deleteReason"
        :options="options">
      </switch-group>
    </div>

    <button class="button button-sm red pull-left"
            type="button"
            @click="$refs.confirmPopup.close({ answer: 'cancel' })">Cancel
    </button>

    <button class="button button-sm pull-right"
            type="button"
            @click="$refs.confirmPopup.close({ answer: 'yes', deleteReason })">Yes
    </button>
  </popup>

  <pager
    :current-page="currentPage"
    :total-pages="totalPages">
  </pager>

  <div class="container-fluid fade-in">
    <div class="row">
      <div class="col-xs-12 margin-bottom-30">
        <search-shows @onSelect="onSelect"></search-shows>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3" v-for="item in watching" :key="item._id">
        <watchlist-card
          :heading="item.show.name"
          :id="item._id"
          :data="item"
          :img-src="item.show.image.original">
        </watchlist-card>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <loader :show="requesting"></loader>
      </div>
    </div>

    <reached-end :show="reachedEnd">
      Reached End
    </reached-end>

    <no-content message="Your watch list is empty!" :condition="!watching.length"></no-content>
  </div>
</div>
</template>

<script>
import WatchlistCard from '@/components/WatchlistCard/WatchlistCard';
import NoContent from '@/components/NoContent/NoContent';
import Popup from '@/components/Popup/Popup';
import SwitchGroup from '@/components/FormElements/SwitchGroup';
import SearchShows from '@/components/Search/SearchShows';
import AddToWatchlist from '@/components/AddToWatchlist/AddToWatchlist';
import Loader from '@/components/Loader/Loader';
import Pager from '@/components/Pager/Pager';
import ReachedEnd from '@/components/ReachedEnd/ReachedEnd';

import { mapState } from 'vuex';

export default {
  name: 'Watching',
  data() {
    return {
      selectedShow: {
        title: ''
      },
      options: [
        { id: 1, label: 'Woke Shit' },
        { id: 2, label: 'Boring' }
      ],
      deleteReason: ''
    }
  },
  async mounted() {
    await this.$store.dispatch('watching/getWatching', {
      currentPage: 1
    });

    this.initScroll();
  },
  computed: {
    ...mapState({
      watching: ({ watching }) => watching.watching,
      currentPage:  ({ watching }) => watching.currentPage,
      totalPages:  ({ watching }) => watching.totalPages,
      reachedEnd: ({ watching }) => {
        const { pageSize, currentPage, totalPages } = watching;

        if (watching.watching.length < pageSize) {
          return false;
        }

        return totalPages == currentPage;
      },
      requesting: ({ watching }) => watching.requesting
    })
  },
  methods: {
    onSelect(show) {
      this.selectedShow = show;
      this.$refs.popup.open();
    },
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
    WatchlistCard,
    NoContent,
    Popup,
    SwitchGroup,
    SearchShows,
    AddToWatchlist,
    Loader,
    Pager,
    ReachedEnd
  }
};
</script>

<style lang="scss"></style>
