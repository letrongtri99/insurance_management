import moment, { Moment } from 'moment';
import { DateTimeFormat } from '../constants/index';
// import { DateTimeFormat } from 'app/shared/constants';

// TODO: we need input validation for this utils
export default class TimeUtils {
  public static formatCustomOptionDateTime = (date: Moment): string => {
    return date.format(DateTimeFormat.FullDateTime);
  };

  public static formatCustomOptionDate = (date: Moment): string => {
    return date.format(DateTimeFormat.FullDate);
  };

  public static formatCustomOptionTime = (date: Moment): string => {
    return date.format(DateTimeFormat.Time);
  };

  public static format24 = (date?: string): string => {
    return date ? moment(date).format(DateTimeFormat.DateTime24h) : '';
  };

  public static fullDate = (date?: string): string => {
    return date ? moment(date).format(DateTimeFormat.FullDate) : '';
  };

  public static formartCustomOption = (
    date: string,
    format: string
  ): string => {
    return date ? moment(date).format(format) : '';
  };
}
