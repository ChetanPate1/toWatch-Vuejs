<template lang="html">
<div class="container-fluid fade-in">
   <popup :title="'Add To Rewatch List'" :size="'md'" ref="popup">
      <add-to-rewatchlist :shows="myShows"></add-to-rewatchlist>
   </popup>

   <div class="row">
      <div class="col-xs-12">
         <button class="button pull-right margin-bottom-30" @click.prevent="$refs.popup.open()">Rewatch a show</button>
      </div>
      
      <div class="col-sm-6 col-md-3"
         v-for="(item, key, index) in rewatchlist"
         :key="index">

         <rewatchlist-card
            :heading="myShows[item.showId].Title"
            :sub-heading="concatSubHeading(item.on)"
            :details="item.on.name"
            :id="key"
            :rewatchlist="item"
            :img-src="myShows[item.showId].Poster">
         </rewatchlist-card>
      </div>
      <no-content :message="noContentMessage" :condition="!rewatchlist"></no-content>
   </div>
</div>
</template>
<script>
import RewatchlistCard from "./RewatchlistCard/RewatchlistCard";
import NoContent from "./NoContent/NoContent";
import Popup from "./Popup/Popup";
import AddToRewatchlist from "./AddToRewatchlist/AddToRewatchlist";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "RewatchList",
  data() {
    return {
      noContentMessage: "Your rewatch list is empty!",
      isEditMode: false
    };
  },
  computed: {
    ...mapGetters(["rewatchlist", "myShows"]),
    ...mapActions(["getRewatchlist", "getMyShows"])
  },
  mounted() {
    this.$store.dispatch("getMyShows").then(() => {
      this.$store.dispatch("getRewatchlist");
    });
  },
  methods: {
    concatSubHeading(on) {
      return `Season ${on.season} Episode ${on.episode}`;
    }
  },
  components: {
    NoContent,
    RewatchlistCard,
    Popup,
    AddToRewatchlist
  }
};
</script>
