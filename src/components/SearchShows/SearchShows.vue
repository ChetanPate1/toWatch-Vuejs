<template lang="html">
   <div class="form-element search">
      <div class="loader" v-bind:class="{'show' : sendStatus.loader }"></div>
      <input type="text" name="showName" v-model="showName">
      <button type="button" class="dripicons-search" @click="findShow" :disabled="sendStatus.disableButton"></button>

      <div class="search-results" v-bind:class="{'show' : foundShows }">
         <div class="result" v-for="(show, index) in foundShows" @click="addSeries(show.permalink)">
            <div class="number">{{ index + 1 }}.</div>
            <div class="name">{{ show.name }}</div>
            <div class="network">{{ show.network }}</div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
   name: 'SearchShows',
   data() {
      return {
         showName: '',
         sendStatus: {
            disableButton: false,
            loader: false,
            validation: ''
         },
         toast: {
            content: '',
            action: '',
            show: false
         }
      }
   },
   computed: {
      ...mapGetters([
         'foundShows'
      ]),
      ...mapActions([
         'searchForShow'
      ])
   },
   methods: {
      addSeries(series) {
         this.sendStatus.loader = true;
         this.sendStatus.disableButton = true;

         this.$store.dispatch('saveShow', series)
         .then(() => {
            this.sendStatus.loader = false
            this.sendStatus.disableButton = false;
            this.showName = '';
         });

         return;
         episodateApi.getShow(series).then(function(showData) {
            if (showData.seasons) {
               showData.requestData = series;

               $timeout(function() {
                  showToast(showData.series, 'added to My Shows');
                  firebaseArray.save(ref, showData);
                  this.series = '';
               }, 2000);
            }
            this.sendStatus.disableButton = false;
            this.sendStatus.loader = false;
         });
      },
      findShow(){
         this.$store.dispatch('searchForShow', this.showName);
      }
   }
}
</script>

<style lang="scss">
.search-results{
   background-color: #ffffff;
   width: 100%;
   border-radius: 0 0 6px 6px;
   -webkit-box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.3);
   box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.3);
   -webkit-transition: all 500ms ease;
   transition: all 500ms ease;
   -webkit-transform: translate(-100%, 0);
   transform: translate(-100%, 0);
   max-height: 220px;
   overflow-y: auto;
   opacity: 0;

   .result{
      display: block;
      float: left;
      width: 100%;
      padding: 10px 15px;
      border-radius: 5px;

      &:hover{
         cursor: pointer;
         background-color: $base-color;
         .name, .number{
            color: #ffffff;
         }
      }

      .number, .name, .network{
         float: left;
      }

      .number{
         font-size: 14px;
         line-height: 2;
         width: 7%;
      }

      .name{
         padding: 0 5px 0 0;
         font-size: 14px;
         font-weight: bold;
         width: 53%;
         line-height: 2;
      }

      .network{
         font-size: 12px;
         width: 40%;
         padding: 5px;
         text-align: center;
         background-color: #f2f2f2;
         border-radius: 5px;
      }

      @media(max-width: 500px){
         padding-top: 20px;
         min-height: 60px;

         .number, .name{
            padding: 4px 0 0 0;
            font-size: 12px;
            line-height: 1;
         }
         .name{
            padding: 4px 10px 0 0;
         }
      }
   }

   &.show{
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
      opacity: 1;
   }
}
</style>
