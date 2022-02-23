/* eslint-disable class-methods-use-this */
import { dayComponent } from 'models/DayComponent';
import moment from 'moment';

export default class DaysComponentHelper {
  getDaysArray(
    daysDataArray: Array<dayComponent>,
    selectedDate: string | undefined
  ) {
    let newDaysData: Array<dayComponent> = [];
    if (daysDataArray.length) {
      const isHasToday = !!daysDataArray.filter((day) =>
        moment(day.date).isSame(moment(), 'days')
      ).length;

      const isInDateRange = daysDataArray.find(
        (day) => day.date === selectedDate
      );
      if (selectedDate && isInDateRange) {
        newDaysData = daysDataArray.map((day) => {
          const newDay = day;
          // INFO: set active for the day which is selected day
          newDay.isActive = moment(day.date).isSame(
            moment(selectedDate),
            'days'
          );
          return newDay;
        });
      } else if (isHasToday) {
        newDaysData = daysDataArray.map((day) => {
          const newDay = day;
          // INFO: set active for the day which is today
          newDay.isActive = moment(day.date).isSame(moment(), 'days');
          return newDay;
        });
      } else {
        newDaysData = daysDataArray.map((day, index) => {
          const newDay = day;
          // INFO: set active for the first day
          newDay.isActive = index === 0;
          return newDay;
        });
      }
    }
    return newDaysData;
  }

  isHasToday(daysData: Array<dayComponent>) {
    const tmpDaysList = daysData;
    const currentDay = moment().format('yyyy-MM-DD').toString();

    const hasToday = tmpDaysList.find((matchedItem) => {
      return matchedItem.date === currentDay;
    });
    return !!hasToday;
  }
}
