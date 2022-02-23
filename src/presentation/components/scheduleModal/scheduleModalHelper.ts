import moment from 'moment';
import { ITimeslotsData } from '../Timeslots/TimeslotsHelper';

export const MINUTE_PER_HOUR = 60;
export const MINUTE_PER_SLOT = 3;
export const MILLISECOND_TO_MINUTE = 60000;
export const TIME_OUT_INVALID_SEARCH_DATE = 200;

export interface IScheduleData {
  start: string;
  length: number;
  days: ITimeslotsData[];
}

export interface IDays {
  date: string;
  freeSlots: number;
  appointmentCalls: number;
  isActive: boolean;
}

export interface IAppointment {
  appointmentType: string;
  subject: string;
}

export interface ILeadAppointment extends IAppointment {
  payment: boolean;
  lead: string;
}

export interface IOrderAppointment extends IAppointment {
  order: string;
  purpose: string;
  urgent: boolean;
}

export interface IAppointmentDetail
  extends IAppointment,
    IGetAppointmentCallback {
  lead?: string;
  payment?: boolean;
}

export interface IGetAppointmentCallback {
  name: string;
  detailLink: string;
  humanId: {
    label: string;
    id: string;
  };
}

export type IGetAppointmentDetail = (
  payload: ILeadAppointment | IOrderAppointment,
  callback: (res: IGetAppointmentCallback) => void
) => void;

export interface ISaveAppointment {
  startTime: string;
  endTime: string;
  appointment: IAppointment;
}

export const getEndTime = (startTime: string, length: number) => {
  return new Date(
    new Date(startTime).getTime() + length * MILLISECOND_TO_MINUTE
  ).toISOString();
};

export const DAY_PER_WEEK = 7;

export const checkBeforeCurrentTime = (startTimeISO: string) => {
  const startTime = moment(startTimeISO).utc().format('YYYY-MM-DD HH:mm');
  const currentTime = moment().format('YYYY-MM-DD HH:mm');

  return moment(startTime).isBefore(moment(currentTime));
};

export default abstract class ScheduleModalHelper {
  public data?: IScheduleData;

  abstract buildDaysListData(): any[];

  buildTimeslotData(selectedDate: Date) {
    const convertedDate = moment(selectedDate).format('yyyy-MM-DD');
    const timeslotData = this.data?.days ? this.data?.days : [];
    const matchTimeSlotData = timeslotData.find((foundDay) => {
      return foundDay.date === convertedDate.toString();
    });

    if (matchTimeSlotData) {
      return matchTimeSlotData;
    }
    return matchTimeSlotData;
  }

  protected getMaxFreeSlotsPerDay = (start: string, end: string) => {
    const timeStart = start.substring(0, start.indexOf(':'));
    const timeEnd = end.substring(0, end.indexOf(':'));
    const workHoursPerDay = Number(timeEnd) - Number(timeStart);

    return (workHoursPerDay * MINUTE_PER_HOUR) / MINUTE_PER_SLOT;
  };
}
