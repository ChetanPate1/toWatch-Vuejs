<template lang="html">
<div class="watchlist-card" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
   <h2>{{ heading }}</h2>
   <h4>{{ details }}</h4>
   <h5>On {{ subHeading }}</h5>
   <h6>Next <small>Aired Episode</small></h6>

   <behind-count-button
      @click.native="toggleOpen()"
      :un-watched="watchlist.unwatched"
      :current-season="watchlist.on.season"
      :open="open">
   </behind-count-button>

   <slide-out-panel :open="open">
      <tabs>
         <tab-button slot="tab-buttons"
            v-for="season in watchlist.unwatched"
            :key="season[0]"
            :name="'S '+ season[0]"
            :active="isTabSelected(season[0])"
            @click.native="tabSelect(season[0])">
         </tab-button>

         <tab-panel slot="tab-panels"
            v-for="(season, index) in watchlist.unwatched"
            :active="isTabSelected(season[0])"
            :key="index">
            <panel-row
               :season="season"
               :current-season="watchlist.on.season"
               :current-episode="watchlist.on.episode">
            </panel-row>
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
import PanelRow from '../Panel/PanelRow';
import BehindCountButton from '../BehindCountButton/BehindCountButton';
import FrostGlass from '../FrostGlass/FrostGlass';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

export default {
   name: 'WatchlistCard',
   props: {
      heading: String,
      details: String,
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
      PanelRow,
      BehindCountButton,
      FrostGlass,
      CountdownTimer
   }
}
</script>

<style src="./WatchlistCard.scss" lang="scss"></style>
