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
               <div class="col-xs-5">
                  On
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
               <div class="col-xs-5">
                  {{ concatSubHeading(item.on) }}
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
