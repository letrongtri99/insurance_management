import React, { useCallback } from 'react';
import ScheduleModal from 'presentation/components/scheduleModal';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAppointment,
  saveAppointment,
} from 'presentation/redux/actions/leadDetail/scheduleModal';
import { getString } from 'presentation/theme/localization';
import OrderApi from 'data/gateway/api/services/order';
import CustomerApi from 'data/gateway/api/services/customer';
import { concatMap, pluck } from 'rxjs/operators';
import { of } from 'rxjs';
import OrderScheduleModalHelper from './OrderScheduleModal.helper';
import {
  IGetAppointmentDetail,
  IOrderAppointment,
  ISaveAppointment,
  IScheduleData,
} from '../../scheduleModal/scheduleModalHelper';

interface IOrderScheduleModal {
  isOpen: boolean;
  onClose: () => void;
  schedulerData: IScheduleData;
  saveAppointment: (payload: ISaveOrderAppointment) => void;
  getAppointment: (date: string, filter: string) => void;
  loading: boolean;
}

interface ISaveOrderAppointment {
  startTime: string;
  endTime: string;
  orderAppointment: IOrderAppointment;
}

enum AppointmentPurpose {
  DOCUMENT_FOLLOW_UP = 'DOCUMENT_FOLLOW_UP',
  WRONG_DOCUMENT = 'WRONG_DOCUMENT',
}

const appointmentOptions = () => [
  {
    id: AppointmentPurpose.DOCUMENT_FOLLOW_UP,
    title: getString('text.followup'),
  },
  {
    id: AppointmentPurpose.WRONG_DOCUMENT,
    title: getString('text.wrongDocument'),
  },
];

const orderApi = new OrderApi();
const customerApi = new CustomerApi();

const OrderScheduleModal = ({
  isOpen,
  onClose,
  schedulerData,
  saveAppointment: handleSaveSchedule,
  getAppointment: handleGetAppointment,
  loading,
}: IOrderScheduleModal) => {
  const orderName = useSelector(
    (state: any) => state.order?.payload?.name || ''
  );

  const handleSubmit = (payload: ISaveAppointment, formFilter: any) => {
    const appointmentPayload: ISaveOrderAppointment = {
      startTime: payload.startTime,
      endTime: payload.endTime,
      orderAppointment: {
        subject: payload.appointment.subject,
        order: orderName,
        appointmentType: 'requested',
        purpose: payload.appointment.appointmentType,
        urgent: formFilter.isUrgent,
      },
    };

    handleSaveSchedule(appointmentPayload);
  };

  const handleOrderGetAppointment = useCallback(
    (startDate) => {
      handleGetAppointment(startDate, 'resource:"orders/"');
    },
    [handleGetAppointment]
  );

  const handleGetAppointmentDetail: IGetAppointmentDetail = (
    payload,
    callback
  ) => {
    const { order } = payload as IOrderAppointment;

    orderApi
      .getOrder(order)
      .pipe(
        pluck('data'),
        concatMap((orderResponse: any) => {
          if (orderResponse.customer) {
            return customerApi.getCustomer(orderResponse.customer).pipe(
              pluck('data'),
              concatMap((customerResponse: any) => {
                const transFormOrderResponse = { ...orderResponse };
                transFormOrderResponse.customer = customerResponse;

                return of(transFormOrderResponse);
              })
            );
          }

          return of(orderResponse);
        })
      )
      .subscribe((response: any) => {
        callback({
          humanId: {
            id: response.humanId,
            label: getString('timeSlotCallBack.orderID'),
          },
          name: `${response.customer?.firstName ?? ''} ${
            response.customer?.lastName ?? ''
          }`,
          detailLink: `/order/${response.name}`,
        });
      });
  };

  return (
    <ScheduleModal
      openDialog={isOpen}
      closeDialog={onClose}
      schedulerData={schedulerData}
      appointmentOptions={appointmentOptions}
      HelperScheduleData={OrderScheduleModalHelper}
      onSubmit={handleSubmit}
      onGetAppointment={handleOrderGetAppointment}
      onGetAppointmentDetail={handleGetAppointmentDetail}
      loading={loading}
      initialFilter={{ isUrgent: false }}
    />
  );
};

const mapStateToProps = (state: any) => ({
  schedulerData:
    state?.leadsDetailReducer?.listAppointment?.data?.appointmentData,
  loading: state?.leadsDetailReducer?.listAppointment?.data?.loading,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getAppointment,
      saveAppointment,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderScheduleModal);
