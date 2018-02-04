<template lang="html">
  <div class="container">
     <div class="row">
        <div class="col-xs-12">
           <button class="button pull-right margin-bottom-30" @click="openPopup">Track a show</button>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-4 fade-in" v-for="(item, index) in watchlist" :key="index">
           <watchlist-card
              :heading="''"
              :sub-heading="concatSubHeading(item.on)"
              :details="''"
              :img-src="''" >
           </watchlist-card>
        </div>
        <no-content :message="noContentMessage" :condition="!watchlist"></no-content>
     </div>
  </div>

</template>

<script>
import WatchlistCard from './WatchlistCard/WatchlistCard';
import NoContent from './NoContent/NoContent';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'WatchList',
  data() {
    return {
      noContentMessage: 'Your watch list is empty!'
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'watchlist'
    ]),
    ...mapActions([
      'getWatchlist'
    ])
  },
  mounted() {
    const uid = this.user.uid;
    this.$store.dispatch('getWatchlist', { uid });
  },
  methods: {
    openPopup() {

    },
    concatSubHeading(on) {
      if(on.length) {
        return `Season ${ on.season } Episode ${ on.episode }`;
      }
    }
  },
  components: {
    WatchlistCard,
    NoContent
  }
}
</script>

<style lang="scss"></style>
