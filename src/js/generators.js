import { objSize, dateToMs } from './helperFunctions';

export function generateSeasons(show) {
   let episodes = show.episodes;
   let init = {};
   let size = objSize(episodes) - 1;
   let seasonNum = 1, j = 1, i = 0;
   let series = {};
   series.seasons = [];
   series.series = show.name;
   series.imgSrc = show.image_path;
   series.imgSrcSm = show.image_thumbnail_path;
   series.status = show.status;
   series.lastUpdated = new Date().getTime();

   init['season_'+ seasonNum] = {};
   for (i; i <= size; i++) {
      init['season_'+ seasonNum][ j ] = {
         name: episodes[i].name,
         number: episodes[i].episode,
         airDate: dateToMs( episodes[i].air_date )
      };

      if(i > size - 1){
         break;
      }else if (episodes[i + 1].season === seasonNum) {
         j++;
      }else {
         j = 1;
         seasonNum++;
         init['season_'+ seasonNum] = {};
      }

      series.seasons = init;
   }

   return series;
}

export function initWatchlist(show, series) {
   let list = {
      lastUpdated: new Date().getTime(),
      upToDate: false,
      showId: series.seriesRef,
      on: {
         season: series.season,
         episode: series.episode
      },
      unwatched: {}
   };

   let init = {};
   let total_seasons = objSize(show.seasons);
   let onE = parseInt(series.episode);
   let onS = parseInt(series.season);
   let i = onS;
   let total_episodes_onS = objSize(show.seasons[`season_${onS}`]);

   for(i; i <= total_seasons; i++){
      let seasonsSize = objSize(show.seasons[`season_${i}`]);
      init[`season_${i}`] = show.seasons[`season_${i}`];
      init[`season_${i}`][0] = i;

      for (let j = 1; j <= seasonsSize; j++) {
         init[`season_${i}`][j].watched = false;

         if(j < onE && i == onS){
            init[`season_${i}`][j].watched = true;
         }
      }
   }

   list['unwatched'] = init;

   return list;
}
