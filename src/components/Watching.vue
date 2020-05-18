<template lang="html">
<div class="container-fluid fade-in">
  <popup title="Add To Watch List" size="md" ref="popup">
    <add-to-watchlist :shows="showCollection"></add-to-watchlist>
  </popup>

  <div class="row">
    <div class="col-xs-12">
      <button class="button pull-right margin-bottom-30"
        @click.prevent="$refs.popup.open()">Track a show</button>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-3" v-for="item in watching" :key="item._id">
      <watchlist-card
        :heading="item.show.title"
        :sub-heading="'concatSubHeading(item)'"
        :details="''"
        :id="item._id"
        :data="item"
        :next-aired="null"
        :img-src="item.show.poster">
      </watchlist-card>
    </div>
    <no-content :message="noContentMessage" :condition="!watching.length"></no-content>
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
  data() {
    return {
      today: new Date().getTime(),
      noContentMessage: 'Your watch list is empty!'
    };
  },
  computed: {
    ...mapGetters(['watching', 'showCollection'])
  },
  async mounted() {
    await this.$store.dispatch('getWatching');
    await this.$store.dispatch('getShowCollection');
  },
  methods: {
    concatSubHeading(item) {
      return `Season ${item.on.season} Episode ${item.on.episode}`;
    },
    nextAired(watchlist) {
      let show = this.myShows[watchlist.showId];
      let numberOfSeasons = show.episodes.length;
      let latestSeason = show.episodes[numberOfSeasons - 1];

      let nextAired = latestSeason.episodes.filter(
        episode => new Date(episode.Released).getTime() - this.today > 0
      );

      return nextAired.length ? new Date(nextAired[0].Released).getTime() : 0;
    }
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
