<template lang="html">
   <div class="container">
      <div class="fade-in">
         <show-table>
            <show-table-head>
               <div class="col-xs-1">
                  #
               </div>
               <div class="col-xs-3">
                  Series
               </div>
               <div class="col-xs-4">
                  On
               </div>
               <div class="col-xs-2">
                  Status
               </div>
            </show-table-head>
            <show-table-row v-for="(item, key, index) in watched" :key="index">
               <div class="col-xs-1">
                  {{ index + 1 }}
               </div>
               <div class="col-xs-3">
                  {{ myShows[key].series }}
               </div>
               <div class="col-xs-4">
                  {{ concatSubHeading(item.on) }}
               </div>
               <div class="col-xs-2">
                  <div class="status" v-bind:class="statusClass(myShows[key].status )">
                     {{ myShows[key].status }}
                  </div>
               </div>
            </show-table-row>
         </show-table>
         <no-content :message="noContentMessage" :condition="!watched"></no-content>
      </div>
   </div>
</template>

<script>

import ShowTable from './ShowTable/ShowTable';
import ShowTableHead from './ShowTable/ShowTableHead';
import ShowTableRow from './ShowTable/ShowTableRow';
import NoContent from './NoContent/NoContent';
import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'Watched',
   data() {
      return {
         noContentMessage: 'You haven\'t watched any shows yet!',
         statusClasses: {
            Running: 'green',
            Ended: 'red'
         }
      }
   },
   computed: {
      ...mapGetters([
         'watched',
         'myShows'
      ]),
      ...mapActions([
         'getWatched',
         'getMyShows'
      ])
   },
   mounted(){
      this.$store.dispatch('getMyShows').then(() => {
         this.$store.dispatch('getWatched');
      });
   },
   methods:{
      concatSubHeading(on) {
         return `Season ${ on.season } Episode ${ on.episode }`;
      },
      statusClass(statusName){
         return this.statusClasses[statusName]
      }
   },
   components: {
      ShowTable,
      ShowTableRow,
      ShowTableHead,
      NoContent
   }
}
</script>

<style lang="scss">
.status{
   display: inline;
   text-align: center;
   border: 2px solid;
   border-radius: 5px;
   font-size: 11px;
   font-weight: bold;
   padding: 4px 10px;

   &.green{
      color: $green;
   }

   &.purple{
      color: $base-color;
   }

   &.red{
      color: $danger-color;
   }
}

</style>
