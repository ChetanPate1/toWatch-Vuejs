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

  <div class="watchlist-card" tabindex="0" v-bind:style="{ 'background-image': 'url('+ imgSrc +')' }">
    <button type="button" class="icon-button dripicons-trash" @click="confirmDelete(id, data.showId)"></button>

    <h2>{{ heading }}</h2>
    <h4>{{ details }}</h4>
    <h5>On {{ subHeading }}</h5>
    <h6 v-if="nextAired">Next <small>Aired Episode</small></h6>

    <behind-count-button
        @click.native="toggleOpen()"
        :seasons="data.unwatched"
        :open="open">
    </behind-count-button>

    <slide-out-panel :open="open">
        <tabs>
          <tab-button slot="tab-buttons"
              v-for="season in data.seasons"
              :key="season._id"
              :name="tabButtonName(season.number)"
              :active="isTabSelected(season.number)"
              @click.native="tabSelect(season.number)">
          </tab-button>

          <tab-panels-container :active="tabActive" slot="tab-panels-container">
              <tab-panel
                v-for="season in data.seasons"
                :active="isTabSelected(1)"
                :number="season.number"
                :key="season._id">
                <!-- <panel-rows
                    :watchlist-id="id"
                    :watchlist-item="watchlist"
                    :season="season">
                </panel-rows> -->
              </tab-panel>
          </tab-panels-container>
        </tabs>
    </slide-out-panel>

    <frost-glass :img-src="imgSrc" v-if="nextAired">
        <countdown-timer :to="nextAired"></countdown-timer>
    </frost-glass>
  </div>
</div>

</template>

<script>
import Popup from '../Popup/Popup';
import SlideOutPanel from '../SlideOutPanel/SlideOutPanel';

import Tabs from '../Tabs/Tabs';
import TabButton from '../Tabs/TabButton';
import TabPanel from '../Tabs/TabPanel';
import TabPanelsContainer from '../Tabs/TabPanelsContainer';

import PanelRows from './PanelRows';
import BehindCountButton from '../BehindCountButton/BehindCountButton';
import FrostGlass from '../FrostGlass/FrostGlass';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

export default {
  name: 'WatchlistCard',
  props: {
    heading: String,
    details: String,
    id: String,
    data: Object,
    subHeading: String,
    nextAired: Number,
    imgSrc: String
  },
  data() {
    return {
      open: false,
      tabActive: 1
    };
  },
  mounted() {
    this.tabSelect(this.data.on.season);
    //get watched episodes
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    confirmDelete(id) {
      this.$refs.confirmPopup.open().then(result => {
        if (result == 'yes') {
          this.$store.dispatch('deleteWatching', id);
        }
      });
    },
    tabButtonName(number) {
      return number < 10 ? `S0${number}` : `S${number}`;
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
    BehindCountButton,
    FrostGlass,
    CountdownTimer
  }
};
</script>

<style src="./WatchlistCard.scss" lang="scss"></style>
