import { ONE_MINUTE_MILLISECONDS } from '../constants';

class DatesHelper {
  getMilliseconds(value: number, duration: 'min' | 'hour' = 'hour') {
    if (duration === 'min') {
      return value * ONE_MINUTE_MILLISECONDS;
    } else {
      return value * 60 * ONE_MINUTE_MILLISECONDS;
    }
  }

  getDateAfterPeriod(noOfDays: number, startDate = new Date()) {
    const startDateSec = startDate?.getTime();
    return new Date(startDateSec + this.getMilliseconds(noOfDays * 24));
  }
}

export const datesHelper = new DatesHelper();
