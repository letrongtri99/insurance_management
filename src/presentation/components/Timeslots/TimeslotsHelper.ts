import moment from 'moment';
import { MINUTE_PER_SLOT, MINUTES_PER_HOUR } from '../../../config/constant';
import {
  ILeadAppointment,
  IOrderAppointment,
} from '../scheduleModal/scheduleModalHelper';

export interface IAppointmentTime {
  length: string;
  startTime: string;
  endTime: string;
}

export interface IName {
  firstName: string;
  lastName: string;
}

export interface ISchedule {
  time: string;
  length: string;
  appointment: ILeadAppointment | IOrderAppointment;
  startTime: string;
  endTime: string;
  isPayment?: boolean;
  isUrgent?: boolean;
}

export interface ICookedData {
  [key: string]: ITimeslot;
}
export interface IUpdateData {
  startTime: string;
  length: number;
}
export interface ITimeslotsData {
  date: string;
  start: string;
  end: string;
  slots: number[];
  schedule: ISchedule[];
}
export interface ITimeslot {
  time: string;
  type?: string;
  group?: string;
  isActive?: boolean;
  isStartRow?: boolean;
  position?: string;
  appointmentDetail?: ILeadAppointment | IOrderAppointment;
  timeDetail?: IAppointmentTime;
}

export interface ILeadDetail {
  humanId?: string;
  name?: IName;
}

export default class TimeslotsHelper {
  data?: ITimeslotsData;

  protected readonly HIGHLIGHT_TYPE = 'highlight';

  protected readonly DEFAULT_TYPE = 'default';

  CLASS_ACTIVE = 'active';

  CLASS_LAST = 'last';

  CLASS_START = 'start';

  constructor(data?: ITimeslotsData) {
    this.data = data;
  }

  cookTimesData = () => {
    const timeslotData: ICookedData = {};
    if (this.data) {
      const start = Number(this.data.start.split(':')[0]);
      const end = Number(this.data.end.split(':')[0]);
      for (let hh = start; hh < end; hh += 1) {
        let mm = 0;
        while (mm < MINUTES_PER_HOUR / MINUTE_PER_SLOT) {
          const time = moment({ hour: hh, minute: mm * MINUTE_PER_SLOT })
            .local()
            .format('H:mm');
          timeslotData[time] = { time };
          if (mm === 0) {
            timeslotData[time].isStartRow = true;
          }
          mm += 1;
        }
      }
      this.data.schedule.forEach((item: ISchedule) => {
        const tempTime = moment(item.time).utc().format('H:mm');

        if (Number(item.length) > MINUTE_PER_SLOT) {
          for (
            let activeSlot = 0;
            activeSlot < Number(item.length) / MINUTE_PER_SLOT;
            activeSlot += 1
          ) {
            const time = moment(item.time)
              .utc()
              .add(activeSlot * MINUTE_PER_SLOT, 'minutes')
              .format('H:mm');

            timeslotData[time].appointmentDetail = item.appointment;
            timeslotData[time].timeDetail = {
              length: item.length,
              startTime: item.startTime,
              endTime: item.endTime,
            };
            timeslotData[time].type = this.isHighLightSlot(item)
              ? this.HIGHLIGHT_TYPE
              : this.DEFAULT_TYPE;
            timeslotData[time].group = tempTime;
            if (activeSlot === 0) {
              timeslotData[time].position = this.CLASS_START;
            }
            if (activeSlot === Number(item.length) / MINUTE_PER_SLOT - 1) {
              timeslotData[time].position = this.CLASS_LAST;
            }
          }
        } else {
          timeslotData[tempTime].appointmentDetail = item.appointment;
          timeslotData[tempTime].timeDetail = {
            length: item.length,
            startTime: item.startTime,
            endTime: item.endTime,
          };
          timeslotData[tempTime].type = this.isHighLightSlot(item)
            ? this.HIGHLIGHT_TYPE
            : this.DEFAULT_TYPE;
        }
      });
    }
    return timeslotData;
  };

  protected isHighLightSlot = (item: ISchedule) => {
    return item.isPayment || item.isUrgent;
  };

  getSlotsData = (item: ITimeslot, inputData: ICookedData) => {
    const slotsData = [];
    if (item.type === undefined && this.data) {
      const hh = Number(item.time.split(':')[0]);
      const mm = Number(item.time.split(':')[1]);
      for (
        let slotIndex = 0;
        slotIndex < this.data.slots.length;
        slotIndex += 1
      ) {
        const time = moment({
          hour:
            hh +
            Math.floor((mm + this.data.slots[slotIndex]) / MINUTES_PER_HOUR),
          minute:
            mm + this.data.slots[slotIndex] < MINUTES_PER_HOUR
              ? mm + this.data.slots[slotIndex]
              : (mm + this.data.slots[slotIndex]) % MINUTES_PER_HOUR,
        }).format('H:mm');
        if (inputData[time] && inputData[time].type === undefined) {
          slotsData.push(this.data.slots[slotIndex]);
        } else {
          slotsData.push(this.data.slots[slotIndex]);
          break;
        }
      }
    }
    return slotsData;
  };

  handleSelectSlot = (
    { startTime, length }: IUpdateData,
    initialData: ICookedData
  ) => {
    const tempData = JSON.parse(JSON.stringify(initialData));
    const hh = Number(startTime.split(':')[0]);
    const mm = Number(startTime.split(':')[1]);
    if (length > MINUTE_PER_SLOT) {
      for (
        let activeSlot = 0;
        activeSlot < length / MINUTE_PER_SLOT;
        activeSlot += 1
      ) {
        const time = moment({
          hour:
            hh +
            Math.floor((mm + activeSlot * MINUTE_PER_SLOT) / MINUTES_PER_HOUR),
          minute:
            mm + activeSlot * MINUTE_PER_SLOT < MINUTES_PER_HOUR
              ? mm + activeSlot * MINUTE_PER_SLOT
              : (mm + activeSlot * MINUTE_PER_SLOT) % MINUTES_PER_HOUR,
        }).format('H:mm');
        if (tempData[time]) {
          tempData[time].isActive = true;
          tempData[time].group = this.CLASS_ACTIVE;
        }
        if (activeSlot === 0) {
          tempData[time].position = this.CLASS_START;
        }
        if (activeSlot === length / MINUTE_PER_SLOT - 1) {
          tempData[time].position = this.CLASS_LAST;
        }
      }
    } else {
      tempData[startTime].isActive = true;
    }
    return tempData;
  };
}
