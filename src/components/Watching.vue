<template lang="html">
<div class="container-fluid fade-in">
  <popup title="Add To Watch List" size="md" ref="popup">
    <add-to-watchlist ref="addToWatchlist" :show="selectedShow"></add-to-watchlist>
  </popup>
  
  <div class="row">
    <div class="col-xs-12 margin-bottom-30">
      <search-shows @onSelect="onSelect"></search-shows>
    </div>
    
    <div class="col-xs-12 col-sm-6 col-md-3" v-for="item in watching" :key="item._id">
      <watchlist-card
        :heading="item.show.title"
        :id="item._id"
        :data="item"
        :img-src="item.show.poster">
      </watchlist-card>
    </div>
    
    <no-content message="Your watch list is empty!" :condition="!watching.length"></no-content>
  </div>
</div>
</template>

<script>
import WatchlistCard from './WatchlistCard/WatchlistCard';
import NoContent from './NoContent/NoContent';
import Popup from './Popup/Popup';
import SearchShows from './Search/SearchShows';
import AddToWatchlist from './AddToWatchlist/AddToWatchlist';

import { mapState } from 'vuex';

export default {
  name: 'Watching',
  data() {
    return {
      selectedShow: {
        title: ''
      }
    }
  },
  computed: {
    ...mapState({
      watching: ({ watching }) => watching.watching
    })
  },
  methods: {
    onSelect(show) {
      this.selectedShow = show;
      this.$refs.popup.open();
    }
  },
  async mounted() {
    await this.$store.dispatch('watching/getWatching');
  },
  components: {
    WatchlistCard,
    NoContent,
    Popup,
    SearchShows,
    AddToWatchlist
  }
};
</script>

<style lang="scss"></style>
