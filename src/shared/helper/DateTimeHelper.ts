import moment, { Moment } from 'moment';

export default class DateTimeHelper {
  static getDefaultMinDate = (): Moment => {
    return moment('1900-01-01', 'YYYY-MM-DD');
  };
}

export const isValidDateFormat = (date: string, format: string) => {
  return moment(date, format, true).isValid();
};
