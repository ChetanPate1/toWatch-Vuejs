<template>
  <div>
    <div class="tabs">
      <tab-button v-for="season in seasons"
        :key="season[0]"
        :name="'S '+ season[0]"
        :active="isTabSelected(season[0])"
        @click.native="tabSelect(season[0])" >
      </tab-button>
    </div>

    <div class="tab-panels">
      <tab-panel v-for="season in seasons"
        :key="season[0]"
        :content="season"
        :current-season="currentTab"
        :current-episode="currentEpisode"
        :active="isTabSelected(season[0])" >
      </tab-panel>
    </div>
  </div>

</template>

<script>
  import TabButton from './TabButton';
  import TabPanel from './TabPanel';

  export default {
    name: 'Tabs',
    props: {
      seasons: Object,
      currentTab: String,
      currentEpisode: String
    },
    data(){
      return {
        tabActive: ''
      }
    },
    mounted(){
      this.tabActive = this.currentTab;
    },
    methods: {
      tabSelect(tabNumber) {
        this.tabActive = tabNumber;
      },
      isTabSelected(number) {
        return this.tabActive == number;
      }
    },
    components: {
      TabButton,
      TabPanel
    }
  }
</script>

<style src="./Tabs.scss" lang="scss"></style>
