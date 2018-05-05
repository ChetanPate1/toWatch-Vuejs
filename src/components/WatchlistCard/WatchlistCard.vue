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
      {{tabActive}}
      <tabs>
         <tab-button slot="tab-buttons"
            v-for="(season, index) in watchlist.unwatched"
            :key="index"
            :name="tabButtonName(index)"
            :active="isTabSelected(index)"
            @click.native="tabSelect(index)">
         </tab-button>

         <tab-panel slot="tab-panels"
            v-for="(season, index) in watchlist.unwatched"
            :active="isTabSelected(index)"
            :key="index">
            <panel-rows
               :watchlist-id="id"
               :watchlist-item="watchlist"
               :season="season">
            </panel-rows>
         </tab-panel>
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
         tabActive: 0
      }
   },
   mounted(){
      this.tabSelect(`season_${this.watchlist.on.season}`);
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
      PanelRows,
      BehindCountButton,
      FrostGlass,
      CountdownTimer
   }
}
</script>

<style src="./WatchlistCard.scss" lang="scss"></style>
