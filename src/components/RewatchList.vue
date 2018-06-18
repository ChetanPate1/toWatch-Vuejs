<template lang="html">
<div class="container" v-bind:class="{'container-lg' : listSize() > 3 }">
   <div class="row">
      <!-- <div class="col-xs-12 col-sm-6 fade-in"
         v-for="(item, key, index) in rewatchlist"
         v-bind:class="{'col-md-3' : listSize() > 3, 'col-md-4' : listSize() < 3 }"
         :key="index">

         <span v-if="isEditMode" type="button" name="button" @click="deleteItem(key)" class="dripicons-trash margin-bottom-20"></span>

         <rewatchlist-card
            :heading="myShows[item.showId].series"
            :sub-heading="concatSubHeading(item.on)"
            :details="item.on.name"
            :id="key"
            :rewatchlist="item"
            :img-src="myShows[item.showId].imgSrc">
         </rewatchlist-card>
      </div> -->
      <no-content :message="noContentMessage" :condition="true"></no-content>
   </div>
</div>
</template>
<script>
import RewatchlistCard from './RewatchlistCard/RewatchlistCard';
import NoContent from './NoContent/NoContent';

import { objSize } from '../js/helper-functions';
import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'RewatchList',
   data() {
      return {
         noContentMessage: 'Your rewatch list is empty!',
         isEditMode: false
      }
   },
   // computed: {
   //    ...mapGetters([
   //       'rewatchlist',
   //       'myShows'
   //    ]),
   //    ...mapActions([
   //       'getRewatchlist',
   //       'getMyShows',
   //       'deleteRewatchlist'
   //    ])
   // },
   mounted() {
      // this.$store.dispatch('getMyShows').then(() => {
      //    this.$store.dispatch('getRewatchlist');
      // });
   },
   methods: {
      listSize(){
         return objSize(this.rewatchlist);
      },
      deleteItem(id){
         this.$store
            .dispatch('deleteRewatchlist', id)
            .then(() => {
               this.isEditMode = false;
            });
      },
      concatSubHeading(on) {
         return `Season ${ on.season } Episode ${ on.episode }`;
      }
   },
   components: {
      NoContent,
      RewatchlistCard
   }
}
</script>

<style lang="css">
</style>
