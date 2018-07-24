<template lang="html">
<div>
   <popup :title="'Confirm'" :size="'md'" ref="confirmPopup">
      <h4 class="margin-top-0 margin-bottom-30">Are you sure you want to delete this show?</h4>

      <button class="button button-sm red pull-left"
              type="button"
              @click="$refs.confirmPopup.close('cancel')">Cancel
      </button>

      <button class="button button-sm pull-right"
              type="button"
              @click="$refs.confirmPopup.close('yes')">Yes
      </button>
   </popup>

   <div class="rewatchlist-card" tabindex="0" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
      <button type="button" class="icon-button dripicons-trash" @click="confirmDelete()"></button>

      <h2>{{ heading }}</h2>
      <h4>{{ details }}</h4>
      <h5>On {{ subHeading }}</h5>

      <behind-count-button
         @click.native="toggleOpen()"
         :seasons="rewatchlist.unwatched"
         :open="open">
      </behind-count-button>

      <slide-out-panel :open="open">
         <tabs>
            <tab-button slot="tab-buttons"
               v-for="(season, key, index) in rewatchlist.unwatched"
               :key="index"
               :name="tabButtonName(key)"
               :active="isTabSelected(index + 1)"
               @click.native="tabSelect(index + 1)">
            </tab-button>

            <tab-panels-container :active="tabActive" slot="tab-panels-container">
               <tab-panel
                  v-for="(season, key, index) in rewatchlist.unwatched"
                  :active="isTabSelected(index + 1)"
                  :number="index + 1"
                  :key="key">
                  <panel-rows
                     :rewatchlist-id="id"
                     :rewatchlist-item="rewatchlist"
                     :season="season">
                  </panel-rows>
               </tab-panel>
            </tab-panels-container>
         </tabs>
      </slide-out-panel>

      <frost-glass :img-src="imgSrc"></frost-glass>
   </div>
</div>


</template>

<script>
import Popup from '../Popup/Popup';
import SlideOutPanel from '../SlideOutPanel/SlideOutPanel';
import BehindCountButton from '../BehindCountButton/BehindCountButton';

import Tabs from '../Tabs/Tabs';
import TabButton from '../Tabs/TabButton';
import TabPanel from '../Tabs/TabPanel';
import TabPanelsContainer from '../Tabs/TabPanelsContainer';

import PanelRows from './PanelRows';
import FrostGlass from '../FrostGlass/FrostGlass';

export default {
   name: 'RewatchlistCard',
   props: {
      heading: String,
      details: String,
      id: String,
      rewatchlist: Object,
      subHeading: String,
      imgSrc: String
   },
   data() {
      return {
         open: false,
         tabActive: 1
      }
   },
   mounted(){
      this.tabSelect(this.rewatchlist.on.season);
   },
   methods: {
      toggleOpen(){
         this.open = !this.open;
      },
      confirmDelete(){
         this.$refs.confirmPopup.open().then((result) => {
            if(result == 'yes'){
               this.$store
                  .dispatch('deleteRewatchlist', this.id);
            }
         });
      },
      tabButtonName(name){
         return `S ${name.split('_')[1]}`;
      },
      tabSelect(selectedTab) {
         this.tabActive = selectedTab;
      },
      isTabSelected(number) {
         return this.tabActive == number;
      }
   },
   components: {
      Popup,
      SlideOutPanel,
      Tabs,
      TabButton,
      TabPanel,
      TabPanelsContainer,
      PanelRows,
      FrostGlass,
      BehindCountButton
   }
}
</script>

<style src="./RewatchlistCard.scss" lang="scss"></style>
