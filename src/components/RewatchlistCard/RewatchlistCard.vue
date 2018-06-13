<template lang="html">
<div class="rewatchlist-card" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
   <h2>{{ heading }}</h2>
   <h4>{{ details }}</h4>
   <h5>On {{ subHeading }}</h5>
   <h6>Next <small>Aired Episode</small></h6>

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
      FrostGlass
   }
}
</script>
