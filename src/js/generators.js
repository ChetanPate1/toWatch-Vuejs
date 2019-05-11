import { objSize, dateToMs } from './helper-functions';
import axios from 'axios';

const apikey = '7174c422';

export async function generateSeasons(show) {
  const total = parseInt(show.totalSeasons)
  const seasonArray = [...Array(total).keys()];
  const promises = seasonArray.map(value => (
    axios.get('https://www.omdbapi.com', {
      params: { apikey, i: show.imdbID, season: value + 1 }
    })
  ));

  const responses = await Promise.all(promises);
  const episodes = [];
  responses.map((res, index) => {
    if (res.data.Response == 'True') {
      episodes.push({
        season: index + 1,
        episodes: res.data.Episodes
      });
    }
  });

  return { ...show, episodes };
}

export function initWatchlist(show, series) {
  let list = {
    lastUpdated: new Date().getTime(),
    upToDate: false,
    showId: series.seriesRef,
    on: {
      season: series.season,
      episode: series.episode,
      name: ''
    },
    unwatched: {}
  };

  let unwatched = show.episodes;

  for (let season in unwatched) {
    unwatched[season].forEach((episode) => {
      let seasonNum = parseInt(season.split('_')[1]);
      episode.watched = false;

      if (seasonNum < series.season) {
        episode.watched = true;
      }
    });
  }

  unwatched[`season_${series.season}`].forEach((episode) => {
    if (episode.number < series.episode) {
      episode.watched = true;
    }
  });

  list.on.name = unwatched[`season_${series.season}`][series.episode - 1].name
  list['unwatched'] = unwatched;

  return list;
}

export function initRewatchlist(show) {
  let series = {
    episode: 1,
    season: 1
  };

  return initWatchlist(show, series);
}

function formatDate(date) {
  return date.split(' ')[0];
}
