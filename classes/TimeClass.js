import {format, fromUnixTime} from 'date-fns';
export default class TimeClass {

     getDate(epochTime: number): {
        month: string;
        day: string;
        dayNum: string;
      } {
        const month = format(fromUnixTime(Number(epochTime)), 'MMMM');
        const day = format(fromUnixTime(Number(epochTime)), 'EEEE');
        const dayNum = format(fromUnixTime(Number(epochTime)), 'd');
        return {month: month, day: day, dayNum: dayNum};
      }
}