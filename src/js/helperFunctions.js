const today = new Date().getTime();

export function objSize(obj) {
  let count = 0;
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      ++count;
    }else {
      break;
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
  let diff = Math.abs(time - today)/1000;

  return Math.floor(diff / dayInSec) > days;
}
