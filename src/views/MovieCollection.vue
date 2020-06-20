<template lang="html">
<div>
  <popup :title="'Confirm'" :size="'md'" ref="confirmPopup">
    <h4 class="margin-top-0 margin-bottom-30">
      Are you sure you want to delete this movie?
    </h4>

    <button class="button button-sm red pull-left"
            type="button"
            @click="$refs.confirmPopup.close('cancel')">Cancel
    </button>

    <button class="button button-sm pull-right"
            type="button"
            @click="$refs.confirmPopup.close('yes')">Yes
    </button>
  </popup>

  <div class="container-fluid fade-in">
    <div class="row margin-bottom-20">
      <div class="col-xs-12">
        <search-movies></search-movies>
      </div>
    </div>

    <div class="row show-layout">
      <div class="col-xs-6 col-sm-3 col-md-2" v-for="item in collection" :key="item._id">
        <movie-card
          :heading="item.movie.title"
          :img-src="item.movie.poster"
          :movie-id="item.movie._id"
          :id="item._id"
          :deleteable="true">
        </movie-card>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <loader :show="requesting"></loader>
      </div>
    </div>

    <reached-end :show="reachedEnd">
      Reached End
    </reached-end>

    <no-content message="Your movie collection is empty!" :condition="!collection.length"></no-content>
  </div>
</div>
</template>

<script>
import Popup from '@/components/Popup/Popup';
import SearchMovies from '@/components/Search/SearchMovies';
import MovieCard from '@/components/MovieCard/MovieCard';
import NoContent from '@/components/NoContent/NoContent';
import Loader from '@/components/Loader/Loader';
import ReachedEnd from '@/components/ReachedEnd/ReachedEnd';

import { mapState } from 'vuex';
var m = [
  {
    "n": "Atomic Blonde"
  },
  {
    "n": "The Dark Knight"
  },
  {
    "n": "All-Star Superman"
  },
  {
    "n": "Baby Driver"
  },
  {
    "n": "Batman v Superman: Dawn of Justice"
  },
  {
    "n": "Captain America: The First Avenger"
  },
  {
    "n": "Captain America: The Winter Soldier"
  },
  {
    "n": "Captain America: Civil War"
  },
  {
    "n": "Darc"
  },
  {
    "n": "Demolition"
  },
  {
    "n": "Sweet Virginia"
  },
  {
    "n": "Gringo"
  },
  {
    "n": "Hardcore Henry"
  },
  {
    "n": "Harry Potter and the Goblet of Fire"
  },
  {
    "n": "Harry Potter and the Deathly Hallows: Part 1"
  },
  {
    "n": "Harry Potter and the Deathly Hallows: Part 2"
  },
  {
    "n": "Haywire"
  },
  {
    "n": "Interstellar"
  },
  {
    "n": "John Wick"
  },
  {
    "n": "John Wick: Chapter 2"
  },
  {
    "n": "Justice League: The Flashpoint Paradox"
  },
  {
    "n": "Lady Bird"
  },
  {
    "n": "Lucy"
  },
  {
    "n": "Memento"
  },
  {
    "n": "Mr. Nobody"
  },
  {
    "n": "Pandorum"
  },
  {
    "n": "Red Sparrow"
  },
  {
    "n": "Unbreakable"
  },
  {
    "n": "Split"
  },
  {
    "n": "Glass"
  },
  {
    "n": "Shot Caller"
  },
  {
    "n": "The Dark Knight Rises"
  },
  {
    "n": "The Hobbit: An Unexpected Journey"
  },
  {
    "n": "The Hobbit: The Desolation of Smaug"
  },
  {
    "n": "The Hobbit: The Battle of the Five Armies"
  },
  {
    "n": "The Lord of the Rings: The Fellowship of the Ring"
  },
  {
    "n": "The Lord of the Rings: The Two Towers"
  },
  {
    "n": "The Lord of the Rings: The Return of the King"
  },
  {
    "n": "The Matrix"
  },
  {
    "n": "The Matrix Reloaded"
  },
  {
    "n": "The Matrix Revolutions"
  },
  {
    "n": "The Outsider"
  },
  {
    "n": "The Raid: Redemption"
  },
  {
    "n": "The Raid 2"
  },
  {
    "n": "The Town"
  },
  {
    "n": "War Dogs"
  },
  {
    "n": "Wonder Woman"
  },
  {
    "n": "Zero Days"
  },
  {
    "n": "American History X"
  },
  {
    "n": "Fight Club"
  },
  {
    "n": "Catch Me If You Can"
  },
  {
    "n": "Me, Myself & Irene"
  },
  {
    "n": "The Aviator"
  },
  {
    "n": "Reign of Fire"
  },
  {
    "n": "Seven Psychopaths"
  },
  {
    "n": "The Bourne Identity"
  },
  {
    "n": "The Bourne Supremacy"
  },
  {
    "n": "The Bourne Ultimatum"
  },
  {
    "n": "The Wolf of Wall Street"
  },
  {
    "n": "Underworld"
  },
  {
    "n": "Underworld: Evolution"
  },
  {
    "n": "The Day After Tomorrow"
  },
  {
    "n": "Source Code"
  },
  {
    "n": "Never Back Down"
  },
  {
    "n": "Fracture"
  },
  {
    "n": "Anchorman 2: The Legend Continues"
  },
  {
    "n": "Hannibal"
  },
  {
    "n": "The Silence of the Lambs"
  },
  {
    "n": "Watchmen"
  },
  {
    "n": "The Voices"
  },
  {
    "n": "The Glass Castle"
  },
  {
    "n": "The Martian"
  },
  {
    "n": "The Green Mile"
  },
  {
    "n": "Avengers: Infinity War"
  },
  {
    "n": "The Accountant"
  },
  {
    "n": "Superman/Doomsday"
  },
  {
    "n": "Sicario"
  },
  {
    "n": "Sicario: Day of the Soldado"
  },
  {
    "n": "Oldboy"
  },
  {
    "n": "The Man from U.N.C.L.E."
  },
  {
    "n": "Mad Max: Fury Road"
  },
  {
    "n": "Léon: The Professional"
  },
  {
    "n": "Justice League: War"
  },
  {
    "n": "Den of Thieves"
  },
  {
    "n": "Big Hero 6"
  },
  {
    "n": "Arrival"
  },
  {
    "n": "The Death of Superman"
  },
  {
    "n": "Batman Begins"
  },
  {
    "n": "Batman: The Dark Knight Returns, Part 1"
  },
  {
    "n": "Batman: The Dark Knight Returns, Part 2"
  },
  {
    "n": "Blade Runner 2049"
  },
  {
    "n": "Coherence"
  },
  {
    "n": "Deadpool"
  },
  {
    "n": "Deadpool 2"
  },
  {
    "n": "Doctor Strange"
  },
  {
    "n": "Gold"
  },
  {
    "n": "The Founder"
  },
  {
    "n": "Hacksaw Ridge"
  },
  {
    "n": "Hell or High Water"
  },
  {
    "n": "Inception"
  },
  {
    "n": "Ip Man"
  },
  {
    "n": "King Arthur: Legend of the Sword"
  },
  {
    "n": "Logan"
  },
  {
    "n": "Man of Steel"
  },
  {
    "n": "Mission: Impossible III"
  },
  {
    "n": "Philadelphia"
  },
  {
    "n": "Schindler's List"
  },
  {
    "n": "Spring"
  },
  {
    "n": "Suicide Squad: Hell to Pay"
  },
  {
    "n": "The Book of Eli"
  },
  {
    "n": "Charlie Countryman"
  },
  {
    "n": "The Shawshank Redemption"
  },
  {
    "n": "Thor: Ragnarok"
  },
  {
    "n": "Whiplash"
  },
  {
    "n": "Wind River"
  },
  {
    "n": "Equilibrium"
  },
  {
    "n": "Man on Fire"
  },
  {
    "n": "Raze"
  },
  {
    "n": "RocknRolla"
  },
  {
    "n": "Sunshine"
  },
  {
    "n": "The Grey"
  },
  {
    "n": "RoboCop"
  },
  {
    "n": "Batman: Assault on Arkham"
  },
  {
    "n": "The Pursuit of Happyness"
  },
  {
    "n": "Seven Pounds"
  },
  {
    "n": "Resident Evil: Vendetta"
  },
  {
    "n": "In Darkness"
  },
  {
    "n": "Drive"
  },
  {
    "n": "Prometheus"
  },
  {
    "n": "Alien: Covenant"
  },
  {
    "n": "The Adjustment Bureau"
  },
  {
    "n": "A Quiet Place"
  },
  {
    "n": "Edge of Tomorrow"
  },
  {
    "n": "The Core"
  },
  {
    "n": "Goodfellas"
  },
  {
    "n": "The Babysitter"
  },
  {
    "n": "Push"
  },
  {
    "n": "Spectral"
  },
  {
    "n": "Upgrade"
  },
  {
    "n": "The Neon Demon"
  },
  {
    "n": "Prisoners"
  },
  {
    "n": "Southpaw"
  },
  {
    "n": "Nightcrawler"
  },
  {
    "n": "End of Watch"
  },
  {
    "n": "Zodiac"
  },
  {
    "n": "Nocturnal Animals"
  },
  {
    "n": "Predestination"
  },
  {
    "n": "Hold the Dark"
  },
  {
    "n": "Her"
  },
  {
    "n": "Law Abiding Citizen"
  },
  {
    "n": "Death Sentence"
  },
  {
    "n": "Tau"
  },
  {
    "n": "Texas Killing Fields"
  },
  {
    "n": "In Time"
  },
  {
    "n": "The House That Jack Built"
  },
  {
    "n": "Reign of the Supermen"
  },
  {
    "n": "Ghost in the Shell"
  },
  {
    "n": "The Mule"
  },
  {
    "n": "The Legend of Drunken Master"
  },
  {
    "n": "Hanna"
  },
  {
    "n": "Jarhead"
  },
  {
    "n": "Troy"
  },
  {
    "n": "John Wick: Chapter 3 - Parabellum"
  },
  {
    "n": "Eagle Eye"
  },
  {
    "n": "The Thirteenth Floor"
  },
  {
    "n": "Daybreakers"
  },
  {
    "n": "Constantine"
  },
  {
    "n": "Legion"
  },
  {
    "n": "The Last Witch Hunter"
  },
  {
    "n": "Taken"
  },
  {
    "n": "Van Helsing"
  },
  {
    "n": "I, Robot"
  },
  {
    "n": "Texas Killing Fields"
  },
  {
    "n": "Million Dollar Baby"
  },
  {
    "n": "Ready Player One"
  },
  {
    "n": "No Country for Old Men"
  },
  {
    "n": "In Bruges"
  },
  {
    "n": "Snowpiercer"
  },
  {
    "n": "Swiss Army Man"
  },
  {
    "n": "Ender's Game"
  },
  {
    "n": "Tropic Thunder"
  },
  {
    "n": "Pitch Black"
  },
  {
    "n": "The Chronicles of Riddick"
  },
  {
    "n": "Riddick"
  },
  {
    "n": "Beowulf"
  },
  {
    "n": "Terminator 2: Judgment Day"
  },
  {
    "n": "Terminator 3: Rise of the Machines"
  },
  {
    "n": "Terminator Salvation"
  },
  {
    "n": "Gran Torino"
  },
  {
    "n": "Fasting"
  },
  {
    "n": "I Am Mother"
  },
  {
    "n": "Gone Girl"
  },
  {
    "n": "The Hurt Locker"
  },
  {
    "n": "American Psycho"
  },
  {
    "n": "Kill Bill: Vol. 1"
  },
  {
    "n": "Kill Bill: Vol. 2"
  },
  {
    "n": "Alita: Battle Angel"
  },
  {
    "n": "Shooter"
  },
  {
    "n": "Collateral"
  },
  {
    "n": "Goodfellas"
  },
  {
    "n": "The Usual Suspects"
  },
  {
    "n": "Snatch"
  },
  {
    "n": "October Sky"
  },
  {
    "n": "Watchmen"
  },
  {
    "n": "American Sniper"
  },
  {
    "n": "Elysium"
  },
  {
    "n": "Chappie"
  },
  {
    "n": "The Other Guys"
  },
  {
    "n": "The Departed"
  },
  {
    "n": "Deepwater Horizon"
  },
  {
    "n": "2 Guns"
  },
  {
    "n": "Pain & Gain"
  },
  {
    "n": "Bleed for This"
  },
  {
    "n": "Inglourious Basterds"
  },
  {
    "n": "Star Trek"
  },
  {
    "n": "Star Trek Into Darkness"
  },
  {
    "n": "Star Trek: Nemesis"
  },
  {
    "n": "13 Hours"
  },
  {
    "n": "Three Kings"
  },
  {
    "n": "The Island"
  },
  {
    "n": "The Prestige"
  },
  {
    "n": "Good Will Hunting"
  },
  {
    "n": "Rain Man"
  },
  {
    "n": "The Nice Guys"
  },
  {
    "n": "A Beautiful Mind"
  },
  {
    "n": "Gladiator"
  },
  {
    "n": "The Time Machine"
  },
  {
    "n": "Lawless"
  },
  {
    "n": "Enemy at the Gates"
  },
  {
    "n": "Saving Private Ryan"
  },
  {
    "n": "Forrest Gump"
  },
  {
    "n": "You Were Never Really Here"
  },
  {
    "n": "American Gangster"
  },
  {
    "n": "Avengement"
  },
  {
    "n": "The Professor"
  },
  {
    "n": "Godzilla"
  },
  {
    "n": "Minority Report"
  },
  {
    "n": "Casino Royale"
  },
  {
    "n": "21"
  },
  {
    "n": "The Great Hack"
  },
  {
    "n": "Falling Down"
  },
  {
    "n": "Rambo"
  },
  {
    "n": "Rambo: Last Blood"
  },
  {
    "n": "The Believer"
  },
  {
    "n": "El Camino: A Breaking Bad Movie"
  },
  {
    "n": "Sye Raa Narasimha Reddy"
  },
  {
    "n": "The Big Short"
  },
  {
    "n": "The Taking of Pelham 123"
  },
  {
    "n": "Solace"
  },
  {
    "n": "The Mandela Effect"
  },
  {
    "n": "I Am Legend"
  },
  {
    "n": "Okja"
  },
  {
    "n": "Machine Gun Preacher"
  },
  {
    "n": "Valkyrie"
  },
  {
    "n": "The Boy in the Striped Pajamas"
  },
  {
    "n": "Overlord"
  },
  {
    "n": "No One Lives"
  },
  {
    "n": "Togo"
  },
  {
    "n": "Dark Waters"
  },
  {
    "n": "Ford v Ferrari"
  },
  {
    "n": "Uncut Gems"
  },
  {
    "n": "The Current War: Director's Cut"
  },
  {
    "n": "Who Killed the Electric Car?"
  },
  {
    "n": "1917"
  },
  {
    "n": "Gantz: O"
  },
  {
    "n": "Ne Zha"
  },
  {
    "n": "Joker"
  },
  {
    "n": "Bloodshot"
  },
  {
    "n": "Ready or Not"
  },
  {
    "n": "The Irishman"
  },
  {
    "n": "Anna"
  },
  {
    "n": "Bad Boys for Life"
  },
  {
    "n": "The Tiger"
  },
  {
    "n": "The Way Back"
  },
  {
    "n": "The Invisible Man"
  },
  {
    "n": "Underwater"
  },
  {
    "n": "Mortal Kombat Legends: Scorpions Revenge"
  },
  {
    "n": "Escape from Pretoria"
  },
  {
    "n": "Harlock: Space Pirate"
  },
  {
    "n": "Light of My Life"
  },
  {
    "n": "Close Encounters of the Fifth Kind"
  },
  {
    "n": "Three Identical Strangers"
  },
  {
    "n": "Europa: The Last Battle"
  },
  {
    "n": "Root Cause"
  },
  {
    "n": "The Imaginarium of Doctor Parnassus"
  }
]

export default {
  name: 'MovieCollection',
  async mounted() {
    await this.$store.dispatch('movieCollection/getMovieCollection', {
      currentPage: 1
    });

    this.initScroll();
  },
  computed: {
    ...mapState({
      collection: ({ movieCollection }) => movieCollection.collection,
      currentPage:  ({ movieCollection }) => movieCollection.currentPage,
      reachedEnd: ({ movieCollection }) => {
        const { collection, pageSize, currentPage, totalPages } = movieCollection;

        if (collection.length < pageSize) {
          return false;
        }

        return totalPages == currentPage;
      },
      requesting: ({ movieCollection }) => movieCollection.requesting
    })
  },
  methods: {
    initScroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.$store.dispatch('movieCollection/getMovieCollection', {
            currentPage: this.currentPage + 1
          });
        }
      };
    }
  },
  components: {
    Popup,
    SearchMovies,
    MovieCard,
    NoContent,
    Loader,
    ReachedEnd
  }
};
</script>

<style lang="scss"></style>
