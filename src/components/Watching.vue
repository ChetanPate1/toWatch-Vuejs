<template lang="html">
<div class="container-fluid fade-in">
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
            @click="$refs.confirmPopup.close('cancel')">Cancel
    </button>

    <button class="button button-sm pull-right"
            type="button"
            @click="$refs.confirmPopup.close('yes')">Yes
    </button>
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
import SwitchGroup from './FormElements/SwitchGroup/SwitchGroup';
import SearchShows from './Search/SearchShows';
import AddToWatchlist from './AddToWatchlist/AddToWatchlist';

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
        { id: 2, label: 'Boring' },
        { id: 3, label: 'Done' }
      ],
      deleteReason: ''
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
    SwitchGroup,
    SearchShows,
    AddToWatchlist
  }
};
</script>

<style lang="scss"></style>
