<template lang="html">
<card class="watched-show-card margin-bottom-20" tabindex="0">
  <div class="content">
    <div class="bar">
      <progress-bar :percentage="data.percentage"></progress-bar>
    </div>
    
    <div class="text-ellipsis">
      <h3 class="margin-bottom-0 text-ellipsis">{{ data.show }}</h3>
      {{ data.on.title }}
    </div>
    
    <div class="margin-top-10">
      <small v-if="data.percentage != 100">
        <span class="visible-xs visible-sm">{{ onEpisode(data.on, true) }}</span>
        <span class="hidden-xs hidden-sm">{{ onEpisode(data.on) }}</span>
      </small>

      <div class="margin-top-10">
        <span class="status red" v-if="data.deleteReason">{{ data.deleteReason }}</span>
        <span class="status green" v-if="data.percentage == 100">Complete</span>
      </div>
    </div>
  </div>
  
  <button class="icon-button red dripicons-trash" tabindex="0" @click.stop="onDelete()"></button>
  <button class="icon-button dripicons-clockwise" tabindex="0" @click.stop="onRewatching()"></button>
  <button class="icon-button dripicons-media-play" tabindex="0" @click.stop="onContinue()" :disabled="data.percentage == 100"></button>
  <div class="poster" :style="{ 'background-image': 'url('+ data.poster +')' }"></div>
</card>
</template>

<script>
import Card from '../Card/Card';
import ProgressBar from '../ProgressBar/ProgressBar';

export default {
  name: 'WatchedShowCard',
  props: {
    data: Object
  },
  data() {
    return {
      statusClasses: {
        Running: 'green',
        Ended: 'red'
      }
    };
  },
  methods: {
    async onContinue() {
      const continueWatching = await this.$store.dispatch('watchedShows/continueWatching', this.data);
      
      if (continueWatching) {
        this.$router.push({ name: 'watching' });
      }
    },
    async onRewatching() {
      const rewatch = await this.$store.dispatch('watchedShows/rewatching', this.data);
      
      if (rewatch) {
        this.$router.push({ name: 'watching' });
      }
    },
    async onDelete() {
      const result = await this.$parent.$refs.confirmPopup.open();

      if (result == 'yes') {
        await this.$store.dispatch('watchedShows/deleteFromWatchedShows', this.data);
      }
    },
    onEpisode(on, small) {
      if (small) {
        return `S${on.season < 9 ? 0 : ''}${on.season} E${on.episode < 9 ? 0 : ''}${on.episode}`;
      }

      return `Season ${on.season} Episode ${on.episode}`;
    },
    statusClass(statusName) {
      return this.statusClasses[statusName];
    }
  },
  components: {
    Card,
    ProgressBar
  }
};
</script>

<style lang="scss">
.watched-show-card {
  position: relative;
  padding-left: 125px;
  min-height: 140px;
  color: #b7b7b7;
  overflow: hidden;

  h3 {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
  }
  
  .content {
    position: relative;
    
    .bar {
      position: absolute;
      top: -15px;
      right: 0;
      width: 100%;
    }

    .text-ellipsis {
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .poster {
    position: absolute;
    left: 0;
    top: 0;
    width: 95px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  .dripicons-trash {
    left: 10px;
    top: 10px;
    transition: 250ms all ease;
    transform: translate(-45px, 0);
  }

  .dripicons-media-play {
    bottom: 15px;
    right: 15px;
    transition: 250ms all ease;
    box-shadow: none;
  }

  .dripicons-clockwise {
    bottom: 15px;
    right: 55px;
    box-shadow: none;
  }

  .icon-button {
    z-index: 100;
    position: absolute;

    &:focus {
      transform: translate(0, 0);
    }
  }

  .status {
    display: inline;
    text-align: center;
    border: 2px solid;
    border-radius: 5px;
    font-size: 11px;
    padding: 4px 10px;

    &.green {
      color: $green;
    }
    &.purple {
      color: $base-color;
    }
    &.red {
      color: $danger-color;
    }
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    .icon-button {
      transform: translate(0, 0);
    }
  }
}
</style>
