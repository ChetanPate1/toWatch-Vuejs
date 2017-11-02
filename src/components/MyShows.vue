<template lang="html">
  <div class="container-fluid">
     <div class="row show-layout">
        <div class="col-xs-6 col-sm-3 col-md-2 fade-in" v-for="(show, key, index) in myShows" >
           <show-card
              :heading="show.series"
              :img-src="show.imgSrc"
              :shows="myShows"
              :index="index"
              :deleteable="true" >
           </show-card>
        </div>
        <no-content :message="noContentMessage" :condition="!myShows"></no-content>
     </div>
  </div>
</template>

<script>
import ShowCard from './ShowCard/ShowCard';
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
      'user',
      'myShows'
    ]),
    ...mapActions([
      'getMyShows'
    ])
  },
  mounted() {
    console.log(this.user);
    this.$store.dispatch('getMyShows', this.user);
  },
  components: {
    NoContent,
    ShowCard
  }
}
</script>

<style lang="css">
</style>
