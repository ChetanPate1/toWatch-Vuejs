<template lang="html">
<div class="container-fluid fade-in">
  <popup title="Add To Watch List" size="md" ref="popup">
    <add-to-watchlist :shows="collection"></add-to-watchlist>
  </popup>
  
  <div class="row">
    <div class="col-xs-12">
      <button class="button pull-right margin-bottom-30"
        @click.prevent="$refs.popup.open()">Track a show</button>
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
import AddToWatchlist from './AddToWatchlist/AddToWatchlist';

import { mapGetters } from 'vuex';

export default {
  name: 'Watching',
  computed: {
    ...mapGetters({
      watching: 'watching/watching',
      collection: 'showCollection/collection'
    })
  },
  methods: {
    behindCount(seasons) {
      const watchingEpisodes = seasons.reduce((acc, item) => {
        if (item.episodes) {
          const watched = item.episodes.filter(e => !e.watched);
          acc = acc + watched.length;
        }

        return acc;
      }, 0);

      return watchingEpisodes > 0 ? (-1 * watchingEpisodes) : watchingEpisodes;
    }
  },
  async mounted() {
    await this.$store.dispatch('watching/getWatching');
    await this.$store.dispatch('showCollection/getShowCollection');
  },
  components: {
    WatchlistCard,
    NoContent,
    Popup,
    AddToWatchlist
  }
};
</script>

<style lang="scss"></style>
