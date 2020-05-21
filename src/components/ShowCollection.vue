<template lang="html">
<div>
  <popup title="Add To Watch List" size="md" ref="popup">
      <add-to-watchlist :shows="collection" :hide-series-select="true" ref="addToWatchlist"></add-to-watchlist>
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
            :show-id="item.showId"
            :id="item._id"
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
import SearchShows from './SearchShows/SearchShows';
import NoContent from './NoContent/NoContent';
import Popup from './Popup/Popup';
import AddToWatchlist from './AddToWatchlist/AddToWatchlist';

import { mapGetters } from 'vuex';

export default {
  name: 'ShowCollection',
  data() {
    return {
      form: {
        seriesRef: '',
        season: '',
        episode: ''
      },
      noContentMessage: ''
    };
  },
  created() {
    this.$store.dispatch('showCollection/getShowCollection');
  },
  computed: {
    ...mapGetters({
      collection: 'showCollection/collection'
    })
  },
  methods: {
    async add(form) {
      await this.$store.dispatch('addToWatchlist', form);

      this.form = {
        seriesRef: '',
        season: '',
        episode: ''
      };

      this.$parent.close();
    }
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
