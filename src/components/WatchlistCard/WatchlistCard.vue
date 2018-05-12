<template lang="html">
<div class="watchlist-card" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
   <h2>{{ heading }}</h2>
   <h4>{{ details }}</h4>
   <h5>On {{ subHeading }}</h5>
   <h6>Next <small>Aired Episode</small></h6>

   <behind-count-button
      @click.native="toggleOpen()"
      :seasons="watchlist.unwatched"
      :open="open">
   </behind-count-button>

   <slide-out-panel :open="open">
      <tabs>
         <tab-button slot="tab-buttons"
            v-for="(season, key, index) in watchlist.unwatched"
            :key="index"
            :name="tabButtonName(key)"
            :active="isTabSelected(index)"
            @click.native="tabSelect(index)">
         </tab-button>

         <tab-panels-container :active="tabActive" slot="tab-panels-container">
            <tab-panel
               v-for="(season, key, index) in watchlist.unwatched"
               :active="isTabSelected(index)"
               :number="index"
               :width="357"
               :key="key">
               <panel-rows
                  :watchlist-id="id"
                  :watchlist-item="watchlist"
                  :season="season">
               </panel-rows>
            </tab-panel>
         </tab-panels-container>
      </tabs>
   </slide-out-panel>

   <frost-glass :img-src="imgSrc">
      <countdown-timer :to="nextAired"></countdown-timer>
   </frost-glass>
</div>
</template>

<script>
import SlideOutPanel from '../SlideOutPanel/SlideOutPanel';

import Tabs from '../Tabs/Tabs';
import TabButton from '../Tabs/TabButton';
import TabPanel from '../Tabs/TabPanel';
import TabPanelsContainer from '../Tabs/TabPanelsContainer';

import PanelRows from '../PanelRows/PanelRows';
import BehindCountButton from '../BehindCountButton/BehindCountButton';
import FrostGlass from '../FrostGlass/FrostGlass';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

export default {
   name: 'WatchlistCard',
   props: {
      heading: String,
      details: String,
      id: String,
      watchlist: Object,
      subHeading: String,
      nextAired: Number,
      imgSrc: String
   },
   data() {
      return {
         open: false,
         tabActive: 1
      }
   },
   mounted(){
      this.tabSelect(this.watchlist.on.season);
   },
   methods: {
      toggleOpen(){
         this.open = !this.open;
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
      SlideOutPanel,
      Tabs,
      TabButton,
      TabPanel,
      TabPanelsContainer,
      PanelRows,
      BehindCountButton,
      FrostGlass,
      CountdownTimer
   }
}
</script>

<style src="./WatchlistCard.scss" lang="scss"></style>
