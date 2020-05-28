<template lang="html">
  <div class="container fade-in">
    <card v-if="watchedShows.length">
      <show-table>
        <show-table-head>
            <div class="col-xs-1">
              #
            </div>
            <div class="col-xs-4 col-sm-3">
              Series
            </div>
            <div class="col-xs-4 hidden-xs">
              Title
            </div>
            <div class="col-xs-4 col-sm-2">
              On
            </div>
            <div class="col-xs-3 col-sm-2">
              Progress
            </div>
        </show-table-head>
        
        <show-table-row v-for="(item, index) in watchedShows" :key="item._id">
          <div class="col-xs-1">
            {{ index + 1 }}
          </div>
          <div class="col-xs-4 col-sm-3">
            {{ item.show.title }}
          </div>
          <div class="col-xs-4 hidden-xs">
            <!-- {{ item.onEpisode.title }} -->
          </div>
          <div class="col-xs-4 col-sm-2">
            <!-- <span v-if="progress(item) !== '100%'">Episode {{ item.onEpisode.number }}</span> -->
            <span class="status green" v-if="progress(item) === '100%'">Complete</span>
          </div>
          <div class="col-xs-3 col-sm-2">
            <div class="progress-container">
              <div class="progress" :style="{ 'width': progress(item) }"></div>
            </div>
          </div>
        </show-table-row>
      </show-table>
    </card>
    
    <no-content message="You haven't watched any shows yet!" :condition="!watchedShows.length"></no-content>
  </div>
</template>

<script>
import ShowTable from './ShowTable/ShowTable';
import ShowTableHead from './ShowTable/ShowTableHead';
import ShowTableRow from './ShowTable/ShowTableRow';
import NoContent from './NoContent/NoContent';
import Card from './Card/Card';

import { mapState } from 'vuex';

export default {
  name: 'Watched',
  data() {
    return {
      statusClasses: {
        Running: 'green',
        Ended: 'red'
      }
    };
  },
  computed: {
    ...mapState({
      watchedShows: state => state.watchedShows.watchedShows
    })
  },
  mounted() {
    this.$store.dispatch('watchedShows/getWatchedShows');
  },
  methods: {
    concatSubHeading(on) {
      return `Season ${on.season} Episode ${on.episode}`;
    },
    statusClass(statusName) {
      return this.statusClasses[statusName];
    },
    progress({ watched }) {
      return `${Math.floor((50 / 100) * 100)}%`;
    }
  },
  components: {
    ShowTable,
    ShowTableRow,
    ShowTableHead,
    NoContent,
    Card
  }
};
</script>

<style lang="scss">
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

.progress-container {
  position: relative;
  height: 8px;
  width: 100%;
  border-radius: 4px;
  display: inline-block;
  background-color: transparentize($base-color, 0.5);

  .progress {
    border-radius: 4px;
    background-color: $base-color;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: 300ms width ease;
  }
}
</style>

