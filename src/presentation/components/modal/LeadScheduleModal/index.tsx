import React, { useEffect } from 'react';
import { getString } from 'presentation/theme/localization';
import ScheduleModal from 'presentation/components/scheduleModal';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import LeadScheduleModalHelper from './LeadScheduleModal.helper';
import {
  ILeadAppointment,
  ISaveAppointment,
  IScheduleData,
  IGetAppointmentDetail,
} from '../../scheduleModal/scheduleModalHelper';

import {
  getAppointment,
  saveAppointment,
} from '../../../redux/actions/leadDetail/scheduleModal';
import LeadDetail from '../../../../data/repository/leadDetail/cloud';

interface ISaveLeadAppointment extends ISaveAppointment {
  appointment: ILeadAppointment;
}

interface ILeadScheduleModal {
  isOpen: boolean;
  onClose: () => void;
  schedulerData: IScheduleData;
  saveAppointment: (payload: ISaveAppointment) => void;
  getAppointment: (payload: string) => void;
  loading: boolean;
}

const appointmentOptions = () => [
  { id: 'requested', title: getString('text.customerRequested') },
  { id: 'agreed', title: getString('text.customerAgreed') },
  { id: 'assumed', title: getString('text.myBestGuess') },
];

const clearSub$ = new Subject();

const LeadScheduleModal = ({
  isOpen,
  onClose,
  schedulerData,
  saveAppointment: handleSaveSchedule,
  getAppointment: handleGetAppointment,
  loading,
}: ILeadScheduleModal) => {
  const currentLead = useSelector(
    (state: any) => state.leadsDetailReducer?.getAgentReducer.data?.agent || {}
  );

  useEffect(() => {
    return () => {
      clearSub$.next(true);
    };
  }, []);

  const handleSubmit = (payload: ISaveAppointment, formFilter: any) => {
    const appointmentPayload: ISaveLeadAppointment = {
      ...payload,
      appointment: {
        ...payload.appointment,
        lead: currentLead.name || '',
        payment: formFilter.isPayment,
      },
    };

    handleSaveSchedule(appointmentPayload);
  };

  const handleGetAppointmentDetail: IGetAppointmentDetail = (
    payload,
    callback
  ) => {
    const { lead } = payload as ILeadAppointment;
    const leadId = lead.split('/')[1];
    LeadDetail.getLeadDetailById(leadId)
      .pipe(takeUntil(clearSub$))
      .subscribe((res: any) => {
        callback({
          humanId: {
            id: res.humanId,
            label: getString('timeSlotCallBack.leadID'),
          },
          name: `${res.data.customerFirstName} ${res.data.customerLastName}`,
          detailLink: `/lead/${leadId}`,
        });
      });
  };

  return (
    <ScheduleModal
      openDialog={isOpen}
      closeDialog={onClose}
      schedulerData={schedulerData}
      appointmentOptions={appointmentOptions}
      HelperScheduleData={LeadScheduleModalHelper}
      onSubmit={handleSubmit}
      onGetAppointment={handleGetAppointment}
      onGetAppointmentDetail={handleGetAppointmentDetail}
      loading={loading}
      initialFilter={{ isPayment: false }}
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadScheduleModal);
