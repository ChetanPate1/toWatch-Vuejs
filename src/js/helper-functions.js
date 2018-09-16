const today = new Date().getTime();

export function objSize(obj) {
    if (!obj) return;
    let count = 0;
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            ++count;
        }
    }
    return count;
}

export function dateToMs(date) {
    return new Date(date).getTime();
}

export function hasDaysPast(time, days) {
    time = parseInt(time);
    let dayInSec = 86400;
    let diff = Math.abs(time - today) / 1000;

    return Math.floor(diff / dayInSec) > days;
}

export function timeNow() {
    return today;
}

export function isFutureTime(date) {
    date = parseInt(date, 0);
    let delta = Math.abs((date - timeNow())) / 1000;

    return date - timeNow() < 0;
}

export function sortSeasons(seasons) {
    let sorted_unwatched = {};
    let sorted_seasons_array = Object.keys(seasons).sort((a, b) => {
        let season_a = parseInt(a.split('_')[1]);
        let season_b = parseInt(b.split('_')[1]);

        return season_a - season_b;
    });

    sorted_seasons_array.map((season) => {
        sorted_unwatched[season] = seasons[season];
    });

    return sorted_unwatched;
}