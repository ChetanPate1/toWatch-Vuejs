<template lang="html">
<div>
  <div class="container">
    <div class="row margin-bottom-20">
      <div class="col-xs-12">
        <search-shows></search-shows>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row show-layout">
      <div class="col-xs-6 col-sm-3 col-md-2 fade-in" v-for="(show, key, index) in myShows">
        <show-card
        :heading="show.series"
        :img-src="show.imgSrc"
        :shows="myShows"
        :reference="key"
        :key="index"
        :deleteable="true" >
      </show-card>
    </div>
    <no-content :message="noContentMessage" :condition="!myShows"></no-content>
  </div>
</div>
</div>
</template>

<script>
import ShowCard from './ShowCard/ShowCard';
import SearchShows from './SearchShows/SearchShows';
import NoContent from './NoContent/NoContent';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MyShows',
  data() {
    return {
      noContentMessage: 'Your show collection is empty!'
    }
  },
  computed: {
    ...mapGetters([
      'myShows'
    ]),
    ...mapActions([
      'getMyShows'
    ])
  },
  mounted() {
    this.$store.dispatch('getMyShows');
  },
  components: {
    NoContent,
    ShowCard,
    SearchShows
  }
}
</script>

<style lang="css">
</style>
