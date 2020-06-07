<template lang="html">
<div>
  <popup title="Add To Watch List" size="md" ref="popup">
      <add-to-watchlist
        :shows="collection" 
        :hide-series-select="true" 
        ref="addToWatchlist"></add-to-watchlist>
  </popup>

  <div class="container">
    <div class="row margin-bottom-20">
      <div class="col-xs-12">
        <search-shows></search-shows>
      </div>
    </div>
  </div>
  
  <div class="container-fluid fade-in">
    <div class="row show-layout">
      <div class="col-xs-6 col-sm-3 col-md-2" v-for="item in collection" :key="item._id">
          <show-card
            :heading="item.show.title"
            :img-src="item.show.poster"
            :id="item._id"
            :show-id="item.show._id"
            :data="item.show"
            :deleteable="true">
          </show-card>
      </div>
      <no-content message="Your show collection is empty!" :condition="!collection.length"></no-content>
    </div>
  </div>
</div>
</template>

<script>
import ShowCard from './ShowCard/ShowCard';
import SearchShows from './Search/SearchShows';
import NoContent from './NoContent/NoContent';
import Popup from './Popup/Popup';
import AddToWatchlist from './AddToWatchlist/AddToWatchlist';

import { mapState } from 'vuex';

export default {
  name: 'ShowCollection',
  created() {
    this.$store.dispatch('showCollection/getShowCollection');
  },
  computed: {
    ...mapState({
      collection: ({ showCollection }) => showCollection.collection
    })
  },
  components: {
    ShowCard,
    SearchShows,
    NoContent,
    Popup,
    AddToWatchlist
  }
};
</script>
