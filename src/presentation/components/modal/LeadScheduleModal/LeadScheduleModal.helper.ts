import ScheduleModalHelper, {
  IDays,
  MINUTE_PER_SLOT,
} from '../../scheduleModal/scheduleModalHelper';

interface ILeadDays extends IDays {
  paymentCalls: number;
}

export default class LeadScheduleModalHelper extends ScheduleModalHelper {
  buildDaysListData(): ILeadDays[] {
    const daysDataListOrigin = this.data?.days || [];
    const cookedDaysList: ILeadDays[] = [];
    daysDataListOrigin.forEach((dayItem) => {
      const tmpDay: ILeadDays = {
        date: '',
        freeSlots: 0,
        paymentCalls: 0,
        appointmentCalls: 0,
        isActive: false,
      };
      let totalPayCall = 0;
      let totalAppCall = 0;
      let takenSlots = 0;

      dayItem.schedule.forEach((callItem) => {
        if (callItem.isPayment) {
          totalPayCall += 1;
        } else {
          totalAppCall += 1;
        }
        takenSlots += parseInt(callItem.length, 10);
      });

      const maxFreeSlots = this.getMaxFreeSlotsPerDay(
        dayItem.start,
        dayItem.end
      );
      tmpDay.date = dayItem.date;
      tmpDay.freeSlots = maxFreeSlots - takenSlots / MINUTE_PER_SLOT;
      tmpDay.paymentCalls = totalPayCall;
      tmpDay.appointmentCalls = totalAppCall;

      cookedDaysList.push(tmpDay);
    });

    return cookedDaysList;
  }
}
