import moment from 'moment';

export const THAI_YEAR_DIFFERENCE = 543;

export const thaiDateFormat = (isoDate: string | Date | null) => {
  if (isoDate) {
    const date = new Date(isoDate);
    let day = String(date.getDate());
    // INFO: getMonth function start with number 0 => add 1 to every month.
    let month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    const thaiYear = year + THAI_YEAR_DIFFERENCE;

    // INFO: 2 is length of month that > September and day that > 9.
    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return `${day}/${month}/${year} (${thaiYear})`;
  }
  return '';
};
export const thaiDateFormatV2 = (date: string | Date | null) => {
  if (date) {
    const year = moment(date).year();
    return `${moment(date).format('DD/MM/yyyy')}(${`${
      year + THAI_YEAR_DIFFERENCE
    })`}`;
  }
  return '';
};
