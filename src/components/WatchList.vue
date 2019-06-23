<template lang="html">
<div class="container-fluid fade-in">
   <popup :title="'Add To Watch List'" :size="'md'" ref="popup">
      <add-to-watchlist :shows="myShows"></add-to-watchlist>
   </popup>

   <div class="row">
      <div class="col-xs-12">
         <button class="button pull-right margin-bottom-30" @click.prevent="$refs.popup.open()">Track a show</button>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-3" v-for="(item, key, index) in watchlist" :key="index">
         <watchlist-card
            :heading="myShows[item.showId].Title"
            :sub-heading="concatSubHeading(item)"
            :details="item.on.name"
            :id="key"
            :watchlist="item"
            :next-aired="nextAired(item)"
            :img-src="myShows[item.showId].Poster">
         </watchlist-card>
      </div>
      <no-content :message="noContentMessage" :condition="!watchlist"></no-content>
   </div>
</div>
</template>

<script>
import WatchlistCard from "./WatchlistCard/WatchlistCard";
import NoContent from "./NoContent/NoContent";
import Popup from "./Popup/Popup";
import AddToWatchlist from "./AddToWatchlist/AddToWatchlist";
import { initWatchlist } from "../js/generators";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "WatchList",
  data() {
    return {
      today: new Date().getTime(),
      noContentMessage: "Your watch list is empty!"
    };
  },
  computed: {
    ...mapGetters(["watchlist", "myShows"]),
    ...mapActions(["getWatchlist", "getMyShows"])
  },
  mounted() {
    this.$store.dispatch("getMyShows").then(() => {
      this.$store.dispatch("getWatchlist");
    });
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
