<template lang="html">
<div>
  <div class="watchlist-card" tabindex="0" :style="{ 'background-image': 'url('+ imgSrc +')' }">
    <button type="button" class="icon-button red dripicons-trash" @click="confirmDelete(id)"></button>

    <h2>{{ heading }}</h2>
    <h4>{{ data.episode ? data.episode.title : '' }}</h4>
    <h5>On {{ data.episode ? `Season ${data.episode.season.number} Episode ${data.episode.number}` : '' }}</h5>
    
    <behind-count-button
        @click="toggleOpen"
        :count="data.behindCount"
        :open="open">
    </behind-count-button>

    <slide-out-panel :open="open">
        <tabs>
          <tab-button slot="tab-buttons"
              v-for="season in data.show.seasons"
              :key="season._id"
              :name="tabButtonName(season.number)"
              :active="isTabSelected(season)"
              @click="tabSelect(season)">
          </tab-button>

          <tab-panels-container :active="tabActive" slot="tab-panels-container">
              <tab-panel
                v-for="season in data.show.seasons"
                :active="isTabSelected(season)"
                :number="season.number"
                :key="season._id">
                <panel-row
                    v-for="episode in season.episodes"
                    :key="episode._id"
                    :watching-id="id"
                    :number="episode.number"
                    :title="episode.title"
                    :watched="episode.watched"
                    :released="episode.released"
                    @click="watched(episode)">
                </panel-row>
              </tab-panel>
          </tab-panels-container>
        </tabs>
    </slide-out-panel>
  </div>
</div>
</template>

<script>
import SlideOutPanel from '../SlideOutPanel/SlideOutPanel';

import Tabs from '../Tabs/Tabs';
import TabButton from '../Tabs/TabButton';
import TabPanel from '../Tabs/TabPanel';
import TabPanelsContainer from '../Tabs/TabPanelsContainer';

import PanelRow from './PanelRow';
import BehindCountButton from '../BehindCountButton/BehindCountButton';

import FrostGlass from '../FrostGlass/FrostGlass';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

export default {
  name: 'WatchlistCard',
  props: {
    heading: String,
    id: String,
    data: Object,
    imgSrc: String
  },
  data() {
    return {
      open: false,
      tabActive: 1
    };
  },
  methods: {
    async toggleOpen() {
      this.open = !this.open;
      const { episode } = this.data;
      
      if (this.open) {
        await this.tabSelect(this.data.show.seasons[episode.season.number - 1]);
      }
    },
    async confirmDelete(id) {
      const result = await this.$parent.$refs.confirmPopup.open();
      
      if (result == 'yes') {
        await this.$store.dispatch('watching/deleteWatching', {
          id, deleteReason: this.deleteReason
        });
      }
    },
    tabButtonName(number) {
      return number < 10 ? `S0${number}` : `S${number}`;
    },
    async tabSelect(season) {
      await this.$store.dispatch('watching/getEpisodes', { 
        watchingId: this.id,
        seasonId: season._id
      });
      this.tabActive = season.number;

      this.$forceUpdate();
    },
    isTabSelected({ number }) {
      return this.tabActive == number;
    },
    async watched(episode) {
      await this.$store.dispatch('watching/toggleWatched', {
        watchingId: this.id,
        episode
      });

      this.$forceUpdate();
    }
  },
  components: {
    SlideOutPanel,
    Tabs,
    TabButton,
    TabPanel,
    TabPanelsContainer,
    PanelRow,
    BehindCountButton,
    FrostGlass,
    CountdownTimer
  }
};
</script>

<style src="./WatchlistCard.scss" lang="scss"></style>
