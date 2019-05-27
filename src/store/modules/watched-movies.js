import firebase from 'firebase';
import * as types from '../mutation-types';
import axios from 'axios';

const state = {
  watchedMovies: {},
  foundMovies: [],
  movieDetails: {}
};

const x = {
  "-LercErWqRyXaXfazCtC": {
    "Actors": "Charlize Theron, James McAvoy, Eddie Marsan, John Goodman",
    "Awards": "6 wins & 15 nominations.",
    "BoxOffice": "$51,536,935",
    "Country": "Germany, Sweden, USA, Hungary",
    "DVD": "14 Nov 2017",
    "Director": "David Leitch",
    "Genre": "Action, Mystery, Thriller",
    "Language": "English, German, Russian, Swedish",
    "Metascore": "63",
    "Plot": "The crown jewel of Her Majesty's Secret Intelligence Service, Agent Lorraine Broughton (Theron) is equal parts spycraft, sensuality and savagery, willing to deploy any of her skills to stay alive on her impossible mission. Sent alone into Berlin to deliver a priceless dossier out of the destabilized city, she partners with embedded station chief David Percival (James McAvoy) to navigate her way through the deadliest game of spies.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjM5NDYzMzg5N15BMl5BanBnXkFtZTgwOTM2NDU1MjI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjM5NDYzMzg5N15BMl5BanBnXkFtZTgwOTM2NDU1MjI@._V1_SX720.jpg",
    "Production": "Focus Features",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "78%"
      },
      {
        "Source": "Metacritic",
        "Value": "63/100"
      }
    ],
    "Released": "28 Jul 2017",
    "Response": "True",
    "Runtime": "115 min",
    "Title": "Atomic Blonde",
    "Type": "movie",
    "Website": "http://www.atomicblonde.com/",
    "Writer": "Kurt Johnstad (screenplay by), Antony Johnston (based on the Oni Press graphic novel series \"The Coldest City\" written by), Sam Hart (based on the Oni Press graphic novel series \"The Coldest City\" illustrated by)",
    "Year": "2017",
    "imdbID": "tt2406566",
    "imdbRating": "6.7",
    "imdbVotes": "147,520"
  },
  "-LercPOULIQjRxNkTl6z": {
    "Actors": "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    "Awards": "Won 2 Oscars. Another 152 wins & 155 nominations.",
    "BoxOffice": "$533,316,061",
    "Country": "USA, UK",
    "DVD": "09 Dec 2008",
    "Director": "Christopher Nolan",
    "Genre": "Action, Crime, Drama, Thriller",
    "Language": "English, Mandarin",
    "Metascore": "84",
    "Plot": "Set within a year after the events of Batman Begins, Batman, Lieutenant James Gordon, and new district attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City until a mysterious and sadistic criminal mastermind known only as the Joker appears in Gotham, creating a new wave of chaos. Batman's struggle against the Joker becomes deeply personal, forcing him to \"confront everything he believes\" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent and Rachel Dawes.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures/Legendary",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "9.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "94%"
      },
      {
        "Source": "Metacritic",
        "Value": "84/100"
      }
    ],
    "Released": "18 Jul 2008",
    "Response": "True",
    "Runtime": "152 min",
    "Title": "The Dark Knight",
    "Type": "movie",
    "Website": "http://thedarkknight.warnerbros.com/",
    "Writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
    "Year": "2008",
    "imdbID": "tt0468569",
    "imdbRating": "9.0",
    "imdbVotes": "2,039,506"
  },
  "-LercUCG1HjvcGcdDQbr": {
    "Actors": "James Denton, Christina Hendricks, Anthony LaPaglia, Edward Asner",
    "Awards": "1 win & 1 nomination.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "22 Feb 2011",
    "Director": "Sam Liu",
    "Genre": "Animation, Action, Sci-Fi",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "While saving the crew of the first manned mission to the sun, Superman is poisoned by solar radiation. Dying, he decides to fulfill his lifelong dreams, while still saving the Earth from various threats. But when Lex Luthor reveals his latest plot to control the world, Superman must use his remaining strength to stop him.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOGM1OTc2MzUtNmMwYi00NTQwLTkzZDItNGI4NmY1ZTJkMGE3XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BOGM1OTc2MzUtNmMwYi00NTQwLTkzZDItNGI4NmY1ZTJkMGE3XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX720.jpg",
    "Production": "WARNER BROTHERS PICTURES",
    "Rated": "PG",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      }
    ],
    "Released": "22 Feb 2011",
    "Response": "True",
    "Runtime": "76 min",
    "Title": "All-Star Superman",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Jerry Siegel (character created by: Superman), Joe Shuster (character created by: Superman), Grant Morrison (graphic novel), Frank Quitely (graphic novel), Dwayne McDuffie",
    "Year": "2011",
    "imdbID": "tt1699114",
    "imdbRating": "7.0",
    "imdbVotes": "12,415"
  },
  "-LercYG3YGl8dJMT39Tl": {
    "Actors": "Ansel Elgort, Jon Bernthal, Jon Hamm, Eiza González",
    "Awards": "Nominated for 3 Oscars. Another 31 wins & 44 nominations.",
    "BoxOffice": "$107,770,367",
    "Country": "UK, USA",
    "DVD": "10 Oct 2017",
    "Director": "Edgar Wright",
    "Genre": "Action, Crime, Drama, Music, Thriller",
    "Language": "English, American Sign Language",
    "Metascore": "86",
    "Plot": "Baby is a young and partially hearing impaired getaway driver who can make any wild move while in motion with the right track playing. It's a critical talent he needs to survive his indentured servitude to the crime boss, Doc, who values his role in his meticulously planned robberies. However, just when Baby thinks he is finally free and clear to have his own life with his new girlfriend, Deborah, Doc coerces him back for another job. Now saddled with a crew of thugs too violently unstable to keep to Doc's plans, Baby finds himself and everything he cares for in terrible danger. To survive and escape the coming maelstrom, it will take all of Baby's skill, wits and daring, but even on the best track, can he make it when life is forcing him to face the music?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjM3MjQ1MzkxNl5BMl5BanBnXkFtZTgwODk1ODgyMjI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjM3MjQ1MzkxNl5BMl5BanBnXkFtZTgwODk1ODgyMjI@._V1_SX720.jpg",
    "Production": "Sony Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "93%"
      },
      {
        "Source": "Metacritic",
        "Value": "86/100"
      }
    ],
    "Released": "28 Jun 2017",
    "Response": "True",
    "Runtime": "112 min",
    "Title": "Baby Driver",
    "Type": "movie",
    "Website": "http://www.babydriver-movie.com/",
    "Writer": "Edgar Wright",
    "Year": "2017",
    "imdbID": "tt3890160",
    "imdbRating": "7.6",
    "imdbVotes": "355,764"
  },
  "-Lercanr8UwZDE3nGmMW": {
    "Actors": "Ben Affleck, Henry Cavill, Amy Adams, Jesse Eisenberg",
    "Awards": "14 wins & 30 nominations.",
    "BoxOffice": "$293,792,936",
    "Country": "USA",
    "DVD": "19 Jul 2016",
    "Director": "Zack Snyder",
    "Genre": "Action, Adventure, Fantasy, Sci-Fi",
    "Language": "English",
    "Metascore": "44",
    "Plot": "The general public is concerned over having Superman on their planet and letting the \"Dark Knight\" - Batman - pursue the streets of Gotham. While this is happening, a power-phobic Batman tries to attack Superman.,Meanwhile Superman tries to settle on a decision, and Lex Luthor, the criminal mastermind and millionaire, tries to use his own advantages to fight the \"Man of Steel\".",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "28%"
      },
      {
        "Source": "Metacritic",
        "Value": "44/100"
      }
    ],
    "Released": "25 Mar 2016",
    "Response": "True",
    "Runtime": "151 min",
    "Title": "Batman v Superman: Dawn of Justice",
    "Type": "movie",
    "Website": "http://www.facebook.com/batmanvsuperman",
    "Writer": "Chris Terrio, David S. Goyer, Bob Kane (Batman created by), Bill Finger (Batman created by), Jerry Siegel (Superman created by), Joe Shuster (Superman created by), William Moulton Marston (character created by: Wonder Woman)",
    "Year": "2016",
    "imdbID": "tt2975590",
    "imdbRating": "6.5",
    "imdbVotes": "569,833"
  },
  "-LerceBHOHeE7-nZcOLZ": {
    "Actors": "Chris Evans, Hayley Atwell, Sebastian Stan, Tommy Lee Jones",
    "Awards": "3 wins & 46 nominations.",
    "BoxOffice": "$176,636,816",
    "Country": "USA",
    "DVD": "25 Oct 2011",
    "Director": "Joe Johnston",
    "Genre": "Action, Adventure, Sci-Fi",
    "Language": "English, Norwegian, French",
    "Metascore": "66",
    "Plot": "It is 1942, America has entered World War II, and sickly but determined Steve Rogers is frustrated at being rejected yet again for military service. Everything changes when Dr. Erskine recruits him for the secret Project Rebirth. Proving his extraordinary courage, wits and conscience, Rogers undergoes the experiment and his weak body is suddenly enhanced into the maximum human potential. When Dr. Erskine is then immediately assassinated by an agent of Nazi Germany's secret HYDRA research department (headed by Johann Schmidt, a.k.a. the Red Skull), Rogers is left as a unique man who is initially misused as a propaganda mascot; however, when his comrades need him, Rogers goes on a successful adventure that truly makes him Captain America, and his war against Schmidt begins.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX720.jpg",
    "Production": "Paramount Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "80%"
      },
      {
        "Source": "Metacritic",
        "Value": "66/100"
      }
    ],
    "Released": "22 Jul 2011",
    "Response": "True",
    "Runtime": "124 min",
    "Title": "Captain America: The First Avenger",
    "Type": "movie",
    "Website": "http://captainamerica.marvel.com/",
    "Writer": "Christopher Markus (screenplay), Stephen McFeely (screenplay), Joe Simon (comic books), Jack Kirby (comic books)",
    "Year": "2011",
    "imdbID": "tt0458339",
    "imdbRating": "6.9",
    "imdbVotes": "648,882"
  },
  "-LerchbyKJgcxvL49Tzi": {
    "Actors": "Chris Evans, Samuel L. Jackson, Scarlett Johansson, Robert Redford",
    "Awards": "Nominated for 1 Oscar. Another 5 wins & 50 nominations.",
    "BoxOffice": "$228,636,083",
    "Country": "USA",
    "DVD": "09 Sep 2014",
    "Director": "Anthony Russo, Joe Russo",
    "Genre": "Action, Adventure, Sci-Fi, Thriller",
    "Language": "English, French",
    "Metascore": "70",
    "Plot": "For Steve Rogers, awakening after decades of suspended animation involves more than catching up on pop culture; it also means that this old school idealist must face a world of subtler threats and difficult moral complexities. That becomes clear when Director Nick Fury is killed by the mysterious assassin, the Winter Soldier, but not before warning Rogers that SHIELD has been subverted by its enemies. When Rogers acts on Fury's warning to trust no one there, he is branded as a traitor by the organization. Now a fugitive, Captain America must get to the bottom of this deadly mystery with the help of the Black Widow and his new friend, The Falcon. However, the battle will be costly for the Sentinel of Liberty, with Rogers finding enemies where he least expects them while learning that the Winter Soldier looks disturbingly familiar.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SX720.jpg",
    "Production": "Walt Disney Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "90%"
      },
      {
        "Source": "Metacritic",
        "Value": "70/100"
      }
    ],
    "Released": "04 Apr 2014",
    "Response": "True",
    "Runtime": "136 min",
    "Title": "Captain America: The Winter Soldier",
    "Type": "movie",
    "Website": "http://marvel.com/captainamerica",
    "Writer": "Christopher Markus (screenplay by), Stephen McFeely (screenplay by), Joe Simon (based on the Marvel comics by), Jack Kirby (based on the Marvel comics by)",
    "Year": "2014",
    "imdbID": "tt1843866",
    "imdbRating": "7.8",
    "imdbVotes": "655,267"
  },
  "-LerclGSg4_jnJ6ivj66": {
    "Actors": "Chris Evans, Robert Downey Jr., Scarlett Johansson, Sebastian Stan",
    "Awards": "16 wins & 65 nominations.",
    "BoxOffice": "$408,080,554",
    "Country": "USA",
    "DVD": "13 Sep 2016",
    "Director": "Anthony Russo, Joe Russo",
    "Genre": "Action, Adventure, Sci-Fi",
    "Language": "English, German, Xhosa, Russian, Romanian, Hindi",
    "Metascore": "75",
    "Plot": "With many people fearing the actions of super heroes, the government decides to push for the Hero Registration Act, a law that limits a hero's actions. This results in a division in The Avengers. Iron Man stands with this Act, claiming that their actions must be kept in check otherwise cities will continue to be destroyed, but Captain America feels that saving the world is daring enough and that they cannot rely on the government to protect the world. This escalates into an all-out war between Team Iron Man (Iron Man, Black Panther, Vision, Black Widow, War Machine, and Spider-Man) and Team Captain America (Captain America, Bucky Barnes, Falcon, Scarlet Witch, Hawkeye, and Ant Man) while a new villain emerges.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX720.jpg",
    "Production": "Walt Disney Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "91%"
      },
      {
        "Source": "Metacritic",
        "Value": "75/100"
      }
    ],
    "Released": "06 May 2016",
    "Response": "True",
    "Runtime": "147 min",
    "Title": "Captain America: Civil War",
    "Type": "movie",
    "Website": "http://marvel.com/captainamerica#/home",
    "Writer": "Christopher Markus (screenplay by), Stephen McFeely (screenplay by), Joe Simon (based on the Marvel comics by), Jack Kirby (based on the Marvel comics by)",
    "Year": "2016",
    "imdbID": "tt3498820",
    "imdbRating": "7.8",
    "imdbVotes": "574,126"
  },
  "-LercpejhyZ9IufNT-73": {
    "Actors": "Tony Schiena, Armand Assante, Kippei Shîna, Shô Ikushima",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "N/A",
    "Director": "Julius R. Nasso",
    "Genre": "Action, Thriller",
    "Language": "English, Japanese",
    "Metascore": "N/A",
    "Plot": "To bring down a global human trafficking ring, an Interpol agent recruits the help of a brutal criminal with inside knowledge of the yakuza.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjFiZmExN2YtNmMyNy00NTc5LWI0YWYtMTI0YzVlM2I2YTk0XkEyXkFqcGdeQXVyMTU5ODE5ODI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjFiZmExN2YtNmMyNy00NTc5LWI0YWYtMTI0YzVlM2I2YTk0XkEyXkFqcGdeQXVyMTU5ODE5ODI@._V1_SX720.jpg",
    "Production": "N/A",
    "Rated": "TV-MA",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.8/10"
      }
    ],
    "Released": "01 May 2018",
    "Response": "True",
    "Runtime": "97 min",
    "Title": "Darc",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Tony Schiena (screenplay), Dennis Venter",
    "Year": "2018",
    "imdbID": "tt4594836",
    "imdbRating": "5.8",
    "imdbVotes": "2,789"
  },
  "-LerctYV4RxkifuxrOej": {
    "Actors": "Jake Gyllenhaal, Naomi Watts, Chris Cooper, Judah Lewis",
    "Awards": "1 win & 2 nominations.",
    "BoxOffice": "$1,656,098",
    "Country": "USA",
    "DVD": "19 Jul 2016",
    "Director": "Jean-Marc Vallée",
    "Genre": "Comedy, Drama",
    "Language": "English",
    "Metascore": "49",
    "Plot": "Davis (Jake Gyllenhaal), a successful investment banker, struggles after losing his wife in a tragic car crash. Despite pressure from his father-in-law, Phil (Chris Cooper), to pull it together, Davis continues to unravel. What starts as a complaint letter to a vending machine company turns into a series of letters revealing startling personal admissions. Davis' letters catch the attention of customer service rep, Karen (Naomi Watts), and, amidst emotional and financial burdens of her own, the two form an unlikely connection. With the help of Karen and her son Chris (Judah Lewis), Davis starts to rebuild, beginning with the demolition of the life he once knew.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg4Nzg1MTYxMl5BMl5BanBnXkFtZTgwMjUxNDMyODE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTg4Nzg1MTYxMl5BMl5BanBnXkFtZTgwMjUxNDMyODE@._V1_SX720.jpg",
    "Production": "Fox Searchlight",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "53%"
      },
      {
        "Source": "Metacritic",
        "Value": "49/100"
      }
    ],
    "Released": "08 Apr 2016",
    "Response": "True",
    "Runtime": "101 min",
    "Title": "Demolition",
    "Type": "movie",
    "Website": "http://www.demolition-themovie.com",
    "Writer": "Bryan Sipe",
    "Year": "2015",
    "imdbID": "tt1172049",
    "imdbRating": "7.0",
    "imdbVotes": "76,438"
  },
  "-LercwY9nAfBA5Xs46u2": {
    "Actors": "Jon Bernthal, Christopher Abbott, Imogen Poots, Rosemarie DeWitt",
    "Awards": "1 nomination.",
    "BoxOffice": "$5,183",
    "Country": "USA, Canada",
    "DVD": "03 Apr 2018",
    "Director": "Jamie M. Dagg",
    "Genre": "Drama, Thriller",
    "Language": "English",
    "Metascore": "72",
    "Plot": "A former rodeo star, with a small time life, unknowingly starts a rapport with a young man who is responsible for the violence that has suddenly gripped his small town. Every character from his loved ones to his business patrons, plays a part in the unravelling of this community. Our aged hero must face his relationships of past and present to come up against this unpredictable predator.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjA4NzE0NjQ5NF5BMl5BanBnXkFtZTgwODE0MzIxNDM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjA4NzE0NjQ5NF5BMl5BanBnXkFtZTgwODE0MzIxNDM@._V1_SX720.jpg",
    "Production": "IFC Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "77%"
      },
      {
        "Source": "Metacritic",
        "Value": "72/100"
      }
    ],
    "Released": "21 Dec 2017",
    "Response": "True",
    "Runtime": "93 min",
    "Title": "Sweet Virginia",
    "Type": "movie",
    "Website": "http://www.ifcfilms.com/films/sweet-virginia",
    "Writer": "Paul China, Benjamin China",
    "Year": "2017",
    "imdbID": "tt2582498",
    "imdbRating": "6.2",
    "imdbVotes": "5,846"
  },
  "-Lerd1TODjcSwP3omo65": {
    "Actors": "Joel Edgerton, Charlize Theron, David Oyelowo, Thandie Newton",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "Australia, USA",
    "DVD": "05 Jun 2018",
    "Director": "Nash Edgerton",
    "Genre": "Action, Comedy, Crime, Drama",
    "Language": "English, Spanish, French, Yoruba",
    "Metascore": "46",
    "Plot": "GRINGO, a dark comedy mixed with white-knuckle action and dramatic intrigue, explores the battle of survival for businessman Harold Soyinka (David Oyelowo) when he finds himself crossing the line from law-abiding citizen to wanted criminal.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjAyMTk2MTQ3Ml5BMl5BanBnXkFtZTgwNDQ2ODE0NDM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjAyMTk2MTQ3Ml5BMl5BanBnXkFtZTgwNDQ2ODE0NDM@._V1_SX720.jpg",
    "Production": "Amazon Studios and STX Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "39%"
      },
      {
        "Source": "Metacritic",
        "Value": "46/100"
      }
    ],
    "Released": "09 Mar 2018",
    "Response": "True",
    "Runtime": "111 min",
    "Title": "Gringo",
    "Type": "movie",
    "Website": "http://gringo.movie/",
    "Writer": "Anthony Tambakis (screenplay by), Matthew Stone (screenplay by), Matthew Stone (story by)",
    "Year": "2018",
    "imdbID": "tt3721964",
    "imdbRating": "6.1",
    "imdbVotes": "20,495"
  },
  "-Lerd4n8XJfYxZlKWJRK": {
    "Actors": "Sharlto Copley, Danila Kozlovsky, Haley Bennett, Tim Roth",
    "Awards": "1 win & 1 nomination.",
    "BoxOffice": "N/A",
    "Country": "Russia, USA, China",
    "DVD": "N/A",
    "Director": "Ilya Naishuller",
    "Genre": "Action, Adventure, Sci-Fi, Thriller",
    "Language": "English, Russian",
    "Metascore": "51",
    "Plot": "Hardcore Henry is an action film told from a first person perspective: You remember nothing. Mainly because you've just been brought back from the dead by your wife (Haley Bennett). She tells you that your name is Henry. Five minutes later, you are being shot at, your wife has been kidnapped, and you should probably go get her back. Who's got her? His name's Akan; he's a powerful warlord with an army of mercenaries, and a plan for world domination. You're also in an unfamiliar city of Moscow, and everyone wants you dead. Everyone except for a mysterious British fellow called Jimmy. He may be on your side, but you aren't sure. If you can survive the insanity, and solve the mystery, you might just discover your purpose and the truth behind your identity. Good luck, Henry. You're likely going to need it...",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjIzNTcwMDc3Nl5BMl5BanBnXkFtZTgwNzU5NTY5NzE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNjIzNTcwMDc3Nl5BMl5BanBnXkFtZTgwNzU5NTY5NzE@._V1_SX720.jpg",
    "Production": "N/A",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.7/10"
      },
      {
        "Source": "Metacritic",
        "Value": "51/100"
      }
    ],
    "Released": "08 Apr 2016",
    "Response": "True",
    "Runtime": "96 min",
    "Title": "Hardcore Henry",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Ilya Naishuller, Will Stewart (additional writing by)",
    "Year": "2015",
    "imdbID": "tt3072482",
    "imdbRating": "6.7",
    "imdbVotes": "77,223"
  },
  "-LerdA-H246E7MiK6Zl1": {
    "Actors": "Eric Sykes, Timothy Spall, David Tennant, Daniel Radcliffe",
    "Awards": "Nominated for 1 Oscar. Another 13 wins & 42 nominations.",
    "BoxOffice": "$289,994,397",
    "Country": "UK, USA",
    "DVD": "07 Mar 2006",
    "Director": "Mike Newell",
    "Genre": "Adventure, Family, Fantasy, Mystery",
    "Language": "English, French",
    "Metascore": "81",
    "Plot": "Harry's fourth year at Hogwarts is about to start and he is enjoying the summer vacation with his friends. They get the tickets to The Quidditch World Cup Final but after the match is over, people dressed like Lord Voldemort's 'Death Eaters' set a fire to all the visitors' tents, coupled with the appearance of Voldemort's symbol, the 'Dark Mark' in the sky, which causes a frenzy across the magical community. That same year, Hogwarts is hosting 'The Triwizard Tournament', a magical tournament between three well-known schools of magic : Hogwarts, Beauxbatons and Durmstrang. The contestants have to be above the age of 17, and are chosen by a magical object called Goblet of Fire. On the night of selection, however, the Goblet spews out four names instead of the usual three, with Harry unwittingly being selected as the Fourth Champion. Since the magic cannot be reversed, Harry is forced to go with it and brave three exceedingly difficult tasks.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "88%"
      },
      {
        "Source": "Metacritic",
        "Value": "81/100"
      }
    ],
    "Released": "18 Nov 2005",
    "Response": "True",
    "Runtime": "157 min",
    "Title": "Harry Potter and the Goblet of Fire",
    "Type": "movie",
    "Website": "http://harrypotter.warnerbros.com/gobletoffire/",
    "Writer": "Steve Kloves (screenplay), J.K. Rowling (novel)",
    "Year": "2005",
    "imdbID": "tt0330373",
    "imdbRating": "7.7",
    "imdbVotes": "484,151"
  },
  "-LerdWrQZeV_dpfmMwI_": {
    "Actors": "Bill Nighy, Emma Watson, Richard Griffiths, Harry Melling",
    "Awards": "Nominated for 2 Oscars. Another 15 wins & 53 nominations.",
    "BoxOffice": "$294,980,434",
    "Country": "UK, USA",
    "DVD": "15 Apr 2011",
    "Director": "David Yates",
    "Genre": "Adventure, Fantasy, Mystery",
    "Language": "English",
    "Metascore": "65",
    "Plot": "Voldemort's power is growing stronger. He now has control over the Ministry of Magic and Hogwarts. Harry, Ron, and Hermione decide to finish Dumbledore's work and find the rest of the Horcruxes to defeat the Dark Lord. But little hope remains for the Trio, and the rest of the Wizarding World, so everything they do must go as planned.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "77%"
      },
      {
        "Source": "Metacritic",
        "Value": "65/100"
      }
    ],
    "Released": "19 Nov 2010",
    "Response": "True",
    "Runtime": "146 min",
    "Title": "Harry Potter and the Deathly Hallows: Part 1",
    "Type": "movie",
    "Website": "http://www.HarryPotter.com/",
    "Writer": "Steve Kloves (screenplay), J.K. Rowling (novel)",
    "Year": "2010",
    "imdbID": "tt0926084",
    "imdbRating": "7.7",
    "imdbVotes": "421,292"
  },
  "-LerdYN9GyN1dVGUNctn": {
    "Actors": "Ralph Fiennes, Michael Gambon, Alan Rickman, Daniel Radcliffe",
    "Awards": "Nominated for 3 Oscars. Another 45 wins & 91 nominations.",
    "BoxOffice": "$381,000,185",
    "Country": "USA, UK",
    "DVD": "11 Nov 2011",
    "Director": "David Yates",
    "Genre": "Adventure, Drama, Fantasy, Mystery",
    "Language": "English",
    "Metascore": "87",
    "Plot": "Harry, Ron, and Hermione continue their quest of finding and destroying the Dark Lord's three remaining Horcruxes, the magical items responsible for his immortality. But as the mystical Deathly Hallows are uncovered, and Voldemort finds out about their mission, the biggest battle begins and life as they know it will never be the same again.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "96%"
      },
      {
        "Source": "Metacritic",
        "Value": "87/100"
      }
    ],
    "Released": "15 Jul 2011",
    "Response": "True",
    "Runtime": "130 min",
    "Title": "Harry Potter and the Deathly Hallows: Part 2",
    "Type": "movie",
    "Website": "http://www.HarryPotter.com/",
    "Writer": "Steve Kloves (screenplay), J.K. Rowling (novel)",
    "Year": "2011",
    "imdbID": "tt1201607",
    "imdbRating": "8.1",
    "imdbVotes": "685,241"
  },
  "-Lerdb6iJAocq3B1dMkp": {
    "Actors": "Gina Carano, Michael Angarano, Channing Tatum, Debby Lynn Ross",
    "Awards": "7 nominations.",
    "BoxOffice": "$18,934,858",
    "Country": "Ireland, USA",
    "DVD": "01 May 2012",
    "Director": "Steven Soderbergh",
    "Genre": "Action, Drama, Thriller",
    "Language": "English, Spanish",
    "Metascore": "67",
    "Plot": "Freelance covert operative Mallory Kane is hired out by her handler to various global entities to perform jobs which governments can't authorize and heads of state would rather not know about. After a mission to rescue a hostage in Barcelona, Mallory is quickly dispatched on another mission to Dublin. When the operation goes awry and Mallory finds she has been double crossed, she needs to use all of her skills, tricks and abilities to escape an international manhunt, make it back to the United States, protect her family, and exact revenge on those that have betrayed her.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjI2MjIxOTUwN15BMl5BanBnXkFtZTcwNDM5NjcxNw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjI2MjIxOTUwN15BMl5BanBnXkFtZTcwNDM5NjcxNw@@._V1_SX720.jpg",
    "Production": "Relativity Media",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "80%"
      },
      {
        "Source": "Metacritic",
        "Value": "67/100"
      }
    ],
    "Released": "20 Jan 2012",
    "Response": "True",
    "Runtime": "93 min",
    "Title": "Haywire",
    "Type": "movie",
    "Website": "http://haywiremovie.com/",
    "Writer": "Lem Dobbs",
    "Year": "2011",
    "imdbID": "tt1506999",
    "imdbRating": "5.8",
    "imdbVotes": "78,445"
  },
  "-LerdqeJtVjJ6uV6O79_": {
    "Actors": "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
    "Awards": "Won 1 Oscar. Another 43 wins & 143 nominations.",
    "BoxOffice": "$158,737,441",
    "Country": "USA, UK, Canada",
    "DVD": "31 Mar 2015",
    "Director": "Christopher Nolan",
    "Genre": "Adventure, Drama, Sci-Fi",
    "Language": "English",
    "Metascore": "74",
    "Plot": "Earth's future has been riddled by disasters, famines, and droughts. There is only one way to ensure mankind's survival: Interstellar travel. A newly discovered wormhole in the far reaches of our solar system allows a team of astronauts to go where no man has gone before, a planet that may have the right environment to sustain human life.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX720.jpg",
    "Production": "Paramount Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "72%"
      },
      {
        "Source": "Metacritic",
        "Value": "74/100"
      }
    ],
    "Released": "07 Nov 2014",
    "Response": "True",
    "Runtime": "169 min",
    "Title": "Interstellar",
    "Type": "movie",
    "Website": "http://www.InterstellarMovie.com/",
    "Writer": "Jonathan Nolan, Christopher Nolan",
    "Year": "2014",
    "imdbID": "tt0816692",
    "imdbRating": "8.6",
    "imdbVotes": "1,275,886"
  },
  "-LerdvR5usTarz0xei2q": {
    "Actors": "Keanu Reeves, Michael Nyqvist, Alfie Allen, Willem Dafoe",
    "Awards": "5 wins & 8 nominations.",
    "BoxOffice": "N/A",
    "Country": "China, USA",
    "DVD": "03 Feb 2015",
    "Director": "Chad Stahelski, David Leitch",
    "Genre": "Action, Crime, Thriller",
    "Language": "English, Russian, Hungarian",
    "Metascore": "68",
    "Plot": "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX720.jpg",
    "Production": "LionsGate Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "87%"
      },
      {
        "Source": "Metacritic",
        "Value": "68/100"
      }
    ],
    "Released": "24 Oct 2014",
    "Response": "True",
    "Runtime": "101 min",
    "Title": "John Wick",
    "Type": "movie",
    "Website": "http://johnwickthemovie.com/",
    "Writer": "Derek Kolstad",
    "Year": "2014",
    "imdbID": "tt2911666",
    "imdbRating": "7.3",
    "imdbVotes": "427,623"
  },
  "-LerdxCR9PyAzni3Ajpf": {
    "Actors": "Keanu Reeves, Riccardo Scamarcio, Ian McShane, Ruby Rose",
    "Awards": "4 wins & 4 nominations.",
    "BoxOffice": "$91,970,516",
    "Country": "USA, Hong Kong",
    "DVD": "13 Jun 2017",
    "Director": "Chad Stahelski",
    "Genre": "Action, Crime, Thriller",
    "Language": "English, Italian, Russian",
    "Metascore": "75",
    "Plot": "After returning to the criminal underworld to repay a debt, John Wick discovers that a large bounty has been put on his life.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjE2NDkxNTY2M15BMl5BanBnXkFtZTgwMDc2NzE0MTI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjE2NDkxNTY2M15BMl5BanBnXkFtZTgwMDc2NzE0MTI@._V1_SX720.jpg",
    "Production": "Summit Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "89%"
      },
      {
        "Source": "Metacritic",
        "Value": "75/100"
      }
    ],
    "Released": "10 Feb 2017",
    "Response": "True",
    "Runtime": "122 min",
    "Title": "John Wick: Chapter 2",
    "Type": "movie",
    "Website": "http://www.johnwick.movie/",
    "Writer": "Derek Kolstad, Derek Kolstad (based on characters created by)",
    "Year": "2017",
    "imdbID": "tt4425200",
    "imdbRating": "7.5",
    "imdbVotes": "268,136"
  },
  "-Lere2aOiikgf0HVJnf9": {
    "Actors": "Justin Chambers, C. Thomas Howell, Michael B. Jordan, Kevin McKidd",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "30 Jul 2013",
    "Director": "Jay Oliva",
    "Genre": "Animation, Action, Adventure, Fantasy, Sci-Fi",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "An alteration of the timeline for the superhero, The Flash. The Flash must team with other heroes to restore the timeline while the Earth is ravaged by a war between Aquaman's Atlantis and Wonder Woman's Amazons.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTgwNTljYzgtOTU3ZC00ZjhhLTk0YzItY2RiMWU0MGZlNzFjL2ltYWdlXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTgwNTljYzgtOTU3ZC00ZjhhLTk0YzItY2RiMWU0MGZlNzFjL2ltYWdlXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX720.jpg",
    "Production": "WARNER BROTHERS PICTURES",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "100%"
      }
    ],
    "Released": "30 Jul 2013",
    "Response": "True",
    "Runtime": "75 min",
    "Title": "Justice League: The Flashpoint Paradox",
    "Type": "movie",
    "Website": "https://www.facebook.com/pages/Justice-League-The-Flashpoint-Paradox/495717467160721?fref=ts",
    "Writer": "James Krieg, Geoff Johns (based on the graphic novel \"Flashpoint\" by), Andy Kubert (based on the graphic novel \"Flashpoint\" by), Jerry Siegel (character created by: Superman), Joe Shuster (character created by: Superman), Bob Kane (character created by: Batman), William Moulton Marston (character created by: Wonder Woman), Paul Norris (character created by: Aquaman), Jack Kirby (character created by: Etrigan the Demon), Marv Wolfman (characters created by: Cyborg & Deathstroke), George Pérez (characters created by: Cyborg & Deathstroke), Jim Lee (character created by: Grifter), Brandon Choi (character created by: Grifter)",
    "Year": "2013",
    "imdbID": "tt2820466",
    "imdbRating": "8.2",
    "imdbVotes": "37,401"
  },
  "-Lere5p8ICYsl403tMaN": {
    "Actors": "Saoirse Ronan, Laurie Metcalf, Tracy Letts, Lucas Hedges",
    "Awards": "Nominated for 5 Oscars. Another 102 wins & 191 nominations.",
    "BoxOffice": "$48,285,330",
    "Country": "USA",
    "DVD": "06 Mar 2018",
    "Director": "Greta Gerwig",
    "Genre": "Comedy, Drama",
    "Language": "English, Spanish",
    "Metascore": "94",
    "Plot": "In 2002, an artistically inclined seventeen-year-old girl comes of age in Sacramento, California.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODhkZGE0NDQtZDc0Zi00YmQ4LWJiNmUtYTY1OGM1ODRmNGVkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BODhkZGE0NDQtZDc0Zi00YmQ4LWJiNmUtYTY1OGM1ODRmNGVkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX720.jpg",
    "Production": "A24",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "99%"
      },
      {
        "Source": "Metacritic",
        "Value": "94/100"
      }
    ],
    "Released": "01 Dec 2017",
    "Response": "True",
    "Runtime": "94 min",
    "Title": "Lady Bird",
    "Type": "movie",
    "Website": "http://ladybird.movie/",
    "Writer": "Greta Gerwig",
    "Year": "2017",
    "imdbID": "tt4925292",
    "imdbRating": "7.4",
    "imdbVotes": "173,272"
  },
  "-Lere8waVdYDoPjPkRCs": {
    "Actors": "Scarlett Johansson, Morgan Freeman, Min-sik Choi, Amr Waked",
    "Awards": "1 win & 11 nominations.",
    "BoxOffice": "$108,521,370",
    "Country": "France",
    "DVD": "20 Jan 2015",
    "Director": "Luc Besson",
    "Genre": "Action, Sci-Fi, Thriller",
    "Language": "English, Mandarin, French, Italian, German, Spanish, Korean",
    "Metascore": "61",
    "Plot": "It was supposed to be a simple job. All Lucy had to do was deliver a mysterious briefcase to Mr. Jang. But immediately Lucy is caught up in a nightmarish deal where she is captured and turned into a drug mule for a new and powerful synthetic drug. When the bag she is carrying inside of her stomach leaks, Lucy's body undergoes unimaginable changes that begins to unlock her mind's full potential. With her new-found powers, Lucy turns into a merciless warrior intent on getting back at her captors. She receives invaluable help from Professor Norman, the leading authority on the human mind, and French police captain Pierre Del Rio.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODcxMzY3ODY1NF5BMl5BanBnXkFtZTgwNzg1NDY4MTE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BODcxMzY3ODY1NF5BMl5BanBnXkFtZTgwNzg1NDY4MTE@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "67%"
      },
      {
        "Source": "Metacritic",
        "Value": "61/100"
      }
    ],
    "Released": "25 Jul 2014",
    "Response": "True",
    "Runtime": "89 min",
    "Title": "Lucy",
    "Type": "movie",
    "Website": "http://www.lucymovie.com/",
    "Writer": "Luc Besson",
    "Year": "2014",
    "imdbID": "tt2872732",
    "imdbRating": "6.4",
    "imdbVotes": "399,615"
  },
  "-LereBedCQRVEg2Nhv5l": {
    "Actors": "Guy Pearce, Carrie-Anne Moss, Joe Pantoliano, Mark Boone Junior",
    "Awards": "Nominated for 2 Oscars. Another 56 wins & 55 nominations.",
    "BoxOffice": "$23,844,220",
    "Country": "USA",
    "DVD": "04 Sep 2001",
    "Director": "Christopher Nolan",
    "Genre": "Mystery, Thriller",
    "Language": "English",
    "Metascore": "80",
    "Plot": "Memento chronicles two separate stories of Leonard, an ex-insurance investigator who can no longer build new memories, as he attempts to find the murderer of his wife, which is the last thing he remembers. One story line moves forward in time while the other tells the story backwards revealing more each time.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "Newmarket Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "92%"
      },
      {
        "Source": "Metacritic",
        "Value": "80/100"
      }
    ],
    "Released": "25 May 2001",
    "Response": "True",
    "Runtime": "113 min",
    "Title": "Memento",
    "Type": "movie",
    "Website": "http://www.otnemem.com",
    "Writer": "Christopher Nolan (screenplay), Jonathan Nolan (short story \"Memento Mori\")",
    "Year": "2000",
    "imdbID": "tt0209144",
    "imdbRating": "8.5",
    "imdbVotes": "1,021,884"
  },
  "-LereEXayrim2wR-7I-h": {
    "Actors": "Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham",
    "Awards": "11 wins & 5 nominations.",
    "BoxOffice": "$3,600",
    "Country": "Belgium, Germany, Canada, France, USA, UK",
    "DVD": "25 Feb 2014",
    "Director": "Jaco Van Dormael",
    "Genre": "Drama, Fantasy, Romance, Sci-Fi",
    "Language": "English, Mohawk",
    "Metascore": "63",
    "Plot": "In the year 2092, one hundred eighteen year old Nemo is recounting his life story to a reporter. He is less than clear, often times thinking that he is only thirty-four years of age. But his story becomes more confusing after he does focus on the fact of his current real age. He tells of his life at three primary points in his life: at age nine (when his parents divorced), age sixteen and age thirty-four. The confusing aspect of the story is that he tells of alternate life paths, often changing course with the flick of a decision at each of those ages. One life path has him ultimately married to Elise, a depressed woman who never got over the unrequited love she had for a guy named Stefano when she was a teenager and who asked Nemo to swear that when she died he would sprinkle her ashes on Mars. A second life path has him married to Jean. Their life is one of luxury but one also of utter boredom. And a third life path has him in a torrid romance with his step-sister Anna, the two who, as adults, would search for each other after having been torn apart as teenagers. These life paths also intersect, with the three women sometimes entering the alternate life in some other aspect. Are any of these lives real or are they all a figment of his imagination?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg4ODkzMDQ3Nl5BMl5BanBnXkFtZTgwNTEwMTkxMDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTg4ODkzMDQ3Nl5BMl5BanBnXkFtZTgwNTEwMTkxMDE@._V1_SX720.jpg",
    "Production": "Magnolia Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "67%"
      },
      {
        "Source": "Metacritic",
        "Value": "63/100"
      }
    ],
    "Released": "26 Sep 2013",
    "Response": "True",
    "Runtime": "141 min",
    "Title": "Mr. Nobody",
    "Type": "movie",
    "Website": "http://www.magpictures.com/mrnobody/",
    "Writer": "Jaco Van Dormael",
    "Year": "2009",
    "imdbID": "tt0485947",
    "imdbRating": "7.8",
    "imdbVotes": "196,202"
  },
  "-LereODD5kpUtLCDlTbB": {
    "Actors": "Dennis Quaid, Ben Foster, Cam Gigandet, Antje Traue",
    "Awards": "N/A",
    "BoxOffice": "$10,261,085",
    "Country": "Germany, UK, USA",
    "DVD": "19 Jan 2010",
    "Director": "Christian Alvart",
    "Genre": "Action, Horror, Mystery, Sci-Fi, Thriller",
    "Language": "English, Vietnamese, German",
    "Metascore": "28",
    "Plot": "Two crew members are stranded on a spacecraft and quickly - and horrifically - realize they are not alone. Two astronauts awaken in a hyper-sleep chamber aboard a seemingly abandoned spacecraft. It's pitch black, they are disoriented, and the only sound is a low rumble and creak from the belly of the ship. They can't remember anything: Who are they? What is their mission? With Lt. Payton staying behind to guide him via radio transmitter, Cpl. Bower ventures deep into the ship and begins to uncover a terrifying reality. Slowly the spacecraft's shocking, deadly secrets are revealed...and the astronauts find their own survival is more important than they could ever have imagined.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDQxNjc5NTMxNl5BMl5BanBnXkFtZTcwNjg2NDE4Mg@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNDQxNjc5NTMxNl5BMl5BanBnXkFtZTcwNjg2NDE4Mg@@._V1_SX720.jpg",
    "Production": "Overture Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "28%"
      },
      {
        "Source": "Metacritic",
        "Value": "28/100"
      }
    ],
    "Released": "25 Sep 2009",
    "Response": "True",
    "Runtime": "108 min",
    "Title": "Pandorum",
    "Type": "movie",
    "Website": "http://www.pandorummovie.com/",
    "Writer": "Travis Milloy (screenplay), Travis Milloy (story), Christian Alvart (story)",
    "Year": "2009",
    "imdbID": "tt1188729",
    "imdbRating": "6.8",
    "imdbVotes": "136,166"
  },
  "-LereRh3Znun7jc5pz3Q": {
    "Actors": "Jennifer Lawrence, Joel Edgerton, Matthias Schoenaerts, Charlotte Rampling",
    "Awards": "N/A",
    "BoxOffice": "$17,000,000",
    "Country": "USA",
    "DVD": "22 May 2018",
    "Director": "Francis Lawrence",
    "Genre": "Action, Drama, Thriller",
    "Language": "English, Russian",
    "Metascore": "53",
    "Plot": "Ballerina Dominika Egorova is recruited to 'Sparrow School,' a Russian intelligence service where she is forced to use her body as a weapon. Her first mission, targeting a C.I.A. agent, threatens to unravel the security of both nations.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTA3MDkxOTc4NDdeQTJeQWpwZ15BbWU4MDAxNzgyNTQz._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTA3MDkxOTc4NDdeQTJeQWpwZ15BbWU4MDAxNzgyNTQz._V1_SX720.jpg",
    "Production": "Twentieth Century Fox",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "46%"
      },
      {
        "Source": "Metacritic",
        "Value": "53/100"
      }
    ],
    "Released": "02 Mar 2018",
    "Response": "True",
    "Runtime": "140 min",
    "Title": "Red Sparrow",
    "Type": "movie",
    "Website": "http://RedSparrowMovie.com",
    "Writer": "Justin Haythe (screenplay by), Jason Matthews (based upon the book by)",
    "Year": "2018",
    "imdbID": "tt2873282",
    "imdbRating": "6.6",
    "imdbVotes": "133,133"
  },
  "-LereWW4XcHYHU-XJ8ai": {
    "Actors": "Bruce Willis, Samuel L. Jackson, Robin Wright, Spencer Treat Clark",
    "Awards": "2 wins & 13 nominations.",
    "BoxOffice": "$95,000,000",
    "Country": "USA",
    "DVD": "26 Jun 2001",
    "Director": "M. Night Shyamalan",
    "Genre": "Drama, Mystery, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "62",
    "Plot": "This suspense thriller unfolds as the audience is introduced to David Dunn. Not only is he the sole survivor of a horrific train-crash that killed 131 people he doesn't have a scratch on him. Elijah Price is an obscure character who approaches Dunn with a seemingly far fetched theory behind it all.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDIwMjAxNzktNmEzYS00ZDY5LWEyZjktM2Y0MmUzZDkyYmZkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMDIwMjAxNzktNmEzYS00ZDY5LWEyZjktM2Y0MmUzZDkyYmZkXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX720.jpg",
    "Production": "Touchstone Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "70%"
      },
      {
        "Source": "Metacritic",
        "Value": "62/100"
      }
    ],
    "Released": "22 Nov 2000",
    "Response": "True",
    "Runtime": "106 min",
    "Title": "Unbreakable",
    "Type": "movie",
    "Website": "http://www.areyouunbreakable.com",
    "Writer": "M. Night Shyamalan",
    "Year": "2000",
    "imdbID": "tt0217869",
    "imdbRating": "7.3",
    "imdbVotes": "347,298"
  },
  "-LereY8Uhc_SZ6BHeQL-": {
    "Actors": "James McAvoy, Anya Taylor-Joy, Betty Buckley, Haley Lu Richardson",
    "Awards": "8 wins & 19 nominations.",
    "BoxOffice": "$138,120,085",
    "Country": "Japan, USA",
    "DVD": "18 Apr 2017",
    "Director": "M. Night Shyamalan",
    "Genre": "Horror, Thriller",
    "Language": "English",
    "Metascore": "62",
    "Plot": "When three girls are kidnapped by a man with 23 different personalities, they have to work out which of those personalities will help them escape and which of those personalities will try to stop them.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZTJiNGM2NjItNDRiYy00ZjY0LTgwNTItZDBmZGRlODQ4YThkL2ltYWdlXkEyXkFqcGdeQXVyMjY5ODI4NDk@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZTJiNGM2NjItNDRiYy00ZjY0LTgwNTItZDBmZGRlODQ4YThkL2ltYWdlXkEyXkFqcGdeQXVyMjY5ODI4NDk@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "77%"
      },
      {
        "Source": "Metacritic",
        "Value": "62/100"
      }
    ],
    "Released": "20 Jan 2017",
    "Response": "True",
    "Runtime": "117 min",
    "Title": "Split",
    "Type": "movie",
    "Website": "http://www.splitmovie.com/",
    "Writer": "M. Night Shyamalan",
    "Year": "2016",
    "imdbID": "tt4972582",
    "imdbRating": "7.3",
    "imdbVotes": "346,272"
  },
  "-LereZmEmn1GqVuR6rG1": {
    "Actors": "James McAvoy, Bruce Willis, Samuel L. Jackson, Anya Taylor-Joy",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "16 Apr 2019",
    "Director": "M. Night Shyamalan",
    "Genre": "Drama, Sci-Fi, Thriller",
    "Language": "English, Spanish",
    "Metascore": "42",
    "Plot": "Security guard David Dunn uses his supernatural abilities to track Kevin Wendell Crumb, a disturbed man who has twenty-four personalities.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTY1OTA2MjI5OV5BMl5BanBnXkFtZTgwNzkxMjU4NjM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTY1OTA2MjI5OV5BMl5BanBnXkFtZTgwNzkxMjU4NjM@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "37%"
      },
      {
        "Source": "Metacritic",
        "Value": "42/100"
      }
    ],
    "Released": "18 Jan 2019",
    "Response": "True",
    "Runtime": "129 min",
    "Title": "Glass",
    "Type": "movie",
    "Website": "http://www.glassmovie.com/",
    "Writer": "M. Night Shyamalan",
    "Year": "2019",
    "imdbID": "tt6823368",
    "imdbRating": "6.8",
    "imdbVotes": "107,618"
  },
  "-LerebqH1mplccvShGh7": {
    "Actors": "Nikolaj Coster-Waldau, Omari Hardwick, Lake Bell, Jon Bernthal",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "17 Oct 2017",
    "Director": "Ric Roman Waugh",
    "Genre": "Crime, Drama, Thriller",
    "Language": "English",
    "Metascore": "59",
    "Plot": "A newly released prisoner is forced by the leaders of his gang to orchestrate a major crime with a brutal rival gang on the streets of Southern California.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMGY0YTM3MjItZmExMy00NDgyLThjNzUtZWQ1MzY2NGRmMjZhXkEyXkFqcGdeQXVyMzYyMzE1NjA@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMGY0YTM3MjItZmExMy00NDgyLThjNzUtZWQ1MzY2NGRmMjZhXkEyXkFqcGdeQXVyMzYyMzE1NjA@._V1_SX720.jpg",
    "Production": "Saban Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "65%"
      },
      {
        "Source": "Metacritic",
        "Value": "59/100"
      }
    ],
    "Released": "18 Aug 2017",
    "Response": "True",
    "Runtime": "121 min",
    "Title": "Shot Caller",
    "Type": "movie",
    "Website": "http://www.sabanfilms.com/films/shot-caller/",
    "Writer": "Ric Roman Waugh",
    "Year": "2017",
    "imdbID": "tt4633690",
    "imdbRating": "7.3",
    "imdbVotes": "57,318"
  },
  "-LerefmTOxmz8T76gpZU": {
    "Actors": "Christian Bale, Gary Oldman, Tom Hardy, Joseph Gordon-Levitt",
    "Awards": "Nominated for 1 BAFTA Film Award. Another 38 wins & 102 nominations.",
    "BoxOffice": "$448,130,642",
    "Country": "UK, USA",
    "DVD": "03 Dec 2012",
    "Director": "Christopher Nolan",
    "Genre": "Action, Thriller",
    "Language": "English, Arabic",
    "Metascore": "78",
    "Plot": "Despite his tarnished reputation after the events of The Dark Knight, in which he took the rap for Dent's crimes, Batman feels compelled to intervene to assist the city and its police force which is struggling to cope with Bane's plans to destroy the city.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "87%"
      },
      {
        "Source": "Metacritic",
        "Value": "78/100"
      }
    ],
    "Released": "20 Jul 2012",
    "Response": "True",
    "Runtime": "164 min",
    "Title": "The Dark Knight Rises",
    "Type": "movie",
    "Website": "http://www.thedarkknightrises.com/",
    "Writer": "Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)",
    "Year": "2012",
    "imdbID": "tt1345836",
    "imdbRating": "8.4",
    "imdbVotes": "1,372,667"
  },
  "-LerewL1vVYZNTt4em69": {
    "Actors": "Ian McKellen, Martin Freeman, Richard Armitage, Ken Stott",
    "Awards": "Nominated for 3 Oscars. Another 10 wins & 72 nominations.",
    "BoxOffice": "$303,001,229",
    "Country": "USA, New Zealand",
    "DVD": "19 Mar 2013",
    "Director": "Peter Jackson",
    "Genre": "Adventure, Family, Fantasy",
    "Language": "English",
    "Metascore": "58",
    "Plot": "Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug. Approached out of the blue by the wizard Gandalf the Grey, Bilbo finds himself joining a company of thirteen dwarves led by the legendary warrior, Thorin Oakenshield. Their journey will take them into the Wild; through treacherous lands swarming with Goblins and Orcs, deadly Wargs and Giant Spiders, Shapeshifters and Sorcerers. Although their goal lies to the East and the wastelands of the Lonely Mountain first they must escape the goblin tunnels, where Bilbo meets the creature that will change his life forever ... Gollum. Here, alone with Gollum, on the shores of an underground lake, the unassuming Bilbo Baggins not only discovers depths of guile and courage that surprise even him, he also gains possession of Gollum's \"precious\" ring that holds unexpected and useful qualities ... A simple, gold ring that is tied to the fate of all Middle-earth in ways Bilbo cannot begin to know.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX720.jpg",
    "Production": "Warner Bros.",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "65%"
      },
      {
        "Source": "Metacritic",
        "Value": "58/100"
      }
    ],
    "Released": "14 Dec 2012",
    "Response": "True",
    "Runtime": "169 min",
    "Title": "The Hobbit: An Unexpected Journey",
    "Type": "movie",
    "Website": "http://www.thehobbit.com/index.html",
    "Writer": "Fran Walsh (screenplay), Philippa Boyens (screenplay), Peter Jackson (screenplay), Guillermo del Toro (screenplay), J.R.R. Tolkien (novel)",
    "Year": "2012",
    "imdbID": "tt0903624",
    "imdbRating": "7.9",
    "imdbVotes": "717,671"
  },
  "-Lerf2yCoYYymDtSW1Iy": {
    "Actors": "Ian McKellen, Martin Freeman, Richard Armitage, Ken Stott",
    "Awards": "Nominated for 3 Oscars. Another 16 wins & 86 nominations.",
    "BoxOffice": "$180,443,783",
    "Country": "USA, New Zealand",
    "DVD": "08 Apr 2014",
    "Director": "Peter Jackson",
    "Genre": "Adventure, Fantasy",
    "Language": "English",
    "Metascore": "66",
    "Plot": "After successfully crossing over (and under) the Misty Mountains, Thorin and Company must seek aid from a powerful stranger before taking on the dangers of Mirkwood Forest--without their Wizard. If they reach the human settlement of Lake-town it will be time for the hobbit Bilbo Baggins to fulfill his contract with the dwarves. The party must complete the journey to Lonely Mountain and burglar Baggins must seek out the Secret Door that will give them access to the hoard of the dragon Smaug. And, where has Gandalf got off to? And what is his secret business to the south?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzU0NDY0NDEzNV5BMl5BanBnXkFtZTgwOTIxNDU1MDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMzU0NDY0NDEzNV5BMl5BanBnXkFtZTgwOTIxNDU1MDE@._V1_SX720.jpg",
    "Production": "Warner Bros.",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "74%"
      },
      {
        "Source": "Metacritic",
        "Value": "66/100"
      }
    ],
    "Released": "13 Dec 2013",
    "Response": "True",
    "Runtime": "161 min",
    "Title": "The Hobbit: The Desolation of Smaug",
    "Type": "movie",
    "Website": "http://www.thehobbit.com/index.html",
    "Writer": "Fran Walsh (screenplay), Philippa Boyens (screenplay), Peter Jackson (screenplay), Guillermo del Toro (screenplay), J.R.R. Tolkien (novel)",
    "Year": "2013",
    "imdbID": "tt1170358",
    "imdbRating": "7.8",
    "imdbVotes": "562,910"
  },
  "-Lerf5KbLnrX3pWsXj2O": {
    "Actors": "Ian McKellen, Martin Freeman, Richard Armitage, Ken Stott",
    "Awards": "Nominated for 1 Oscar. Another 7 wins & 51 nominations.",
    "BoxOffice": "$187,747,747",
    "Country": "New Zealand, USA",
    "DVD": "24 Mar 2015",
    "Director": "Peter Jackson",
    "Genre": "Adventure, Fantasy",
    "Language": "English",
    "Metascore": "59",
    "Plot": "After the Dragon leaves the Lonely Mountain, the people of Lake-town see a threat coming. Orcs, dwarves, elves and people prepare for war. Bilbo sees Thorin going mad and tries to help. Meanwhile, Gandalf is rescued from the Necromancer's prison and his rescuers realize who the Necromancer is.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODAzMDgxMDc1MF5BMl5BanBnXkFtZTgwMTI0OTAzMjE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BODAzMDgxMDc1MF5BMl5BanBnXkFtZTgwMTI0OTAzMjE@._V1_SX720.jpg",
    "Production": "Warner Bros.",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "59%"
      },
      {
        "Source": "Metacritic",
        "Value": "59/100"
      }
    ],
    "Released": "17 Dec 2014",
    "Response": "True",
    "Runtime": "144 min",
    "Title": "The Hobbit: The Battle of the Five Armies",
    "Type": "movie",
    "Website": "http://www.thehobbit.com/",
    "Writer": "Fran Walsh (screenplay), Philippa Boyens (screenplay), Peter Jackson (screenplay), Guillermo del Toro (screenplay), J.R.R. Tolkien (novel)",
    "Year": "2014",
    "imdbID": "tt2310332",
    "imdbRating": "7.4",
    "imdbVotes": "436,512"
  },
  "-LerfAdyUrUhrhN7zu1y": {
    "Actors": "Alan Howard, Noel Appleby, Sean Astin, Sala Baker",
    "Awards": "Won 4 Oscars. Another 113 wins & 123 nominations.",
    "BoxOffice": "$314,000,000",
    "Country": "New Zealand, USA",
    "DVD": "06 Aug 2002",
    "Director": "Peter Jackson",
    "Genre": "Adventure, Drama, Fantasy",
    "Language": "English, Sindarin",
    "Metascore": "92",
    "Plot": "An ancient Ring thought lost for centuries has been found, and through a strange twist in fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it! However he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir and his three Hobbit friends Merry, Pippin and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign!",
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX720.jpg",
    "Production": "New Line Cinema",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "91%"
      },
      {
        "Source": "Metacritic",
        "Value": "92/100"
      }
    ],
    "Released": "19 Dec 2001",
    "Response": "True",
    "Runtime": "178 min",
    "Title": "The Lord of the Rings: The Fellowship of the Ring",
    "Type": "movie",
    "Website": "http://www.lordoftherings.net/film/trilogy/thefellowship.html",
    "Writer": "J.R.R. Tolkien (novel), Fran Walsh (screenplay), Philippa Boyens (screenplay), Peter Jackson (screenplay)",
    "Year": "2001",
    "imdbID": "tt0120737",
    "imdbRating": "8.8",
    "imdbVotes": "1,491,685"
  },
  "-LerfCvYp_TygbEUFn3k": {
    "Actors": "Bruce Allpress, Sean Astin, John Bach, Sala Baker",
    "Awards": "Won 2 Oscars. Another 118 wins & 137 nominations.",
    "BoxOffice": "$339,700,000",
    "Country": "New Zealand, USA",
    "DVD": "26 Aug 2003",
    "Director": "Peter Jackson",
    "Genre": "Adventure, Drama, Fantasy",
    "Language": "English, Sindarin, Old English",
    "Metascore": "87",
    "Plot": "While Frodo and Sam, now accompanied by a new guide, continue their hopeless journey towards the land of shadow to destroy the One Ring, each member of the broken fellowship plays their part in the battle against the evil wizard Saruman and his armies of Isengard.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNGE5MzIyNTAtNWFlMC00NDA2LWJiMjItMjc4Yjg1OWM5NzhhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNGE5MzIyNTAtNWFlMC00NDA2LWJiMjItMjc4Yjg1OWM5NzhhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX720.jpg",
    "Production": "New Line Cinema",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "95%"
      },
      {
        "Source": "Metacritic",
        "Value": "87/100"
      }
    ],
    "Released": "18 Dec 2002",
    "Response": "True",
    "Runtime": "179 min",
    "Title": "The Lord of the Rings: The Two Towers",
    "Type": "movie",
    "Website": "http://www.lordoftherings.net/",
    "Writer": "J.R.R. Tolkien (novel), Fran Walsh (screenplay), Philippa Boyens (screenplay), Stephen Sinclair (screenplay), Peter Jackson (screenplay)",
    "Year": "2002",
    "imdbID": "tt0167261",
    "imdbRating": "8.7",
    "imdbVotes": "1,334,346"
  },
  "-LerfF_M1wXM-c57avH1": {
    "Actors": "Noel Appleby, Ali Astin, Sean Astin, David Aston",
    "Awards": "Won 11 Oscars. Another 197 wins & 122 nominations.",
    "BoxOffice": "$364,000,000",
    "Country": "New Zealand, USA",
    "DVD": "25 May 2004",
    "Director": "Peter Jackson",
    "Genre": "Adventure, Drama, Fantasy",
    "Language": "English, Quenya, Old English, Sindarin",
    "Metascore": "94",
    "Plot": "The final confrontation between the forces of good and evil fighting for control of the future of Middle-earth. Hobbits: Frodo and Sam reach Mordor in their quest to destroy the \"one ring\", while Aragorn leads the forces of good against Sauron's evil army at the stone city of Minas Tirith.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX720.jpg",
    "Production": "New Line Cinema",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "93%"
      },
      {
        "Source": "Metacritic",
        "Value": "94/100"
      }
    ],
    "Released": "17 Dec 2003",
    "Response": "True",
    "Runtime": "201 min",
    "Title": "The Lord of the Rings: The Return of the King",
    "Type": "movie",
    "Website": "http://www.lordoftherings.net/",
    "Writer": "J.R.R. Tolkien (novel), Fran Walsh (screenplay), Philippa Boyens (screenplay), Peter Jackson (screenplay)",
    "Year": "2003",
    "imdbID": "tt0167260",
    "imdbRating": "8.9",
    "imdbVotes": "1,477,575"
  },
  "-LerfJ8BsMmuTYTTjl-T": {
    "Actors": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving",
    "Awards": "Won 4 Oscars. Another 34 wins & 48 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "21 Sep 1999",
    "Director": "Lana Wachowski, Lilly Wachowski",
    "Genre": "Action, Sci-Fi",
    "Language": "English",
    "Metascore": "73",
    "Plot": "Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. Morpheus awakens Neo to the real world, a ravaged wasteland where most of humanity have been captured by a race of machines that live off of the humans' body heat and electrochemical energy and who imprison their minds within an artificial reality known as the Matrix. As a rebel against the machines, Neo must return to the Matrix and confront the agents: super-powerful computer programs devoted to snuffing out Neo and the entire human rebellion.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "88%"
      },
      {
        "Source": "Metacritic",
        "Value": "73/100"
      }
    ],
    "Released": "31 Mar 1999",
    "Response": "True",
    "Runtime": "136 min",
    "Title": "The Matrix",
    "Type": "movie",
    "Website": "http://www.whatisthematrix.com",
    "Writer": "Lilly Wachowski, Lana Wachowski",
    "Year": "1999",
    "imdbID": "tt0133093",
    "imdbRating": "8.7",
    "imdbVotes": "1,488,823"
  },
  "-LerfL4odGdW4J6MzALp": {
    "Actors": "Ray Anthony, Christine Anu, Andy Arness, Alima Ashton-Sheibu",
    "Awards": "8 wins & 31 nominations.",
    "BoxOffice": "$281,500,000",
    "Country": "USA",
    "DVD": "14 Oct 2003",
    "Director": "Lana Wachowski, Lilly Wachowski",
    "Genre": "Action, Sci-Fi",
    "Language": "English, French",
    "Metascore": "62",
    "Plot": "Six months after the events depicted in The Matrix, Neo has proved to be a good omen for the free humans, as more and more humans are being freed from the matrix and brought to Zion, the one and only stronghold of the Resistance. Neo himself has discovered his superpowers including super speed, ability to see the codes of the things inside the matrix, and a certain degree of precognition. But a nasty piece of news hits the human resistance: 250,000 machine sentinels are digging to Zion and would reach them in 72 hours. As Zion prepares for the ultimate war, Neo, Morpheus and Trinity are advised by the Oracle to find the Keymaker who would help them reach the Source. Meanwhile Neo's recurrent dreams depicting Trinity's death have got him worried and as if it was not enough, Agent Smith has somehow escaped deletion, has become more powerful than before and has chosen Neo as his next target.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "73%"
      },
      {
        "Source": "Metacritic",
        "Value": "62/100"
      }
    ],
    "Released": "15 May 2003",
    "Response": "True",
    "Runtime": "138 min",
    "Title": "The Matrix Reloaded",
    "Type": "movie",
    "Website": "http://whatisthematrix.warnerbros.com/",
    "Writer": "Lilly Wachowski, Lana Wachowski, Lilly Wachowski (characters), Lana Wachowski (characters)",
    "Year": "2003",
    "imdbID": "tt0234215",
    "imdbRating": "7.2",
    "imdbVotes": "474,589"
  },
  "-LerfYQWGCfhxip5B-4e": {
    "Actors": "Mary Alice, Tanveer K. Atwal, Helmut Bakaitis, Kate Beahan",
    "Awards": "4 wins & 30 nominations.",
    "BoxOffice": "$139,076,032",
    "Country": "USA",
    "DVD": "06 Apr 2004",
    "Director": "Lana Wachowski, Lilly Wachowski",
    "Genre": "Action, Sci-Fi",
    "Language": "English, French",
    "Metascore": "47",
    "Plot": "Neo discovers that somehow he is able to use his powers in the real world too and that his mind can be freed from his body, as a result of which he finds himself trapped on a train station between the Matrix and the Real World. Meanwhile, Zion is preparing for the oncoming war with the machines with very little chances of survival. Neo's associates set out to free him from The Merovingian since it's believed that he is the One who will end the war between humans and the machines. What they do not know is that there is a threat from a third party, someone who has plans to destroy both the worlds.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "36%"
      },
      {
        "Source": "Metacritic",
        "Value": "47/100"
      }
    ],
    "Released": "05 Nov 2003",
    "Response": "True",
    "Runtime": "129 min",
    "Title": "The Matrix Revolutions",
    "Type": "movie",
    "Website": "http://whatisthematrix.warnerbros.com/",
    "Writer": "Lilly Wachowski, Lana Wachowski, Lilly Wachowski (characters), Lana Wachowski (characters)",
    "Year": "2003",
    "imdbID": "tt0242653",
    "imdbRating": "6.7",
    "imdbVotes": "412,420"
  },
  "-Lerfayt_xi-QSi9btJF": {
    "Actors": "Jared Leto, Tadanobu Asano, Kippei Shîna, Shioli Kutsuna",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "09 Mar 2018",
    "Director": "Martin Zandvliet",
    "Genre": "Crime, Drama, Thriller",
    "Language": "English, Japanese",
    "Metascore": "30",
    "Plot": "An epic set in post-WWII Japan and centered on an American former G.I. who joins the yakuza.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjIyYjAzOWItNzI5Yy00NGU4LTlhODktYjZmZThmMTY3ZWNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjIyYjAzOWItNzI5Yy00NGU4LTlhODktYjZmZThmMTY3ZWNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX720.jpg",
    "Production": "Netflix",
    "Rated": "TV-MA",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "17%"
      },
      {
        "Source": "Metacritic",
        "Value": "30/100"
      }
    ],
    "Released": "09 Mar 2018",
    "Response": "True",
    "Runtime": "120 min",
    "Title": "The Outsider",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Andrew Baldwin",
    "Year": "2018",
    "imdbID": "tt2011311",
    "imdbRating": "6.3",
    "imdbVotes": "15,657"
  },
  "-LerfirR5nkPg_mRaumA": {
    "Actors": "Iko Uwais, Joe Taslim, Donny Alamsyah, Yayan Ruhian",
    "Awards": "6 wins & 12 nominations.",
    "BoxOffice": "$1,200,000",
    "Country": "Indonesia, France, USA",
    "DVD": "14 Aug 2012",
    "Director": "Gareth Evans",
    "Genre": "Action, Thriller",
    "Language": "Indonesian",
    "Metascore": "73",
    "Plot": "In Jakarta, Indonesia, Lieutenant Wahyu organizes the invasion of an apartment building that is the safe house of the powerful and cruel drug lord Tama and his gang. The SWAT team breaks in the building but one lookout sees and warns the gangsters and the police force is trapped on the seventh floor. They learn that Lt. Wahyu has not informed his superiors about the operation. Now the police officers have to fight with limited ammunition against the armed and dangerous gangsters.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZGIxODNjM2YtZjA5Mi00MjA5LTk2YjItODE0OWI5NThjNTBmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZGIxODNjM2YtZjA5Mi00MjA5LTk2YjItODE0OWI5NThjNTBmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX720.jpg",
    "Production": "Sony Pictures Classics",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "86%"
      },
      {
        "Source": "Metacritic",
        "Value": "73/100"
      }
    ],
    "Released": "13 Apr 2012",
    "Response": "True",
    "Runtime": "101 min",
    "Title": "The Raid: Redemption",
    "Type": "movie",
    "Website": "http://www.theraidmovie.com",
    "Writer": "Gareth Evans",
    "Year": "2011",
    "imdbID": "tt1899353",
    "imdbRating": "7.6",
    "imdbVotes": "175,155"
  },
  "-Lerfjv1JEVjPvBDu3wf": {
    "Actors": "Iko Uwais, Arifin Putra, Tio Pakusadewo, Oka Antara",
    "Awards": "4 wins & 9 nominations.",
    "BoxOffice": "$2,372,192",
    "Country": "Indonesia, USA",
    "DVD": "08 Jul 2014",
    "Director": "Gareth Evans",
    "Genre": "Action, Crime, Thriller",
    "Language": "Indonesian, Japanese, English",
    "Metascore": "71",
    "Plot": "He thought it was over. After fighting his way out of a building filled with gangsters and madmen - a fight that left the bodies of police and gangsters alike piled in the halls - rookie Jakarta cop Rama thought it was done and he could resume a normal life. He couldn't have been more wrong. Formidable though they may have been, Rama's opponents in that fateful building were nothing more than small fish swimming in a pond much larger than he ever dreamed possible. And his triumph over the small fry has attracted the attention of the predators farther up the food chain. His family at risk, Rama has only one choice to protect his infant son and wife: He must go undercover to enter the criminal underworld himself and climb through the hierarchy of competing forces until it leads him to the corrupt politicians and police pulling the strings at the top of the heap. And so Rama begins a new odyssey of violence, a journey that will force him to set aside his own life and history and take on a new identity as the violent offender \"Yuda.\" In prison he must gain the confidence of Uco - the son of a prominent gang kingpin - to join the gang himself, laying his own life on the line in a desperate all-or-nothing gambit to bring the whole rotten enterprise to an end.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg5MTE2NjA4OV5BMl5BanBnXkFtZTgwMTUyMjczMTE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTg5MTE2NjA4OV5BMl5BanBnXkFtZTgwMTUyMjczMTE@._V1_SX720.jpg",
    "Production": "Sony Pictures Classics",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "80%"
      },
      {
        "Source": "Metacritic",
        "Value": "71/100"
      }
    ],
    "Released": "11 Apr 2014",
    "Response": "True",
    "Runtime": "150 min",
    "Title": "The Raid 2",
    "Type": "movie",
    "Website": "http://www.sonyclassics.com/theraid2/",
    "Writer": "Gareth Evans",
    "Year": "2014",
    "imdbID": "tt2265171",
    "imdbRating": "8.0",
    "imdbVotes": "103,933"
  },
  "-LerfnbB-2DHNMHWo0UE": {
    "Actors": "Ben Affleck, Rebecca Hall, Jon Hamm, Jeremy Renner",
    "Awards": "Nominated for 1 Oscar. Another 9 wins & 45 nominations.",
    "BoxOffice": "$92,173,235",
    "Country": "USA",
    "DVD": "17 Dec 2010",
    "Director": "Ben Affleck",
    "Genre": "Crime, Drama, Thriller",
    "Language": "English",
    "Metascore": "74",
    "Plot": "The Charlestown neighborhood of Boston is renowned for churning out a high number of armed robbers, generation after generation. These robbers never leave their Charlestown life on their own volition, the neighborhood where there is an unwritten code to protect that lifestyle. Such robbers include friends Doug MacRay, James Coughlin, Albert 'Gloansy' Magloan and Desmond Elden. Doug and James in particular treat each other like family, as the Coughlins have realistically been as such to Doug since Doug's mother ran off and Doug's father, Stephen MacRay, was sent to prison. James' single mother sister, the drugged out Krista Coughlin, and Doug have a casual sexual relationship. The foursome carry out a mostly successful bank robbery, but due to circumstances take the bank manager, Claire Keesey, hostage for a short period before releasing her physically unharmed. They find out that Claire lives in Charlestown, so they want to ensure that she did not see anything that could incriminate them if they were to ever run into her. As such, Doug begins a personal relationship with her to find out what she knows and what she's told the police and the FBI, who have taken charge of the investigation. He learns that she has kept some information from the authorities for her own protection but information that could identify James in particular. But Doug slowly falls for her, as she does for him. Ultimately, Doug dreams about leaving his Charlestown life to be with Claire anywhere but there. But Doug has to try and keep his true identity from her, and keep the fact that he is seeing her from his colleagues. But leaving is not as easy as he would like as he and the gang are tasked with a big job by a local gangster named Fergie whether Doug likes it or not. And Adam Frawley, the FBI's lead investigator, comes into evidence that links the foursome to the bank robbery and a subsequent armored car heist, so is on their tail for evidence that will send them away dead or alive.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTcyNzcxODg3Nl5BMl5BanBnXkFtZTcwMTUyNjQ3Mw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTcyNzcxODg3Nl5BMl5BanBnXkFtZTcwMTUyNjQ3Mw@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "93%"
      },
      {
        "Source": "Metacritic",
        "Value": "74/100"
      }
    ],
    "Released": "17 Sep 2010",
    "Response": "True",
    "Runtime": "125 min",
    "Title": "The Town",
    "Type": "movie",
    "Website": "http://www.thetownmovie.com/",
    "Writer": "Peter Craig (screenplay), Ben Affleck (screenplay), Aaron Stockard (screenplay), Chuck Hogan (novel)",
    "Year": "2010",
    "imdbID": "tt0840361",
    "imdbRating": "7.6",
    "imdbVotes": "320,486"
  },
  "-LerfqlEAYcyA3ADm1VI": {
    "Actors": "Miles Teller, Steve Lantz, Gregg Weiner, David Packouz",
    "Awards": "Nominated for 1 Golden Globe. Another 2 nominations.",
    "BoxOffice": "$43,017,433",
    "Country": "USA, Cambodia",
    "DVD": "22 Nov 2016",
    "Director": "Todd Phillips",
    "Genre": "Comedy, Crime, Drama, War",
    "Language": "English, Arabic, Albanian, Romanian",
    "Metascore": "57",
    "Plot": "Two friends in their early 20s (Hill and Teller) living in Miami Beach during the Iraq War exploit a little-known government initiative that allows small businesses to bid on U.S. Military contracts. Starting small, they begin raking in big money and are living the high life. But the pair gets in over their heads when they land a 300 million dollar deal to arm the Afghan Military - a deal that puts them in business with some very shady people, not the least of which turns out to be the U.S. Government. Based on true events.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjEyNzQ0NzM4MV5BMl5BanBnXkFtZTgwMDI0ODM2OTE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjEyNzQ0NzM4MV5BMl5BanBnXkFtZTgwMDI0ODM2OTE@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "60%"
      },
      {
        "Source": "Metacritic",
        "Value": "57/100"
      }
    ],
    "Released": "19 Aug 2016",
    "Response": "True",
    "Runtime": "114 min",
    "Title": "War Dogs",
    "Type": "movie",
    "Website": "http://www.wardogsthemovie.com/",
    "Writer": "Stephen Chin (screenplay), Todd Phillips (screenplay), Jason Smilovic (screenplay), Guy Lawson (Rolling Stone article \"Arms and the Dudes\")",
    "Year": "2016",
    "imdbID": "tt2005151",
    "imdbRating": "7.1",
    "imdbVotes": "152,228"
  },
  "-LerftloqllIrX7HywP2": {
    "Actors": "Gal Gadot, Chris Pine, Connie Nielsen, Robin Wright",
    "Awards": "17 wins & 54 nominations.",
    "BoxOffice": "$412,400,625",
    "Country": "USA, China, Hong Kong",
    "DVD": "19 Sep 2017",
    "Director": "Patty Jenkins",
    "Genre": "Action, Adventure, Fantasy, Sci-Fi, War",
    "Language": "English, German, Dutch, French, Spanish, Chinese, Greek,  Ancient (to 1453), North American Indian",
    "Metascore": "76",
    "Plot": "Diana, princess of the Amazons, trained to be an unconquerable warrior. Raised on a sheltered island paradise, when a pilot crashes on their shores and tells of a massive conflict raging in the outside world, Diana leaves her home, convinced she can stop the threat. Fighting alongside man in a war to end all wars, Diana will discover her full powers and her true destiny.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "93%"
      },
      {
        "Source": "Metacritic",
        "Value": "76/100"
      }
    ],
    "Released": "02 Jun 2017",
    "Response": "True",
    "Runtime": "141 min",
    "Title": "Wonder Woman",
    "Type": "movie",
    "Website": "http://wonderwomanfilm.com/",
    "Writer": "Allan Heinberg (screenplay by), Zack Snyder (story by), Allan Heinberg (story by), Jason Fuchs (story by), William Moulton Marston (Wonder Woman created by)",
    "Year": "2017",
    "imdbID": "tt0451279",
    "imdbRating": "7.5",
    "imdbVotes": "477,972"
  },
  "-LerfyCfkF2z7jGLPYwz": {
    "Actors": "Sergey Ulasen, Eric Chien, Eugene Kaspersky, Vitaly Kamluk",
    "Awards": "8 nominations.",
    "BoxOffice": "$70,661",
    "Country": "USA",
    "DVD": "17 Jan 2017",
    "Director": "Alex Gibney",
    "Genre": "Documentary",
    "Language": "English, Persian, German, French, Hebrew, Arabic, Russian",
    "Metascore": "77",
    "Plot": "Documentary detailing claims of American/Israeli jointly developed malware Stuxnet being deployed not only to destroy Iranian enrichment centrifuges but also threaten attacks against Iranian civilian infrastructure. Adresses obvious potential blowback of this possibly being deployed against the US by Iran in retaliation.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTUyODE1NTIzOF5BMl5BanBnXkFtZTgwMjA5NjY5ODE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTUyODE1NTIzOF5BMl5BanBnXkFtZTgwMjA5NjY5ODE@._V1_SX720.jpg",
    "Production": "Jigsaw Productions",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "91%"
      },
      {
        "Source": "Metacritic",
        "Value": "77/100"
      }
    ],
    "Released": "08 Jul 2016",
    "Response": "True",
    "Runtime": "116 min",
    "Title": "Zero Days",
    "Type": "movie",
    "Website": "http://www.zerodaysfilm.com/",
    "Writer": "Alex Gibney",
    "Year": "2016",
    "imdbID": "tt5446858",
    "imdbRating": "7.8",
    "imdbVotes": "7,782"
  },
  "-Lerg0Dc9zsm7CetPiny": {
    "Actors": "Edward Norton, Edward Furlong, Beverly D'Angelo, Jennifer Lien",
    "Awards": "Nominated for 1 Oscar. Another 4 wins & 13 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "06 Apr 1999",
    "Director": "Tony Kaye",
    "Genre": "Crime, Drama",
    "Language": "English",
    "Metascore": "62",
    "Plot": "Derek Vineyard is paroled after serving 3 years in prison for brutally killing two black men who tried to break into/steal his truck. Through his brother, Danny Vineyard's narration, we learn that before going to prison, Derek was a skinhead and the leader of a violent white supremacist gang that committed acts of racial crime throughout L.A. and his actions greatly influenced Danny. Reformed and fresh out of prison, Derek severs contact with the gang and becomes determined to keep Danny from going down the same violent path as he did.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZjA0MTM4MTQtNzY5MC00NzY3LWI1ZTgtYzcxMjkyMzU4MDZiXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZjA0MTM4MTQtNzY5MC00NzY3LWI1ZTgtYzcxMjkyMzU4MDZiXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX720.jpg",
    "Production": "New Line Cinema",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "83%"
      },
      {
        "Source": "Metacritic",
        "Value": "62/100"
      }
    ],
    "Released": "20 Nov 1998",
    "Response": "True",
    "Runtime": "119 min",
    "Title": "American History X",
    "Type": "movie",
    "Website": "https://www.warnerbros.com/american-history-x",
    "Writer": "David McKenna",
    "Year": "1998",
    "imdbID": "tt0120586",
    "imdbRating": "8.5",
    "imdbVotes": "943,670"
  },
  "-Lerg3JycN1bx6H1_C44": {
    "Actors": "Edward Norton, Brad Pitt, Meat Loaf, Zach Grenier",
    "Awards": "Nominated for 1 Oscar. Another 10 wins & 34 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA, Germany",
    "DVD": "06 Jun 2000",
    "Director": "David Fincher",
    "Genre": "Drama",
    "Language": "English",
    "Metascore": "66",
    "Plot": "A nameless first person narrator (Edward Norton) attends support groups in attempt to subdue his emotional state and relieve his insomniac state. When he meets Marla (Helena Bonham Carter), another fake attendee of support groups, his life seems to become a little more bearable. However when he associates himself with Tyler (Brad Pitt) he is dragged into an underground fight club and soap making scheme. Together the two men spiral out of control and engage in competitive rivalry for love and power. When the narrator is exposed to the hidden agenda of Tyler's fight club, he must accept the awful truth that Tyler may not be who he says he is.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjJmYTNkNmItYjYyZC00MGUxLWJhNWMtZDY4Nzc1MDAwMzU5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjJmYTNkNmItYjYyZC00MGUxLWJhNWMtZDY4Nzc1MDAwMzU5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "79%"
      },
      {
        "Source": "Metacritic",
        "Value": "66/100"
      }
    ],
    "Released": "15 Oct 1999",
    "Response": "True",
    "Runtime": "139 min",
    "Title": "Fight Club",
    "Type": "movie",
    "Website": "http://www.foxmovies.com/fightclub/",
    "Writer": "Chuck Palahniuk (novel), Jim Uhls (screenplay)",
    "Year": "1999",
    "imdbID": "tt0137523",
    "imdbRating": "8.8",
    "imdbVotes": "1,665,349"
  },
  "-LergAQhu3CWdQAdtyB6": {
    "Actors": "Leonardo DiCaprio, Tom Hanks, Christopher Walken, Martin Sheen",
    "Awards": "Nominated for 2 Oscars. Another 13 wins & 41 nominations.",
    "BoxOffice": "$164,400,000",
    "Country": "USA, Canada",
    "DVD": "06 May 2003",
    "Director": "Steven Spielberg",
    "Genre": "Biography, Crime, Drama",
    "Language": "English, French",
    "Metascore": "75",
    "Plot": "New Rochelle, the 1960s. High schooler Frank Abagnale Jr. idolizes his father, who's in trouble with the IRS. When his parents separate, Frank runs away to Manhattan with $25 in his checking account, vowing to regain dad's losses and get his parents back together. Just a few years later, the FBI tracks him down in France; he's extradited, tried, and jailed for passing more than $4,000,000 in bad checks. Along the way, he's posed as a Pan Am pilot, a pediatrician, and an attorney. And, from nearly the beginning of this life of crime, he's been pursued by a dour FBI agent, Carl Hanratty. What starts as cat and mouse becomes something akin to father and son.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTY5MzYzNjc5NV5BMl5BanBnXkFtZTYwNTUyNTc2._V1_SX720.jpg",
    "Production": "DreamWorks SKG",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "95%"
      },
      {
        "Source": "Metacritic",
        "Value": "75/100"
      }
    ],
    "Released": "25 Dec 2002",
    "Response": "True",
    "Runtime": "141 min",
    "Title": "Catch Me If You Can",
    "Type": "movie",
    "Website": "http://www.dreamworks.com/catchthem/jump2.html",
    "Writer": "Jeff Nathanson (screenplay), Frank Abagnale Jr. (book), Stan Redding (book)",
    "Year": "2002",
    "imdbID": "tt0264464",
    "imdbRating": "8.1",
    "imdbVotes": "712,101"
  },
  "-LergMQSsNv586pSht6Y": {
    "Actors": "Jim Carrey, Renée Zellweger, Anthony Anderson, Mongo Brownlee",
    "Awards": "2 wins & 4 nominations.",
    "BoxOffice": "$560,525",
    "Country": "USA",
    "DVD": "24 May 2001",
    "Director": "Bobby Farrelly, Peter Farrelly",
    "Genre": "Comedy",
    "Language": "English, German",
    "Metascore": "49",
    "Plot": "Charlie is a Rhode Island state trooper with a multiple personalities. He is otherwise mild-mannered and non confrontational until somebody or something pushes him a little too far. That's when his maniacal alter-ego, Hank, takes over. Charlie is assigned on a routine mission to return alleged fugitive Irene back to upstate New York, but they wind up on the run from corrupt police officers. And their escape would be a lot simpler on everybody involved if Hank didn't keep stepping in at the most inopportune times....",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODMwMDY2YzUtNGFiNS00NDA1LWI4YzMtYzVmM2RlZTk3NGVlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BODMwMDY2YzUtNGFiNS00NDA1LWI4YzMtYzVmM2RlZTk3NGVlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "47%"
      },
      {
        "Source": "Metacritic",
        "Value": "49/100"
      }
    ],
    "Released": "23 Jun 2000",
    "Response": "True",
    "Runtime": "116 min",
    "Title": "Me, Myself & Irene",
    "Type": "movie",
    "Website": "http://www.memyselfandirene.com",
    "Writer": "Peter Farrelly, Mike Cerrone, Bobby Farrelly",
    "Year": "2000",
    "imdbID": "tt0183505",
    "imdbRating": "6.6",
    "imdbVotes": "208,694"
  },
  "-LergU8HelbVDEKiZGhv": {
    "Actors": "Leonardo DiCaprio, Cate Blanchett, Kate Beckinsale, John C. Reilly",
    "Awards": "Won 5 Oscars. Another 81 wins & 130 nominations.",
    "BoxOffice": "$102,563,679",
    "Country": "Germany, USA",
    "DVD": "24 May 2005",
    "Director": "Martin Scorsese",
    "Genre": "Biography, Drama",
    "Language": "English",
    "Metascore": "77",
    "Plot": "Biopic of billionaire Howard Hughes, starting with his early filmmaking years as owner of RKO studios but mostly focusing on his role in designing and promoting new aircraft. Hughes was a risk-taker spending several fortunes on designing experimental aircraft and eventually founding TWA as a rival to Pan AM airlines owned by his great rival Juan Trippe. When Trippe's politico Senator Ralph Owen Brewster accuses Hughes of being a war profiteer, it's Hughes who gains the upper hand. Hughes also had many women in his life including a long relationship with actress Katharine Hepburn. From an early age however, Hughes was also germophobic and would have severe bouts of mental illness.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZTYzMjA2M2EtYmY1OC00ZWMxLThlY2YtZGI3MTQzOWM4YjE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZTYzMjA2M2EtYmY1OC00ZWMxLThlY2YtZGI3MTQzOWM4YjE3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX720.jpg",
    "Production": "Miramax",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "86%"
      },
      {
        "Source": "Metacritic",
        "Value": "77/100"
      }
    ],
    "Released": "25 Dec 2004",
    "Response": "True",
    "Runtime": "170 min",
    "Title": "The Aviator",
    "Type": "movie",
    "Website": "http://www.miramax.com/movie/the-aviator",
    "Writer": "John Logan",
    "Year": "2004",
    "imdbID": "tt0338751",
    "imdbRating": "7.5",
    "imdbVotes": "305,595"
  },
  "-LergYhRd3UrR7h51wYD": {
    "Actors": "Christian Bale, Matthew McConaughey, Izabella Scorupco, Gerard Butler",
    "Awards": "1 win & 3 nominations.",
    "BoxOffice": "$42,929,971",
    "Country": "USA, UK, Ireland",
    "DVD": "19 Nov 2002",
    "Director": "Rob Bowman",
    "Genre": "Action, Adventure, Fantasy, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "39",
    "Plot": "It is twenty years in the future, and the planet has been devastated by vicious fire-breathing dragons. The last vestiges of humanity now struggle for survival at remote outposts. In a ruined castle in the English countryside, Quinn is desperately trying to hold together a band of frightened, restless survivors. As a boy, Quinn watched his mother die protecting him from one of the beasts, and is still haunted by the memory. One day, a group of American rogues shows up, led by a brash, tough-guy named Van Zan. He claims to have discovered a way to kill the dragons once and for all, and enlists Quinn's help. But doing so will force Quinn to confront his own frightening memories. This, and Quinn's responsibilities to those that are under his protection, results in a battle of wills between the two men. In the end, events cause them both to realize that they must work together to defeat the monsters--both without and within.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZTU1ZGE0NmUtZWZjYS00YTI2LTkyMDItNGJlNDM3NjhkMDEwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZTU1ZGE0NmUtZWZjYS00YTI2LTkyMDItNGJlNDM3NjhkMDEwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX720.jpg",
    "Production": "Buena Vista Distribution Compa",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "42%"
      },
      {
        "Source": "Metacritic",
        "Value": "39/100"
      }
    ],
    "Released": "12 Jul 2002",
    "Response": "True",
    "Runtime": "101 min",
    "Title": "Reign of Fire",
    "Type": "movie",
    "Website": "http://bventertainment.go.com/movies/reignoffire/index.html",
    "Writer": "Gregg Chabot (story), Kevin Peterka (story), Gregg Chabot (screenplay), Kevin Peterka (screenplay), Matt Greenberg (screenplay)",
    "Year": "2002",
    "imdbID": "tt0253556",
    "imdbRating": "6.2",
    "imdbVotes": "119,274"
  },
  "-LergaQ8oWff6ZJ7Ymfy": {
    "Actors": "Michael Pitt, Michael Stuhlbarg, Sam Rockwell, Colin Farrell",
    "Awards": "3 wins & 21 nominations.",
    "BoxOffice": "$15,000,000",
    "Country": "UK",
    "DVD": "29 Jan 2013",
    "Director": "Martin McDonagh",
    "Genre": "Comedy, Crime",
    "Language": "English, Vietnamese",
    "Metascore": "66",
    "Plot": "A struggling screenwriter (Colin Farrell) inadvertently becomes entangled in the Los Angeles criminal underworld after his friends (Christopher Walken and Sam Rockwell) kidnap a gangster's (Woody Harrelson) beloved Shih Tzu.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTgwMzUxMjc0M15BMl5BanBnXkFtZTcwMzQ2MjYyOA@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTgwMzUxMjc0M15BMl5BanBnXkFtZTcwMzQ2MjYyOA@@._V1_SX720.jpg",
    "Production": "CBS Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "82%"
      },
      {
        "Source": "Metacritic",
        "Value": "66/100"
      }
    ],
    "Released": "12 Oct 2012",
    "Response": "True",
    "Runtime": "110 min",
    "Title": "Seven Psychopaths",
    "Type": "movie",
    "Website": "http://www.sevenpsychopaths.com/",
    "Writer": "Martin McDonagh",
    "Year": "2012",
    "imdbID": "tt1931533",
    "imdbRating": "7.2",
    "imdbVotes": "222,397"
  },
  "-Lergf-4vqzOUqYlyAs2": {
    "Actors": "Matt Damon, Franka Potente, Chris Cooper, Clive Owen",
    "Awards": "3 wins & 5 nominations.",
    "BoxOffice": "$121,500,000",
    "Country": "USA, Germany, Czech Republic",
    "DVD": "21 Jan 2003",
    "Director": "Doug Liman",
    "Genre": "Action, Mystery, Thriller",
    "Language": "English, French, German, Dutch, Italian",
    "Metascore": "68",
    "Plot": "Based very loosely on Robert Ludlum's novel, the Bourne Identity is the story of a man whose wounded body is discovered by fishermen who nurse him back to health. He can remember nothing and begins to try to rebuild his memory based on clues such as a Swiss bank account, the number of which is implanted in his hip. He soon realizes that he is being hunted and takes off with Marie on a search to find out who he is - and why he is being hunted.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BM2JkNGU0ZGMtZjVjNS00NjgyLWEyOWYtZmRmZGQyN2IxZjA2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BM2JkNGU0ZGMtZjVjNS00NjgyLWEyOWYtZmRmZGQyN2IxZjA2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "83%"
      },
      {
        "Source": "Metacritic",
        "Value": "68/100"
      }
    ],
    "Released": "14 Jun 2002",
    "Response": "True",
    "Runtime": "119 min",
    "Title": "The Bourne Identity",
    "Type": "movie",
    "Website": "http://www.thebourneidentity.com/",
    "Writer": "Tony Gilroy (screenplay), W. Blake Herron (screenplay), Robert Ludlum (novel)",
    "Year": "2002",
    "imdbID": "tt0258463",
    "imdbRating": "7.9",
    "imdbVotes": "472,729"
  },
  "-Lergxbmc1_NF_HEgcrQ": {
    "Actors": "Matt Damon, Franka Potente, Brian Cox, Julia Stiles",
    "Awards": "5 wins & 21 nominations.",
    "BoxOffice": "$176,049,130",
    "Country": "USA, Germany",
    "DVD": "07 Dec 2004",
    "Director": "Paul Greengrass",
    "Genre": "Action, Mystery, Thriller",
    "Language": "English, Russian, German, Italian",
    "Metascore": "73",
    "Plot": "After escaping from the emotional and physical pain he previously encountered. Jason Bourne and his girlfriend Marie begin a new life as far away as possible. But when an assassination attempt on Bourne goes horribly wrong, Bourne must re-enter the life he wanted to leave behind, in order to find out the truth why they are still after him.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYTIyMDFmMmItMWQzYy00MjBiLTg2M2UtM2JiNDRhOWE4NjBhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYTIyMDFmMmItMWQzYy00MjBiLTg2M2UtM2JiNDRhOWE4NjBhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "81%"
      },
      {
        "Source": "Metacritic",
        "Value": "73/100"
      }
    ],
    "Released": "23 Jul 2004",
    "Response": "True",
    "Runtime": "108 min",
    "Title": "The Bourne Supremacy",
    "Type": "movie",
    "Website": "http://www.thebournesupremacy.com/",
    "Writer": "Robert Ludlum (novel), Tony Gilroy (screenplay)",
    "Year": "2004",
    "imdbID": "tt0372183",
    "imdbRating": "7.8",
    "imdbVotes": "404,872"
  },
  "-Lerh546_Vq05U56ju7E": {
    "Actors": "Matt Damon, Julia Stiles, David Strathairn, Scott Glenn",
    "Awards": "Won 3 Oscars. Another 26 wins & 39 nominations.",
    "BoxOffice": "$227,400,000",
    "Country": "USA, Germany, France, Spain",
    "DVD": "11 Dec 2007",
    "Director": "Paul Greengrass",
    "Genre": "Action, Mystery, Thriller",
    "Language": "English, French, Arabic, Russian, Spanish",
    "Metascore": "85",
    "Plot": "Bourne is once again brought out of hiding, this time inadvertently by London-based reporter Simon Ross who is trying to unveil Operation Blackbriar--an upgrade to Project Treadstone--in a series of newspaper columns. Bourne sets up a meeting with Ross and realizes instantly they're being scanned. Information from the reporter stirs a new set of memories, and Bourne must finally, ultimately, uncover his dark past whilst dodging The Company's best efforts in trying to eradicate him.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNGNiNmU2YTMtZmU4OS00MjM0LTlmYWUtMjVlYjAzYjE2N2RjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNGNiNmU2YTMtZmU4OS00MjM0LTlmYWUtMjVlYjAzYjE2N2RjXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "92%"
      },
      {
        "Source": "Metacritic",
        "Value": "85/100"
      }
    ],
    "Released": "03 Aug 2007",
    "Response": "True",
    "Runtime": "115 min",
    "Title": "The Bourne Ultimatum",
    "Type": "movie",
    "Website": "http://www.thebourneultimatum.com/",
    "Writer": "Tony Gilroy (screenplay), Scott Z. Burns (screenplay), George Nolfi (screenplay), Tony Gilroy (screen story), Robert Ludlum (novel)",
    "Year": "2007",
    "imdbID": "tt0440963",
    "imdbRating": "8.0",
    "imdbVotes": "578,003"
  },
  "-Lerh9FK8m8nL3ShY9OD": {
    "Actors": "Leonardo DiCaprio, Jonah Hill, Margot Robbie, Matthew McConaughey",
    "Awards": "Nominated for 5 Oscars. Another 38 wins & 165 nominations.",
    "BoxOffice": "$91,330,760",
    "Country": "USA",
    "DVD": "25 Mar 2014",
    "Director": "Martin Scorsese",
    "Genre": "Biography, Crime, Drama",
    "Language": "English, French",
    "Metascore": "75",
    "Plot": "Jordan Belfort is a Long Island penny stockbroker who served 22 months in prison for defrauding investors in a massive 1990s securities scam that involved widespread corruption on Wall Street and in the corporate banking world, including shoe designer Steve Madden.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_SX720.jpg",
    "Production": "Paramount Studios",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "78%"
      },
      {
        "Source": "Metacritic",
        "Value": "75/100"
      }
    ],
    "Released": "25 Dec 2013",
    "Response": "True",
    "Runtime": "180 min",
    "Title": "The Wolf of Wall Street",
    "Type": "movie",
    "Website": "http://www.thewolfofwallstreet.com/",
    "Writer": "Terence Winter (screenplay), Jordan Belfort (book)",
    "Year": "2013",
    "imdbID": "tt0993846",
    "imdbRating": "8.2",
    "imdbVotes": "1,021,115"
  },
  "-LerhCxXMQb62KuHSsWE": {
    "Actors": "Kate Beckinsale, Scott Speedman, Michael Sheen, Shane Brolly",
    "Awards": "1 win & 9 nominations.",
    "BoxOffice": "$51,483,949",
    "Country": "USA, UK, Germany, Hungary",
    "DVD": "06 Jan 2004",
    "Director": "Len Wiseman",
    "Genre": "Action, Fantasy, Thriller",
    "Language": "English",
    "Metascore": "42",
    "Plot": "A war has been raging between the Vampires and Lycan for centuries, Selene (Beckinsale) is a death dealer, assigned to hunt down and eradicate the last of the Lycan. When she comes across Michael Corvin (Speedman) who holds the key to end the war she must decide where her allegiances will lie.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTk1OTc2ZmUtODU0Yy00NGJiLWJmNmQtODI0MzBjODk3MjI4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTk1OTc2ZmUtODU0Yy00NGJiLWJmNmQtODI0MzBjODk3MjI4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX720.jpg",
    "Production": "Sony Screen Gems",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "31%"
      },
      {
        "Source": "Metacritic",
        "Value": "42/100"
      }
    ],
    "Released": "19 Sep 2003",
    "Response": "True",
    "Runtime": "121 min",
    "Title": "Underworld",
    "Type": "movie",
    "Website": "http://www.sonypictures.com/movies/underworld/",
    "Writer": "Kevin Grevioux (story), Len Wiseman (story), Danny McBride (story), Danny McBride (screenplay)",
    "Year": "2003",
    "imdbID": "tt0320691",
    "imdbRating": "7.0",
    "imdbVotes": "238,583"
  },
  "-LerhEHKDxscYHTmyxgM": {
    "Actors": "Kate Beckinsale, Scott Speedman, Tony Curran, Derek Jacobi",
    "Awards": "2 wins & 6 nominations.",
    "BoxOffice": "$62,318,875",
    "Country": "USA, Canada, Hungary",
    "DVD": "06 Jun 2006",
    "Director": "Len Wiseman",
    "Genre": "Action, Adventure, Fantasy, Sci-Fi, Thriller",
    "Language": "English, French, Hungarian",
    "Metascore": "36",
    "Plot": "Underworld: Evolution continues the saga of war between the vampires and the Lycans. The film goes back to the beginnings of the ancient feud between the two tribes as Selene, the beautiful vampire heroine, and Michael, the lycan hybrid, try to unlock the secrets of their bloodlines. This will be a modern tale of action, intrigue and forbidden love, which takes them into the battle to end all wars as the immortals must finally face their retribution.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjEzNDY1OTQwOV5BMl5BanBnXkFtZTcwNjcxMTIzMw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjEzNDY1OTQwOV5BMl5BanBnXkFtZTcwNjcxMTIzMw@@._V1_SX720.jpg",
    "Production": "Sony/Screen Gems",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "16%"
      },
      {
        "Source": "Metacritic",
        "Value": "36/100"
      }
    ],
    "Released": "20 Jan 2006",
    "Response": "True",
    "Runtime": "106 min",
    "Title": "Underworld: Evolution",
    "Type": "movie",
    "Website": "http://www.sonypictures.com/movies/underworldevolution/",
    "Writer": "Danny McBride (screenplay), Len Wiseman (story), Danny McBride (story), Kevin Grevioux (characters), Len Wiseman (characters), Danny McBride (characters)",
    "Year": "2006",
    "imdbID": "tt0401855",
    "imdbRating": "6.7",
    "imdbVotes": "179,238"
  },
  "-LerhHh_LDYTYTAO64M7": {
    "Actors": "Dennis Quaid, Jake Gyllenhaal, Emmy Rossum, Dash Mihok",
    "Awards": "Won 1 BAFTA Film Award. Another 5 wins & 12 nominations.",
    "BoxOffice": "$186,583,549",
    "Country": "USA",
    "DVD": "12 Oct 2004",
    "Director": "Roland Emmerich",
    "Genre": "Action, Adventure, Sci-Fi, Thriller",
    "Language": "English, Japanese, French, Arabic",
    "Metascore": "47",
    "Plot": "As Paleoclimatologist named Jack Hall is in Antartica, he discovers that a huge ice sheet has sheared off. But what he does not know is that this event will trigger a massive climate shift that will affect the world population. Meanwhile, his son Sam is with friends in New York to attend an event. There they discover that it has been raining non-stop for the past 3 days, and after a series of weather-related disasters begin to occur over the world, everybody realizes the world is entering a new Ice Age and the world population begins trying to evacuate to the warmer climates of the south. Jack makes a daring attempt to rescue his son and his friends who are stuck in New York and who have managed to survive not only a massive wave but also freezing cold temperatures that could possibly kill them.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTU1NTA3NzMwOV5BMl5BanBnXkFtZTcwNzEzMTEzMw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTU1NTA3NzMwOV5BMl5BanBnXkFtZTcwNzEzMTEzMw@@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "44%"
      },
      {
        "Source": "Metacritic",
        "Value": "47/100"
      }
    ],
    "Released": "28 May 2004",
    "Response": "True",
    "Runtime": "124 min",
    "Title": "The Day After Tomorrow",
    "Type": "movie",
    "Website": "http://www.thedayaftertomorrow.com/",
    "Writer": "Roland Emmerich (story), Roland Emmerich (screenplay), Jeffrey Nachmanoff (screenplay)",
    "Year": "2004",
    "imdbID": "tt0319262",
    "imdbRating": "6.4",
    "imdbVotes": "382,920"
  },
  "-LerhNGp6Q3r4q3SRONr": {
    "Actors": "Jake Gyllenhaal, Michelle Monaghan, Vera Farmiga, Jeffrey Wright",
    "Awards": "1 win & 8 nominations.",
    "BoxOffice": "$54,696,902",
    "Country": "USA, Canada",
    "DVD": "26 Jul 2011",
    "Director": "Duncan Jones",
    "Genre": "Action, Drama, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "74",
    "Plot": "Army Captain Colter Stevens finds himself working on a special program where his consciousness can be inserted into another human being. The only catch is can only be there for 8 minutes at any given time. That morning, a bomb exploded on a commuter train just outside Chicago. He occupies the body of teacher going to work on that train and is confused as to what he is doing or why he is there as his last memory is of flying his helicopter on a combat mission in Afghanistan. Those in charge of the program explain to him that there is a bomb on the train, and that he must locate it. More importantly, he must identify the bomber as another bombing is expected later that day. He is also told however that he cannot change the past and can only gather information. As he develops a liking for his traveling companion Christina, he sets out to test that theory.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTY0MTc3MzMzNV5BMl5BanBnXkFtZTcwNDE4MjE0NA@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTY0MTc3MzMzNV5BMl5BanBnXkFtZTcwNDE4MjE0NA@@._V1_SX720.jpg",
    "Production": "Summit Entertainment",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "92%"
      },
      {
        "Source": "Metacritic",
        "Value": "74/100"
      }
    ],
    "Released": "01 Apr 2011",
    "Response": "True",
    "Runtime": "93 min",
    "Title": "Source Code",
    "Type": "movie",
    "Website": "http://www.enterthesourcecode.com/",
    "Writer": "Ben Ripley",
    "Year": "2011",
    "imdbID": "tt0945513",
    "imdbRating": "7.5",
    "imdbVotes": "448,933"
  },
  "-LerhPrAD1HrxLDGOwDz": {
    "Actors": "Sean Faris, Amber Heard, Cam Gigandet, Evan Peters",
    "Awards": "1 win.",
    "BoxOffice": "$24,767,490",
    "Country": "USA",
    "DVD": "29 Jul 2008",
    "Director": "Jeff Wadlow",
    "Genre": "Action, Drama, Sport",
    "Language": "English",
    "Metascore": "39",
    "Plot": "At his new high school, a rebellious teen Jake Tyler is lured into an ultimate underground fighting club in a Backyard Fight, where he finds a mentor in a mixed martial arts veteran. After receiving threats to the safety of his friends and family, Jake seeks the mentoring of a veteran fighter, to train his mind and body for one final no-holds-barred elimination fight with his unrelenting personal nemesis and local martial arts champion Ryan McCarthy.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTkzNDg3MTIyMF5BMl5BanBnXkFtZTcwOTAwNDc1MQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTkzNDg3MTIyMF5BMl5BanBnXkFtZTcwOTAwNDc1MQ@@._V1_SX720.jpg",
    "Production": "Summit Entertainment",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "23%"
      },
      {
        "Source": "Metacritic",
        "Value": "39/100"
      }
    ],
    "Released": "14 Mar 2008",
    "Response": "True",
    "Runtime": "110 min",
    "Title": "Never Back Down",
    "Type": "movie",
    "Website": "http://neverbackdownthemovie.com/",
    "Writer": "Chris Hauty",
    "Year": "2008",
    "imdbID": "tt1023111",
    "imdbRating": "6.6",
    "imdbVotes": "90,398"
  },
  "-LerhSlhwyO0B_mS49FS": {
    "Actors": "Anthony Hopkins, Ryan Gosling, David Strathairn, Rosamund Pike",
    "Awards": "1 win & 2 nominations.",
    "BoxOffice": "$39,000,000",
    "Country": "USA, Germany",
    "DVD": "14 Aug 2007",
    "Director": "Gregory Hoblit",
    "Genre": "Crime, Drama, Mystery, Thriller",
    "Language": "English",
    "Metascore": "68",
    "Plot": "Wealthy, brilliant, and meticulous Ted Crawford, a structural engineer in Los Angeles, shoots his wife and entraps her lover. He signs a confession; at the arraignment, he asserts his rights to represent himself and asks the court to move immediately to trial. The prosecutor is Willy Beachum, a hotshot who's soon to join a fancy civil-law firm, told by everyone it's an open and shut case. Crawford sees Beachum's weakness, the hairline fracture of his character: Willy's a winner. The engineer sets in motion a clockwork crime with all the objects moving in ways he predicts.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzIzNjQyMzkwM15BMl5BanBnXkFtZTcwOTg5ODQ0MQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMzIzNjQyMzkwM15BMl5BanBnXkFtZTcwOTg5ODQ0MQ@@._V1_SX720.jpg",
    "Production": "New Line",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "71%"
      },
      {
        "Source": "Metacritic",
        "Value": "68/100"
      }
    ],
    "Released": "20 Apr 2007",
    "Response": "True",
    "Runtime": "113 min",
    "Title": "Fracture",
    "Type": "movie",
    "Website": "http://www.fracturemovie.com/",
    "Writer": "Daniel Pyne (screenplay), Glenn Gers (screenplay), Daniel Pyne (story)",
    "Year": "2007",
    "imdbID": "tt0488120",
    "imdbRating": "7.2",
    "imdbVotes": "168,415"
  },
  "-LerhVmKyul0yoVpESZo": {
    "Actors": "Will Ferrell, Steve Carell, Paul Rudd, David Koechner",
    "Awards": "1 win & 23 nominations.",
    "BoxOffice": "$76,820,043",
    "Country": "USA",
    "DVD": "01 Apr 2014",
    "Director": "Adam McKay",
    "Genre": "Comedy",
    "Language": "English",
    "Metascore": "61",
    "Plot": "Having left San Diego for New York City, Ron Burgundy is living the high life with his wife Veronica Corningstone and son Walter Burgundy. However, when the boss decides to promote Veronica to full time lead anchor and fire Ron, everything changes. Now heading back to San Diego, Ron is washed up and working part time at Sea World. His shot at redemption though comes in the form of a man named Freddie Schapp, who's an executive producer at the Global News Network, the world's first 24 hour round the clock news channel. He hires Ron, who proceeds to reunite the news team of Champ, Brick, and Brian, and head back to New York City. While there Ron and his news team are given the graveyard shift and a challenge. Ron comes up with a radical new idea to transform the news and that puts him at the top of the game once again. But how long will Ron's newfound fame last? And will Brick finally find true love?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjE5ODk0NjQzNV5BMl5BanBnXkFtZTgwODk4MDA1MDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjE5ODk0NjQzNV5BMl5BanBnXkFtZTgwODk4MDA1MDE@._V1_SX720.jpg",
    "Production": "Paramount Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "74%"
      },
      {
        "Source": "Metacritic",
        "Value": "61/100"
      }
    ],
    "Released": "18 Dec 2013",
    "Response": "True",
    "Runtime": "119 min",
    "Title": "Anchorman 2: The Legend Continues",
    "Type": "movie",
    "Website": "http://www.anchormanmovie.com/",
    "Writer": "Will Ferrell, Adam McKay, Will Ferrell (characters), Adam McKay (characters)",
    "Year": "2013",
    "imdbID": "tt1229340",
    "imdbRating": "6.3",
    "imdbVotes": "154,914"
  },
  "-LerhYTFHcxoxuDTRVaz": {
    "Actors": "Anthony Hopkins, Julianne Moore, Gary Oldman, Ray Liotta",
    "Awards": "8 wins & 17 nominations.",
    "BoxOffice": "$163,877,858",
    "Country": "USA, UK, Italy",
    "DVD": "21 Aug 2001",
    "Director": "Ridley Scott",
    "Genre": "Crime, Drama, Thriller",
    "Language": "English, Italian, Japanese",
    "Metascore": "57",
    "Plot": "The continuing saga of Hannibal Lecter, the murdering cannibal. He is presently in Italy and works as a curator at a museum. Clarice Starling, the FBI agent whom he aided to apprehend a serial killer, was placed in charge of an operation but when one of her men botches it, she's called to the mat by the Bureau. One high ranking official, Paul Krendler has it in for her. But she gets a reprieve because Mason Verger, one of Lecter's victims who is looking to get back at Lecter for what Lecter did to him, wants to use Starling to lure him out. When Lecter sends her a note she learns that he's in Italy so she asks the police to keep an eye out for him. But a corrupt policeman who wants to get the reward that Verger placed on him, tells Verger where he is. But they fail to get him. Later Verger decides to frame Starling which makes Lecter return to the States. And the race to get Lecter begins.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDMxMjhiZmItNWMxMC00NzYyLWJiOTYtNGYwOTAyYjU5OWY4XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZDMxMjhiZmItNWMxMC00NzYyLWJiOTYtNGYwOTAyYjU5OWY4XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX720.jpg",
    "Production": "MGM",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "38%"
      },
      {
        "Source": "Metacritic",
        "Value": "57/100"
      }
    ],
    "Released": "09 Feb 2001",
    "Response": "True",
    "Runtime": "131 min",
    "Title": "Hannibal",
    "Type": "movie",
    "Website": "http://www.mgm.com/hannibal",
    "Writer": "Thomas Harris (novel), David Mamet (screenplay), Steven Zaillian (screenplay)",
    "Year": "2001",
    "imdbID": "tt0212985",
    "imdbRating": "6.8",
    "imdbVotes": "236,278"
  },
  "-LerhrSjbam2VyO0oq3C": {
    "Actors": "Jodie Foster, Lawrence A. Bonney, Kasi Lemmons, Lawrence T. Wrentz",
    "Awards": "Won 5 Oscars. Another 54 wins & 44 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "01 Jul 1998",
    "Director": "Jonathan Demme",
    "Genre": "Crime, Drama, Thriller",
    "Language": "English",
    "Metascore": "85",
    "Plot": "FBI trainee Clarice Starling works hard to advance her career, including trying to hide or put behind her West Virginia roots, of which if some knew would automatically classify her as being backward or white trash. After graduation, she aspires to work in the agency's Behavioral Science Unit under the leadership of Jack Crawford. While she is still a trainee, Crawford does ask her to question Dr. Hannibal Lecter, a psychiatrist imprisoned thus far for eight years in maximum security isolation for being a serial killer, he who cannibalized his victims. Clarice is able to figure out the assignment is to pick Lecter's brains to help them solve another serial murder case, that of someone coined by the media as Buffalo Bill who has so far killed five victims, all located in the eastern US, all young women who are slightly overweight especially around the hips, all who were drowned in natural bodies of water, and all who were stripped of large swaths of skin. She also figures that Crawford chose her as a woman to be able to trigger some emotional response from Lecter. After speaking to Lecter for the first time, she realizes that everything with him will be a psychological game with her having often to read between the very cryptic lines he provides. She has to decide how much she will play along as his request in return for talking to him is to expose herself emotionally to him. The case takes more dire turns when a sixth victim is discovered, this one from who they are able to retrieve a key piece of evidence if Lecter is being forthright as to its meaning. A potential seventh victim is high profile Catherine Martin, the daughter of Senator Ruth Martin, which places greater scrutiny on the case as they search for a hopefully still alive Catherine. Who may factor into what happens is Dr. Frederick Chilton, the warden at the prison, he an opportunist who sees the higher profile with Catherine, meaning a higher profile for himself if he can insert himself successfully into the proceedings.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "Orion Pictures Corporation",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "96%"
      },
      {
        "Source": "Metacritic",
        "Value": "85/100"
      }
    ],
    "Released": "14 Feb 1991",
    "Response": "True",
    "Runtime": "118 min",
    "Title": "The Silence of the Lambs",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Thomas Harris (novel), Ted Tally (screenplay)",
    "Year": "1991",
    "imdbID": "tt0102926",
    "imdbRating": "8.6",
    "imdbVotes": "1,118,305"
  },
  "-LerhuR1PopsN7XHFikN": {
    "Actors": "Malin Akerman, Billy Crudup, Matthew Goode, Jackie Earle Haley",
    "Awards": "11 wins & 22 nominations.",
    "BoxOffice": "$107,453,620",
    "Country": "USA",
    "DVD": "21 Jul 2009",
    "Director": "Zack Snyder",
    "Genre": "Action, Drama, Mystery, Sci-Fi",
    "Language": "English",
    "Metascore": "56",
    "Plot": "In a gritty and alternate 1985 the glory days of costumed vigilantes have been brought to a close by a government crackdown, but after one of the masked veterans is brutally murdered an investigation into the killer is initiated. The reunited heroes set out to prevent their own destruction, but in doing so discover a deeper and far more diabolical plot.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BY2IzNGNiODgtOWYzOS00OTI0LTgxZTUtOTA5OTQ5YmI3NGUzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BY2IzNGNiODgtOWYzOS00OTI0LTgxZTUtOTA5OTQ5YmI3NGUzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "64%"
      },
      {
        "Source": "Metacritic",
        "Value": "56/100"
      }
    ],
    "Released": "06 Mar 2009",
    "Response": "True",
    "Runtime": "162 min",
    "Title": "Watchmen",
    "Type": "movie",
    "Website": "http://www.watchmenmovie.com/",
    "Writer": "David Hayter (screenplay), Alex Tse (screenplay), Dave Gibbons (graphic novel illustrator)",
    "Year": "2009",
    "imdbID": "tt0409459",
    "imdbRating": "7.6",
    "imdbVotes": "451,359"
  },
  "-Leri0VXOPBzqYS9fnwM": {
    "Actors": "Ryan Reynolds, Gemma Arterton, Anna Kendrick, Jacki Weaver",
    "Awards": "3 wins & 4 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA, Germany",
    "DVD": "07 Apr 2015",
    "Director": "Marjane Satrapi",
    "Genre": "Comedy, Crime, Horror, Thriller",
    "Language": "English",
    "Metascore": "58",
    "Plot": "Jerry (Ryan Reynolds) is that chipper guy clocking the nine-to-five at a bathtub factory, with the offbeat charm of anyone who could use a few friends. With the help of his court-appointed psychiatrist, he pursues his office crush (Gemma Arterton). However, the relationship takes a sudden, murderous turn after she stands him up for a date. Guided by his evil talking cat and benevolent talking dog, Jerry must decide whether to keep striving for normalcy, or indulge in a much more sinister path.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ2NTkzOTAzMV5BMl5BanBnXkFtZTgwMzc2NTAwNDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTQ2NTkzOTAzMV5BMl5BanBnXkFtZTgwMzc2NTAwNDE@._V1_SX720.jpg",
    "Production": "Lionsgate Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "75%"
      },
      {
        "Source": "Metacritic",
        "Value": "58/100"
      }
    ],
    "Released": "06 Feb 2015",
    "Response": "True",
    "Runtime": "103 min",
    "Title": "The Voices",
    "Type": "movie",
    "Website": "https://www.facebook.com/thevoicesmovie",
    "Writer": "Michael R. Perry",
    "Year": "2014",
    "imdbID": "tt1567437",
    "imdbRating": "6.4",
    "imdbVotes": "47,943"
  },
  "-Leri3utO1RcCyONLq3b": {
    "Actors": "Brie Larson, Woody Harrelson, Naomi Watts, Ella Anderson",
    "Awards": "1 win & 1 nomination.",
    "BoxOffice": "$17,238,739",
    "Country": "USA",
    "DVD": "07 Nov 2017",
    "Director": "Destin Daniel Cretton",
    "Genre": "Biography, Drama",
    "Language": "English",
    "Metascore": "56",
    "Plot": "A young girl is raised in a dysfunctional family constantly on the run from the FBI. Living in poverty, she comes of age guided by her drunkard, ingenious father who distracts her with magical stories to keep her mind off the family's dire state, and her selfish, nonconformist mother who has no intention of raising a family, along with her younger brother and sister, and her other older sister. Together, they fend for each other as they mature in an unorthodox journey that is their family life",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTY2Nzk0MDE3Nl5BMl5BanBnXkFtZTgwOTI0ODc0MjI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTY2Nzk0MDE3Nl5BMl5BanBnXkFtZTgwOTI0ODc0MjI@._V1_SX720.jpg",
    "Production": "Lionsgate",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "51%"
      },
      {
        "Source": "Metacritic",
        "Value": "56/100"
      }
    ],
    "Released": "11 Aug 2017",
    "Response": "True",
    "Runtime": "127 min",
    "Title": "The Glass Castle",
    "Type": "movie",
    "Website": "http://www.TheGlassCastle.movie",
    "Writer": "Destin Daniel Cretton (screenplay by), Andrew Lanham (screenplay by), Jeannette Walls (based upon the book by)",
    "Year": "2017",
    "imdbID": "tt2378507",
    "imdbRating": "7.2",
    "imdbVotes": "22,976"
  },
  "-Leri6oCle5fIX0gFn6M": {
    "Actors": "Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels",
    "Awards": "Nominated for 7 Oscars. Another 37 wins & 185 nominations.",
    "BoxOffice": "$202,313,768",
    "Country": "UK, USA",
    "DVD": "12 Jan 2016",
    "Director": "Ridley Scott",
    "Genre": "Adventure, Drama, Sci-Fi",
    "Language": "English, Mandarin",
    "Metascore": "80",
    "Plot": "During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive. Millions of miles away, NASA and a team of international scientists work tirelessly to bring \"the Martian\" home, while his crewmates concurrently plot a daring, if not impossible, rescue mission. As these stories of incredible bravery unfold, the world comes together to root for Watney's safe return.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "91%"
      },
      {
        "Source": "Metacritic",
        "Value": "80/100"
      }
    ],
    "Released": "02 Oct 2015",
    "Response": "True",
    "Runtime": "144 min",
    "Title": "The Martian",
    "Type": "movie",
    "Website": "http://TheMartianMovie.com",
    "Writer": "Drew Goddard (screenplay by), Andy Weir (based on the novel by)",
    "Year": "2015",
    "imdbID": "tt3659388",
    "imdbRating": "8.0",
    "imdbVotes": "674,891"
  },
  "-LeriC1RZwH0EVprimBu": {
    "Actors": "Tom Hanks, David Morse, Bonnie Hunt, Michael Clarke Duncan",
    "Awards": "Nominated for 4 Oscars. Another 15 wins & 32 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "13 Jun 2000",
    "Director": "Frank Darabont",
    "Genre": "Crime, Drama, Fantasy, Mystery",
    "Language": "English, French",
    "Metascore": "61",
    "Plot": "Death Row guards at a penitentiary, in the 1930's, have a moral dilemma with their job when they discover one of their prisoners, a convicted murderer, has a special gift.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "79%"
      },
      {
        "Source": "Metacritic",
        "Value": "61/100"
      }
    ],
    "Released": "10 Dec 1999",
    "Response": "True",
    "Runtime": "189 min",
    "Title": "The Green Mile",
    "Type": "movie",
    "Website": "http://www.thegreenmile.com",
    "Writer": "Stephen King (novel), Frank Darabont (screenplay)",
    "Year": "1999",
    "imdbID": "tt0120689",
    "imdbRating": "8.6",
    "imdbVotes": "1,007,794"
  },
  "-LeriFb68yHYo0QS36TU": {
    "Actors": "Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans",
    "Awards": "N/A",
    "BoxOffice": "$664,987,816",
    "Country": "USA",
    "DVD": "14 Aug 2018",
    "Director": "Anthony Russo, Joe Russo",
    "Genre": "Action, Adventure, Sci-Fi",
    "Language": "English",
    "Metascore": "68",
    "Plot": "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX720.jpg",
    "Production": "Walt Disney Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "85%"
      },
      {
        "Source": "Metacritic",
        "Value": "68/100"
      }
    ],
    "Released": "27 Apr 2018",
    "Response": "True",
    "Runtime": "149 min",
    "Title": "Avengers: Infinity War",
    "Type": "movie",
    "Website": "http://marvel.com/movies/movie/223/avengers_infinity_war",
    "Writer": "Christopher Markus (screenplay by), Stephen McFeely (screenplay by), Stan Lee (based on the Marvel comics by), Jack Kirby (based on the Marvel comics by), Joe Simon (Captain America created by), Jack Kirby (Captain America created by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Jim Starlin (Thanos,  Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Steve Englehart (Mantis created by), Don Heck (Mantis created by)",
    "Year": "2018",
    "imdbID": "tt4154756",
    "imdbRating": "8.5",
    "imdbVotes": "641,255"
  },
  "-LeriIGkE2kpvC7WOR4Y": {
    "Actors": "Ben Affleck, Anna Kendrick, J.K. Simmons, Jon Bernthal",
    "Awards": "3 wins & 5 nominations.",
    "BoxOffice": "$86,198,014",
    "Country": "USA",
    "DVD": "10 Jan 2017",
    "Director": "Gavin O'Connor",
    "Genre": "Action, Crime, Drama, Thriller",
    "Language": "English, Indonesian, French",
    "Metascore": "51",
    "Plot": "Christian Wolff is a math savant with more affinity for numbers than people. Behind the cover of a small-town CPA office, he works as a freelance accountant for some of the world's most dangerous criminal organizations. With the Treasury Department's Crime Enforcement Division, run by Ray King, starting to close in, Christian takes on a legitimate client: a state-of-the-art robotics company where an accounting clerk has discovered a discrepancy involving millions of dollars. But as Christian uncooks the books and gets closer to the truth, it is the body count that starts to rise.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjFmN2UwYWEtMmNiNi00YTU5LThiM2YtMmU4YzYzYTA3YWFjXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNjFmN2UwYWEtMmNiNi00YTU5LThiM2YtMmU4YzYzYTA3YWFjXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "51%"
      },
      {
        "Source": "Metacritic",
        "Value": "51/100"
      }
    ],
    "Released": "14 Oct 2016",
    "Response": "True",
    "Runtime": "128 min",
    "Title": "The Accountant",
    "Type": "movie",
    "Website": "http://www.accountantmovie.com/",
    "Writer": "Bill Dubuque",
    "Year": "2016",
    "imdbID": "tt2140479",
    "imdbRating": "7.3",
    "imdbVotes": "231,503"
  },
  "-LeriLC6zaPQpciULuYL": {
    "Actors": "Adam Baldwin, Anne Heche, James Marsters, John DiMaggio",
    "Awards": "1 win.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "18 Sep 2007",
    "Director": "Lauren Montgomery, Bruce Timm, Brandon Vietti",
    "Genre": "Animation, Action, Adventure, Drama, Sci-Fi",
    "Language": "English, Spanish",
    "Metascore": "N/A",
    "Plot": "When LexCorps accidentally unleash a murderous creature, Doomsday, Superman meets his greatest challenge as a champion. Based on the \"The Death of Superman\" storyline that appeared in DC Comics' publications in the 1990s.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZjU4MzIyZWUtNWQ4Yy00YTU4LTk5NjUtNDBiNDkxZTVlZDgwXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZjU4MzIyZWUtNWQ4Yy00YTU4LTk5NjUtNDBiNDkxZTVlZDgwXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX720.jpg",
    "Production": "Warner Home Video",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "57%"
      }
    ],
    "Released": "18 Sep 2007",
    "Response": "True",
    "Runtime": "75 min",
    "Title": "Superman/Doomsday",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Jerry Siegel (character created by: Superman), Joe Shuster (character created by: Superman), Duane Capizzi (story), Bruce Timm (story), Duane Capizzi (screenplay), Dan Jurgens (character created by: Doomsday), Jerry Ordway (character created by: Doomsday), Roger Stern (character created by: Doomsday), Louise Simonson (character created by: Doomsday), Brett Breeding (character created by: Doomsday)",
    "Year": "2007",
    "imdbID": "tt0934706",
    "imdbRating": "7.0",
    "imdbVotes": "18,311"
  },
  "-LeriOLycRBTpzCr2Xwk": {
    "Actors": "Emily Blunt, Benicio Del Toro, Josh Brolin, Victor Garber",
    "Awards": "Nominated for 3 Oscars. Another 15 wins & 150 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA, Mexico",
    "DVD": "05 Jan 2016",
    "Director": "Denis Villeneuve",
    "Genre": "Action, Crime, Drama, Mystery, Thriller",
    "Language": "English, Spanish",
    "Metascore": "82",
    "Plot": "When drug violence worsens on the USA Mexico border, the FBI sends an idealistic agent, Kate Macer (Emily Blunt) on a mission to eradicate a drug cartel responsible for a bomb that had killed members of her team.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5NjM3NTk1M15BMl5BanBnXkFtZTgwMzg1MzU2NjE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjA5NjM3NTk1M15BMl5BanBnXkFtZTgwMzg1MzU2NjE@._V1_SX720.jpg",
    "Production": "Lionsgate",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "92%"
      },
      {
        "Source": "Metacritic",
        "Value": "82/100"
      }
    ],
    "Released": "02 Oct 2015",
    "Response": "True",
    "Runtime": "121 min",
    "Title": "Sicario",
    "Type": "movie",
    "Website": "https://www.facebook.com/SicarioMovie",
    "Writer": "Taylor Sheridan",
    "Year": "2015",
    "imdbID": "tt3397884",
    "imdbRating": "7.6",
    "imdbVotes": "324,266"
  },
  "-LeriSyN1BF_JyC53LoL": {
    "Actors": "Benicio Del Toro, Josh Brolin, Isabela Moner, Jeffrey Donovan",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "18 Sep 2018",
    "Director": "Stefano Sollima",
    "Genre": "Action, Crime, Drama, Thriller",
    "Language": "English, Spanish, American Sign Language, Arabic, Somali",
    "Metascore": "61",
    "Plot": "The drug war on the U.S.-Mexico border has escalated as the cartels have begun trafficking terrorists across the US border. To fight the war, federal agent Matt Graver re-teams with the mercurial Alejandro.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjgyOWRhMDctZTZlNC00M2I1LWI0NDQtYzlmODdmYjY2MThiXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjgyOWRhMDctZTZlNC00M2I1LWI0NDQtYzlmODdmYjY2MThiXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SX720.jpg",
    "Production": "Columbia Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "63%"
      },
      {
        "Source": "Metacritic",
        "Value": "61/100"
      }
    ],
    "Released": "29 Jun 2018",
    "Response": "True",
    "Runtime": "122 min",
    "Title": "Sicario: Day of the Soldado",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Taylor Sheridan",
    "Year": "2018",
    "imdbID": "tt5052474",
    "imdbRating": "7.1",
    "imdbVotes": "89,435"
  },
  "-LeriVf-raVFtPrArSBy": {
    "Actors": "Min-sik Choi, Ji-tae Yu, Hye-jeong Kang, Dae-han Ji",
    "Awards": "38 wins & 18 nominations.",
    "BoxOffice": "$637,778",
    "Country": "South Korea",
    "DVD": "23 Aug 2005",
    "Director": "Chan-wook Park",
    "Genre": "Action, Drama, Mystery, Thriller",
    "Language": "Korean",
    "Metascore": "74",
    "Plot": "An average man is kidnapped and imprisoned in a shabby cell for 15 years without explanation. He then is released, equipped with money, a cellphone and expensive clothes. As he strives to explain his imprisonment and get his revenge, Oh Dae-Su soon finds out that his kidnapper has a greater plan for him and is set onto a path of pain and suffering in an attempt to uncover the motive of his mysterious tormentor.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX720.jpg",
    "Production": "Tartan Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "80%"
      },
      {
        "Source": "Metacritic",
        "Value": "74/100"
      }
    ],
    "Released": "21 Nov 2003",
    "Response": "True",
    "Runtime": "120 min",
    "Title": "Oldboy",
    "Type": "movie",
    "Website": "http://oldboy.film.ru/",
    "Writer": "Garon Tsuchiya (story), Nobuaki Minegishi (comic), Chan-wook Park (character created by: Oldboy,  Vengeance Trilogy), Chan-wook Park (screenplay), Joon-hyung Lim (screenplay), Jo-yun Hwang (screenplay)",
    "Year": "2003",
    "imdbID": "tt0364569",
    "imdbRating": "8.4",
    "imdbVotes": "453,067"
  },
  "-LeriY_wLboUp5VYAYp8": {
    "Actors": "Henry Cavill, Armie Hammer, Alicia Vikander, Elizabeth Debicki",
    "Awards": "7 wins & 5 nominations.",
    "BoxOffice": "$38,140,180",
    "Country": "USA, UK",
    "DVD": "17 Nov 2015",
    "Director": "Guy Ritchie",
    "Genre": "Action, Adventure, Comedy",
    "Language": "English, Russian, German, Italian",
    "Metascore": "56",
    "Plot": "In the 1960s with the Cold War in play, CIA agent Napoleon Solo successfully helps Gaby Teller defect to West Germany despite the intimidating opposition of KGB agent Illya Kuryakin. Later, all three unexpectedly find themselves working together in a joint mission to stop a private criminal organization from using Gaby's father's scientific expertise to construct their own nuclear bomb. Through clenched teeth and stylish poise, all three must find a way to cooperate for the sake of world peace, even as they each pursue their own agendas.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTZmMWFhYmQtZDE5YS00YzBlLWJlOGEtYzAwNGU1YzVlYjZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BOTZmMWFhYmQtZDE5YS00YzBlLWJlOGEtYzAwNGU1YzVlYjZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "67%"
      },
      {
        "Source": "Metacritic",
        "Value": "56/100"
      }
    ],
    "Released": "14 Aug 2015",
    "Response": "True",
    "Runtime": "116 min",
    "Title": "The Man from U.N.C.L.E.",
    "Type": "movie",
    "Website": "http://www.manfromuncle.com/",
    "Writer": "Guy Ritchie (screenplay by), Lionel Wigram (screenplay by), Jeff Kleeman (story by), David C. Wilson (story by), Guy Ritchie (story by), Lionel Wigram (story by), Sam Rolfe (based on the television series created by)",
    "Year": "2015",
    "imdbID": "tt1638355",
    "imdbRating": "7.3",
    "imdbVotes": "239,191"
  },
  "-LeriafyODA4c_86B_zo": {
    "Actors": "Tom Hardy, Charlize Theron, Nicholas Hoult, Hugh Keays-Byrne",
    "Awards": "Won 6 Oscars. Another 232 wins & 219 nominations.",
    "BoxOffice": "$129,483,877",
    "Country": "Australia, USA",
    "DVD": "01 Sep 2015",
    "Director": "George Miller",
    "Genre": "Action, Adventure, Sci-Fi, Thriller",
    "Language": "English, Russian",
    "Metascore": "90",
    "Plot": "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and almost everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order. There's Max, a man of action and a man of few words, who seeks peace of mind following the loss of his wife and child in the aftermath of the chaos. And Furiosa, a woman of action and a woman who believes her path to survival may be achieved if she can make it across the desert back to her childhood homeland.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX720.jpg",
    "Production": "Warner Bros.",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "97%"
      },
      {
        "Source": "Metacritic",
        "Value": "90/100"
      }
    ],
    "Released": "15 May 2015",
    "Response": "True",
    "Runtime": "120 min",
    "Title": "Mad Max: Fury Road",
    "Type": "movie",
    "Website": "http://www.madmaxmovie.com/",
    "Writer": "George Miller, Brendan McCarthy, Nick Lathouris",
    "Year": "2015",
    "imdbID": "tt1392190",
    "imdbRating": "8.1",
    "imdbVotes": "774,301"
  },
  "-LeridTlaS39jJWG94se": {
    "Actors": "Jean Reno, Gary Oldman, Natalie Portman, Danny Aiello",
    "Awards": "5 wins & 11 nominations.",
    "BoxOffice": "N/A",
    "Country": "France",
    "DVD": "15 Aug 2000",
    "Director": "Luc Besson",
    "Genre": "Action, Crime, Drama, Thriller",
    "Language": "English, Italian, French",
    "Metascore": "64",
    "Plot": "After her father, mother, older sister and little brother are killed by her father's employers, the 12-year-old daughter of an abject drug dealer is forced to take refuge in the apartment of a professional hitman who at her request teaches her the methods of his job so she can take her revenge on the corrupt DEA agent who ruined her life by killing her beloved brother.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDAwYTlhMDEtNTg0OS00NDY2LWJjOWItNWY3YTZkM2UxYzUzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZDAwYTlhMDEtNTg0OS00NDY2LWJjOWItNWY3YTZkM2UxYzUzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX720.jpg",
    "Production": "Columbia Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "72%"
      },
      {
        "Source": "Metacritic",
        "Value": "64/100"
      }
    ],
    "Released": "18 Nov 1994",
    "Response": "True",
    "Runtime": "110 min",
    "Title": "Léon: The Professional",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Luc Besson",
    "Year": "1994",
    "imdbID": "tt0110413",
    "imdbRating": "8.6",
    "imdbVotes": "918,609"
  },
  "-LeriflJP47cEHIiR7ke": {
    "Actors": "Sean Astin, Zach Callison, Christopher Gorham, Justin Kirk",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "04 Feb 2014",
    "Director": "Jay Oliva",
    "Genre": "Animation, Action, Adventure, Fantasy, Sci-Fi",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "The world's finest heroes found the Justice League in order to stop an alien invasion of Earth.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzc2ZTdjZTgtODgwMy00YmUwLWE3OWUtZTU4MjAzZTc3MTMyXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNzc2ZTdjZTgtODgwMy00YmUwLWE3OWUtZTU4MjAzZTc3MTMyXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX720.jpg",
    "Production": "Warner Home Video",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "50%"
      }
    ],
    "Released": "04 Feb 2014",
    "Response": "True",
    "Runtime": "79 min",
    "Title": "Justice League: War",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Heath Corson, Geoff Johns (comic book: \"Justice League: Origin\"), Jim Lee (comic book: \"Justice League: Origin\"), Jerry Siegel (character created by: Superman), Joe Shuster (character created by: Superman), Bob Kane (character created by: Batman), William Moulton Marston (character created by: Wonder Woman), Marv Wolfman (character created by: Cyborg), George Pérez (character created by: Cyborg), Jack Kirby (characters created by: Darkseid,  Desaad & Parademons)",
    "Year": "2014",
    "imdbID": "tt3060952",
    "imdbRating": "7.3",
    "imdbVotes": "26,221"
  },
  "-Lerit0fJbcWg443Dcj0": {
    "Actors": "Gerard Butler, Pablo Schreiber, O'Shea Jackson Jr., 50 Cent",
    "Awards": "N/A",
    "BoxOffice": "$44,680,327",
    "Country": "USA",
    "DVD": "24 Apr 2018",
    "Director": "Christian Gudegast",
    "Genre": "Action, Crime, Drama, Mystery, Thriller",
    "Language": "English, Polynesian",
    "Metascore": "49",
    "Plot": "A gritty crime saga which follows the lives of an elite unit of the LA County Sheriff's Dept. and the state's most successful bank robbery crew as the outlaws plan a seemingly impossible heist on the Federal Reserve Bank.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzYyODcwMDAyM15BMl5BanBnXkFtZTgwOTA4MjIwNDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMzYyODcwMDAyM15BMl5BanBnXkFtZTgwOTA4MjIwNDI@._V1_SX720.jpg",
    "Production": "STX Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "41%"
      },
      {
        "Source": "Metacritic",
        "Value": "49/100"
      }
    ],
    "Released": "19 Jan 2018",
    "Response": "True",
    "Runtime": "140 min",
    "Title": "Den of Thieves",
    "Type": "movie",
    "Website": "http://denofthieves.movie/",
    "Writer": "Christian Gudegast (screenplay by), Christian Gudegast (story by), Paul Scheuring (story by)",
    "Year": "2018",
    "imdbID": "tt1259528",
    "imdbRating": "7.0",
    "imdbVotes": "67,357"
  },
  "-LeriyQFGDAu_Hr1IKLs": {
    "Actors": "Scott Adsit, Ryan Potter, Daniel Henney, T.J. Miller",
    "Awards": "Won 1 Oscar. Another 16 wins & 57 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "24 Feb 2015",
    "Director": "Don Hall, Chris Williams",
    "Genre": "Animation, Action, Adventure, Comedy, Drama, Family, Sci-Fi",
    "Language": "English",
    "Metascore": "74",
    "Plot": "When a devastating event befalls the city of San Fransokyo and catapults Hiro into the midst of danger, he turns to Baymax and his close friends adrenaline junkie Go Go Tomago, neatnik Wasabi, chemistry whiz Honey Lemon and fanboy Fred. Determined to uncover the mystery, Hiro transforms his friends into a band of high-tech heroes called \"Big Hero 6.\"",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDliOTIzNmUtOTllOC00NDU3LWFiNjYtMGM0NDc1YTMxNjYxXkEyXkFqcGdeQXVyNTM3NzExMDQ@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMDliOTIzNmUtOTllOC00NDU3LWFiNjYtMGM0NDc1YTMxNjYxXkEyXkFqcGdeQXVyNTM3NzExMDQ@._V1_SX720.jpg",
    "Production": "Walt Disney Pictures",
    "Rated": "PG",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "89%"
      },
      {
        "Source": "Metacritic",
        "Value": "74/100"
      }
    ],
    "Released": "07 Nov 2014",
    "Response": "True",
    "Runtime": "102 min",
    "Title": "Big Hero 6",
    "Type": "movie",
    "Website": "http://www.disney.com/BigHero6",
    "Writer": "Jordan Roberts (screenplay by), Robert L. Baird (screenplay by), Daniel Gerson (screenplay by), Man of Action (Big Hero 6 team and characters created by), Steven T. Seagle (characters), Duncan Rouleau (characters)",
    "Year": "2014",
    "imdbID": "tt2245084",
    "imdbRating": "7.8",
    "imdbVotes": "366,376"
  },
  "-Lerj-WzEx6PorjMY4vd": {
    "Actors": "Amy Adams, Jeremy Renner, Forest Whitaker, Michael Stuhlbarg",
    "Awards": "Won 1 Oscar. Another 64 wins & 251 nominations.",
    "BoxOffice": "$100,501,349",
    "Country": "USA",
    "DVD": "14 Feb 2017",
    "Director": "Denis Villeneuve",
    "Genre": "Drama, Mystery, Sci-Fi, Thriller",
    "Language": "English, Russian, Mandarin",
    "Metascore": "81",
    "Plot": "Linguistics professor Louise Banks leads an elite team of investigators when gigantic spaceships touchdown in 12 locations around the world. As nations teeter on the verge of global war, Banks and her crew must race against time to find a way to communicate with the extraterrestrial visitors. Hoping to unravel the mystery, she takes a chance that could threaten her life and quite possibly all of mankind.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX720.jpg",
    "Production": "21 Laps Entertainment",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "94%"
      },
      {
        "Source": "Metacritic",
        "Value": "81/100"
      }
    ],
    "Released": "11 Nov 2016",
    "Response": "True",
    "Runtime": "116 min",
    "Title": "Arrival",
    "Type": "movie",
    "Website": "http://www.arrivalmovie.com/",
    "Writer": "Eric Heisserer (screenplay by), Ted Chiang (based on the story \"Story of Your Life\" written by)",
    "Year": "2016",
    "imdbID": "tt2543164",
    "imdbRating": "7.9",
    "imdbVotes": "507,786"
  },
  "-Lerj2CShFoiIUfs1IyX": {
    "Actors": "Jerry O'Connell, Rebecca Romijn, Rainn Wilson, Rosario Dawson",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "02 Oct 2018",
    "Director": "Jake Castorena, Sam Liu",
    "Genre": "Animation, Action, Sci-Fi",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "Superman battles against an insurmountable foe named Doomsday.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNWZkMjYzNjctYTMyZi00MjdjLTg5MzMtYjdhM2M0MTI5ZWFkXkEyXkFqcGdeQXVyNTc4MjczMTM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNWZkMjYzNjctYTMyZi00MjdjLTg5MzMtYjdhM2M0MTI5ZWFkXkEyXkFqcGdeQXVyNTc4MjczMTM@._V1_SX720.jpg",
    "Production": "N/A",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "92%"
      }
    ],
    "Released": "24 Jul 2018",
    "Response": "True",
    "Runtime": "81 min",
    "Title": "The Death of Superman",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Peter Tomasi, Jerry Siegel (character created by: Superman), Joe Shuster (character created by: Superman), Paul Norris (character created by: Aquaman), Bob Kane (character created by: Batman), Bill Finger (character created by: Batman), Marv Wolfman (characters created by: Bibbo Bibbowski and Cat Grant), Jerry Ordway (characters created by: Bibbo Bibbowski and Cat Grant), Marv Wolfman (characters created by: Cyborg and Silas Stone), George Pérez (characters created by: Cyborg and Silas Stone), Brett Breeding (character created by: Doomsday), Jerry Ordway (character created by: Doomsday), Louise Simonson (character created by: Doomsday), Roger Stern (character created by: Doomsday), Dan Jurgens (character created by: Doomsday), Jack Kirby (characters created by: Fourth World), Louise Simonson (character created by: John Henry Irons), Jon Bogdanove (character created by: John Henry Irons), Dan Jurgens (character created by: Hank Henshaw), John Byrne (character created by: Maggie Sawyer), Joe Samachson (character created by: Martian Manhunter), Joe Certa (character created by: Martian Manhunter), William Moulton Marston (character created by: Wonder Woman)",
    "Year": "2018",
    "imdbID": "tt7167658",
    "imdbRating": "7.4",
    "imdbVotes": "8,446"
  },
  "-LerjE6w4jnjeC0NiD2T": {
    "Actors": "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
    "Awards": "Nominated for 1 Oscar. Another 14 wins & 72 nominations.",
    "BoxOffice": "$204,100,000",
    "Country": "USA, UK",
    "DVD": "18 Oct 2005",
    "Director": "Christopher Nolan",
    "Genre": "Action, Adventure",
    "Language": "English, Urdu, Mandarin",
    "Metascore": "70",
    "Plot": "When his parents are killed, billionaire playboy Bruce Wayne relocates to Asia where he is mentored by Henri Ducard and Ra's Al Ghul in how to fight evil. When learning about the plan to wipe out evil in Gotham City by Ducard, Bruce prevents this plan from getting any further and heads back to his home. Back in his original surroundings, Bruce adopts the image of a bat to strike fear into the criminals and the corrupt as the icon known as 'Batman'. But it doesn't stay quiet for long.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "84%"
      },
      {
        "Source": "Metacritic",
        "Value": "70/100"
      }
    ],
    "Released": "15 Jun 2005",
    "Response": "True",
    "Runtime": "140 min",
    "Title": "Batman Begins",
    "Type": "movie",
    "Website": "https://www.warnerbros.com/batman-begins",
    "Writer": "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
    "Year": "2005",
    "imdbID": "tt0372784",
    "imdbRating": "8.2",
    "imdbVotes": "1,186,021"
  },
  "-LerjH1-SZxwa5NbKH-r": {
    "Actors": "Peter Weller, Ariel Winter, David Selby, Wade Williams",
    "Awards": "5 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "25 Sep 2012",
    "Director": "Jay Oliva",
    "Genre": "Animation, Action, Adventure, Crime, Drama, Horror, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "Batman has not been seen for ten years. A new breed of criminal ravages Gotham City, forcing 55-year-old Bruce Wayne back into the cape and cowl. But, does he still have what it takes to fight crime in a new era?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX720.jpg",
    "Production": "WARNER BROTHERS PICTURES",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "100%"
      }
    ],
    "Released": "25 Sep 2012",
    "Response": "True",
    "Runtime": "76 min",
    "Title": "Batman: The Dark Knight Returns, Part 1",
    "Type": "movie",
    "Website": "https://www.facebook.com/BatmanTheDarkKnightReturns",
    "Writer": "Bob Kane (character created by: Batman), Frank Miller (comic book), Klaus Janson (comic book), Bob Goodman",
    "Year": "2012",
    "imdbID": "tt2313197",
    "imdbRating": "8.0",
    "imdbVotes": "46,797"
  },
  "-LerjLkyMxDwU0uRhlij": {
    "Actors": "Peter Weller, Ariel Winter, Michael Emerson, David Selby",
    "Awards": "1 win & 1 nomination.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "29 Jan 2013",
    "Director": "Jay Oliva",
    "Genre": "Animation, Action, Adventure, Crime, Drama, Horror, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "After a 10 year absence, the Dark Knight has returned to Gotham to fight the Mutant threat. After defeating the mutants, he has taken control of a gang loyal to him in order to make Gotham a safer place. But, the Joker has decided to stop this, and fights against Batman in a deadly duel. Meanwhile, the Man of Steel is ordered to stop the Dark Knight because the government believes that his ways are wrong. As Batman fights the Joker, the Man of Steel prepares for his greatest fight.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZDYtYWNmYi00ZWM4LWJjOTUtYTE0ZmQyYWM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZDYtYWNmYi00ZWM4LWJjOTUtYTE0ZmQyYWM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX720.jpg",
    "Production": "Warner Bros.",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.4/10"
      }
    ],
    "Released": "29 Jan 2013",
    "Response": "True",
    "Runtime": "76 min",
    "Title": "Batman: The Dark Knight Returns, Part 2",
    "Type": "movie",
    "Website": "http://www.wbshop.com/",
    "Writer": "Bob Kane (character created by: Batman), Jerry Siegel (character created by: Superman), Joe Shuster (character created by: Superman), Frank Miller (comic book), Klaus Janson (comic book), Bob Goodman",
    "Year": "2013",
    "imdbID": "tt2166834",
    "imdbRating": "8.4",
    "imdbVotes": "40,297"
  },
  "-LerjQCKyuoS98nkQaLz": {
    "Actors": "Ryan Gosling, Dave Bautista, Robin Wright, Mark Arnold",
    "Awards": "Won 2 Oscars. Another 81 wins & 131 nominations.",
    "BoxOffice": "$91,800,042",
    "Country": "USA, UK, Hungary, Canada, Spain",
    "DVD": "16 Jan 2018",
    "Director": "Denis Villeneuve",
    "Genre": "Drama, Mystery, Sci-Fi, Thriller",
    "Language": "English, Finnish, Japanese, Hungarian, Russian, Somali, Spanish",
    "Metascore": "81",
    "Plot": "Thirty years after the events of the first film, a new blade runner, LAPD Officer K (Ryan Gosling), unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard (Harrison Ford), a former LAPD blade runner who has been missing for 30 years.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "87%"
      },
      {
        "Source": "Metacritic",
        "Value": "81/100"
      }
    ],
    "Released": "06 Oct 2017",
    "Response": "True",
    "Runtime": "164 min",
    "Title": "Blade Runner 2049",
    "Type": "movie",
    "Website": "http://bladerunnermovie.com",
    "Writer": "Hampton Fancher (screenplay by), Michael Green (screenplay by), Hampton Fancher (story by), Philip K. Dick (based on characters from the novel \"Do Androids Dream of Electric Sheep?\" by)",
    "Year": "2017",
    "imdbID": "tt1856101",
    "imdbRating": "8.0",
    "imdbVotes": "369,723"
  },
  "-LerjTQv5cqR7ELHsglM": {
    "Actors": "Emily Baldoni, Maury Sterling, Nicholas Brendon, Lorene Scafaria",
    "Awards": "5 wins & 5 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA, UK",
    "DVD": "20 Jan 2015",
    "Director": "James Ward Byrkit",
    "Genre": "Horror, Mystery, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "65",
    "Plot": "On the night of an astronomical anomaly, eight friends at a dinner party experience a troubling chain of reality bending events.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzQ3ODUzNDY2M15BMl5BanBnXkFtZTgwNzg0ODY2MTE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNzQ3ODUzNDY2M15BMl5BanBnXkFtZTgwNzg0ODY2MTE@._V1_SX720.jpg",
    "Production": "Oscilloscope Pictures",
    "Rated": "Not Rated",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "87%"
      },
      {
        "Source": "Metacritic",
        "Value": "65/100"
      }
    ],
    "Released": "06 Aug 2014",
    "Response": "True",
    "Runtime": "89 min",
    "Title": "Coherence",
    "Type": "movie",
    "Website": "http://coherencethemovie.com/",
    "Writer": "James Ward Byrkit (screenplay by), James Ward Byrkit (story by), Alex Manugian (story by)",
    "Year": "2013",
    "imdbID": "tt2866360",
    "imdbRating": "7.2",
    "imdbVotes": "88,031"
  },
  "-LerjXEelPp6v5E1jpFg": {
    "Actors": "Ryan Reynolds, Karan Soni, Ed Skrein, Michael Benyaer",
    "Awards": "Nominated for 2 Golden Globes. Another 27 wins & 73 nominations.",
    "BoxOffice": "$328,674,489",
    "Country": "USA",
    "DVD": "10 May 2016",
    "Director": "Tim Miller",
    "Genre": "Action, Adventure, Comedy, Sci-Fi",
    "Language": "English",
    "Metascore": "65",
    "Plot": "This is the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "84%"
      },
      {
        "Source": "Metacritic",
        "Value": "65/100"
      }
    ],
    "Released": "12 Feb 2016",
    "Response": "True",
    "Runtime": "108 min",
    "Title": "Deadpool",
    "Type": "movie",
    "Website": "http://www.foxmovies.com/deadpool",
    "Writer": "Rhett Reese, Paul Wernick",
    "Year": "2016",
    "imdbID": "tt1431045",
    "imdbRating": "8.0",
    "imdbVotes": "808,989"
  },
  "-LerjYBHFBXOEPAjOIu_": {
    "Actors": "Ryan Reynolds, Josh Brolin, Morena Baccarin, Julian Dennison",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "21 Aug 2018",
    "Director": "David Leitch",
    "Genre": "Action, Adventure, Comedy, Sci-Fi",
    "Language": "English, Cantonese, Spanish, Russian",
    "Metascore": "66",
    "Plot": "Foul-mouthed mutant mercenary Wade Wilson (AKA. Deadpool), brings together a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg, Cable.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjk1Njk3YjctMmMyYS00Y2I4LThhMzktN2U0MTMyZTFlYWQ5XkEyXkFqcGdeQXVyODM2ODEzMDA@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNjk1Njk3YjctMmMyYS00Y2I4LThhMzktN2U0MTMyZTFlYWQ5XkEyXkFqcGdeQXVyODM2ODEzMDA@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "83%"
      },
      {
        "Source": "Metacritic",
        "Value": "66/100"
      }
    ],
    "Released": "18 May 2018",
    "Response": "True",
    "Runtime": "119 min",
    "Title": "Deadpool 2",
    "Type": "movie",
    "Website": "https://www.foxmovies.com/movies/deadpool-2",
    "Writer": "Rhett Reese, Paul Wernick, Ryan Reynolds",
    "Year": "2018",
    "imdbID": "tt5463162",
    "imdbRating": "7.8",
    "imdbVotes": "372,668"
  },
  "-Lerjhzk2bEnsTw41J_e": {
    "Actors": "Benedict Cumberbatch, Chiwetel Ejiofor, Rachel McAdams, Benedict Wong",
    "Awards": "Nominated for 1 Oscar. Another 20 wins & 64 nominations.",
    "BoxOffice": "$232,630,718",
    "Country": "USA",
    "DVD": "28 Feb 2017",
    "Director": "Scott Derrickson",
    "Genre": "Action, Adventure, Fantasy, Sci-Fi",
    "Language": "English",
    "Metascore": "72",
    "Plot": "Marvel's \"Doctor Strange\" follows the story of the talented neurosurgeon Doctor Stephen Strange who, after a tragic car accident, must put ego aside and learn the secrets of a hidden world of mysticism and alternate dimensions. Based in New York City's Greenwich Village, Doctor Strange must act as an intermediary between the real world and what lies beyond, utilising a vast array of metaphysical abilities and artifacts to protect the Marvel Cinematic Universe.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_SX720.jpg",
    "Production": "Walt Disney Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "89%"
      },
      {
        "Source": "Metacritic",
        "Value": "72/100"
      }
    ],
    "Released": "04 Nov 2016",
    "Response": "True",
    "Runtime": "115 min",
    "Title": "Doctor Strange",
    "Type": "movie",
    "Website": "http://marvel.com/doctorstrange",
    "Writer": "Jon Spaihts, Scott Derrickson, C. Robert Cargill, Stan Lee (based on the Marvel comics by), Steve Ditko (based on the Marvel comics by)",
    "Year": "2016",
    "imdbID": "tt1211837",
    "imdbRating": "7.5",
    "imdbVotes": "494,454"
  },
  "-LerjkaDiE2Ihyey6oco": {
    "Actors": "Matthew McConaughey, Edgar Ramírez, Bryce Dallas Howard, Corey Stoll",
    "Awards": "Nominated for 1 Golden Globe. Another 1 win & 3 nominations.",
    "BoxOffice": "$7,222,964",
    "Country": "USA",
    "DVD": "02 May 2017",
    "Director": "Stephen Gaghan",
    "Genre": "Adventure, Drama, Thriller",
    "Language": "English, Indonesian",
    "Metascore": "49",
    "Plot": "With the sudden death of his father, fourth-generation prospector Kenny Wells sees the family business, Washoe Mining, rapidly decline and him out of business. But ambitious Kenny has a dream, a vivid vision that promises mountains of brilliant and pure gold in the lush jungles of remote Indonesia; an aspiration which the well-known, yet still unlucky geologist Michael Acosta shares. Before long, down-on-his-luck Kenny will convince the eager geologist to become his partner and set off on an adventure deep into uncharted territory, while in the meantime, he would hunt for investors. Unfortunately though, as the risky expedition begins without a single speck of gold or the promise of it on the horizon, disease and failure will begin to threaten the short-lived dream. However, is it indeed an intriguingly bold and reckless fantasy?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNjEwNzMzMDI4Nl5BMl5BanBnXkFtZTgwMTM2ODkwMTI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNjEwNzMzMDI4Nl5BMl5BanBnXkFtZTgwMTM2ODkwMTI@._V1_SX720.jpg",
    "Production": "TWC-Dimension",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "42%"
      },
      {
        "Source": "Metacritic",
        "Value": "49/100"
      }
    ],
    "Released": "27 Jan 2017",
    "Response": "True",
    "Runtime": "120 min",
    "Title": "Gold",
    "Type": "movie",
    "Website": "http://gold-film.com/",
    "Writer": "Patrick Massett, John Zinman",
    "Year": "2016",
    "imdbID": "tt1800302",
    "imdbRating": "6.7",
    "imdbVotes": "49,872"
  },
  "-LerjmKjvCmbqfaIvRYf": {
    "Actors": "Michael Keaton, Nick Offerman, John Carroll Lynch, Linda Cardellini",
    "Awards": "1 win & 3 nominations.",
    "BoxOffice": "$12,785,093",
    "Country": "USA",
    "DVD": "18 Apr 2017",
    "Director": "John Lee Hancock",
    "Genre": "Biography, Drama, History",
    "Language": "English, Yiddish",
    "Metascore": "66",
    "Plot": "1954. Having worked as a salesman most of his adult life, Ray Kroc has been a hustler in most senses of the word. That hustling has made him the target of derision among certain circles for peddling what have ended up being more novelty or faddish than useful products, but it has also placed more than a comfortable roof in Arlington Heights, Illinois over his and his wife Ethel's heads. Ethel, however, wishes that he placed as much effort into being at home with her than he is in selling, his current job of peddling five-spindle milkshake makers for Prince Castle which has him constantly on the road going from one drive-in restaurant to another. It is because of the beefs he has with the whole drive-in experience (bad food, bad service) in constantly eating at such establishments while on the road that he becomes enthralled with the concept of McDonald's Restaurant in San Bernardino, California, it owned and operated by brothers Richard McDonald and Maurice McDonald - Dick and Mac. Unlike most of Ray's customers who will only require one five-spindle milkshake maker at any given time, the McDonald brothers end up purchasing eight machines for their single restaurant. Primarily on Dick's initiative, the brothers have redesigned the whole concept of the drive-in restaurant to focus on quality food through a smaller menu of only the most popular items (hamburgers, fries, sodas), consistency in product so that customers know what to expect from time to time, change in the target market from lounging teenagers to families, and perhaps most importantly speed in having any order ready within seconds, many of these goals achievable through assembly line styled production. They had tried franchising previously, but failed in that they lost control over many of those aspects which made their San Bernardino restaurant successful. Despite believing Ray a bit off kilter (in other words, crazy), the McDonald brothers somewhat hesitantly enter into a contract with him to be their head of franchising. Ray's experience in the job is not without its problems, especially as his franchisees seem to be making more money than he is, he who is only breaking even. He is not averse to advancing ideas provided to him to get ahead - original ideas which are not his forte - he seeing the brothers as his biggest problem in they thinking small. These differences lead to a standoff between Ray and the brothers, the former who has a different goal for \"his\" business in profit and stoking his own ego seemingly his main priorities.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzExNDg0MDk1M15BMl5BanBnXkFtZTgwNzE1Mjg0MDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMzExNDg0MDk1M15BMl5BanBnXkFtZTgwNzE1Mjg0MDI@._V1_SX720.jpg",
    "Production": "The Weinstein Company",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "82%"
      },
      {
        "Source": "Metacritic",
        "Value": "66/100"
      }
    ],
    "Released": "20 Jan 2017",
    "Response": "True",
    "Runtime": "115 min",
    "Title": "The Founder",
    "Type": "movie",
    "Website": "http://thefounderfilm.com/",
    "Writer": "Robert Siegel",
    "Year": "2016",
    "imdbID": "tt4276820",
    "imdbRating": "7.2",
    "imdbVotes": "96,132"
  },
  "-LerjojzlCY7ORsHlHnX": {
    "Actors": "Andrew Garfield, Richard Pyros, Jacob Warner, Milo Gibson",
    "Awards": "Won 2 Oscars. Another 46 wins & 111 nominations.",
    "BoxOffice": "$67,115,062",
    "Country": "Australia, USA",
    "DVD": "21 Feb 2017",
    "Director": "Mel Gibson",
    "Genre": "Biography, Drama, History, War",
    "Language": "English, Japanese",
    "Metascore": "71",
    "Plot": "The true story of Desmond T. Doss, the conscientious objector who, at the Battle of Okinawa, won the Medal of Honor for his incredible bravery and regard for his fellow soldiers. We see his upbringing and how this shaped his views, especially his religious view and anti-killing stance. We see Doss's trials and tribulations after enlisting in the US Army and trying to become a medic. Finally, we see the hell on Earth that was Hacksaw Ridge.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjQ1NjM3MTUxNV5BMl5BanBnXkFtZTgwMDc5MTY5OTE@._V1_SX720.jpg",
    "Production": "Summit Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "86%"
      },
      {
        "Source": "Metacritic",
        "Value": "71/100"
      }
    ],
    "Released": "04 Nov 2016",
    "Response": "True",
    "Runtime": "139 min",
    "Title": "Hacksaw Ridge",
    "Type": "movie",
    "Website": "http://www.hacksawridge.movie/",
    "Writer": "Robert Schenkkan (screenplay by), Andrew Knight (screenplay by)",
    "Year": "2016",
    "imdbID": "tt2119532",
    "imdbRating": "8.1",
    "imdbVotes": "362,171"
  },
  "-Lerjrz-t6G8gQXA91a2": {
    "Actors": "Dale Dickey, Ben Foster, Chris Pine, William Sterchi",
    "Awards": "Nominated for 4 Oscars. Another 42 wins & 157 nominations.",
    "BoxOffice": "$26,973,524",
    "Country": "USA",
    "DVD": "22 Nov 2016",
    "Director": "David Mackenzie",
    "Genre": "Action, Crime, Drama, Thriller, Western",
    "Language": "English",
    "Metascore": "88",
    "Plot": "In Texas, after the death of his mother, the unemployed oil and gas worker Toby Howard is losing his ranch to the Texas Midlands Bank. Toby is divorced from his wife who lives with their two sons. When his brother Tanner Howard is released from the prison, they team up to rob agencies of the Texas Midlands Bank to raise money to pay the loan so that Toby may leave the real estate to his sons. Meanwhile the Texas Ranger Marcus Hamilton who is near retirement and his Indian descendant partner Alberto Parker try to anticipate the next move of the thieves.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg4NDA1OTA5NF5BMl5BanBnXkFtZTgwMDQ2MDM5ODE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTg4NDA1OTA5NF5BMl5BanBnXkFtZTgwMDQ2MDM5ODE@._V1_SX720.jpg",
    "Production": "Film 44",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "97%"
      },
      {
        "Source": "Metacritic",
        "Value": "88/100"
      }
    ],
    "Released": "26 Aug 2016",
    "Response": "True",
    "Runtime": "102 min",
    "Title": "Hell or High Water",
    "Type": "movie",
    "Website": "http://hellorhighwater.movie",
    "Writer": "Taylor Sheridan",
    "Year": "2016",
    "imdbID": "tt2582782",
    "imdbRating": "7.6",
    "imdbVotes": "172,751"
  },
  "-LerjunMHMbVrF2QdLto": {
    "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
    "Awards": "Won 4 Oscars. Another 152 wins & 204 nominations.",
    "BoxOffice": "$292,568,851",
    "Country": "USA, UK",
    "DVD": "07 Dec 2010",
    "Director": "Christopher Nolan",
    "Genre": "Action, Adventure, Sci-Fi, Thriller",
    "Language": "English, Japanese, French",
    "Metascore": "74",
    "Plot": "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible - inception. Instead of the perfect heist, Cobb and his team of specialists have to pull off the reverse: their task is not to steal an idea but to plant one. If they succeed, it could be the perfect crime. But no amount of careful planning or expertise can prepare the team for the dangerous enemy that seems to predict their every move. An enemy that only Cobb could have seen coming.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "86%"
      },
      {
        "Source": "Metacritic",
        "Value": "74/100"
      }
    ],
    "Released": "16 Jul 2010",
    "Response": "True",
    "Runtime": "148 min",
    "Title": "Inception",
    "Type": "movie",
    "Website": "http://inceptionmovie.warnerbros.com/",
    "Writer": "Christopher Nolan",
    "Year": "2010",
    "imdbID": "tt1375666",
    "imdbRating": "8.8",
    "imdbVotes": "1,826,846"
  },
  "-Lerjy5tFi4MkRFybhTg": {
    "Actors": "Donnie Yen, Simon Yam, Lynn Xiong, Hiroyuki Ikeuchi",
    "Awards": "12 wins & 16 nominations.",
    "BoxOffice": "N/A",
    "Country": "Hong Kong, China",
    "DVD": "31 Mar 2009",
    "Director": "Wilson Yip",
    "Genre": "Action, Biography, Drama, Sport",
    "Language": "Cantonese, Mandarin, Japanese",
    "Metascore": "59",
    "Plot": "In 1935 in Foshan, south China, there are martial arts schools on every street corner. Ip Man is the undisputed martial arts champion, yet he has not devoted himself to teaching. Despite this, it seems that all the kung fu masters of the city are eager to fight him to improve their reputation.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTFmMjM3M2UtOTIyZC00Zjk3LTkzODUtYTdhNGRmNzFhYzcyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNTFmMjM3M2UtOTIyZC00Zjk3LTkzODUtYTdhNGRmNzFhYzcyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX720.jpg",
    "Production": "Well Go USA",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "85%"
      },
      {
        "Source": "Metacritic",
        "Value": "59/100"
      }
    ],
    "Released": "12 Dec 2008",
    "Response": "True",
    "Runtime": "106 min",
    "Title": "Ip Man",
    "Type": "movie",
    "Website": "http:// http://www.ipman-movie.com/",
    "Writer": "Edmond Wong (screenplay), Tai-lee Chan",
    "Year": "2008",
    "imdbID": "tt1220719",
    "imdbRating": "8.0",
    "imdbVotes": "195,172"
  },
  "-Lerk6YMRpK4zd35RGHM": {
    "Actors": "Charlie Hunnam, Astrid Bergès-Frisbey, Jude Law, Djimon Hounsou",
    "Awards": "8 nominations.",
    "BoxOffice": "$39,037,047",
    "Country": "USA, UK",
    "DVD": "08 Aug 2017",
    "Director": "Guy Ritchie",
    "Genre": "Action, Adventure, Drama, Fantasy",
    "Language": "English",
    "Metascore": "41",
    "Plot": "Robbed of his birthright, Arthur comes up the hard way in the back alleys of the city. But once he pulls the sword from the stone, he is forced to acknowledge his true legacy - whether he likes it or not.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjM3ODY3Njc5Ml5BMl5BanBnXkFtZTgwMjQ5NjM5MTI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjM3ODY3Njc5Ml5BMl5BanBnXkFtZTgwMjQ5NjM5MTI@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "31%"
      },
      {
        "Source": "Metacritic",
        "Value": "41/100"
      }
    ],
    "Released": "12 May 2017",
    "Response": "True",
    "Runtime": "126 min",
    "Title": "King Arthur: Legend of the Sword",
    "Type": "movie",
    "Website": "http://kingarthurmovie.com/",
    "Writer": "Joby Harold (screenplay by), Guy Ritchie (screenplay by), Lionel Wigram (screenplay by), David Dobkin (story by), Joby Harold (story by)",
    "Year": "2017",
    "imdbID": "tt1972591",
    "imdbRating": "6.8",
    "imdbVotes": "166,131"
  },
  "-Lerk9239WDdwHOlXSDG": {
    "Actors": "Hugh Jackman, Patrick Stewart, Dafne Keen, Boyd Holbrook",
    "Awards": "Nominated for 1 Oscar. Another 13 wins & 55 nominations.",
    "BoxOffice": "$226,276,809",
    "Country": "USA",
    "DVD": "23 May 2017",
    "Director": "James Mangold",
    "Genre": "Action, Drama, Sci-Fi, Thriller",
    "Language": "English, Spanish",
    "Metascore": "77",
    "Plot": "In 2029 the mutant population has shrunken significantly and the X-Men have disbanded. Logan, whose power to self-heal is dwindling, has surrendered himself to alcohol and now earns a living as a chauffeur. He takes care of the ailing old Professor X whom he keeps hidden away. One day, a female stranger asks Logan to drive a girl named Laura to the Canadian border. At first he refuses, but the Professor has been waiting for a long time for her to appear. Laura possesses an extraordinary fighting prowess and is in many ways like Wolverine. She is pursued by sinister figures working for a powerful corporation; this is because her DNA contains the secret that connects her to Logan. A relentless pursuit begins - In this third cinematic outing featuring the Marvel comic book character Wolverine we see the superheroes beset by everyday problems. They are aging, ailing and struggling to survive financially. A decrepit Logan is forced to ask himself if he can or even wants to put his remaining powers to good use. It would appear that in the near-future, the times in which they were able put the world to rights with razor sharp claws and telepathic powers are now over.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYzc5MTU4N2EtYTkyMi00NjdhLTg3NWEtMTY4OTEyMzJhZTAzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYzc5MTU4N2EtYTkyMi00NjdhLTg3NWEtMTY4OTEyMzJhZTAzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "93%"
      },
      {
        "Source": "Metacritic",
        "Value": "77/100"
      }
    ],
    "Released": "03 Mar 2017",
    "Response": "True",
    "Runtime": "137 min",
    "Title": "Logan",
    "Type": "movie",
    "Website": "http://www.foxmovies.com/movies/logan",
    "Writer": "James Mangold (story by), Scott Frank (screenplay by), James Mangold (screenplay by), Michael Green (screenplay by)",
    "Year": "2017",
    "imdbID": "tt3315342",
    "imdbRating": "8.1",
    "imdbVotes": "551,781"
  },
  "-LerkBXMPMsSKX_jKyNO": {
    "Actors": "Henry Cavill, Amy Adams, Michael Shannon, Diane Lane",
    "Awards": "7 wins & 46 nominations.",
    "BoxOffice": "$291,021,565",
    "Country": "USA, UK",
    "DVD": "12 Nov 2013",
    "Director": "Zack Snyder",
    "Genre": "Action, Adventure, Sci-Fi",
    "Language": "English",
    "Metascore": "55",
    "Plot": "A young boy learns that he has extraordinary powers and is not of this Earth. As a young man, he journeys to discover where he came from and what he was sent here to do. But the hero in him must emerge if he is to save the world from annihilation and become the symbol of hope for all mankind.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "56%"
      },
      {
        "Source": "Metacritic",
        "Value": "55/100"
      }
    ],
    "Released": "14 Jun 2013",
    "Response": "True",
    "Runtime": "143 min",
    "Title": "Man of Steel",
    "Type": "movie",
    "Website": "http://manofsteel.warnerbros.com",
    "Writer": "David S. Goyer (screenplay), David S. Goyer (story), Christopher Nolan (story), Jerry Siegel (Superman created by), Joe Shuster (Superman created by)",
    "Year": "2013",
    "imdbID": "tt0770828",
    "imdbRating": "7.1",
    "imdbVotes": "643,045"
  },
  "-LerkG4g7vv5m_e_u6q1": {
    "Actors": "Tom Cruise, Philip Seymour Hoffman, Ving Rhames, Billy Crudup",
    "Awards": "7 wins & 14 nominations.",
    "BoxOffice": "$133,400,000",
    "Country": "USA, Germany, China, Italy",
    "DVD": "30 Oct 2006",
    "Director": "J.J. Abrams",
    "Genre": "Action, Adventure, Thriller",
    "Language": "English, Italian, Mandarin, Cantonese, German, Czech",
    "Metascore": "66",
    "Plot": "A man named Owen Davian kills an IMF agent that was sent undercover by the legendary Ethan Hunt, who has retired from combat missions. Hunt now has a fiancé, Julia, who believes that he works for the traffic department when he really trains younger IMF agents to go into combat. He is assigned to his last mission. His mission, should he choose to accept it is to capture Davian, who is selling a toxic weapon called the rabbits foot. But Davian is reckless, cruel, and deathly. He promises Hunt that he will find Julia, hurt her, and Ethan will be too dead to help her. The mission is no more different to others, its dangerous, smart, and impossible; but now it's personal.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOThhNTA1YjItYzk2Ny00M2Y1LWJlYWUtZDQyZDU0YmY5Y2M5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BOThhNTA1YjItYzk2Ny00M2Y1LWJlYWUtZDQyZDU0YmY5Y2M5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "Paramount Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "70%"
      },
      {
        "Source": "Metacritic",
        "Value": "66/100"
      }
    ],
    "Released": "05 May 2006",
    "Response": "True",
    "Runtime": "126 min",
    "Title": "Mission: Impossible III",
    "Type": "movie",
    "Website": "http://www.missionimpossible.com/",
    "Writer": "Alex Kurtzman, Roberto Orci, J.J. Abrams, Bruce Geller (television series)",
    "Year": "2006",
    "imdbID": "tt0317919",
    "imdbRating": "6.9",
    "imdbVotes": "304,861"
  },
  "-LerkJALDg8Zek5ULLKR": {
    "Actors": "Tom Hanks, Denzel Washington, Roberta Maxwell, Buzz Kilman",
    "Awards": "Won 2 Oscars. Another 15 wins & 22 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "09 Sep 1997",
    "Director": "Jonathan Demme",
    "Genre": "Drama",
    "Language": "English",
    "Metascore": "66",
    "Plot": "Andrew Beckett, a gay, HIV positive lawyer, is fired from his law firm in fear that they might contract HIV from him. After Andrew is fired, in a last attempt for peace, he sues his former law firm with the help of a homophobic lawyer, Joe Miller. During the court battle, Miller sees that Beckett is no different than anyone else on the gritty streets of the city of brotherly love, sheds his homophobia and helps Beckett with his case before AIDS overcomes him.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDE0MWE1ZTMtOWFkMS00YjdiLTkwZTItMDljYjY3MjM0NTk5XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNDE0MWE1ZTMtOWFkMS00YjdiLTkwZTItMDljYjY3MjM0NTk5XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX720.jpg",
    "Production": "Sony Pictures Home Entertainment",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "79%"
      },
      {
        "Source": "Metacritic",
        "Value": "66/100"
      }
    ],
    "Released": "14 Jan 1994",
    "Response": "True",
    "Runtime": "125 min",
    "Title": "Philadelphia",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Ron Nyswaner",
    "Year": "1993",
    "imdbID": "tt0107818",
    "imdbRating": "7.7",
    "imdbVotes": "205,134"
  },
  "-LerkMkXch_XylV2vDzk": {
    "Actors": "Liam Neeson, Ben Kingsley, Ralph Fiennes, Caroline Goodall",
    "Awards": "Won 7 Oscars. Another 82 wins & 49 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "09 Mar 2004",
    "Director": "Steven Spielberg",
    "Genre": "Biography, Drama, History",
    "Language": "English, Hebrew, German, Polish",
    "Metascore": "93",
    "Plot": "Oskar Schindler is a vainglorious and greedy German businessman who becomes an unlikely humanitarian amid the barbaric German Nazi reign when he feels compelled to turn his factory into a refuge for Jews. Based on the true story of Oskar Schindler who managed to save about 1100 Jews from being gassed at the Auschwitz concentration camp, it is a testament to the good in all of us.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "97%"
      },
      {
        "Source": "Metacritic",
        "Value": "93/100"
      }
    ],
    "Released": "04 Feb 1994",
    "Response": "True",
    "Runtime": "195 min",
    "Title": "Schindler's List",
    "Type": "movie",
    "Website": "http://www.schindlerslist.com",
    "Writer": "Thomas Keneally (book), Steven Zaillian (screenplay)",
    "Year": "1993",
    "imdbID": "tt0108052",
    "imdbRating": "8.9",
    "imdbVotes": "1,077,467"
  },
  "-LerkRgSJ65-jpx6rEG8": {
    "Actors": "Lou Taylor Pucci, Nadia Hilker, Francesco Carnelutti, Nick Nevern",
    "Awards": "4 wins & 13 nominations.",
    "BoxOffice": "$29,975",
    "Country": "USA",
    "DVD": "02 Jun 2015",
    "Director": "Justin Benson, Aaron Moorhead",
    "Genre": "Horror, Romance, Sci-Fi",
    "Language": "English, Italian, French, German",
    "Metascore": "70",
    "Plot": "A young man in a personal tailspin flees from US to Italy, where he sparks up a romance with a woman harboring a dark, primordial secret.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMwNzM2OTk3OF5BMl5BanBnXkFtZTgwNjExOTU0NDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjMwNzM2OTk3OF5BMl5BanBnXkFtZTgwNjExOTU0NDE@._V1_SX720.jpg",
    "Production": "Drafthouse Films",
    "Rated": "Not Rated",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "88%"
      },
      {
        "Source": "Metacritic",
        "Value": "70/100"
      }
    ],
    "Released": "20 Mar 2015",
    "Response": "True",
    "Runtime": "109 min",
    "Title": "Spring",
    "Type": "movie",
    "Website": "http://www.facebook.com/springmovie",
    "Writer": "Justin Benson",
    "Year": "2014",
    "imdbID": "tt3395184",
    "imdbRating": "6.7",
    "imdbVotes": "20,692"
  },
  "-LerkUUKeHMSd206jn3m": {
    "Actors": "Christian Slater, Vanessa Williams, Billy Brown, Kristin Bauer van Straten",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "10 Apr 2018",
    "Director": "Sam Liu",
    "Genre": "Animation, Action, Fantasy",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "Task Force X targets a powerful mystical object that they will risk their lives to steal.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2ZiYzY0NWUtMDNmYi00NWU5LWIwZDItMzY1ODhhNjdiNDRmXkEyXkFqcGdeQXVyNTUzNzM0NTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BN2ZiYzY0NWUtMDNmYi00NWU5LWIwZDItMzY1ODhhNjdiNDRmXkEyXkFqcGdeQXVyNTUzNzM0NTY@._V1_SX720.jpg",
    "Production": "DC Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "88%"
      }
    ],
    "Released": "27 Mar 2018",
    "Response": "True",
    "Runtime": "86 min",
    "Title": "Suicide Squad: Hell to Pay",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Alan Burnett, John Ostrander (character created by: Amanda Waller), John Byrne (character created by: Amanda Waller), Denny O'Neil (character created by: Bronze Tiger), Bob Haney (character created by: Copperhead), Gerry Conway (character created by: Count Vertigo), Trevor Von Eeden (character created by: Count Vertigo), Lew Schwartz (character created by: Deadshot), Paul Dini (character created by: Harley Quinn), Bruce Timm (character created by: Harley Quinn), Gerry Conway (character created by: Killer Frost), Al Milgrom (character created by: Killer Frost), Grant Morrison (character created by: Professor Pyg), Frank Quitely (character created by: Professor Pyg), Andy Kubert (character created by: Professor Pyg), Steve Ditko (characters created by: Punch and Jewelee), John Byrne (character created by: Silver Banshee), Tony Isabella (character created by: Tobias Whale), Trevor Von Eeden (character created by: Tobias Whale)",
    "Year": "2018",
    "imdbID": "tt7167602",
    "imdbRating": "7.0",
    "imdbVotes": "7,514"
  },
  "-LerkXIUO7wIRxktfFT4": {
    "Actors": "Denzel Washington, Gary Oldman, Mila Kunis, Ray Stevenson",
    "Awards": "3 wins & 16 nominations.",
    "BoxOffice": "$94,800,000",
    "Country": "USA",
    "DVD": "15 Jun 2010",
    "Director": "Albert Hughes, Allen Hughes",
    "Genre": "Action, Adventure, Drama, Thriller",
    "Language": "English",
    "Metascore": "53",
    "Plot": "In a violent post-apocalyptic society, a drifter, Eli, has been wandering westward across North America for the last thirty years. He finds solace in a unique book which he carries on his person and guards closely, whilst surviving by hunting small animals and seeking goods in destroyed houses and vehicles to trade in villages for water and supplies. When he reaches a village ruled by the powerful mobster, Carnegie, the man views Eli's impressive fighting skills and offers Eli a place within his gang. Carnegie presses his blind lover Claudia to send her daughter, Solara, to at least convince Eli to spend the night by sleeping with him. However, Eli proves to be the better man when he gently declines her advances. The girl sees Eli's book, and when Carnegie finds out he beats her mother until she reveals what she saw. Carnegie sends his gang into the wasteland to take the book from Eli, but the man proves to be a formidable foe as he makes it more than clear that if they want the book, they must first take his life.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTE1OWI1YzgtZjEyMy00MjQ4LWE0NWMtYTNhYjc0ZDQ3ZGRkXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNTE1OWI1YzgtZjEyMy00MjQ4LWE0NWMtYTNhYjc0ZDQ3ZGRkXkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "47%"
      },
      {
        "Source": "Metacritic",
        "Value": "53/100"
      }
    ],
    "Released": "15 Jan 2010",
    "Response": "True",
    "Runtime": "118 min",
    "Title": "The Book of Eli",
    "Type": "movie",
    "Website": "http://thebookofeli.warnerbros.com/",
    "Writer": "Gary Whitta",
    "Year": "2010",
    "imdbID": "tt1037705",
    "imdbRating": "6.9",
    "imdbVotes": "270,222"
  },
  "-LerlRyZfhmiVn--3zKM": {
    "Actors": "Shia LaBeouf, Evan Rachel Wood, Mads Mikkelsen, Til Schweiger",
    "Awards": "1 nomination.",
    "BoxOffice": "N/A",
    "Country": "USA, Romania",
    "DVD": "21 Jan 2014",
    "Director": "Fredrik Bond",
    "Genre": "Comedy, Drama, Romance, Thriller",
    "Language": "English, Romanian",
    "Metascore": "31",
    "Plot": "While travelling abroad, a guy falls for a Romanian beauty whose unreachable heart has its origins in her violent, charismatic ex.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjA3MTcyNjk3NF5BMl5BanBnXkFtZTgwNjkzNzUzMDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjA3MTcyNjk3NF5BMl5BanBnXkFtZTgwNjkzNzUzMDE@._V1_SX720.jpg",
    "Production": "Millennium Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "29%"
      },
      {
        "Source": "Metacritic",
        "Value": "31/100"
      }
    ],
    "Released": "13 Sep 2013",
    "Response": "True",
    "Runtime": "103 min",
    "Title": "Charlie Countryman",
    "Type": "movie",
    "Website": "http://www.charliecountryman-movie.com/",
    "Writer": "Matt Drake",
    "Year": "2013",
    "imdbID": "tt1196948",
    "imdbRating": "6.4",
    "imdbVotes": "25,257"
  },
  "-LerlWrLo0KZRC-jXMTG": {
    "Actors": "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    "Awards": "Nominated for 7 Oscars. Another 19 wins & 32 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "27 Jan 1998",
    "Director": "Frank Darabont",
    "Genre": "Drama",
    "Language": "English",
    "Metascore": "80",
    "Plot": "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX720.jpg",
    "Production": "Columbia Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "9.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "91%"
      },
      {
        "Source": "Metacritic",
        "Value": "80/100"
      }
    ],
    "Released": "14 Oct 1994",
    "Response": "True",
    "Runtime": "142 min",
    "Title": "The Shawshank Redemption",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Stephen King (short story \"Rita Hayworth and Shawshank Redemption\"), Frank Darabont (screenplay)",
    "Year": "1994",
    "imdbID": "tt0111161",
    "imdbRating": "9.3",
    "imdbVotes": "2,084,570"
  },
  "-Lerl_LsIsw8EBm_-TCn": {
    "Actors": "Chris Hemsworth, Tom Hiddleston, Cate Blanchett, Idris Elba",
    "Awards": "5 wins & 30 nominations.",
    "BoxOffice": "$314,971,245",
    "Country": "USA",
    "DVD": "06 Mar 2018",
    "Director": "Taika Waititi",
    "Genre": "Action, Adventure, Comedy, Fantasy, Sci-Fi",
    "Language": "English",
    "Metascore": "74",
    "Plot": "Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the destruction of his homeworld and the end of Asgardian civilization, at the hands of an all-powerful new threat, the ruthless Hela.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_SX720.jpg",
    "Production": "Walt Disney Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "92%"
      },
      {
        "Source": "Metacritic",
        "Value": "74/100"
      }
    ],
    "Released": "03 Nov 2017",
    "Response": "True",
    "Runtime": "130 min",
    "Title": "Thor: Ragnarok",
    "Type": "movie",
    "Website": "http://movies.disney.com/thor-ragnarok",
    "Writer": "Eric Pearson, Craig Kyle, Christopher L. Yost, Stan Lee (based on the Marvel comics by), Larry Lieber (based on the Marvel comics by), Jack Kirby (based on the Marvel comics by)",
    "Year": "2017",
    "imdbID": "tt3501632",
    "imdbRating": "7.9",
    "imdbVotes": "470,059"
  },
  "-LerlchRE-arNZn8V0QL": {
    "Actors": "Miles Teller, J.K. Simmons, Paul Reiser, Melissa Benoist",
    "Awards": "Won 3 Oscars. Another 89 wins & 136 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "24 Feb 2015",
    "Director": "Damien Chazelle",
    "Genre": "Drama, Music",
    "Language": "English",
    "Metascore": "88",
    "Plot": "A young and talented drummer attending a prestigious music academy finds himself under the wing of the most respected professor at the school, one who does not hold back on abuse towards his students. The two form an odd relationship as the student wants to achieve greatness, and the professor pushes him.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX720.jpg",
    "Production": "Sony Pictures Classics",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "93%"
      },
      {
        "Source": "Metacritic",
        "Value": "88/100"
      }
    ],
    "Released": "15 Oct 2014",
    "Response": "True",
    "Runtime": "106 min",
    "Title": "Whiplash",
    "Type": "movie",
    "Website": "http://sonyclassics.com/whiplash/",
    "Writer": "Damien Chazelle",
    "Year": "2014",
    "imdbID": "tt2582802",
    "imdbRating": "8.5",
    "imdbVotes": "607,404"
  },
  "-Lerlh6W04qj5Lw3PSkf": {
    "Actors": "Kelsey Asbille, Jeremy Renner, Julia Jones, Teo Briones",
    "Awards": "8 wins & 18 nominations.",
    "BoxOffice": "$33,782,714",
    "Country": "UK, Canada, USA",
    "DVD": "14 Nov 2017",
    "Director": "Taylor Sheridan",
    "Genre": "Crime, Drama, Mystery, Thriller",
    "Language": "English",
    "Metascore": "73",
    "Plot": "A veteran hunter helps an FBI agent investigate the murder of a young woman on a Wyoming Native American reservation.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTUyMjU1OTUwM15BMl5BanBnXkFtZTgwMDg1NDQ2MjI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTUyMjU1OTUwM15BMl5BanBnXkFtZTgwMDg1NDQ2MjI@._V1_SX720.jpg",
    "Production": "The Weinstein Company",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "87%"
      },
      {
        "Source": "Metacritic",
        "Value": "73/100"
      }
    ],
    "Released": "18 Aug 2017",
    "Response": "True",
    "Runtime": "107 min",
    "Title": "Wind River",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Taylor Sheridan",
    "Year": "2017",
    "imdbID": "tt5362988",
    "imdbRating": "7.7",
    "imdbVotes": "165,164"
  },
  "-Lerll0BalhYC-2iqGiC": {
    "Actors": "Christian Bale, Dominic Purcell, Sean Bean, Christian Kahrmann",
    "Awards": "2 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "13 May 2003",
    "Director": "Kurt Wimmer",
    "Genre": "Action, Drama, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "33",
    "Plot": "In a futuristic world, a strict regime has eliminated war by suppressing emotions: books, art and music are strictly forbidden and feeling is a crime punishable by death. Cleric John Preston (Bale) is a top ranking government agent responsible for destroying those who resist the rules. When he misses a dose of Prozium, a mind-altering drug that hinders emotion, Preston, who has been trained to enforce the strict laws of the new regime, suddenly becomes the only person capable of overthrowing it.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTkzMzA1OTI3N15BMl5BanBnXkFtZTYwMzUyMDg5._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTkzMzA1OTI3N15BMl5BanBnXkFtZTYwMzUyMDg5._V1_SX720.jpg",
    "Production": "Miramax Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "40%"
      },
      {
        "Source": "Metacritic",
        "Value": "33/100"
      }
    ],
    "Released": "06 Dec 2002",
    "Response": "True",
    "Runtime": "107 min",
    "Title": "Equilibrium",
    "Type": "movie",
    "Website": "http://www.dimensionfilms.com/equilibrium/index.html",
    "Writer": "Kurt Wimmer",
    "Year": "2002",
    "imdbID": "tt0238380",
    "imdbRating": "7.5",
    "imdbVotes": "294,890"
  },
  "-LerlnwGvnZcky4MhNwD": {
    "Actors": "Denzel Washington, Dakota Fanning, Radha Mitchell, Christopher Walken",
    "Awards": "1 win & 7 nominations.",
    "BoxOffice": "$77,600,000",
    "Country": "USA, UK, Mexico, Switzerland",
    "DVD": "14 Sep 2004",
    "Director": "Tony Scott",
    "Genre": "Action, Crime, Drama, Thriller",
    "Language": "English, Spanish",
    "Metascore": "47",
    "Plot": "Hard drinking, burnt out ex CIA operative John Creasy has given up on life until he's hired as a bodyguard to protect nine year old Pita Ramos. Bit by bit, Creasy begins to reclaim some of his soul, but when pita is kidnapped, Creasy's fiery rage is finally released and he will stop at nothing to save her as he sets out on a dangerous, revenge fuelled rescue mission.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODFlMmEwMDgtYjhmZi00ZTE5LTk2NWQtMWE1Y2M0NjkzOGYxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BODFlMmEwMDgtYjhmZi00ZTE5LTk2NWQtMWE1Y2M0NjkzOGYxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "39%"
      },
      {
        "Source": "Metacritic",
        "Value": "47/100"
      }
    ],
    "Released": "23 Apr 2004",
    "Response": "True",
    "Runtime": "146 min",
    "Title": "Man on Fire",
    "Type": "movie",
    "Website": "http://www.manonfiremovie.com/",
    "Writer": "A.J. Quinnell (novel), Brian Helgeland (screenplay)",
    "Year": "2004",
    "imdbID": "tt0328107",
    "imdbRating": "7.7",
    "imdbVotes": "306,016"
  },
  "-LerlqafAQiYOZaSaBRZ": {
    "Actors": "Zoë Bell, Rachel Nichols, Tracie Thoms, Bruce Thomas",
    "Awards": "2 wins & 2 nominations.",
    "BoxOffice": "$3,453",
    "Country": "USA",
    "DVD": "20 May 2014",
    "Director": "Josh C. Waller",
    "Genre": "Action, Drama, Horror",
    "Language": "English",
    "Metascore": "41",
    "Plot": "Raze, a horror/action film, focuses on two abducted women & 50 other women who are forced to fight each other using their bare hands.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTkyMjk2OTk2MF5BMl5BanBnXkFtZTgwNjcwMzg3MDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTkyMjk2OTk2MF5BMl5BanBnXkFtZTgwNjcwMzg3MDE@._V1_SX720.jpg",
    "Production": "IFC Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "45%"
      },
      {
        "Source": "Metacritic",
        "Value": "41/100"
      }
    ],
    "Released": "16 Jan 2014",
    "Response": "True",
    "Runtime": "92 min",
    "Title": "Raze",
    "Type": "movie",
    "Website": "http://www.ifcfilms.com/films/raze",
    "Writer": "Robert Beaucage (story and screenplay), Kenny Gage (story), Josh C. Waller (story)",
    "Year": "2013",
    "imdbID": "tt2111392",
    "imdbRating": "5.2",
    "imdbVotes": "5,367"
  },
  "-Lerlto0wEGNYfkidG1N": {
    "Actors": "Gerard Butler, Tom Wilkinson, Thandie Newton, Mark Strong",
    "Awards": "1 win & 5 nominations.",
    "BoxOffice": "$5,665,302",
    "Country": "UK, USA, France",
    "DVD": "27 Jan 2009",
    "Director": "Guy Ritchie",
    "Genre": "Action, Crime, Thriller",
    "Language": "English, Russian",
    "Metascore": "53",
    "Plot": "Lenny Cole, a London mob boss, puts the bite on all local real estate transactions. For substantial fees, he's helping Uri Omovich, a Russian developer. As a sign of good faith, Omovich loans Cole a valuable painting, promptly stolen off Cole's wall. While Cole's men, led by the dependable Archie, look for the canvas, three local petty criminals, the Wild Bunch, steal money from the Russian using inside information from his accountant, the lovely Stella. Meanwhile, a local drug-addled rocker, Johnny Quid, is reported drowned, and his connection to Cole is the key to unraveling the deceits and double crosses of life in the underworld.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ0NTk5Mzk2OV5BMl5BanBnXkFtZTcwMDE3NTE4MQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTQ0NTk5Mzk2OV5BMl5BanBnXkFtZTcwMDE3NTE4MQ@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures/Dark Castle",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "60%"
      },
      {
        "Source": "Metacritic",
        "Value": "53/100"
      }
    ],
    "Released": "31 Oct 2008",
    "Response": "True",
    "Runtime": "114 min",
    "Title": "RocknRolla",
    "Type": "movie",
    "Website": "http://rocknrolla.warnerbros.com/",
    "Writer": "Guy Ritchie",
    "Year": "2008",
    "imdbID": "tt1032755",
    "imdbRating": "7.3",
    "imdbVotes": "219,035"
  },
  "-LerlwRnEIY5Z7BO147u": {
    "Actors": "Cliff Curtis, Chipo Chung, Cillian Murphy, Michelle Yeoh",
    "Awards": "1 win & 18 nominations.",
    "BoxOffice": "N/A",
    "Country": "UK, USA",
    "DVD": "N/A",
    "Director": "Danny Boyle",
    "Genre": "Adventure, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "64",
    "Plot": "50 years into the future, the Sun begins to die, and Earth is dying as a result. A team of astronauts is sent to revive the Sun - but the mission fails. Seven years later, a new team is sent to finish the mission as mankind's last hope.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTU5Nzg2OTk2NF5BMl5BanBnXkFtZTYwNTc1ODM3._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTU5Nzg2OTk2NF5BMl5BanBnXkFtZTYwNTc1ODM3._V1_SX720.jpg",
    "Production": "N/A",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      },
      {
        "Source": "Metacritic",
        "Value": "64/100"
      }
    ],
    "Released": "27 Jul 2007",
    "Response": "True",
    "Runtime": "107 min",
    "Title": "Sunshine",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Alex Garland",
    "Year": "2007",
    "imdbID": "tt0448134",
    "imdbRating": "7.3",
    "imdbVotes": "218,680"
  },
  "-Lerlzt80Kpds5rRHEya": {
    "Actors": "Liam Neeson, Frank Grillo, Dermot Mulroney, Dallas Roberts",
    "Awards": "2 wins & 7 nominations.",
    "BoxOffice": "$51,533,608",
    "Country": "USA",
    "DVD": "15 May 2012",
    "Director": "Joe Carnahan",
    "Genre": "Action, Adventure, Drama, Thriller",
    "Language": "English, Spanish",
    "Metascore": "64",
    "Plot": "In Alaska, a team of oil workers board a flight home; however, they cross a storm and the airplane crashes. Only seven workers survive in the wilderness and John Ottway, who is a huntsman that kills wolves to protect the workers, assumes leadership of the group. Shortly after they learn that they are surrounded by a pack of wolves and Ottway advises that they should seek protection in the woods. But while they walk through the heavy snow, they are chased and attacked by the carnivorous mammals.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDY4MTQwMzc1MV5BMl5BanBnXkFtZTcwNzcwNTM5Ng@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNDY4MTQwMzc1MV5BMl5BanBnXkFtZTcwNzcwNTM5Ng@@._V1_SX720.jpg",
    "Production": "Open Road Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "79%"
      },
      {
        "Source": "Metacritic",
        "Value": "64/100"
      }
    ],
    "Released": "27 Jan 2012",
    "Response": "True",
    "Runtime": "117 min",
    "Title": "The Grey",
    "Type": "movie",
    "Website": "http://thegreythemovie.com/",
    "Writer": "Joe Carnahan (screenplay), Ian Mackenzie Jeffers (screenplay), Ian Mackenzie Jeffers (short story \"Ghost Walker\")",
    "Year": "2011",
    "imdbID": "tt1601913",
    "imdbRating": "6.8",
    "imdbVotes": "227,662"
  },
  "-Lerm90vnk8Rt1sz55lb": {
    "Actors": "Joel Kinnaman, Gary Oldman, Michael Keaton, Abbie Cornish",
    "Awards": "4 wins & 1 nomination.",
    "BoxOffice": "$50,666,882",
    "Country": "USA",
    "DVD": "03 Jun 2014",
    "Director": "José Padilha",
    "Genre": "Action, Crime, Sci-Fi, Thriller",
    "Language": "English, Persian, Ukrainian",
    "Metascore": "52",
    "Plot": "The year is 2028 and multinational conglomerate OmniCorp is at the center of robot technology. Overseas, their drones have been used by the military for years - and it's meant billions for OmniCorp's bottom line. Now OmniCorp wants to bring their controversial technology to the home front, and they see a golden opportunity to do it. When Alex Murphy (Joel Kinnaman) - a loving husband, father and good cop doing his best to stem the tide of crime and corruption in Detroit - is critically injured in the line of duty, OmniCorp sees their chance for a part-man, part-robot police officer. OmniCorp envisions a RoboCop in every city and even more billions for their shareholders, but they never counted on one thing: there is still a man inside the machine pursuing justice.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjAyOTUzMTcxN15BMl5BanBnXkFtZTgwMjkyOTc1MDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjAyOTUzMTcxN15BMl5BanBnXkFtZTgwMjkyOTc1MDE@._V1_SX720.jpg",
    "Production": "Sony Pictures Releasing",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "49%"
      },
      {
        "Source": "Metacritic",
        "Value": "52/100"
      }
    ],
    "Released": "12 Feb 2014",
    "Response": "True",
    "Runtime": "117 min",
    "Title": "RoboCop",
    "Type": "movie",
    "Website": "http://www.robocop.com/site",
    "Writer": "Joshua Zetumer, Edward Neumeier, Michael Miner, Edward Neumeier, Michael Miner",
    "Year": "2014",
    "imdbID": "tt1234721",
    "imdbRating": "6.2",
    "imdbVotes": "204,807"
  },
  "-LermDpk769UB51SYly_": {
    "Actors": "Kevin Conroy, Neal McDonough, Hynden Walch, Matthew Gray Gubler",
    "Awards": "3 wins & 2 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "12 Aug 2014",
    "Director": "Jay Oliva, Ethan Spaulding",
    "Genre": "Animation, Action, Crime, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "In Gotham City, the Riddler has secret information on the top secret Task Force X that he threatens to make public, but before Amanda Waller can have him killed, he is captured by Batman. Now with Riddler imprisoned in Arkham Asylum, Amanda Waller reassembles the Suicide Squad of captured supervillains with the mission to infiltrate the forensic mental hospital to retrieve Riddler's information. Led by Deadshot, this black ops team makes their way into the facility, only to face complications from within and without the team with secret agendas and double crosses all around. Meanwhile, Batman has his own concerns with an urgent search for The Joker's deadly bomb that threatens Gotham City. Eventually, all these players converge on Arkham Asylum for a showdown that few are going to escape alive.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZDU1ZGRiY2YtYmZjMi00ZDQwLWJjMWMtNzUwNDMwYjQ4ZTVhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZDU1ZGRiY2YtYmZjMi00ZDQwLWJjMWMtNzUwNDMwYjQ4ZTVhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX720.jpg",
    "Production": "WARNER BROTHERS PICTURES",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "75%"
      }
    ],
    "Released": "29 Jul 2014",
    "Response": "True",
    "Runtime": "76 min",
    "Title": "Batman: Assault on Arkham",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Heath Corson, Bob Kane (Batman created by), Lew Schwartz (Deadshot co-created by), John Ostrander (Amanda Waller created by), John Byrne (Amanda Waller created by), Paul Dini (Harley Quinn created by), Bruce Timm (Harley Quinn created by)",
    "Year": "2014",
    "imdbID": "tt3139086",
    "imdbRating": "7.5",
    "imdbVotes": "27,428"
  },
  "-LermI8TjpRh6lQ0fMpj": {
    "Actors": "Will Smith, Jaden Smith, Thandie Newton, Brian Howe",
    "Awards": "Nominated for 1 Oscar. Another 11 wins & 24 nominations.",
    "BoxOffice": "$162,586,036",
    "Country": "USA",
    "DVD": "27 Mar 2007",
    "Director": "Gabriele Muccino",
    "Genre": "Biography, Drama",
    "Language": "English, Cantonese",
    "Metascore": "64",
    "Plot": "Based on a true story about a man named Christopher Gardner. Gardner has invested heavily in a device known as a \"Bone Density scanner\". He feels like he has made these devices. However, they do not sell as they are marginally better than the current technology at a much higher price. As Gardner tries to figure out how to sell them, his wife leaves him, he loses his house, his bank account, and credit cards. Forced to live out in the streets with his son, Gardner is now desperate to find a steady job; he takes on a job as a stockbroker, but before he can receive pay, he needs to go through 6 months of training, and to sell his devices.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_SX720.jpg",
    "Production": "Sony Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "67%"
      },
      {
        "Source": "Metacritic",
        "Value": "64/100"
      }
    ],
    "Released": "15 Dec 2006",
    "Response": "True",
    "Runtime": "117 min",
    "Title": "The Pursuit of Happyness",
    "Type": "movie",
    "Website": "http://www.sonypictures.com/movies/thepursuitofhappyness/",
    "Writer": "Steve Conrad",
    "Year": "2006",
    "imdbID": "tt0454921",
    "imdbRating": "8.0",
    "imdbVotes": "403,685"
  },
  "-LermKGJLtM3JmCaa-O4": {
    "Actors": "Will Smith, Rosario Dawson, Woody Harrelson, Michael Ealy",
    "Awards": "5 wins & 6 nominations.",
    "BoxOffice": "$69,951,824",
    "Country": "USA",
    "DVD": "31 Mar 2009",
    "Director": "Gabriele Muccino",
    "Genre": "Drama, Romance",
    "Language": "English, Spanish",
    "Metascore": "36",
    "Plot": "Haunted by a secret, Ben Thomas looks for redemption by radically transforming the lives of seven people he doesn't know. Once his plan is set, nothing will be able to stop him. At least that's what he thinks. But Ben hadn't planned on falling in love with one of these people and she's the one who will end up transforming him.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTU0NzY0MTY5OF5BMl5BanBnXkFtZTcwODY3MDEwMg@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTU0NzY0MTY5OF5BMl5BanBnXkFtZTcwODY3MDEwMg@@._V1_SX720.jpg",
    "Production": "Sony Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "26%"
      },
      {
        "Source": "Metacritic",
        "Value": "36/100"
      }
    ],
    "Released": "19 Dec 2008",
    "Response": "True",
    "Runtime": "123 min",
    "Title": "Seven Pounds",
    "Type": "movie",
    "Website": "http://www.sevenpounds.com/",
    "Writer": "Grant Nieporte",
    "Year": "2008",
    "imdbID": "tt0814314",
    "imdbRating": "7.6",
    "imdbVotes": "266,586"
  },
  "-LermOpWzN1EkNqEbzPv": {
    "Actors": "Kevin Dorman, Matthew Mercer, Erin Cahill, John DeMita",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "Japan",
    "DVD": "18 Jul 2017",
    "Director": "Takanori Tsujimoto",
    "Genre": "Animation, Action, Adventure, Horror, Mystery, Sci-Fi",
    "Language": "English, Japanese",
    "Metascore": "N/A",
    "Plot": "Chris Redfield enlists the help of Leon S. Kennedy and Rebecca Chambers to stop a death merchant, with a vengeance, from spreading a deadly virus in New York.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg0OTQ0ODY1N15BMl5BanBnXkFtZTgwNjkxNjI4MTI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTg0OTQ0ODY1N15BMl5BanBnXkFtZTgwNjkxNjI4MTI@._V1_SX720.jpg",
    "Production": "Fathom Events",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "43%"
      }
    ],
    "Released": "27 May 2017",
    "Response": "True",
    "Runtime": "97 min",
    "Title": "Resident Evil: Vendetta",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Makoto Fukami (screenplay), Joe McClean (adaptation), Joe McClean (dialogue)",
    "Year": "2017",
    "imdbID": "tt5776208",
    "imdbRating": "6.3",
    "imdbVotes": "8,789"
  },
  "-LermRIngQafLxm3893M": {
    "Actors": "Natalie Dormer, Ed Skrein, Emily Ratajkowski, Joely Richardson",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "UK, USA",
    "DVD": "26 Jun 2018",
    "Director": "Anthony Byrne",
    "Genre": "Mystery, Thriller",
    "Language": "English, Serbo-Croatian, Russian",
    "Metascore": "59",
    "Plot": "A blind musician hears a murder committed in the apartment upstairs from hers that sends her down a dark path into London's gritty criminal underworld.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMjQ1NjM5Ml5BMl5BanBnXkFtZTgwOTI1OTY0NTM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjAxMjQ1NjM5Ml5BMl5BanBnXkFtZTgwOTI1OTY0NTM@._V1_SX720.jpg",
    "Production": "Vertical Entertainment",
    "Rated": "Not Rated",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "44%"
      },
      {
        "Source": "Metacritic",
        "Value": "59/100"
      }
    ],
    "Released": "25 May 2018",
    "Response": "True",
    "Runtime": "110 min",
    "Title": "In Darkness",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Anthony Byrne, Natalie Dormer (Co-Writer), Natalie Dormer",
    "Year": "2018",
    "imdbID": "tt5164184",
    "imdbRating": "5.8",
    "imdbVotes": "9,392"
  },
  "-LermWIVGtPfOXZywa6x": {
    "Actors": "Ryan Gosling, Carey Mulligan, Bryan Cranston, Albert Brooks",
    "Awards": "Nominated for 1 Oscar. Another 77 wins & 170 nominations.",
    "BoxOffice": "$34,300,000",
    "Country": "USA",
    "DVD": "31 Jan 2012",
    "Director": "Nicolas Winding Refn",
    "Genre": "Crime, Drama",
    "Language": "English, Spanish",
    "Metascore": "78",
    "Plot": "A mysterious man who has multiple jobs as a garage mechanic, a Hollywood stuntman and a getaway driver seems to be trying to escape his shady past as he falls for his neighbor - whose husband is in prison and who's looking after her child alone. Meanwhile, his garage mechanic boss is trying to set up a race team using gangland money, which implicates our driver as he is to be used as the race team's main driver. Our hero gets more than he bargained for when he meets the man who is married to the woman he loves.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZjY5ZjQyMjMtMmEwOC00Nzc2LTllYTItMmU2MzJjNTg1NjY0XkEyXkFqcGdeQXVyNjQ1MTMzMDQ@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZjY5ZjQyMjMtMmEwOC00Nzc2LTllYTItMmU2MzJjNTg1NjY0XkEyXkFqcGdeQXVyNjQ1MTMzMDQ@._V1_SX720.jpg",
    "Production": "FilmDistrict",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "92%"
      },
      {
        "Source": "Metacritic",
        "Value": "78/100"
      }
    ],
    "Released": "16 Sep 2011",
    "Response": "True",
    "Runtime": "100 min",
    "Title": "Drive",
    "Type": "movie",
    "Website": "http://www.drive-movie.com/",
    "Writer": "Hossein Amini (screenplay), James Sallis (book)",
    "Year": "2011",
    "imdbID": "tt0780504",
    "imdbRating": "7.8",
    "imdbVotes": "518,960"
  },
  "-LermajpWTUdYHW5OGEN": {
    "Actors": "Noomi Rapace, Michael Fassbender, Charlize Theron, Idris Elba",
    "Awards": "Nominated for 1 Oscar. Another 6 wins & 46 nominations.",
    "BoxOffice": "$126,464,904",
    "Country": "USA, UK",
    "DVD": "09 Oct 2012",
    "Director": "Ridley Scott",
    "Genre": "Adventure, Mystery, Sci-Fi",
    "Language": "English, Scottish Gaelic",
    "Metascore": "64",
    "Plot": "This film is set in 2093 and takes place in the same universe as the 'Alien' movies. A group of explorers, including some archaeologists, are on an \"undisclosed\" mission. They arrive at a moon trillions of miles away from Earth. The team spot what they believe to be signs of civilization. They go to investigate and find more than just signs, they find conclusive evidence. But some of them have an ulterior motive for being there, including the Weyland Corporation. They believe that this is where the human race actually came from. Things soon turn from excitement to survival once inside their discovery.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTY3NzIyNTA2NV5BMl5BanBnXkFtZTcwNzE2NjI4Nw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTY3NzIyNTA2NV5BMl5BanBnXkFtZTcwNzE2NjI4Nw@@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "73%"
      },
      {
        "Source": "Metacritic",
        "Value": "64/100"
      }
    ],
    "Released": "08 Jun 2012",
    "Response": "True",
    "Runtime": "124 min",
    "Title": "Prometheus",
    "Type": "movie",
    "Website": "http://www.prometheus-movie.com/",
    "Writer": "Jon Spaihts, Damon Lindelof, Dan O'Bannon (based on elements created by), Ronald Shusett (based on elements created by)",
    "Year": "2012",
    "imdbID": "tt1446714",
    "imdbRating": "7.0",
    "imdbVotes": "536,295"
  },
  "-Lermc4BiSCOxTKCNogf": {
    "Actors": "Michael Fassbender, Katherine Waterston, Billy Crudup, Danny McBride",
    "Awards": "1 win & 12 nominations.",
    "BoxOffice": "$74,255,908",
    "Country": "USA, UK",
    "DVD": "15 Aug 2017",
    "Director": "Ridley Scott",
    "Genre": "Horror, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "65",
    "Plot": "The crew of the colony ship Covenant, bound for a remote planet on the far side of the galaxy, discovers what they think is an uncharted paradise, but is actually a dark, dangerous world. When they uncover a threat beyond their imagination, they must attempt a harrowing escape",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYzVkMjRhNzctOGQxMC00OGE2LWJhN2EtNmYyODRiMDNlM2ZmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYzVkMjRhNzctOGQxMC00OGE2LWJhN2EtNmYyODRiMDNlM2ZmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "65%"
      },
      {
        "Source": "Metacritic",
        "Value": "65/100"
      }
    ],
    "Released": "19 May 2017",
    "Response": "True",
    "Runtime": "122 min",
    "Title": "Alien: Covenant",
    "Type": "movie",
    "Website": "http://www.foxmovies.com/movies/alien-covenant",
    "Writer": "Dan O'Bannon (based on characters created by), Ronald Shusett (based on characters created by), Jack Paglen (story by), Michael Green (story by), John Logan (screenplay by), Dante Harper (screenplay by)",
    "Year": "2017",
    "imdbID": "tt2316204",
    "imdbRating": "6.4",
    "imdbVotes": "223,481"
  },
  "-Lermipea6k53rSyHG8r": {
    "Actors": "Matt Damon, Emily Blunt, Lisa Thoreson, Florence Kastriner",
    "Awards": "1 win & 9 nominations.",
    "BoxOffice": "$62,453,315",
    "Country": "USA",
    "DVD": "21 Jun 2011",
    "Director": "George Nolfi",
    "Genre": "Romance, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "60",
    "Plot": "Do we control our destiny, or do unseen forces manipulate us? A man glimpses the future Fate has planned for him and realizes he wants something else. To get it, he must pursue across, under and through the streets of modern-day New York the only woman he's ever loved. On the brink of winning a seat in the U.S. Senate, ambitious politician David Norris (Matt Damon) meets beautiful contemporary ballet dancer Elise Sellas (Emily Blunt), a woman like none he's ever known. But just as he realizes he's falling for her, mysterious men conspire to keep the two apart. David learns he is up against the agents of Fate itself, the men of The Adjustment Bureau, who will do everything in their considerable power to prevent David and Elise from being together. In the face of overwhelming odds, he must either let her go and accept a predetermined path... or risk everything to defy Fate and be with her.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzc0ZDcwZTYtOWUzZi00NDE4LWI4NjgtMWVjZTUyYTA2ZTNhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMzc0ZDcwZTYtOWUzZi00NDE4LWI4NjgtMWVjZTUyYTA2ZTNhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "71%"
      },
      {
        "Source": "Metacritic",
        "Value": "60/100"
      }
    ],
    "Released": "04 Mar 2011",
    "Response": "True",
    "Runtime": "106 min",
    "Title": "The Adjustment Bureau",
    "Type": "movie",
    "Website": "http://www.theadjustmentbureau.com/",
    "Writer": "George Nolfi (screenplay), Philip K. Dick (short story \"Adjustment Team\")",
    "Year": "2011",
    "imdbID": "tt1385826",
    "imdbRating": "7.1",
    "imdbVotes": "226,689"
  },
  "-LermlEdPlUencEF9C5E": {
    "Actors": "Emily Blunt, John Krasinski, Millicent Simmonds, Noah Jupe",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "10 Jul 2018",
    "Director": "John Krasinski",
    "Genre": "Drama, Horror, Mystery, Sci-Fi, Thriller",
    "Language": "English, American Sign Language",
    "Metascore": "82",
    "Plot": "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX720.jpg",
    "Production": "Paramount Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "95%"
      },
      {
        "Source": "Metacritic",
        "Value": "82/100"
      }
    ],
    "Released": "06 Apr 2018",
    "Response": "True",
    "Runtime": "90 min",
    "Title": "A Quiet Place",
    "Type": "movie",
    "Website": "https://www.facebook.com/AQuietPlaceMovie",
    "Writer": "Bryan Woods (screenplay by), Scott Beck (screenplay by), John Krasinski (screenplay by), Bryan Woods (story by), Scott Beck (story by)",
    "Year": "2018",
    "imdbID": "tt6644200",
    "imdbRating": "7.6",
    "imdbVotes": "298,515"
  },
  "-Lermux5DbbMigqh1WCt": {
    "Actors": "Tom Cruise, Emily Blunt, Brendan Gleeson, Bill Paxton",
    "Awards": "11 wins & 37 nominations.",
    "BoxOffice": "$77,121,429",
    "Country": "USA, Canada",
    "DVD": "07 Oct 2014",
    "Director": "Doug Liman",
    "Genre": "Action, Sci-Fi",
    "Language": "English",
    "Metascore": "71",
    "Plot": "An alien race has hit the Earth in an unrelenting assault, unbeatable by any military unit in the world. Major William Cage (Cruise) is an officer who has never seen a day of combat when he is unceremoniously dropped into what amounts to a suicide mission. Killed within minutes, Cage now finds himself inexplicably thrown into a time loop-forcing him to live out the same brutal combat over and over, fighting and dying again...and again. But with each battle, Cage becomes able to engage the adversaries with increasing skill, alongside Special Forces warrior Rita Vrataski (Blunt). And, as Cage and Vrataski take the fight to the aliens, each repeated encounter gets them one step closer to defeating the enemy!",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3M15BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3M15BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "90%"
      },
      {
        "Source": "Metacritic",
        "Value": "71/100"
      }
    ],
    "Released": "06 Jun 2014",
    "Response": "True",
    "Runtime": "113 min",
    "Title": "Edge of Tomorrow",
    "Type": "movie",
    "Website": "http://www.edgeoftomorrowmovie.com",
    "Writer": "Christopher McQuarrie (screenplay by), Jez Butterworth (screenplay by), John-Henry Butterworth (screenplay by), Hiroshi Sakurazaka (based on the novel \"All You Need Is Kill\" by)",
    "Year": "2014",
    "imdbID": "tt1631867",
    "imdbRating": "7.9",
    "imdbVotes": "541,744"
  },
  "-LermxoFROh2n5jKyiHM": {
    "Actors": "Christopher Shyer, Ray Galletti, Eileen Pedde, Rekha Sharma",
    "Awards": "N/A",
    "BoxOffice": "$31,042,346",
    "Country": "USA, Germany, Canada, UK",
    "DVD": "09 Sep 2003",
    "Director": "Jon Amiel",
    "Genre": "Action, Adventure, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "48",
    "Plot": "The Earth's core has stopped spinning. Disasters are appearing all over the world: Birds acting crazy, powerful thunderstorms, 32 people die within seconds of each other when their pacemakers quit working. Dr. Josh Keyes and his crew of five (total members: 6) go down to the center of the Earth to set off a nuclear device to make the Earth's core start spinning again or Mankind will perish.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTY3MTY3MzkzNl5BMl5BanBnXkFtZTYwNTAwNDk2._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTY3MTY3MzkzNl5BMl5BanBnXkFtZTYwNTAwNDk2._V1_SX720.jpg",
    "Production": "Paramount Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "40%"
      },
      {
        "Source": "Metacritic",
        "Value": "48/100"
      }
    ],
    "Released": "28 Mar 2003",
    "Response": "True",
    "Runtime": "135 min",
    "Title": "The Core",
    "Type": "movie",
    "Website": "http://www.thecoremovie.com/",
    "Writer": "Cooper Layne, John Rogers",
    "Year": "2003",
    "imdbID": "tt0298814",
    "imdbRating": "5.5",
    "imdbVotes": "85,643"
  },
  "-Lern01oTL4S0x3m34Wd": {
    "Actors": "Robert De Niro, Ray Liotta, Joe Pesci, Lorraine Bracco",
    "Awards": "Won 1 Oscar. Another 43 wins & 37 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "26 Mar 1997",
    "Director": "Martin Scorsese",
    "Genre": "Biography, Crime, Drama",
    "Language": "English, Italian",
    "Metascore": "89",
    "Plot": "Henry Hill might be a small time gangster, who may have taken part in a robbery with Jimmy Conway and Tommy De Vito, two other gangsters who might have set their sights a bit higher. His two partners could kill off everyone else involved in the robbery, and slowly start to think about climbing up through the hierarchy of the Mob. Henry, however, might be badly affected by his partners' success, but will he consider stooping low enough to bring about the downfall of Jimmy and Tommy?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX720.jpg",
    "Production": "Warner Bros.",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "96%"
      },
      {
        "Source": "Metacritic",
        "Value": "89/100"
      }
    ],
    "Released": "21 Sep 1990",
    "Response": "True",
    "Runtime": "146 min",
    "Title": "Goodfellas",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Nicholas Pileggi (book), Nicholas Pileggi (screenplay), Martin Scorsese (screenplay)",
    "Year": "1990",
    "imdbID": "tt0099685",
    "imdbRating": "8.7",
    "imdbVotes": "897,033"
  },
  "-Lern343Bu7r4iD4AC4n": {
    "Actors": "Judah Lewis, Samara Weaving, Robbie Amell, Hana Mae Lee",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "N/A",
    "Director": "McG",
    "Genre": "Comedy, Horror",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "Cole (Judah Lewis) is madly in love with his babysitter (Samara Weaving) Bee. She's hot, funny, and popular. One night, in a moment of defiance, Cole secretly stays up his bedtime to discover she's actually a cold-blooded killer who's in league with the Devil. He now must spend his night evading Bee's band of killers who will stop at nothing to prevent Cole from spilling their dark secret. It's up to Cole to survive the night (and blow up a few people along the way).",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTY0MDUwNzg5OV5BMl5BanBnXkFtZTgwNTY4NjU3MzI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTY0MDUwNzg5OV5BMl5BanBnXkFtZTgwNTY4NjU3MzI@._V1_SX720.jpg",
    "Production": "Marvista Entertainment",
    "Rated": "TV-MA",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.3/10"
      }
    ],
    "Released": "13 Oct 2017",
    "Response": "True",
    "Runtime": "85 min",
    "Title": "The Babysitter",
    "Type": "movie",
    "Website": "http://www.babysitterfilm.com/",
    "Writer": "Brian Duffield",
    "Year": "2017",
    "imdbID": "tt4225622",
    "imdbRating": "6.3",
    "imdbVotes": "45,209"
  },
  "-Lern5Iue6SowNg6Kma9": {
    "Actors": "Colin Ford, Joel Gretsch, Djimon Hounsou, Dakota Fanning",
    "Awards": "1 win & 2 nominations.",
    "BoxOffice": "$31,730,682",
    "Country": "USA, Canada",
    "DVD": "07 Jul 2009",
    "Director": "Paul McGuigan",
    "Genre": "Action, Sci-Fi, Thriller",
    "Language": "English, Cantonese",
    "Metascore": "36",
    "Plot": "A group of young American ex-pats with telekinetic and clairvoyant abilities are hiding from a clandestine U.S. government agency. They must utilize their different talents and band together for a final job enabling them to escape the agency forever.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTM2NjE5NTYzMl5BMl5BanBnXkFtZTcwNzc3OTMyMg@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTM2NjE5NTYzMl5BMl5BanBnXkFtZTcwNzc3OTMyMg@@._V1_SX720.jpg",
    "Production": "Summit Entertainment",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "23%"
      },
      {
        "Source": "Metacritic",
        "Value": "36/100"
      }
    ],
    "Released": "06 Feb 2009",
    "Response": "True",
    "Runtime": "111 min",
    "Title": "Push",
    "Type": "movie",
    "Website": "http://www.push-themovie.com/",
    "Writer": "David Bourla",
    "Year": "2009",
    "imdbID": "tt0465580",
    "imdbRating": "6.1",
    "imdbVotes": "100,018"
  },
  "-Lern7W42gIMNv6_eM5D": {
    "Actors": "James Badge Dale, Emily Mortimer, Bruce Greenwood, Max Martini",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "N/A",
    "Director": "Nic Mathieu",
    "Genre": "Action, Mystery, Sci-Fi, Thriller",
    "Language": "English, Russian, Romanian, Slovenian",
    "Metascore": "N/A",
    "Plot": "Civil Unrest in the European country of Moldova has US forces engaging the insurgents however there is a new threat who has decided both are their enemy. This new threat resides in an alternative spectrum that makes them invisible to the naked eye and instant death to anyone confronting them. Locals believe they are Spirits of War but others believe they are superior arms technology fabricated by the Moldova government..",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYWQxN2I1NjItMDVjMS00ZmJjLWIyYjItOWI2OGY5NTU1ZjI2L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTc3MjM3OTA@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYWQxN2I1NjItMDVjMS00ZmJjLWIyYjItOWI2OGY5NTU1ZjI2L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTc3MjM3OTA@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.3/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "75%"
      }
    ],
    "Released": "09 Dec 2016",
    "Response": "True",
    "Runtime": "107 min",
    "Title": "Spectral",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Ian Fried (story), Nic Mathieu (story), George Nolfi",
    "Year": "2016",
    "imdbID": "tt2106651",
    "imdbRating": "6.3",
    "imdbVotes": "42,673"
  },
  "-LernB9ofpTT4PXDSzN_": {
    "Actors": "Logan Marshall-Green, Melanie Vallejo, Steve Danielsen, Abby Craden",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "Australia",
    "DVD": "28 Aug 2018",
    "Director": "Leigh Whannell",
    "Genre": "Action, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "67",
    "Plot": "Set in the near-future, technology controls nearly all aspects of life. But when Grey, a self-identified technophobe, has his world turned upside down, his only hope for revenge is an experimental computer chip implant called Stem.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjI0NzcyMjM5Ml5BMl5BanBnXkFtZTgwMzk2NzAyNTM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjI0NzcyMjM5Ml5BMl5BanBnXkFtZTgwMzk2NzAyNTM@._V1_SX720.jpg",
    "Production": "Blumhouse Productions",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "87%"
      },
      {
        "Source": "Metacritic",
        "Value": "67/100"
      }
    ],
    "Released": "01 Jun 2018",
    "Response": "True",
    "Runtime": "100 min",
    "Title": "Upgrade",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Leigh Whannell",
    "Year": "2018",
    "imdbID": "tt6499752",
    "imdbRating": "7.6",
    "imdbVotes": "99,779"
  },
  "-LernFFJatxHblKMDaNo": {
    "Actors": "Elle Fanning, Karl Glusman, Jena Malone, Bella Heathcote",
    "Awards": "18 wins & 31 nominations.",
    "BoxOffice": "N/A",
    "Country": "Denmark, France, USA, UK",
    "DVD": "27 Sep 2016",
    "Director": "Nicolas Winding Refn",
    "Genre": "Horror, Thriller",
    "Language": "English",
    "Metascore": "51",
    "Plot": "The sixteen year-old aspiring model Jesse arrives in Los Angeles expecting to be a successful model. The aspirant photographer Dean takes photos for her portfolio and dates her. Jesse befriends the lesbian makeup artist Ruby and then the envious models Gigi and Sarah in a party. Meanwhile the agency considers Jesse beautiful with a \"thing\" that makes her different and she is sent to the professional photographer Jack. Jesse attracts he attention of the industry and has a successful beginning of career. But Ruby, Gigi and Sarah are capable to do anything to get her \"thing\".",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTAyOTkxNTQ3NV5BMl5BanBnXkFtZTgwMjQ1NzQxOTE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNTAyOTkxNTQ3NV5BMl5BanBnXkFtZTgwMjQ1NzQxOTE@._V1_SX720.jpg",
    "Production": "Space Rocket Nation",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "58%"
      },
      {
        "Source": "Metacritic",
        "Value": "51/100"
      }
    ],
    "Released": "24 Jun 2016",
    "Response": "True",
    "Runtime": "117 min",
    "Title": "The Neon Demon",
    "Type": "movie",
    "Website": "http://theneondemon.com/",
    "Writer": "Nicolas Winding Refn (story by), Nicolas Winding Refn (screenplay by), Mary Laws (screenplay by), Polly Stenham (screenplay by)",
    "Year": "2016",
    "imdbID": "tt1974419",
    "imdbRating": "6.2",
    "imdbVotes": "71,534"
  },
  "-LernI09l6DJpJZycKLw": {
    "Actors": "Hugh Jackman, Jake Gyllenhaal, Viola Davis, Maria Bello",
    "Awards": "Nominated for 1 Oscar. Another 10 wins & 35 nominations.",
    "BoxOffice": "$60,962,878",
    "Country": "USA",
    "DVD": "17 Dec 2013",
    "Director": "Denis Villeneuve",
    "Genre": "Crime, Drama, Mystery, Thriller",
    "Language": "English",
    "Metascore": "74",
    "Plot": "How far would you go to protect your family? Keller Dover is facing every parent's worst nightmare. His six-year-old daughter, Anna, is missing, together with her young friend, Joy, and as minutes turn to hours, panic sets in. The only lead is a dilapidated RV that had earlier been parked on their street. Heading the investigation, Detective Loki arrests its driver, Alex Jones, but a lack of evidence forces his release. As the police pursue multiple leads and pressure mounts, knowing his child's life is at stake the frantic Dover decides he has no choice but to take matters into his own hands. But just how far will this desperate father go to protect his family?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTg0NTIzMjQ1NV5BMl5BanBnXkFtZTcwNDc3MzM5OQ@@._V1_SX720.jpg",
    "Production": "Warner Bros.",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "80%"
      },
      {
        "Source": "Metacritic",
        "Value": "74/100"
      }
    ],
    "Released": "20 Sep 2013",
    "Response": "True",
    "Runtime": "153 min",
    "Title": "Prisoners",
    "Type": "movie",
    "Website": "http://prisonersmovie.warnerbros.com/",
    "Writer": "Aaron Guzikowski",
    "Year": "2013",
    "imdbID": "tt1392214",
    "imdbRating": "8.1",
    "imdbVotes": "522,331"
  },
  "-LernOfT13IRpppHFY-y": {
    "Actors": "Jake Gyllenhaal, Rachel McAdams, Forest Whitaker, Oona Laurence",
    "Awards": "10 nominations.",
    "BoxOffice": "$42,373,328",
    "Country": "Hong Kong, USA",
    "DVD": "27 Oct 2015",
    "Director": "Antoine Fuqua",
    "Genre": "Drama, Sport",
    "Language": "English",
    "Metascore": "57",
    "Plot": "As tragedy strikes him in his prime, famed boxer, Billy Hope, begins to fall into a great depression. Once the decision regarding the custody of his daughter is under question, Billy decides to get his life back on track by getting back into the ring.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjI1MTcwODk0MV5BMl5BanBnXkFtZTgwMTgwMDM5NTE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjI1MTcwODk0MV5BMl5BanBnXkFtZTgwMTgwMDM5NTE@._V1_SX720.jpg",
    "Production": "The Weinstein Company",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "59%"
      },
      {
        "Source": "Metacritic",
        "Value": "57/100"
      }
    ],
    "Released": "24 Jul 2015",
    "Response": "True",
    "Runtime": "124 min",
    "Title": "Southpaw",
    "Type": "movie",
    "Website": "http://southpawfilm.com/",
    "Writer": "Kurt Sutter",
    "Year": "2015",
    "imdbID": "tt1798684",
    "imdbRating": "7.4",
    "imdbVotes": "198,833"
  },
  "-LernR7BBxL3hgq1hn-3": {
    "Actors": "Jake Gyllenhaal, Michael Papajohn, Marco Rodríguez, Bill Paxton",
    "Awards": "Nominated for 1 Oscar. Another 43 wins & 120 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "10 Feb 2015",
    "Director": "Dan Gilroy",
    "Genre": "Crime, Drama, Thriller",
    "Language": "English",
    "Metascore": "76",
    "Plot": "NIGHTCRAWLER is a thriller set in the nocturnal underbelly of contemporary Los Angeles. Jake Gyllenhaal stars as Lou Bloom, a driven young man desperate for work who discovers the high-speed world of L.A. crime journalism. Finding a group of freelance camera crews who film crashes, fires, murder and other mayhem, Lou muscles into the cut-throat, dangerous realm of nightcrawling - where each police siren wail equals a possible windfall and victims are converted into dollars and cents. Aided by Rene Russo as Nina, a veteran of the blood-sport that is local TV news, Lou blurs the line between observer and participant to become the star of his own story.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2U1YzdhYWMtZWUzMi00OWI1LWFkM2ItNWVjM2YxMGQ2MmNhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BN2U1YzdhYWMtZWUzMi00OWI1LWFkM2ItNWVjM2YxMGQ2MmNhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX720.jpg",
    "Production": "Open Road Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "95%"
      },
      {
        "Source": "Metacritic",
        "Value": "76/100"
      }
    ],
    "Released": "31 Oct 2014",
    "Response": "True",
    "Runtime": "117 min",
    "Title": "Nightcrawler",
    "Type": "movie",
    "Website": "http://nightcrawlerfilm.com/",
    "Writer": "Dan Gilroy",
    "Year": "2014",
    "imdbID": "tt2872718",
    "imdbRating": "7.9",
    "imdbVotes": "401,870"
  },
  "-LernTxzmWe6BiOo841Q": {
    "Actors": "Jake Gyllenhaal, Michael Peña, Natalie Martinez, Anna Kendrick",
    "Awards": "3 wins & 10 nominations.",
    "BoxOffice": "$39,100,000",
    "Country": "USA",
    "DVD": "22 Jan 2013",
    "Director": "David Ayer",
    "Genre": "Action, Crime, Drama, Thriller",
    "Language": "English, Spanish",
    "Metascore": "68",
    "Plot": "In South Central Los Angeles, street cops Brian and Mike are partners - balls-out cowboys patrolling the streets as Latino gangs are in a power struggle with Blacks. Brian and Mike get lucky a couple of times, making big drug and human-trafficking busts, so a Mexican cartel orders their deaths. We meet Mike's pregnant wife (whom he married out of high school) and watch Brian's search for a soul mate. There are internal squabbles within the ranks of the LAPD and lots of squad-car conversation. Can the lads escape the cartel's murderous reach?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjU0ODU5Ml5BMl5BanBnXkFtZTcwNjI4MzAyOA@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjMxNjU0ODU5Ml5BMl5BanBnXkFtZTcwNjI4MzAyOA@@._V1_SX720.jpg",
    "Production": "Open Road Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "85%"
      },
      {
        "Source": "Metacritic",
        "Value": "68/100"
      }
    ],
    "Released": "21 Sep 2012",
    "Response": "True",
    "Runtime": "109 min",
    "Title": "End of Watch",
    "Type": "movie",
    "Website": "http://www.endofwatchthefilm.com/",
    "Writer": "David Ayer",
    "Year": "2012",
    "imdbID": "tt1855199",
    "imdbRating": "7.6",
    "imdbVotes": "210,163"
  },
  "-LernWCfjLrau_AfBoQN": {
    "Actors": "Jake Gyllenhaal, Mark Ruffalo, Anthony Edwards, Robert Downey Jr.",
    "Awards": "2 wins & 67 nominations.",
    "BoxOffice": "$33,000,000",
    "Country": "USA",
    "DVD": "24 Jul 2007",
    "Director": "David Fincher",
    "Genre": "Crime, Drama, Mystery, Thriller",
    "Language": "English",
    "Metascore": "78",
    "Plot": "A serial killer in the San Francisco Bay Area taunts police with his letters and cryptic messages. We follow the investigators and reporters in this lightly fictionalized account of the true 1970's case as they search for the murderer, becoming obsessed with the case. Based on Robert Graysmith's book, the movie's focus is the lives and careers of the detectives and newspaper people.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2UwNDc5NmEtNjVjZS00OTI5LWE5YjctMWM3ZjBiZGYwMGI2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BN2UwNDc5NmEtNjVjZS00OTI5LWE5YjctMWM3ZjBiZGYwMGI2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX720.jpg",
    "Production": "Paramount Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "90%"
      },
      {
        "Source": "Metacritic",
        "Value": "78/100"
      }
    ],
    "Released": "02 Mar 2007",
    "Response": "True",
    "Runtime": "157 min",
    "Title": "Zodiac",
    "Type": "movie",
    "Website": "http://www.ZodiacMovie.com/",
    "Writer": "James Vanderbilt (screenplay), Robert Graysmith (book)",
    "Year": "2007",
    "imdbID": "tt0443706",
    "imdbRating": "7.7",
    "imdbVotes": "387,868"
  },
  "-LernYqEnWVnXYNmZFQH": {
    "Actors": "Amy Adams, Jake Gyllenhaal, Michael Shannon, Aaron Taylor-Johnson",
    "Awards": "Nominated for 1 Oscar. Another 16 wins & 133 nominations.",
    "BoxOffice": "$10,639,114",
    "Country": "USA",
    "DVD": "21 Feb 2017",
    "Director": "Tom Ford",
    "Genre": "Drama, Thriller",
    "Language": "English",
    "Metascore": "67",
    "Plot": "A \"story inside a story,\" in which the first part follows a woman named Susan who receives a book manuscript from her ex-husband, a man whom she left 20 years earlier, asking for her opinion. The second element follows the actual manuscript, called \"Nocturnal Animals,\" which revolves around a man whose family vacation turns violent and deadly. It also continues to follow the story of Susan, who finds herself recalling her first marriage and confronting some dark truths about herself.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwMzMwMzgxNl5BMl5BanBnXkFtZTgwMTA0MTUzMDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTYwMzMwMzgxNl5BMl5BanBnXkFtZTgwMTA0MTUzMDI@._V1_SX720.jpg",
    "Production": "Focus Features",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "73%"
      },
      {
        "Source": "Metacritic",
        "Value": "67/100"
      }
    ],
    "Released": "09 Dec 2016",
    "Response": "True",
    "Runtime": "116 min",
    "Title": "Nocturnal Animals",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Tom Ford (screenplay by), Austin Wright (novel)",
    "Year": "2016",
    "imdbID": "tt4550098",
    "imdbRating": "7.5",
    "imdbVotes": "203,074"
  },
  "-LernaqoTw2bIxeMRxmb": {
    "Actors": "Ethan Hawke, Sarah Snook, Christopher Kirby, Christopher Sommers",
    "Awards": "11 wins & 18 nominations.",
    "BoxOffice": "$201,560",
    "Country": "Australia, USA",
    "DVD": "10 Feb 2015",
    "Director": "Michael Spierig, Peter Spierig",
    "Genre": "Drama, Mystery, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "69",
    "Plot": "PREDESTINATION chronicles the life of a Temporal Agent sent on an intricate series of time-travel journeys designed to ensure the continuation of his law enforcement career for all eternity. Now, on his final assignment, the Agent must pursue the one criminal that has eluded him throughout time.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTAzODc3NjU1NzNeQTJeQWpwZ15BbWU4MDk5NTQ4NTMx._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTAzODc3NjU1NzNeQTJeQWpwZ15BbWU4MDk5NTQ4NTMx._V1_SX720.jpg",
    "Production": "Sony Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "84%"
      },
      {
        "Source": "Metacritic",
        "Value": "69/100"
      }
    ],
    "Released": "09 Jan 2015",
    "Response": "True",
    "Runtime": "97 min",
    "Title": "Predestination",
    "Type": "movie",
    "Website": "http://www.facebook.com/PredestinationMovie",
    "Writer": "Michael Spierig, Peter Spierig, Robert A. Heinlein (based on the short story \"All You Zombies\" by)",
    "Year": "2014",
    "imdbID": "tt2397535",
    "imdbRating": "7.5",
    "imdbVotes": "223,867"
  },
  "-LerndSthMsAXzf-U5s_": {
    "Actors": "Beckam Crawford, Riley Keough, Jeffrey Wright, Michael Tayles",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "28 Sep 2018",
    "Director": "Jeremy Saulnier",
    "Genre": "Adventure, Drama, Horror, Mystery, Thriller",
    "Language": "English",
    "Metascore": "63",
    "Plot": "After the deaths of three children suspected to be killed by wolves, writer Russell Core is hired by the parents of a missing six-year-old boy to track down and locate their son in the Alaskan wilderness.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMwOTQ1MzM3M15BMl5BanBnXkFtZTgwODQyNDQxNjM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjMwOTQ1MzM3M15BMl5BanBnXkFtZTgwODQyNDQxNjM@._V1_SX720.jpg",
    "Production": "Netflix",
    "Rated": "TV-MA",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "71%"
      },
      {
        "Source": "Metacritic",
        "Value": "63/100"
      }
    ],
    "Released": "28 Sep 2018",
    "Response": "True",
    "Runtime": "125 min",
    "Title": "Hold the Dark",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Macon Blair (screenplay by), William Giraldi (based on the book by)",
    "Year": "2018",
    "imdbID": "tt5057140",
    "imdbRating": "5.6",
    "imdbVotes": "25,991"
  },
  "-Lernhna7vU_ep7Q9KLo": {
    "Actors": "Joaquin Phoenix, Lynn Adrianna, Lisa Renee Pitts, Gabe Gomez",
    "Awards": "Won 1 Oscar. Another 82 wins & 181 nominations.",
    "BoxOffice": "$17,901,029",
    "Country": "USA",
    "DVD": "13 May 2014",
    "Director": "Spike Jonze",
    "Genre": "Drama, Romance, Sci-Fi",
    "Language": "English",
    "Metascore": "90",
    "Plot": "Theodore is a lonely man in the final stages of his divorce. When he's not working as a letter writer, his down time is spent playing video games and occasionally hanging out with friends. He decides to purchase the new OS1, which is advertised as the world's first artificially intelligent operating system, \"It's not just an operating system, it's a consciousness,\" the ad states. Theodore quickly finds himself drawn in with Samantha, the voice behind his OS1. As they start spending time together they grow closer and closer and eventually find themselves in love. Having fallen in love with his OS, Theodore finds himself dealing with feelings of both great joy and doubt. As an OS, Samantha has powerful intelligence that she uses to help Theodore in ways others hadn't, but how does she help him deal with his inner conflict of being in love with an OS?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "94%"
      },
      {
        "Source": "Metacritic",
        "Value": "90/100"
      }
    ],
    "Released": "10 Jan 2014",
    "Response": "True",
    "Runtime": "126 min",
    "Title": "Her",
    "Type": "movie",
    "Website": "http://www.herthemovie.com/",
    "Writer": "Spike Jonze",
    "Year": "2013",
    "imdbID": "tt1798709",
    "imdbRating": "8.0",
    "imdbVotes": "462,503"
  },
  "-LernlGlma4IwPpChCsf": {
    "Actors": "Jamie Foxx, Gerard Butler, Colm Meaney, Bruce McGill",
    "Awards": "3 wins & 5 nominations.",
    "BoxOffice": "$73,343,413",
    "Country": "USA",
    "DVD": "16 Feb 2010",
    "Director": "F. Gary Gray",
    "Genre": "Crime, Drama, Thriller",
    "Language": "English",
    "Metascore": "34",
    "Plot": "Clyde Shelton's family is brutally murdered. The ones responsible are caught. However, because of improper procedure, the D.A., Nick Rice only has circumstantial evidence. So he decides to get one of them to testify against the other. When Shelton learns of this, he is not happy. Ten years later, the one who was convicted is being executed but something goes wrong; his execution goes awry and he suffers. They learn that someone tampered with the machine. And the other one is found dead, killed in a gruesome manner. Rice suspects Shelton, so he has him picked up. At first, Shelton agrees to a plea agreement with Rice but changes his mind. It appears that Shelton is not done, it appears he blames the whole system and is declaring war on it going after everyone involved with his family's case. So Rice has to stop him but Shelton is way ahead of him.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTMyODY1NTg1N15BMl5BanBnXkFtZTcwMTUyODI4Mg@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTMyODY1NTg1N15BMl5BanBnXkFtZTcwMTUyODI4Mg@@._V1_SX720.jpg",
    "Production": "Overture Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.4/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "26%"
      },
      {
        "Source": "Metacritic",
        "Value": "34/100"
      }
    ],
    "Released": "16 Oct 2009",
    "Response": "True",
    "Runtime": "109 min",
    "Title": "Law Abiding Citizen",
    "Type": "movie",
    "Website": "http://www.lawabidingcitizenfilm.com/",
    "Writer": "Kurt Wimmer",
    "Year": "2009",
    "imdbID": "tt1197624",
    "imdbRating": "7.4",
    "imdbVotes": "251,291"
  },
  "-Lernoa0OoxZmUwHIgHC": {
    "Actors": "Kevin Bacon, Garrett Hedlund, Kelly Preston, Jordan Garrett",
    "Awards": "3 nominations.",
    "BoxOffice": "$9,479,756",
    "Country": "USA",
    "DVD": "08 Jan 2008",
    "Director": "James Wan",
    "Genre": "Action, Crime, Thriller",
    "Language": "English",
    "Metascore": "36",
    "Plot": "Nick Hume is a mild-mannered executive with a perfect life, until one gruesome night he witnesses something that changes him forever. Transformed by grief, Hume eventually comes to the disturbing conclusion that no length is too great when protecting his family.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZWMzY2QxMjYtYTYwMy00YjMyLTgxODUtNWNhODgxNGU0YTk5L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZWMzY2QxMjYtYTYwMy00YjMyLTgxODUtNWNhODgxNGU0YTk5L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX720.jpg",
    "Production": "Fox Atomic",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "21%"
      },
      {
        "Source": "Metacritic",
        "Value": "36/100"
      }
    ],
    "Released": "31 Aug 2007",
    "Response": "True",
    "Runtime": "105 min",
    "Title": "Death Sentence",
    "Type": "movie",
    "Website": "http://www.deathsentencemovie.com/",
    "Writer": "Ian Mackenzie Jeffers (screenplay), Brian Garfield (novel)",
    "Year": "2007",
    "imdbID": "tt0804461",
    "imdbRating": "6.8",
    "imdbVotes": "65,915"
  },
  "-LernrMKQFzbIR6xcP80": {
    "Actors": "Maika Monroe, Ed Skrein, Gary Oldman, Fiston Barek",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "29 Jun 2018",
    "Director": "Federico D'Alessandro",
    "Genre": "Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "43",
    "Plot": "A woman is held captive by a scientist in a futuristic smart house, and hopes to escape by reasoning with the Artificial Intelligence that controls the house.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNmYzYWNhYWQtNjg0MS00NWU5LTgyZGUtYzViNjgwY2NjY2YwXkEyXkFqcGdeQXVyNjYzMzU4OTg@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNmYzYWNhYWQtNjg0MS00NWU5LTgyZGUtYzViNjgwY2NjY2YwXkEyXkFqcGdeQXVyNjYzMzU4OTg@._V1_SX720.jpg",
    "Production": "Addictive Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "18%"
      },
      {
        "Source": "Metacritic",
        "Value": "43/100"
      }
    ],
    "Released": "29 Jun 2018",
    "Response": "True",
    "Runtime": "97 min",
    "Title": "Tau",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Noga Landau",
    "Year": "2018",
    "imdbID": "tt4357394",
    "imdbRating": "5.8",
    "imdbVotes": "19,923"
  },
  "-Lernuoo_67O-6OmE03v": {
    "Actors": "Sam Worthington, Jeffrey Dean Morgan, Jessica Chastain, Chloë Grace Moretz",
    "Awards": "4 wins & 3 nominations.",
    "BoxOffice": "$45,282",
    "Country": "USA",
    "DVD": "31 Jan 2012",
    "Director": "Ami Canaan Mann",
    "Genre": "Crime, Drama, History, Thriller",
    "Language": "English",
    "Metascore": "49",
    "Plot": "Souder, a homicide detective in a small Texan town, and his partner, transplanted New York City cop Detective Heigh, track a sadistic serial killer dumping his victims' mutilated bodies in a nearby marsh locals call 'The Killing Fields'. Though the swampland crime scenes are outside their jurisdiction, Detective Heigh is unable to turn his back on solving the gruesome murders. Despite his partner's warnings, he sets out to investigate the crimes. Before long, the killer changes the game and begins hunting the detectives, teasing them with possible clues at the crime scenes while always remaining one step ahead. When familiar local girl Ann goes missing, the detectives find themselves racing against time to catch the killer and save the young girl's life.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxMDQzNjkwMF5BMl5BanBnXkFtZTcwMDM0MzU0Ng@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjMxMDQzNjkwMF5BMl5BanBnXkFtZTcwMDM0MzU0Ng@@._V1_SX720.jpg",
    "Production": "Anchor Bay Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "37%"
      },
      {
        "Source": "Metacritic",
        "Value": "49/100"
      }
    ],
    "Released": "14 Oct 2011",
    "Response": "True",
    "Runtime": "105 min",
    "Title": "Texas Killing Fields",
    "Type": "movie",
    "Website": "http://www.texaskillingfields.com/",
    "Writer": "Don Ferrarone",
    "Year": "2011",
    "imdbID": "tt1389127",
    "imdbRating": "5.7",
    "imdbVotes": "17,260"
  },
  "-LernxbMgsIX5wXlCI_8": {
    "Actors": "Justin Timberlake, Olivia Wilde, Shyloh Oostwald, Johnny Galecki",
    "Awards": "2 nominations.",
    "BoxOffice": "$35,900,000",
    "Country": "USA",
    "DVD": "31 Jan 2012",
    "Director": "Andrew Niccol",
    "Genre": "Action, Crime, Drama, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "53",
    "Plot": "Welcome to a world where time has become the ultimate currency. You stop aging at 25, but there's a catch: you're genetically-engineered to live only one more year, unless you can buy your way out of it. The rich \"earn\" decades at a time (remaining at age 25), becoming essentially immortal, while the rest beg, borrow or steal enough hours to make it through the day. When a man from the wrong side of the tracks is falsely accused of murder, he is forced to go on the run with a beautiful hostage. Living minute to minute, the duo's love becomes a powerful tool in their war against the system.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjA3NzI1ODc1MV5BMl5BanBnXkFtZTcwMzI5NjQwNg@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjA3NzI1ODc1MV5BMl5BanBnXkFtZTcwMzI5NjQwNg@@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "37%"
      },
      {
        "Source": "Metacritic",
        "Value": "53/100"
      }
    ],
    "Released": "28 Oct 2011",
    "Response": "True",
    "Runtime": "109 min",
    "Title": "In Time",
    "Type": "movie",
    "Website": "http://www.intimemovie.com",
    "Writer": "Andrew Niccol",
    "Year": "2011",
    "imdbID": "tt1637688",
    "imdbRating": "6.7",
    "imdbVotes": "343,949"
  },
  "-Lero-peAGH-3nSv3vkl": {
    "Actors": "Matt Dillon, Bruno Ganz, Uma Thurman, Siobhan Fallon Hogan",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "Denmark, France, Sweden, Germany, Belgium",
    "DVD": "14 Dec 2018",
    "Director": "Lars von Trier",
    "Genre": "Crime, Drama, Horror",
    "Language": "English, German, Italian",
    "Metascore": "42",
    "Plot": "USA in the 1970s. We follow the highly intelligent Jack over a span of 12 years and are introduced to the murders that define Jack's development as a serial killer. We experience the story from Jack's point of view, while he postulates each murder is an artwork in itself. As the inevitable police intervention is drawing nearer, he is taking greater and greater risks in his attempt to create the ultimate artwork. Along the way we experience Jack's descriptions of his personal condition, problems and thoughts through a recurring conversation with the unknown Verge - a grotesque mixture of sophistry mixed with an almost childlike self-pity and psychopathic explanations. The House That Jack Built is a dark and sinister story, yet presented through a philosophical and occasional humorous tale.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4Y2E5ODktODI5ZS00ZGVkLTgyZTEtNWY1ZjNiZTFjOTE3XkEyXkFqcGdeQXVyODY3Nzc0OTk@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNDQ4Y2E5ODktODI5ZS00ZGVkLTgyZTEtNWY1ZjNiZTFjOTE3XkEyXkFqcGdeQXVyODY3Nzc0OTk@._V1_SX720.jpg",
    "Production": "IFC Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "57%"
      },
      {
        "Source": "Metacritic",
        "Value": "42/100"
      }
    ],
    "Released": "14 Dec 2018",
    "Response": "True",
    "Runtime": "152 min",
    "Title": "The House That Jack Built",
    "Type": "movie",
    "Website": "https://www.curzonartificialeye.com/the-house-that-jack-built/",
    "Writer": "Lars von Trier (screenplay), Lars von Trier (story), Jenle Hallund (story by)",
    "Year": "2018",
    "imdbID": "tt4003440",
    "imdbRating": "6.9",
    "imdbVotes": "33,316"
  },
  "-Lero2hLSWavvRP8exnq": {
    "Actors": "Jerry O'Connell, Rebecca Romijn, Rainn Wilson, Patrick Fabian",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "N/A",
    "Director": "Sam Liu",
    "Genre": "Animation, Action, Sci-Fi",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "After the death of Superman, several new people present themselves as possible successors.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYTY0OGIxNDMtNzIwZi00NTFmLThhYzUtYzUzYzc5ZjYwMThjXkEyXkFqcGdeQXVyNzU3NjUxMzE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYTY0OGIxNDMtNzIwZi00NTFmLThhYzUtYzUzYzc5ZjYwMThjXkEyXkFqcGdeQXVyNzU3NjUxMzE@._V1_SX720.jpg",
    "Production": "N/A",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.8/10"
      }
    ],
    "Released": "10 Jan 2019",
    "Response": "True",
    "Runtime": "87 min",
    "Title": "Reign of the Supermen",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Jon Bogdanove (character created by: Steel), Brett Breeding (character created by: Doomsday), Tom Grummett (character created by: Conner Kent/Superboy), Gerard Jones (comic book), Dan Jurgens (character created by: Doomsday), Karl Kesel (character created by: Conner Kent/Superboy), James Krieg, Bill Messner-Loebs (comic book), Jerry Ordway (character created by: Doomsday), Tim Sheridan, Joe Shuster (character created by: Superman), Jerry Siegel (character created by: Superman), Louise Simonson (characters created by: Doomsday & Steel), Roger Stern (character created by: Doomsday)",
    "Year": "2019",
    "imdbID": "tt7167686",
    "imdbRating": "6.8",
    "imdbVotes": "6,071"
  },
  "-LeroAy8aVrCLZeAby97": {
    "Actors": "Atsuko Tanaka, Akio Ôtsuka, Kôichi Yamadera, Yutaka Nakano",
    "Awards": "5 wins & 2 nominations.",
    "BoxOffice": "N/A",
    "Country": "Japan, UK",
    "DVD": "18 Nov 2003",
    "Director": "Mamoru Oshii",
    "Genre": "Animation, Action, Crime, Drama, Mystery, Sci-Fi, Thriller",
    "Language": "Japanese",
    "Metascore": "76",
    "Plot": "It is the year 2029. Technology has advanced so far that cyborgs are commonplace. In addition, human brains can direct to the internet directly. Major Motoko Kasunagi is an officer in Section 9, an elite, secretive police division that deals with special operations, including counter terrorism and cyber crime. She is currently on the trail of the Puppet Master, a cyber criminal who hacks into the brains of cyborgs in order to obtain information and to commit other crimes.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYWRiYjQyOGItNzQ1Mi00MGI1LWE3NjItNTg1ZDQwNjUwNDM2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYWRiYjQyOGItNzQ1Mi00MGI1LWE3NjItNTg1ZDQwNjUwNDM2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX720.jpg",
    "Production": "Palm Pictures",
    "Rated": "Not Rated",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "96%"
      },
      {
        "Source": "Metacritic",
        "Value": "76/100"
      }
    ],
    "Released": "29 Mar 1996",
    "Response": "True",
    "Runtime": "83 min",
    "Title": "Ghost in the Shell",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Shirow Masamune (based on the manga by), Kazunori Itô (screenplay)",
    "Year": "1995",
    "imdbID": "tt0113568",
    "imdbRating": "8.0",
    "imdbVotes": "114,403"
  },
  "-LeroEcSXLNrrIUojuyW": {
    "Actors": "Clint Eastwood, Patrick L. Reyes, Cesar De León, Gustavo Muñoz",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "02 Apr 2019",
    "Director": "Clint Eastwood",
    "Genre": "Crime, Drama, Thriller",
    "Language": "English, Spanish",
    "Metascore": "58",
    "Plot": "A 90-year-old horticulturist and Korean War veteran turns drug mule for a Mexican cartel.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTc1OTc5NzA4OF5BMl5BanBnXkFtZTgwOTAzMzE2NjM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTc1OTc5NzA4OF5BMl5BanBnXkFtZTgwOTAzMzE2NjM@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "70%"
      },
      {
        "Source": "Metacritic",
        "Value": "58/100"
      }
    ],
    "Released": "14 Dec 2018",
    "Response": "True",
    "Runtime": "116 min",
    "Title": "The Mule",
    "Type": "movie",
    "Website": "http://www.themulefilm.com/",
    "Writer": "Sam Dolnick (inspired by the New York Times Magazine Article \"The Sinaloa Cartel's 90-Year Old Drug Mule\" by), Nick Schenk",
    "Year": "2018",
    "imdbID": "tt7959026",
    "imdbRating": "7.1",
    "imdbVotes": "46,910"
  },
  "-LerpMRAJY_L4O3o-XQl": {
    "Actors": "Jackie Chan, Lung Ti, Anita Mui, Felix Wong",
    "Awards": "3 wins & 1 nomination.",
    "BoxOffice": "N/A",
    "Country": "Hong Kong",
    "DVD": "20 Mar 2001",
    "Director": "Chia-Liang Liu",
    "Genre": "Action, Comedy",
    "Language": "Cantonese",
    "Metascore": "74",
    "Plot": "Returning home with his father after a shopping expedition, Wong Fei-Hong is unwittingly caught up in the battle between foreigners who wish to export ancient Chinese artifacts and loyalists who don't want the pieces to leave the country. Fei-Hong has learned a style of fighting called \"Drunken Boxing\", which makes him a dangerous person to cross. Unfortunately, his father is opposed to his engaging in any kind of fighting, let alone drunken boxing. Consequently, Fei-Hong not only has to fight against the foreigners, but he must overcome his father's antagonism as well.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZmRiZTZiMWEtZGVlNS00YzU1LTkxZjYtODNiMDEyYTIxYjA0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BZmRiZTZiMWEtZGVlNS00YzU1LTkxZjYtODNiMDEyYTIxYjA0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX720.jpg",
    "Production": "Dimension Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "83%"
      },
      {
        "Source": "Metacritic",
        "Value": "74/100"
      }
    ],
    "Released": "20 Oct 2000",
    "Response": "True",
    "Runtime": "102 min",
    "Title": "The Legend of Drunken Master",
    "Type": "movie",
    "Website": "http://www.dimensionfilms.com/mm_front/owa/dim_movie_page.entryPoint?midStr=1422",
    "Writer": "Edward Tang (screenplay), Man-Ming Tong (screenplay), Kai-Chi Yuen (screenplay), Rod Dean (english adaptation)",
    "Year": "1994",
    "imdbID": "tt0111512",
    "imdbRating": "7.6",
    "imdbVotes": "38,410"
  },
  "-LfLq3_kMIyvy8aR77HW": {
    "Actors": "Saoirse Ronan, Eric Bana, Vicky Krieps, Cate Blanchett",
    "Awards": "8 wins & 25 nominations.",
    "BoxOffice": "$40,200,000",
    "Country": "USA, UK, Germany",
    "DVD": "06 Sep 2011",
    "Director": "Joe Wright",
    "Genre": "Action, Drama, Thriller",
    "Language": "English, French, German, Italian, Arabic, Spanish",
    "Metascore": "65",
    "Plot": "Hanna (Ronan) is a teenage girl. Uniquely, she has the strength, the stamina, and the skills of a soldier; these come from being raised by her father (Bana), an ex-CIA man, in the wilds of Finland. Living a life unlike any other teenager, her upbringing and training have been one and the same, all geared to making her the perfect assassin. The turning point in her adolescence is a sharp one; sent into the world by her father on a mission, Hanna journeys stealthily across Europe while eluding agents dispatched after her by a ruthless intelligence operative with secrets of her own (Blanchett). As she nears her ultimate target, Hanna faces startling revelations about her existence and unexpected questions about her humanity.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjljNzE0OTItM2Q1MS00MTUyLTg4YjgtMzUzZDRkMzkyN2NiXkEyXkFqcGdeQXVyODU2MDg1NzU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjljNzE0OTItM2Q1MS00MTUyLTg4YjgtMzUzZDRkMzkyN2NiXkEyXkFqcGdeQXVyODU2MDg1NzU@._V1_SX720.jpg",
    "Production": "Focus Features",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "71%"
      },
      {
        "Source": "Metacritic",
        "Value": "65/100"
      }
    ],
    "Released": "08 Apr 2011",
    "Response": "True",
    "Runtime": "111 min",
    "Title": "Hanna",
    "Type": "movie",
    "Website": "http://www.HannatheMovie.com/",
    "Writer": "Seth Lochhead (screenplay), David Farr (screenplay), Seth Lochhead (story)",
    "Year": "2011",
    "imdbID": "tt0993842",
    "imdbRating": "6.8",
    "imdbVotes": "178,144"
  },
  "-LfLsWVu0GpRfMilAwrB": {
    "Actors": "Jake Gyllenhaal, Scott MacDonald, Peter Sarsgaard, Jamie Foxx",
    "Awards": "6 wins & 12 nominations.",
    "BoxOffice": "$62,578,105",
    "Country": "USA, UK, Germany",
    "DVD": "07 Mar 2006",
    "Director": "Sam Mendes",
    "Genre": "Biography, Drama, War",
    "Language": "English, Spanish, Arabic, Latin",
    "Metascore": "58",
    "Plot": "Anthony \"Swoff\" Swofford, a Camus-reading kid from Sacramento, enlists in the Marines in the late 1980s. He malingers during boot camp, but makes it through as a sniper, paired with the usually-reliable Troy. The Gulf War breaks out, and his unit goes to Saudi Arabia for Desert Shield. After 175 days of boredom, adrenaline, heat, worry about his girlfriend finding someone else, losing it and nearly killing a mate, demotion, latrine cleaning, faulty gas masks, and desert football, Desert Storm begins. In less than five days, it's over, but not before Swoff sees burned bodies, flaming oil derricks, an oil-drenched horse, and maybe a chance at killing. Where does all the testosterone go?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYmMyNGM4NWItYjgwYS00N2Q2LWJmY2YtY2ViNWYwMzRhODlmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BYmMyNGM4NWItYjgwYS00N2Q2LWJmY2YtY2ViNWYwMzRhODlmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX720.jpg",
    "Production": "Universal Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "61%"
      },
      {
        "Source": "Metacritic",
        "Value": "58/100"
      }
    ],
    "Released": "04 Nov 2005",
    "Response": "True",
    "Runtime": "125 min",
    "Title": "Jarhead",
    "Type": "movie",
    "Website": "http://www.jarheadmovie.com/",
    "Writer": "William Broyles Jr. (screenplay), Anthony Swofford (book)",
    "Year": "2005",
    "imdbID": "tt0418763",
    "imdbRating": "7.0",
    "imdbVotes": "161,233"
  },
  "-LfOw6lBG8T1BOWa9AMq": {
    "Actors": "Julian Glover, Brian Cox, Nathan Jones, Adoni Maropis",
    "Awards": "Nominated for 1 Oscar. Another 4 wins & 21 nominations.",
    "BoxOffice": "$132,500,000",
    "Country": "USA, Malta, UK",
    "DVD": "04 Jan 2005",
    "Director": "Wolfgang Petersen",
    "Genre": "Drama, History",
    "Language": "English",
    "Metascore": "56",
    "Plot": "As the Greeks fall, they decided to head back home. King Priam decides to have one last battle with the Greeks to leave Troy for good. It was a night battle so the Greeks didn't knew, raining them down with flaming arrows and lighting huge balls of dry branches and rolling them down at the beach. It was a battle that Achilles wasn't in, but his cousin Patroclus pretended to be him by wearing his armor, his sword, his helmet, and his moves. Hector finally had a battle with Achilles not knowing it wasn't him. Patroclus was fast but Hector was faster, causing him to cut Patroclus's neck and finishing him with a sword to the heart.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTk5MzU1MDMwMF5BMl5BanBnXkFtZTcwNjczODMzMw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTk5MzU1MDMwMF5BMl5BanBnXkFtZTcwNjczODMzMw@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "54%"
      },
      {
        "Source": "Metacritic",
        "Value": "56/100"
      }
    ],
    "Released": "14 May 2004",
    "Response": "True",
    "Runtime": "163 min",
    "Title": "Troy",
    "Type": "movie",
    "Website": "http://troymovie.warnerbros.com/index_flash.html",
    "Writer": "Homer (poem), David Benioff (screenplay)",
    "Year": "2004",
    "imdbID": "tt0332452",
    "imdbRating": "7.2",
    "imdbVotes": "449,398"
  },
  "-LfWPEqBH9qtLeS9YIAu": {
    "Actors": "Keanu Reeves, Halle Berry, Ian McShane, Laurence Fishburne",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA",
    "DVD": "N/A",
    "Director": "Chad Stahelski",
    "Genre": "Action, Crime, Thriller",
    "Language": "English",
    "Metascore": "75",
    "Plot": "Super-assassin John Wick is on the run after killing a member of the international assassin's guild, and with a $14 million price tag on his head - he is the target of hit men and women everywhere.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX720.jpg",
    "Production": "Summit Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.7/10"
      },
      {
        "Source": "Metacritic",
        "Value": "75/100"
      }
    ],
    "Released": "16 May 2019",
    "Response": "True",
    "Runtime": "130 min",
    "Title": "John Wick: Chapter 3 - Parabellum",
    "Type": "movie",
    "Website": "http://www.johnwick.movie/",
    "Writer": "Derek Kolstad (screenplay by), Shay Hatten (screenplay by), Chris Collins (screenplay by), Marc Abrams (screenplay by), Derek Kolstad (story by), Derek Kolstad (based on characters created by)",
    "Year": "2019",
    "imdbID": "tt6146586",
    "imdbRating": "8.7",
    "imdbVotes": "1,102"
  },
  "-LfYcQf7tJqBkRQOtoBn": {
    "Actors": "Shia LaBeouf, Michelle Monaghan, Rosario Dawson, Michael Chiklis",
    "Awards": "3 wins & 8 nominations.",
    "BoxOffice": "$101,111,837",
    "Country": "USA, Germany",
    "DVD": "27 Dec 2008",
    "Director": "D.J. Caruso",
    "Genre": "Action, Mystery, Thriller",
    "Language": "English",
    "Metascore": "43",
    "Plot": "Jerry Shaw is an amiable slacker with an over-achieving twin brother. After his twin dies in an accident, strange things happen to Jerry at a dizzying pace: a fortune shows up in his bank account, weapons are delivered to his flat, and a voice on his cell phone tells him the police are on their way. Jerry follows the voice's instructions, and soon he and a woman he's never met are racing through the city, on to a plane, and eventually to the Pentagon, chased by the FBI. She is Rachel Holloman, a single mom; the voice has threatened her son's death if she doesn't cooperate. The voice seems to know everything. Who is behind it, what is being planned, and why Jerry and Rachel?",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5MTMzMDMzNl5BMl5BanBnXkFtZTcwMzUwNDUzMw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjA5MTMzMDMzNl5BMl5BanBnXkFtZTcwMzUwNDUzMw@@._V1_SX720.jpg",
    "Production": "Paramount Studios",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "27%"
      },
      {
        "Source": "Metacritic",
        "Value": "43/100"
      }
    ],
    "Released": "26 Sep 2008",
    "Response": "True",
    "Runtime": "118 min",
    "Title": "Eagle Eye",
    "Type": "movie",
    "Website": "http://www.eagleeyemovie.com/",
    "Writer": "John Glenn (screenplay), Travis Wright (screenplay), Hillary Seitz (screenplay), Dan McDermott (screenplay), Dan McDermott (story)",
    "Year": "2008",
    "imdbID": "tt1059786",
    "imdbRating": "6.6",
    "imdbVotes": "166,609"
  },
  "-LfYccXiaVuo3_gWYvBS": {
    "Actors": "Craig Bierko, Armin Mueller-Stahl, Gretchen Mol, Vincent D'Onofrio",
    "Awards": "1 nomination.",
    "BoxOffice": "N/A",
    "Country": "USA, Germany",
    "DVD": "22 May 2001",
    "Director": "Josef Rusnak",
    "Genre": "Mystery, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "36",
    "Plot": "Computer scientist Hannon Fuller has discovered something extremely important. He's about to tell the discovery to his colleague, Douglas Hall, but knowing someone is after him, the old man leaves a letter in the computer generated parallel world his company has created (which looks like the 30's with seemingly real people with real emotions). Fuller is murdered in our real world the same night, and his colleague is suspected. Douglas discovers a bloody shirt in his bathroom and he cannot recall what he was doing the night Fuller was murdered. He logs into the system in order to find the letter, but has to confront the unexpected. The truth is harsher than he could ever imagine...",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODYxZTZlZTgtNTM5MC00N2RhLTg3MjUtNGVkMDJjMGY3YzA5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BODYxZTZlZTgtNTM5MC00N2RhLTg3MjUtNGVkMDJjMGY3YzA5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX720.jpg",
    "Production": "Sony Pictures Home Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "29%"
      },
      {
        "Source": "Metacritic",
        "Value": "36/100"
      }
    ],
    "Released": "28 May 1999",
    "Response": "True",
    "Runtime": "100 min",
    "Title": "The Thirteenth Floor",
    "Type": "movie",
    "Website": "http://www.thethirteenthfloor.com",
    "Writer": "Daniel F. Galouye (book), Josef Rusnak (screenplay), Ravel Centeno-Rodriguez (screenplay)",
    "Year": "1999",
    "imdbID": "tt0139809",
    "imdbRating": "7.0",
    "imdbVotes": "61,244"
  },
  "-LfcolvJonRDwd3aSR0V": {
    "Actors": "Harriet Minto-Day, Jay Laga'aia, Damien Garvey, Sahaj Dumpleton",
    "Awards": "3 wins & 6 nominations.",
    "BoxOffice": "$30,000,000",
    "Country": "Australia, USA",
    "DVD": "11 May 2010",
    "Director": "Michael Spierig, Peter Spierig",
    "Genre": "Action, Fantasy, Horror, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "57",
    "Plot": "In a world 10 years into the future, vampires make up the vast majority of the population with only 5% of the human race remaining. This presents particular challenges as the vampires' food supply - human blood - is dwindling and rationing is now the norm. There is growing evidence that vampires deprived of an adequate blood supply are themselves evolving into wild, vile creatures that attack anyone and anything in order to survive. Dr. Edward Dalton, a vampire and hematologist who works for a pharmaceutical firm, has been working on finding an artificial blood supply that will meet the vampire society's needs. He is sympathetic to humans and sees his work as a way of alleviating their suffering but his views on finding a solution change considerably when he meets someone who found a way to transform himself from being a vampire to again take human form.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzg3NDYyMDU4Nl5BMl5BanBnXkFtZTcwODA5NzA5Mg@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNzg3NDYyMDU4Nl5BMl5BanBnXkFtZTcwODA5NzA5Mg@@._V1_SX720.jpg",
    "Production": "Lionsgate",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "67%"
      },
      {
        "Source": "Metacritic",
        "Value": "57/100"
      }
    ],
    "Released": "08 Jan 2010",
    "Response": "True",
    "Runtime": "98 min",
    "Title": "Daybreakers",
    "Type": "movie",
    "Website": "http://www.daybreakersmovie.com/",
    "Writer": "Michael Spierig, Peter Spierig",
    "Year": "2009",
    "imdbID": "tt0433362",
    "imdbRating": "6.5",
    "imdbVotes": "116,473"
  },
  "-LfdxExPrem43uE14MyL": {
    "Actors": "Keanu Reeves, Rachel Weisz, Shia LaBeouf, Djimon Hounsou",
    "Awards": "2 wins & 9 nominations.",
    "BoxOffice": "$75,400,000",
    "Country": "USA, Germany",
    "DVD": "19 Jul 2005",
    "Director": "Francis Lawrence",
    "Genre": "Action, Fantasy, Horror, Mystery",
    "Language": "English, Filipino, Tagalog",
    "Metascore": "50",
    "Plot": "John Constantine is approached by Det. Angela Dodson who needs his help to prove that her twin sister Isabel's death was not a suicide. The dead woman was a devout Catholic and Angela refuses to accept she would have taken her own life. She's asked Constantine for help because he has a reputation for dealing with the mystical. In fact, he is a demon hunter whose sole purpose on Earth is to send demons back to the nether regions. John himself has been to Hell and knows that he is destined to return there on his death - but hopes his good deeds may find him a place in Heaven. As he looks into Isabel's death, he realizes demons are trying to break through to the human world, and his battles lead him into a direct conflict with Satan.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTE5NDk5NTUyN15BMl5BanBnXkFtZTYwNzUyMDA3._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTE5NDk5NTUyN15BMl5BanBnXkFtZTYwNzUyMDA3._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "46%"
      },
      {
        "Source": "Metacritic",
        "Value": "50/100"
      }
    ],
    "Released": "18 Feb 2005",
    "Response": "True",
    "Runtime": "121 min",
    "Title": "Constantine",
    "Type": "movie",
    "Website": "http://constantinemovie.warnerbros.com/",
    "Writer": "Jamie Delano (comic book \"Hellblazer\"), Garth Ennis (comic book \"Hellblazer\"), Kevin Brodbin (story), Kevin Brodbin (screenplay), Frank A. Cappello (screenplay)",
    "Year": "2005",
    "imdbID": "tt0360486",
    "imdbRating": "7.0",
    "imdbVotes": "275,535"
  },
  "-Lfhmb3LW7JE8elD4jlE": {
    "Actors": "Paul Bettany, Lucas Black, Tyrese Gibson, Adrianne Palicki",
    "Awards": "N/A",
    "BoxOffice": "$40,168,080",
    "Country": "USA",
    "DVD": "11 May 2010",
    "Director": "Scott Stewart",
    "Genre": "Action, Fantasy, Horror",
    "Language": "English",
    "Metascore": "32",
    "Plot": "An out-of-the-way diner becomes the unlikely battleground for the survival of the human race. When God loses faith in humankind, he sends his legion of angels to bring on the Apocalypse. Humanity's only hope lies in a group of strangers trapped in a desert diner with the Archangel Michael (Bettany).",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTMzNDg4NjYxOV5BMl5BanBnXkFtZTcwODQyNDg3Mg@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTMzNDg4NjYxOV5BMl5BanBnXkFtZTcwODQyNDg3Mg@@._V1_SX720.jpg",
    "Production": "Screen Gems",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "19%"
      },
      {
        "Source": "Metacritic",
        "Value": "32/100"
      }
    ],
    "Released": "22 Jan 2010",
    "Response": "True",
    "Runtime": "100 min",
    "Title": "Legion",
    "Type": "movie",
    "Website": "http://www.legionmovie.com/",
    "Writer": "Peter Schink, Scott Stewart",
    "Year": "2010",
    "imdbID": "tt1038686",
    "imdbRating": "5.2",
    "imdbVotes": "92,424"
  },
  "-LfhmllHWvDeBn8bFxh2": {
    "Actors": "Vin Diesel, Rose Leslie, Elijah Wood, Ólafur Darri Ólafsson",
    "Awards": "1 nomination.",
    "BoxOffice": "N/A",
    "Country": "USA, China, Canada",
    "DVD": "02 Feb 2016",
    "Director": "Breck Eisner",
    "Genre": "Action, Adventure, Fantasy",
    "Language": "English",
    "Metascore": "34",
    "Plot": "The modern world holds many secrets, but the most astounding secret of all is that witches still live amongst us; vicious supernatural creatures intent on unleashing the Black Death upon the world. Armies of witch hunters battled the unnatural enemy across the globe for centuries, including Kaulder, a valiant warrior who managed to slay the all-powerful Queen Witch, decimating her followers in the process. In the moments right before her death, the Queen curses Kaulder with her own immortality, forever separating him from his beloved wife and daughter in the afterlife. Today Kaulder is the only one of his kind remaining, and has spent centuries hunting down rogue witches, all the while yearning for his long-lost loved ones. However, unbeknownst to Kaulder, the Queen Witch is resurrected and seeks revenge on her killer causing an epic battle that will determine the survival of the human race.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjM5Njk5MzYzM15BMl5BanBnXkFtZTgwNzM1Mjk4NjE@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjM5Njk5MzYzM15BMl5BanBnXkFtZTgwNzM1Mjk4NjE@._V1_SX720.jpg",
    "Production": "Summit Entertainment.",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.0/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "17%"
      },
      {
        "Source": "Metacritic",
        "Value": "34/100"
      }
    ],
    "Released": "23 Oct 2015",
    "Response": "True",
    "Runtime": "106 min",
    "Title": "The Last Witch Hunter",
    "Type": "movie",
    "Website": "https://www.facebook.com/LastWitchHunter",
    "Writer": "Cory Goodman, Matt Sazama, Burk Sharpless",
    "Year": "2015",
    "imdbID": "tt1618442",
    "imdbRating": "6.0",
    "imdbVotes": "85,455"
  },
  "-LfhneuyCLhRMfs3nbJQ": {
    "Actors": "Liam Neeson, Maggie Grace, Leland Orser, Jon Gries",
    "Awards": "2 wins & 2 nominations.",
    "BoxOffice": "$144,924,285",
    "Country": "France, USA",
    "DVD": "12 May 2009",
    "Director": "Pierre Morel",
    "Genre": "Action, Thriller",
    "Language": "English, French, Albanian, Arabic",
    "Metascore": "51",
    "Plot": "Seventeen year-old Kim is the pride and joy of her father Bryan Mills. Bryan is a retired agent who left the Central Intelligence Agency to be near Kim in California. Kim lives with her mother Lenore and her wealthy stepfather Stuart. Kim manages to convince her reluctant father to allow her to travel to Paris with her friend Amanda. When the girls arrive in Paris they share a cab with a stranger named Peter, and Amanda lets it slip that they are alone in Paris. Using this information an Albanian gang of human traffickers kidnaps the girls. Kim barely has time to call her father and give him information. Her father gets to speak briefly to one of the kidnappers and he promises to kill the kidnappers if they do not let his daughter go free. The kidnapper wishes him \"good luck,\" so Bryan Mills travels to Paris to search for his daughter and her friend.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4NzQ0OTYyOF5BMl5BanBnXkFtZTcwMDkyNjQyMg@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTM4NzQ0OTYyOF5BMl5BanBnXkFtZTcwMDkyNjQyMg@@._V1_SX720.jpg",
    "Production": "20th Century Fox",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.8/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "58%"
      },
      {
        "Source": "Metacritic",
        "Value": "51/100"
      }
    ],
    "Released": "30 Jan 2009",
    "Response": "True",
    "Runtime": "94 min",
    "Title": "Taken",
    "Type": "movie",
    "Website": "http://www.takenmovie.com/",
    "Writer": "Luc Besson, Robert Mark Kamen",
    "Year": "2008",
    "imdbID": "tt0936501",
    "imdbRating": "7.8",
    "imdbVotes": "536,881"
  },
  "-LfhpH1e3thGaKs0UYfm": {
    "Actors": "Hugh Jackman, Kate Beckinsale, Richard Roxburgh, David Wenham",
    "Awards": "3 wins & 20 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA, Czech Republic, Romania",
    "DVD": "20 Sep 2005",
    "Director": "Stephen Sommers",
    "Genre": "Action, Adventure, Fantasy",
    "Language": "English, Latin",
    "Metascore": "35",
    "Plot": "Van Helsing is in the world to rid all evil, even if not everyone agrees with him. The Vatican sends the monster hunter and his ally, Carl, to Transylvania. They have been sent to this land to stop the powerful Count Dracula. Whilst there they join forces with a Gypsy Princess called Anna Valerious, who is determined to end an ancient curse on her family by destroying the vampire. They just don't know how!",
    "Poster": "https://m.media-amazon.com/images/M/MV5BODRmY2NhNDItOWViNi00OTIyLTk3YjYtYzY0YTFlMDg1YzQ0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BODRmY2NhNDItOWViNi00OTIyLTk3YjYtYzY0YTFlMDg1YzQ0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX720.jpg",
    "Production": "N/A",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.1/10"
      },
      {
        "Source": "Metacritic",
        "Value": "35/100"
      }
    ],
    "Released": "07 May 2004",
    "Response": "True",
    "Runtime": "131 min",
    "Title": "Van Helsing",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Stephen Sommers",
    "Year": "2004",
    "imdbID": "tt0338526",
    "imdbRating": "6.1",
    "imdbVotes": "228,698"
  },
  "-Lfj99SKSkrp4lYHD5O4": {
    "Actors": "Will Smith, Bridget Moynahan, Alan Tudyk, James Cromwell",
    "Awards": "Nominated for 1 Oscar. Another 1 win & 13 nominations.",
    "BoxOffice": "N/A",
    "Country": "USA, Germany",
    "DVD": "01 Dec 1998",
    "Director": "Alex Proyas",
    "Genre": "Action, Crime, Drama, Mystery, Sci-Fi, Thriller",
    "Language": "English",
    "Metascore": "59",
    "Plot": "In 2035, technophobic homicide detective Del Spooner of the Chicago PD heads the investigation of the apparent suicide of leading robotics scientist, Dr. Alfred Lanning. Unconvinced of the motive, Spooner's investigation into Lanning's death reveals a trail of secrets and agendas within the USR (United States Robotics) corporation and suspicions of murder. Little does he know that his investigation would lead to uncovering a larger threat to humanity.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNmE1OWI2ZGItMDUyOS00MmU5LWE0MzUtYTQ0YzA1YTE5MGYxXkEyXkFqcGdeQXVyMDM5ODIyNw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BNmE1OWI2ZGItMDUyOS00MmU5LWE0MzUtYTQ0YzA1YTE5MGYxXkEyXkFqcGdeQXVyMDM5ODIyNw@@._V1_SX720.jpg",
    "Production": "N/A",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.1/10"
      },
      {
        "Source": "Metacritic",
        "Value": "59/100"
      }
    ],
    "Released": "16 Jul 2004",
    "Response": "True",
    "Runtime": "115 min",
    "Title": "I, Robot",
    "Type": "movie",
    "Website": "N/A",
    "Writer": "Jeff Vintar (screenplay), Akiva Goldsman (screenplay), Jeff Vintar (screen story), Isaac Asimov (suggested by book)",
    "Year": "2004",
    "imdbID": "tt0343818",
    "imdbRating": "7.1",
    "imdbVotes": "462,451"
  },
  "-LfkUJIdhOLI0rGYW_vk": {
    "Actors": "Jake Gyllenhaal, Mark Ruffalo, Anthony Edwards, Robert Downey Jr.",
    "Awards": "2 wins & 67 nominations.",
    "BoxOffice": "$33,000,000",
    "Country": "USA",
    "DVD": "24 Jul 2007",
    "Director": "David Fincher",
    "Genre": "Crime, Drama, Mystery, Thriller",
    "Language": "English",
    "Metascore": "78",
    "Plot": "A serial killer in the San Francisco Bay Area taunts police with his letters and cryptic messages. We follow the investigators and reporters in this lightly fictionalized account of the true 1970's case as they search for the murderer, becoming obsessed with the case. Based on Robert Graysmith's book, the movie's focus is the lives and careers of the detectives and newspaper people.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2UwNDc5NmEtNjVjZS00OTI5LWE5YjctMWM3ZjBiZGYwMGI2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BN2UwNDc5NmEtNjVjZS00OTI5LWE5YjctMWM3ZjBiZGYwMGI2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX720.jpg",
    "Production": "Paramount Pictures",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "90%"
      },
      {
        "Source": "Metacritic",
        "Value": "78/100"
      }
    ],
    "Released": "02 Mar 2007",
    "Response": "True",
    "Runtime": "157 min",
    "Title": "Zodiac",
    "Type": "movie",
    "Website": "http://www.ZodiacMovie.com/",
    "Writer": "James Vanderbilt (screenplay), Robert Graysmith (book)",
    "Year": "2007",
    "imdbID": "tt0443706",
    "imdbRating": "7.7",
    "imdbVotes": "387,868"
  },
  "-LfkUXrEFmYyVjgXwZdk": {
    "Actors": "Sam Worthington, Jeffrey Dean Morgan, Jessica Chastain, Chloë Grace Moretz",
    "Awards": "4 wins & 3 nominations.",
    "BoxOffice": "$45,282",
    "Country": "USA",
    "DVD": "31 Jan 2012",
    "Director": "Ami Canaan Mann",
    "Genre": "Crime, Drama, History, Thriller",
    "Language": "English",
    "Metascore": "49",
    "Plot": "Souder, a homicide detective in a small Texan town, and his partner, transplanted New York City cop Detective Heigh, track a sadistic serial killer dumping his victims' mutilated bodies in a nearby marsh locals call 'The Killing Fields'. Though the swampland crime scenes are outside their jurisdiction, Detective Heigh is unable to turn his back on solving the gruesome murders. Despite his partner's warnings, he sets out to investigate the crimes. Before long, the killer changes the game and begins hunting the detectives, teasing them with possible clues at the crime scenes while always remaining one step ahead. When familiar local girl Ann goes missing, the detectives find themselves racing against time to catch the killer and save the young girl's life.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxMDQzNjkwMF5BMl5BanBnXkFtZTcwMDM0MzU0Ng@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjMxMDQzNjkwMF5BMl5BanBnXkFtZTcwMDM0MzU0Ng@@._V1_SX720.jpg",
    "Production": "Anchor Bay Entertainment",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "37%"
      },
      {
        "Source": "Metacritic",
        "Value": "49/100"
      }
    ],
    "Released": "14 Oct 2011",
    "Response": "True",
    "Runtime": "105 min",
    "Title": "Texas Killing Fields",
    "Type": "movie",
    "Website": "http://www.texaskillingfields.com/",
    "Writer": "Don Ferrarone",
    "Year": "2011",
    "imdbID": "tt1389127",
    "imdbRating": "5.7",
    "imdbVotes": "17,363"
  },
  "-Lfk_C8G1m4rryqvdGM_": {
    "Actors": "Clint Eastwood, Hilary Swank, Morgan Freeman, Jay Baruchel",
    "Awards": "Won 4 Oscars. Another 63 wins & 83 nominations.",
    "BoxOffice": "$100,422,786",
    "Country": "USA",
    "DVD": "12 Jul 2005",
    "Director": "Clint Eastwood",
    "Genre": "Drama, Sport",
    "Language": "English, Irish",
    "Metascore": "86",
    "Plot": "Wanting to learn from the best, aspiring boxer Maggie Fitzgerald wants Frankie Dunn to train her. At the outset he flatly refuses saying he has no interest in training a girl. Frankie leads a lonely existence, alienated from his only daughter and having few friends. Maggie's rough around the edges but shows a lot of grit in the ring and he eventually relents. Maggie not only proves to be the boxer he always dreamed of having under his wing but a friend who fills the great void he's had in his life. Maggie's career skyrockets but an accident in the ring leads her to ask Frankie for one last favor.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTkxNzA1NDQxOV5BMl5BanBnXkFtZTcwNTkyMTIzMw@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTkxNzA1NDQxOV5BMl5BanBnXkFtZTcwNTkyMTIzMw@@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "91%"
      },
      {
        "Source": "Metacritic",
        "Value": "86/100"
      }
    ],
    "Released": "28 Jan 2005",
    "Response": "True",
    "Runtime": "132 min",
    "Title": "Million Dollar Baby",
    "Type": "movie",
    "Website": "http://milliondollarbabymovie.warnerbros.com/",
    "Writer": "Paul Haggis (screenplay), F.X. Toole (stories)",
    "Year": "2004",
    "imdbID": "tt0405159",
    "imdbRating": "8.1",
    "imdbVotes": "582,727"
  },
  "-LfketWPCicuivq3YUup": {
    "Actors": "Tye Sheridan, Olivia Cooke, Ben Mendelsohn, Lena Waithe",
    "Awards": "N/A",
    "BoxOffice": "N/A",
    "Country": "USA, India",
    "DVD": "03 Jul 2018",
    "Director": "Steven Spielberg",
    "Genre": "Action, Adventure, Sci-Fi",
    "Language": "English",
    "Metascore": "64",
    "Plot": "Film centers on a young outcast named Wade Watts. In the near future, Watts escapes from his daily drudgery by logging onto an MMO game called 'The Oasis'. When the game's billionaire founder dies, he offers players his fortune as the prize in an easter egg hunt within The Oasis. Watts gets in on the action then after five years finds himself facing off against corporate foes who will go to any lengths to get the money -- in both the real world and in The Oasis.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_SX720.jpg",
    "Production": "Warner Bros. Pictures",
    "Rated": "PG-13",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.5/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "72%"
      },
      {
        "Source": "Metacritic",
        "Value": "64/100"
      }
    ],
    "Released": "29 Mar 2018",
    "Response": "True",
    "Runtime": "140 min",
    "Title": "Ready Player One",
    "Type": "movie",
    "Website": "http://readyplayeronemovie.com/",
    "Writer": "Zak Penn (screenplay by), Ernest Cline (screenplay by), Ernest Cline (based on the novel by)",
    "Year": "2018",
    "imdbID": "tt1677720",
    "imdbRating": "7.5",
    "imdbVotes": "297,943"
  },
  "-LfowRhcTUUnRdslDWes": {
    "Actors": "Tommy Lee Jones, Javier Bardem, Josh Brolin, Woody Harrelson",
    "Awards": "Won 4 Oscars. Another 157 wins & 132 nominations.",
    "BoxOffice": "$74,223,625",
    "Country": "USA",
    "DVD": "07 Apr 2009",
    "Director": "Ethan Coen, Joel Coen",
    "Genre": "Crime, Drama, Thriller",
    "Language": "English, Spanish",
    "Metascore": "91",
    "Plot": "In rural Texas, welder and hunter Llewelyn Moss (Josh Brolin) discovers the remains of several drug runners who have all killed each other in an exchange gone violently wrong. Rather than report the discovery to the police, Moss decides to simply take the two million dollars present for himself. This puts the psychopathic killer, Anton Chigurh (Javier Bardem), on his trail as he dispassionately murders nearly every rival, bystander and even employer in his pursuit of his quarry and the money. As Moss desperately attempts to keep one step ahead, the blood from this hunt begins to flow behind him with relentlessly growing intensity as Chigurh closes in. Meanwhile, the laconic Sheriff Ed Tom Bell (Tommy Lee Jones) blithely oversees the investigation even as he struggles to face the sheer enormity of the crimes he is attempting to thwart.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX720.jpg",
    "Production": "Miramax Films",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "93%"
      },
      {
        "Source": "Metacritic",
        "Value": "91/100"
      }
    ],
    "Released": "21 Nov 2007",
    "Response": "True",
    "Runtime": "122 min",
    "Title": "No Country for Old Men",
    "Type": "movie",
    "Website": "http://www.nocountryforoldmen-themovie.com",
    "Writer": "Joel Coen (screenplay), Ethan Coen (screenplay), Cormac McCarthy (novel)",
    "Year": "2007",
    "imdbID": "tt0477348",
    "imdbRating": "8.1",
    "imdbVotes": "763,641"
  },
  "-Lfsy3YIscxYddlsBcBQ": {
    "Actors": "Elizabeth Berrington, Rudy Blomme, Olivier Bonjour, Mark Donovan",
    "Awards": "Nominated for 1 Oscar. Another 24 wins & 53 nominations.",
    "BoxOffice": "$7,550,836",
    "Country": "UK, USA",
    "DVD": "24 Jun 2008",
    "Director": "Martin McDonagh",
    "Genre": "Comedy, Crime, Drama, Thriller",
    "Language": "English",
    "Metascore": "67",
    "Plot": "London based hit men Ray and Ken are told by their boss Harry Waters to lie low in Bruges, Belgium for up to two weeks following their latest hit, which resulted in the death of an innocent bystander. Harry will be in touch with further instructions. While they wait for Harry's call, Ken, following Harry's advice, takes in the sights of the medieval city with great appreciation. But the charms of Bruges are lost on the simpler Ray, who is already despondent over the innocent death, especially as it was his first job. Things change for Ray when he meets Chloe, part of a film crew shooting a movie starring an American dwarf named Jimmy. When Harry's instructions arrive, Ken, for whom the job is directed, isn't sure if he can carry out the new job, especially as he has gained a new appreciation of life from his stay in the fairytale Bruges. While Ken waits for the inevitable arrival into Bruges of an angry Harry, who feels he must clean up matters on his own, Ray is dealing with his own problems, not only with Harry, but with a Canadian couple and a half-blind thief named Eirik. Ray hopes he can count on both Chloe and Ken to help him carve out a new life for himself. In the end, Harry, involved in an incident with Jimmy, may have to keep to his own principles.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTUwOGFiM2QtOWMxYS00MjU2LThmZDMtZDM2MWMzNzllNjdhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BMTUwOGFiM2QtOWMxYS00MjU2LThmZDMtZDM2MWMzNzllNjdhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX720.jpg",
    "Production": "Focus Features",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.9/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "83%"
      },
      {
        "Source": "Metacritic",
        "Value": "67/100"
      }
    ],
    "Released": "29 Feb 2008",
    "Response": "True",
    "Runtime": "107 min",
    "Title": "In Bruges",
    "Type": "movie",
    "Website": "http://www.filminfocus.com/inbruges",
    "Writer": "Martin McDonagh",
    "Year": "2008",
    "imdbID": "tt0780536",
    "imdbRating": "7.9",
    "imdbVotes": "359,955"
  },
  "-LfteMhQFSOBZv2wmlKG": {
    "Actors": "Chris Evans, Kang-ho Song, Ed Harris, John Hurt",
    "Awards": "33 wins & 103 nominations.",
    "BoxOffice": "$2,786,828",
    "Country": "South Korea, Czech Republic",
    "DVD": "21 Oct 2014",
    "Director": "Joon-ho Bong",
    "Genre": "Action, Drama, Sci-Fi",
    "Language": "English, Korean, French, Japanese, Czech, German",
    "Metascore": "84",
    "Plot": "Set in 2031, the entire world is frozen except for those aboard the Snowpiercer. For 17 years, the world's survivors are on a train hurtling around the globe creating their own economy and class system. Led by Curtis, a group of lower-class citizens living in squalor at the back of the train are determined to get to the front of the train and spread the wealth around. Each section of the train holds new surprises for the group who have to battle their way through. A revolution is underway.",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTdjM2NmZTgtYTFlMS00ZWE1LWExNzItZWEyZGE3NjE3OWQ5XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX210.jpg",
    "PosterXL": "https://m.media-amazon.com/images/M/MV5BOTdjM2NmZTgtYTFlMS00ZWE1LWExNzItZWEyZGE3NjE3OWQ5XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX720.jpg",
    "Production": "Radius-TWC",
    "Rated": "R",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "95%"
      },
      {
        "Source": "Metacritic",
        "Value": "84/100"
      }
    ],
    "Released": "11 Jul 2014",
    "Response": "True",
    "Runtime": "126 min",
    "Title": "Snowpiercer",
    "Type": "movie",
    "Website": "http://snowpiercer-film.com/",
    "Writer": "Joon-ho Bong (screenplay), Kelly Masterson (screenplay), Joon-ho Bong (screen story), Jacques Lob (based on Le Transperceneige by), Benjamin Legrand (based on Le Transperceneige by), Jean-Marc Rochette (based on Le Transperceneige by)",
    "Year": "2013",
    "imdbID": "tt1706620",
    "imdbRating": "7.1",
    "imdbVotes": "234,336"
  }
}

const getters = {
  watchedMovies: state => state.watchedMovies,
  foundMovies: state => state.foundMovies,
  movieDetails: state => state.movieDetails
};

const actions = {
  getWatchedMovies({ commit }) {
    const uid = firebase.auth().currentUser.uid;
    const watchedMovies = firebase.database().ref(`watchedMovies/${uid}`);
    watchedMovies.on('value', snapshot => {
      commit('GET_WATCHED_MOVIES', snapshot.val());
    });
  },
  saveMovie({ commit, dispatch, rootState }, movie) {
    const uid = firebase.auth().currentUser.uid;
    let poster = movie.Poster;
    let posterUrl = poster.substring(0, poster.length - 7);
    movie.Poster = posterUrl + '210.jpg';
    movie.PosterXL = posterUrl + '720.jpg';

    const alreadyAdded = Object.keys(rootState.watchedMovies.watchedMovies).filter(id =>
      rootState.watchedMovies.watchedMovies[id].imdbID === movie.imdbID);

    if (alreadyAdded.length) {
      const id = alreadyAdded[0];

      commit('EMPTY_FOUND_MOVIES');

      return dispatch("showToast", {
        title: "Already Added!",
        message: `${rootState.watchedMovies.watchedMovies[id].Title} already added to watch movies.`
      });
    }

    const ref = firebase.database().ref(`watchedMovies/${uid}`).push(movie);
    ref.set(movie);
    ref.update(movie);
    commit('EMPTY_FOUND_MOVIES');
  },
  findMovies({ commit }, movie) {
    if (!movie) {
      return;
    }

    axios.get('https://www.omdbapi.com', {
      params: {
        apikey: '7174c422',
        plot: 'full',
        t: movie.split(',')[0],
        y: movie.split(',')[1]
      }
    })
      .then(function (response) {
        let array = [];
        let posterUrl = response.data.Poster;
        let poster = posterUrl.substring(0, posterUrl.length - 7);
        response.data.Poster = poster + '140.jpg';
        array.push(response.data);

        commit('UPDATE_FOUND_MOVIES', array);
      });
  },
  emptyFoundMovies({ commit }) {
    commit('EMPTY_FOUND_MOVIES');
  },
  deleteMovie({ commit }, ref) {
    const uid = firebase.auth().currentUser.uid;
    const movie = firebase.database().ref(`watchedMovies/${uid}/${ref}`);

    movie.remove();
  },
  getMovieDetails({ commit }, ref) {
    const uid = firebase.auth().currentUser.uid;
    const movieDetails = firebase.database().ref(`watchedMovies/${uid}/${ref}`);

    movieDetails.on('value', snapshot => {
      commit('GET_MOVIE_DETAILS', snapshot.val());
    });
  }
};

const mutations = {
  [types.GET_WATCHED_MOVIES](state, snapshot) {
    state.watchedMovies = snapshot;
  },
  [types.GET_MOVIE_DETAILS](state, snapshot) {
    state.movieDetails = snapshot;
  },
  [types.UPDATE_FOUND_MOVIES](state, movies) {
    state.foundMovies = movies;
  },
  [types.EMPTY_FOUND_MOVIES](state) {
    state.foundMovies = [];
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
