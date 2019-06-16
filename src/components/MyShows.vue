<template lang="html">
   <div>
      <popup :title="'Add To Watch List'" :size="'md'" ref="popup">
         <add-to-watchlist :shows="myShows" :hide-series-select="true" ref="addToWatchlist"></add-to-watchlist>
      </popup>

      <div class="container">
         <div class="row margin-bottom-20">
            <div class="col-xs-12">
               <search-shows></search-shows>
            </div>
         </div>
      </div>

      <div class="container-fluid">
         <div class="row show-layout">
            <div class="col-xs-6 col-sm-3 col-md-2 fade-in" v-for="(show, key, index) in myShows">
               <show-card
                  :heading="show.Title"
                  :img-src="show.Poster"
                  :reference="key"
                  :key="index"
                  :deleteable="true">
               </show-card>
            </div>
         <no-content :message="noContentMessage" :condition="!myShows"></no-content>
      </div>
   </div>
</div>
</template>

<script>
import ShowCard from "./ShowCard/ShowCard";
import SearchShows from "./SearchShows/SearchShows";
import NoContent from "./NoContent/NoContent";
import Checkbox from "./FormElements/Checkbox";
import Popup from "./Popup/Popup";
import AddToWatchlist from "./AddToWatchlist/AddToWatchlist";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MyShows",
  data() {
    return {
      form: {
        seriesRef: "",
        season: "",
        episode: ""
      },
      noContentMessage: "Your show collection is empty!"
    };
  },
  computed: {
    ...mapGetters(["myShows"]),
    ...mapActions(["getMyShows", "addToWatchlist"])
  },
  methods: {
    add(form) {
      this.$store.dispatch("addToWatchlist", form).then(() => {
        this.form = {
          seriesRef: "",
          season: "",
          episode: ""
        };
        this.$parent.close();
      });
    }
  },
  mounted() {
    this.$store.dispatch("getMyShows");
  },
  components: {
    ShowCard,
    SearchShows,
    NoContent,
    Checkbox,
    Popup,
    AddToWatchlist
  }
};
</script>
