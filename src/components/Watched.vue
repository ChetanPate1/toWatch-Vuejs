<template lang="html">
   <div class="container">
      <div class="fade-in">
         <show-table>
            <show-table-head>
               <div class="col-xs-1">
                  #
               </div>
               <div class="col-xs-3">
                  Series
               </div>
               <div class="col-xs-3">
                  Title
               </div>
               <div class="col-xs-3">
                  On
               </div>
               <div class="col-xs-2">
                  Progress
               </div>
            </show-table-head>
            <show-table-row v-for="(item, key, index) in watched" :key="index">
               <div class="col-xs-1">
                  {{ index + 1 }}
               </div>
               <div class="col-xs-3">
                  {{ myShows[key].Title }}
               </div>
               <div class="col-xs-3">
                  {{ item.on.name }}

               </div>
               <div class="col-xs-3">
                  <span v-if="progress(item) !== '100%'">{{ concatSubHeading(item.on) }}</span>
                  <span class="status green" v-if="progress(item) === '100%'">Complete</span>
               </div>
               <div class="col-xs-2">
                <div class="progress-container">
                  <div class="progress"
                    v-bind:style="{ 'width': progress(item) }"></div>
                </div>
               </div>
            </show-table-row>
         </show-table>
         <no-content :message="noContentMessage" :condition="!watched"></no-content>
      </div>
   </div>
</template>

<script>
import ShowTable from "./ShowTable/ShowTable";
import ShowTableHead from "./ShowTable/ShowTableHead";
import ShowTableRow from "./ShowTable/ShowTableRow";
import NoContent from "./NoContent/NoContent";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Watched",
  data() {
    return {
      noContentMessage: "You haven't watched any shows yet!",
      statusClasses: {
        Running: "green",
        Ended: "red"
      }
    };
  },
  computed: {
    ...mapGetters(["watched", "myShows"]),
    ...mapActions(["getWatched", "getMyShows"])
  },
  mounted() {
    this.$store.dispatch("getMyShows").then(() => {
      this.$store.dispatch("getWatched");
    });
  },
  methods: {
    concatSubHeading(on) {
      return `Season ${on.season} Episode ${on.episode}`;
    },
    statusClass(statusName) {
      return this.statusClasses[statusName];
    },
    progress({ watched }) {
      const totalWatched = watched
        .map(item => {
          return item.episodes.filter(episode => episode.watched).length;
        })
        .reduce((acc, item) => acc + item);

      const totalEpisodes = watched
        .map(item => {
          return item.episodes.length;
        })
        .reduce((acc, item) => acc + item);

      return `${Math.floor((totalWatched / totalEpisodes) * 100)}%`;
    }
  },
  components: {
    ShowTable,
    ShowTableRow,
    ShowTableHead,
    NoContent
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
  font-weight: bold;
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

