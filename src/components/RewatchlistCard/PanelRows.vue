<template>
   <div>
      <div class="panel-row"
         v-for="episode in season"
         :key="episode.number"
         :class="{ 'disabled' : !episode.watched }">

         <div class="col-70">
            Episode {{ episode.number }}
         </div>
         <div class="col-30" @click="watched(episode)">
            <span class="dripicons-preview" :class="{ 'active' : episode.watched }"></span>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
   name: 'PanelRows',
   props: {
      rewatchlistId: String,
      rewatchlistItem: Object,
      season: Array
   },
   methods: {
      ...mapActions([
         'toggleRewatched'
      ]),
      watched(episodeDetails){
         let show = this.rewatchlistItem;
         let rewatchlistId = this.rewatchlistId;

         this.$store.dispatch('toggleRewatched', {
            rewatchlistId,
            show,
            episodeDetails
         });
      }
   }
}
</script>

<style lang="scss">
.panel-row{
   margin: 10px auto;
   height: 50px;
   width: 90%;
   background-color: #ffffff;
   display: block;
   padding: 15px 20px;
   border-radius: 4px;
   transition: opacity 500ms ease;

   .col-70, .col-30{
      float: left;
      line-height: 1.5;
   }

   .col-70{
      width: 70%;
      font-weight: 700;
   }

   .col-30{
      width: 30%;
      text-align: right;
      font-size: 22px;

      .dripicons-preview{
         cursor: pointer;
         opacity: 0.5;
         transition: opacity 200ms ease;

         &:hover{
            opacity: 1;
         }

         &.active{
            opacity: 1;
            color: $base-color;
         }
      }
   }

   &.disabled{
      opacity: 0.8;
   }
}
</style>
