const today = new Date().getTime();

export function objSize(obj) {
   if(!obj) return;
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
   let diff = Math.abs(time - today)/1000;

   return Math.floor(diff / dayInSec) > days;
}

export function timeNow(){
   return today;
}

export function isFutureTime(date){
   date = parseInt(date, 0);
   let delta = Math.abs((date - timeNow()))/1000;

   return date - timeNow() < 0;
}
