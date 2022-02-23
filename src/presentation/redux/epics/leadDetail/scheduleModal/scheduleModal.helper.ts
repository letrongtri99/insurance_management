import moment from 'moment';

export const DELAY_DATA_LOADING = 400;

export const getLeadIdFromPath = () => {
  const pathSplit = window.location.href.split('/');
  if (pathSplit?.length) {
    if (pathSplit.includes('custom-quote')) {
      return pathSplit[pathSplit.length - 2];
    }
    return pathSplit[pathSplit.length - 1];
  }
  return '';
};
const MILLISECOND_TO_MINUTE = 60000;

const getAppointmentLength = (startTime: string, endTime: string) => {
  const result =
    (new Date(endTime).getTime() - new Date(startTime).getTime()) /
    MILLISECOND_TO_MINUTE;
  return result.toString();
};

const handleGetTime = (time: string) => {
  let hour: any = new Date(time).getUTCHours();
  let minute: any = new Date(time).getUTCMinutes();

  if (hour < 10) {
    hour = `0${hour.toString()}`;
  }
  if (minute < 10) {
    minute = `0${minute.toString()}`;
  }

  return `${hour}:${minute}`;
};

export const handleData = (data: any) => {
  const { start, length, days } = data;
  const startDate = moment(start).format('yyyy-MM-DD');

  const daysArr = days.map((item: any) => {
    const newDate = moment(item.date).format('yyyy-MM-DD');
    const newStart = handleGetTime(item.start);
    const newEnd = handleGetTime(item.end);

    const newSchedule = item.events.map((event: any) => {
      const newAppointment = { ...event };

      newAppointment.time = newAppointment.startTime;

      newAppointment.length = getAppointmentLength(
        newAppointment.startTime,
        newAppointment.endTime
      );

      if (event.appointment) {
        newAppointment.isPayment = event.appointment.payment;
      } else if (event.orderAppointment) {
        newAppointment.appointment = event.orderAppointment;

        newAppointment.appointment.appointmentType =
          event.orderAppointment.purpose.toLowerCase();

        newAppointment.isUrgent = newAppointment.appointment.urgent;
      }

      return newAppointment;
    });

    return {
      ...item,
      date: newDate,
      end: newEnd,
      start: newStart,
      schedule: newSchedule,
    };
  });

  const result = {
    start: startDate,
    length,
    days: daysArr,
  };

  return result;
};

export const formatUserId = (userName: string) => {
  let userId = '';
  if (userName) {
    userId = userName.replace('users/', '');
  }

  return userId;
};
