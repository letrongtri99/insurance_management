import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import Popper from '@material-ui/core/Popper';
import { Link } from 'react-router-dom';
import { Close } from '@material-ui/icons';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import TimeSlot from './Timeslot';
import TimeslotsHelper, {
  IUpdateData,
  ITimeslotsData,
  ITimeslot,
  ICookedData,
  IAppointmentTime,
} from './TimeslotsHelper';
import './timeSlots.scss';
import {
  IAppointmentDetail,
  IGetAppointmentCallback,
  IGetAppointmentDetail,
} from '../scheduleModal/scheduleModalHelper';

interface IProps {
  data: ITimeslotsData;
  onUpdate: (data: IUpdateData) => void;
  onGetAppointmentDetail: IGetAppointmentDetail;
}

const helperData = new TimeslotsHelper();

const TimeSlots = ({ data, onUpdate, onGetAppointmentDetail }: IProps) => {
  const [arrowRef, setArrowRef] = React.useState<null | HTMLSpanElement>(null);
  const [inputData, setInputData] = useState<ICookedData>({});
  // INFO initialData is a version of inputData to handle case re-select slot
  const [initialData, setInitialData] = useState<ICookedData>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLDivElement>(null);
  const [appointmentDetail, setAppointmentDetail] =
    React.useState<null | IAppointmentDetail>(null);
  const [timeDetail, setTimeDetail] = React.useState<null | IAppointmentTime>(
    null
  );

  const id = useMemo(() => {
    return anchorEl ? 'appointment-detail__popper' : undefined;
  }, [anchorEl]);

  const getKey = (object: any) => {
    return Object.keys(object);
  };

  const getSlotsData = (item: ITimeslot) => {
    return helperData.getSlotsData(item, inputData);
  };

  const handleSelectSlot = ({ startTime, length }: IUpdateData) => {
    const cookedData = helperData.handleSelectSlot(
      { startTime, length },
      initialData
    );

    setInputData(cookedData);
    onUpdate({
      startTime,
      length,
    });
  };

  useEffect(() => {
    helperData.data = data;
    const cookedData = helperData.cookTimesData();
    setInitialData(cookedData);
    setInputData(cookedData);
  }, [data]);

  const handleShowAppointmentDetail = (
    { appointmentDetail: detail, timeDetail: appointmentTime }: any,
    currentTarget: HTMLDivElement
  ) => {
    const { subject, appointmentType } = detail;
    onGetAppointmentDetail(
      detail,
      ({ name, detailLink, humanId }: IGetAppointmentCallback) => {
        setAppointmentDetail({
          subject,
          appointmentType,
          name,
          detailLink,
          humanId,
        });

        setTimeDetail(appointmentTime);
        setAnchorEl(currentTarget);
      }
    );
  };

  const getTimeDetail = () => {
    return `${moment(timeDetail?.startTime).utc().format('H:mm')}
    -${moment(timeDetail?.endTime).utc().format('H:mm')}
    (${timeDetail?.length} mins)`;
  };

  return (
    <div
      className="time-slots"
      id="container"
      data-testid="time-slots-container"
    >
      {inputData &&
        getKey(inputData).map((item) => {
          return (
            <TimeSlot
              data={inputData[item]}
              slots={getSlotsData(inputData[item])}
              onSelectSlot={(event: IUpdateData) => handleSelectSlot(event)}
              key={item}
              showAppointmentDetail={(currentTarget) => {
                handleShowAppointmentDetail(inputData[item], currentTarget);
              }}
            />
          );
        })}
      {!!anchorEl && (
        <div
          className="popper__overlay-container"
          role="presentation"
          onClick={() => setAnchorEl(null)}
        />
      )}
      <Popper
        id={id}
        data-testid="appointment-detail-popup"
        open={!!anchorEl}
        placement="top"
        anchorEl={anchorEl}
        disablePortal
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
        }}
      >
        <span className="popper-appointment-arrow" ref={setArrowRef} />

        <div className="popper__main-container">
          <div className="appointment-detail__close-icon">
            <Close
              onClick={() => setAnchorEl(null)}
              width="11"
              height="11"
              viewBox="0 0 24 24"
              style={{
                transform: 'scale(0.7)',
              }}
              data-testid="appointment-detail-close-icon"
            />
          </div>

          {appointmentDetail && (
            <>
              <div className="appointment-detail__information-container">
                <div className="appointment-detail__header-section">
                  <span className="appointment-detail__main-title">
                    {getString('timeSlotCallBack.appointment')}
                  </span>
                  <span
                    className="appointment-detail__time-detail"
                    style={{
                      color: appointmentDetail.payment ? '#f90003' : '#27a886',
                    }}
                  >
                    {getTimeDetail()}
                  </span>
                </div>
                <div className="appointment-detail__information">
                  <span>{getString('timeSlotCallBack.appointmentType')}</span>
                  <span className="appointment-detail__appointment-type">
                    {getString(
                      `appointmentType.${appointmentDetail.appointmentType}`
                    )}
                  </span>
                </div>
                <div className="appointment-detail__information">
                  <span>{getString('timeSlotCallBack.subject')}</span>
                  <span>{appointmentDetail.subject}</span>
                </div>
                <div className="appointment-detail__information">
                  <span>{getString('timeSlotCallBack.customerName')}</span>
                  <span data-testid="appointment-name">
                    {appointmentDetail.name}
                  </span>
                </div>
                <div className="appointment-detail__information">
                  <span>{appointmentDetail.humanId.label}</span>
                  <span>{appointmentDetail.humanId.id}</span>
                </div>
              </div>
              <Link
                to={appointmentDetail.detailLink}
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <Controls.Button
                  text={getString('timeSlotCallBack.viewMoreButton')}
                  color="primary"
                  style={{ textTransform: 'uppercase', width: '100%' }}
                  className="button"
                />
              </Link>
            </>
          )}
        </div>
      </Popper>
    </div>
  );
};

export default TimeSlots;
