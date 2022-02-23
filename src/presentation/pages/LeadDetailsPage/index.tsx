import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import { getString } from 'presentation/theme/localization';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid as MuiGrid, Box } from '@material-ui/core';
import './index.scss';
import CommonButton from 'presentation/components/LeadDetails/CommonButton';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import LeadScheduleModal from 'presentation/components/modal/LeadScheduleModal';
import MessageModal from 'presentation/components/modal/MessageModal/index';
import PaySlipModal from 'presentation/components/modal/PayslipModal/index';
import Controls from 'presentation/components/controls/Control';
import CarInfoSection from 'presentation/components/CarInfoSection/CarInfoSection';
import InsurerInfoSection from 'presentation/components/InsurerInfoSection/InsurerInfoSection';
import CallSummarySection from 'presentation/components/CallSummarySection/CallSummarySection';
import ActivitySection from 'presentation/components/ActivitySection';
import {
  showModal,
  hideModal,
  showSnackBar,
} from 'presentation/redux/actions/ui';
import { getLead } from 'presentation/redux/actions/leadDetail/getLeadByName';
import { getListInsurer } from 'presentation/redux/actions/leadDetail/insurer';
import { updateCustomerDetail } from 'presentation/redux/actions/leadDetail/updateCustomerDetail';
import {
  calling,
  endCall,
  getInstallment,
  getCallParticipants,
} from 'presentation/redux/actions/leads/detail';
import * as CONSTANTS from 'shared/constants';
import CommonModal from 'presentation/components/modal/CommonModal';
import SummaryCallModal from 'presentation/components/modal/SummaryCallModal';
import { ISnackBarConfig } from 'shared/interfaces/common';
import PhoneForwardedOutlinedIcon from '@material-ui/icons/PhoneForwardedOutlined';
import { destroyModalSchedule } from 'presentation/redux/actions/leadDetail/scheduleModal';
import { useHistory, useParams } from 'react-router-dom';
import CarInfo from 'presentation/models/lead/CarInfo/CarInfo';
import { IInsurer } from 'presentation/models/lead/insurer';
import LeadDetail from 'data/repository/leadDetail/cloud';
import { mergeMap } from 'rxjs/operators';
import Loader from 'presentation/components/Loader';
import CallTimer from 'presentation/components/LeadDetails/CallTimer';
import MarkImportantButton from 'presentation/components/LeadDetails/MarkImportantButton';
import styled from 'styled-components';
import {
  CalendarIcon,
  EnvelopeIcon,
  TrashIcon,
} from 'presentation/components/icons';
import { provinceAbbreviationCollection } from 'shared/constants/provinceAbbreviation';
import LeadCallModal from 'presentation/components/modal/LeadCallModal';
import ChooseNameModal from 'presentation/components/modal/ChooseModalName';
import CustomerSection from './CustomerSection';
import NotFound from '../../components/NotFound';
import {
  startPeerConnection,
  closePeerConnection,
  handleAudioAnswer,
  getPeerConnection,
} from './WebRTC';

import {
  fakeInsurers,
  formatCarInfo,
  formatInsurerInfo,
  initialCarData,
  initialInsurerData,
  initialCustomerData,
  IInsurerFromApi,
  formatCustomerInfo,
  IInsurerItem,
  LIST_INSURERS_PAGE_SIZE,
  UpdateLeadDetailsType,
  canViewLead,
  IProvince,
  leadDetailCarForkJoin,
  customCarGeneral,
  clearSub$,
  leadDetailCityProvinceForkJoin,
  sortPreferedInsurers,
} from './leadDetailsPage.helper';
import CallButton from '../../components/LeadDetails/CallButton';
import { ICustomerData } from './CustomerSection/helper';

interface ILeadPageProps {
  match: any;
  modalConfig: any;
  callState: any;
  currentCustomer: any;
  listInsurer: IInsurerFromApi;
  hasError: boolean;
  success: boolean;
  isFetching: boolean;
  user: any;
  showModal: (payload: string) => void;
  hideModal: (payload: string) => void;
  calling: (payload: any) => void;
  endCall: (callName: string) => void;
  showSnackBar: (payload: ISnackBarConfig) => void;
  destroyModalSchedule: () => void;
  getLead: () => void;
  getListInsurer: (payload: string) => void;
  updateCustomerDetail: (payload: any) => void;
  getCallParticipants: (payload: any) => void;
}

const Grid = styled(MuiGrid)`
  &&& {
    .MuiButton-outlinedPrimary {
      border: 1px solid ${({ theme }) => theme.palette.info.main};
    }
  }
`;

export const LeadPage = ({
  match,
  modalConfig,
  callState,
  currentCustomer,
  listInsurer,
  hasError,
  success,
  isFetching,
  user,
  showModal: handleShowModal,
  hideModal: handleHideModal,
  calling: handleCalling,
  endCall: handleEndCall,
  showSnackBar: handleShowSnackBar,
  destroyModalSchedule: handleDestroyModalSchedule,
  getLead: handleGetLead,
  getListInsurer: handleGetListInsurer,
  updateCustomerDetail: handleUpdateCustomerDetail,
  getCallParticipants: handleGetCallParticipants,
}: ILeadPageProps) => {
  const dispatch = useDispatch();

  // INFO: get lead id from path
  const leadName = match.params?.id;
  const [openModal, setOpenModal] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openPaySlipModal, setOpenPaySlipModal] = useState(false);
  const [carInfo, setCarInfo] = useState<CarInfo>(initialCarData);
  const [insurerInfo, setInsurerInfo] = useState<IInsurer>(initialInsurerData);
  const [customerInfo, setCustomerInfo] =
    useState<ICustomerData>(initialCustomerData);
  const [preferredInsurersList, setPreferredInsurersList] =
    useState<IInsurerItem[]>(fakeInsurers);
  const [carGeneral, setCarGeneral] = useState({
    year: 0,
    brand: '',
    model: '',
    engineSize: 0,
    transmissionType: '',
    sumInsuredMax: 0,
    carProvince: '',
  });
  const [audioStream, setAudioStream] = useState(null);
  const [isUpdateCustomerDetail, setIsUpdateCustomerDetail] = useState(false);
  const { id }: any = useParams();
  const isAssigned = canViewLead(user, currentCustomer);
  const [customerCity, setCustomerCity] = useState<IProvince[]>([]);
  const [abbreviation, setabbreviation] = useState('');
  const [isShowCloseSummaryModal, setIsShowCloseSummaryModal] = useState(true);
  const [isShowEmptyModal, setIsShowEmptyModal] = useState(false);
  const summaryModalType = {
    HANG_UP: 'hang-up',
    CHANGE_STATUS: 'change-status',
  };

  useEffect(() => {
    if (currentCustomer?.data?.checkout?.package) {
      dispatch(getInstallment(id));
    }
  }, [dispatch, id, currentCustomer]);

  useEffect(() => {
    handleGetLead();
    // INFO: Get Insurer List
    handleGetListInsurer(LIST_INSURERS_PAGE_SIZE);

    handleGetCallParticipants({
      pageSize: 1,
      filter: `destination.lead.lead="leads/${leadName}"`,
    });
  }, [
    handleGetLead,
    handleGetListInsurer,
    handleGetCallParticipants,
    leadName,
  ]);

  useEffect(() => {
    if (currentCustomer.data && !isUpdateCustomerDetail) {
      if (currentCustomer.data.carSubModelYear) {
        LeadDetail.getCarBySubModelYear(currentCustomer.data.carSubModelYear)
          .pipe(
            mergeMap((res: any) =>
              // INFO: return a fork join to get all car detail data
              leadDetailCarForkJoin(
                res,
                currentCustomer.data.registeredProvince
              )
            )
          )
          .subscribe((res: any[]) => {
            setCarGeneral(customCarGeneral(res));
          });
      }

      if (currentCustomer.data.customerPolicyAddress?.length) {
        leadDetailCityProvinceForkJoin(
          currentCustomer.data.customerPolicyAddress?.slice(-1)[0]?.province,
          currentCustomer.data.customerPolicyAddress?.slice(-1)[0]?.district
        ).subscribe((response: IProvince[]) => {
          setCustomerCity(response);
        });
      }
    }

    return () => {
      clearSub$.next(true);
    };
  }, [currentCustomer, isUpdateCustomerDetail]);

  useEffect(() => {
    if (carGeneral && currentCustomer) {
      const tempCarInfo = formatCarInfo(currentCustomer, carGeneral);
      setCarInfo(tempCarInfo);
    }
  }, [carGeneral, currentCustomer]);

  useEffect(() => {
    if (currentCustomer) {
      const tempCustomerInfo = formatCustomerInfo(
        currentCustomer,
        customerCity
      );
      const provincesAbbreviations = provinceAbbreviationCollection();
      const province = provincesAbbreviations.find(
        (p) => p.oic === currentCustomer?.data?.registeredProvince
      );
      setabbreviation(province?.abbreviation || '');
      setCustomerInfo(tempCustomerInfo);
    }
  }, [customerCity, currentCustomer]);

  useEffect(() => {
    if (listInsurer && currentCustomer) {
      setPreferredInsurersList(sortPreferedInsurers(listInsurer.insurers));
      const tempInsurerInfo = formatInsurerInfo(currentCustomer, listInsurer);
      setInsurerInfo(tempInsurerInfo);
    }
  }, [listInsurer, currentCustomer]);

  const history = useHistory();

  const isOpenSummaryCallModal: boolean = modalConfig
    ? modalConfig[CONSTANTS.ModalConfig.leadSummaryCallModal]
    : false;
  const isOpenCallModal: boolean = modalConfig
    ? modalConfig[CONSTANTS.ModalConfig.leadCallModal]
    : false;
  // INFO: For Schedule Modal
  const setOpenScheduleModalOnPage = () => {
    setOpenScheduleModal(true);
  };
  // INFO: For Call Summary Modal
  const handleOpenSummaryModal = (type: string) => {
    switch (type) {
      case summaryModalType.CHANGE_STATUS:
        setIsShowCloseSummaryModal(true);
        break;
      case summaryModalType.HANG_UP:
        setIsShowCloseSummaryModal(false);
        break;
      default:
        break;
    }
    handleShowModal(CONSTANTS.ModalConfig.leadSummaryCallModal);
  };

  const handleOpenEmptyModal = () => {
    setIsShowEmptyModal(true);
  };

  const [openModalPhone, setOpenModalPhone] = useState(false);

  const openPhoneHandle = () => {
    setOpenModalPhone(true);
  };

  const cancelCall = () => {
    handleEndCall(callState.callName);
    closePeerConnection();
  };

  const handleTrackEvent = (event: any) => {
    setAudioStream(event.streams[0]);
  };

  useEffect(() => {
    if (!callState.calling) {
      closePeerConnection();
    }
  }, [callState.calling]);

  useEffect(() => {
    if (callState.sdpAnswer?.sdp) {
      handleAudioAnswer(callState.sdpAnswer);
    }
  }, [callState.sdpAnswer]);

  const startUpCall = (phoneIndex: number) => {
    startPeerConnection(handleTrackEvent).then(() => {
      handleCalling({ peerConnection: getPeerConnection(), phoneIndex });
    });
  };

  const transferCall = () => {
    // INFO: Not yet, just end call and show hard message
    cancelCall();
    handleShowSnackBar({
      isOpen: true,
      message: getString('text.transferCallComplete'),
      status: CONSTANTS.snackBarConfig.type.success,
    });
  };

  const closeModalSchedule = (close: boolean) => {
    handleDestroyModalSchedule();
    setOpenScheduleModal(close);
  };

  const messageModalHandler = () => {
    setOpenMessageModal(true);
  };
  const paySlipModalHandler = () => {
    setOpenPaySlipModal(true);
  };

  const handleUpdateLincensePlate = (value: string) => {
    const patchParams = [{ op: 'add', path: '/carLicensePlate', value }];
    setIsUpdateCustomerDetail(true);
    handleUpdateCustomerDetail(patchParams);
  };

  const handleOnChangeUpdate = (type: string, value: number | string[]) => {
    if (type === UpdateLeadDetailsType.PreferredInsurer) {
      const patchParams = [{ op: 'add', path: '/preferredInsurer', value }];
      setIsUpdateCustomerDetail(true);
      handleUpdateCustomerDetail(patchParams);
    } else if (type === UpdateLeadDetailsType.VoluntaryInsuranceType) {
      const patchParams = [
        { op: 'add', path: '/voluntaryInsuranceType', value },
      ];
      setIsUpdateCustomerDetail(true);
      handleUpdateCustomerDetail(patchParams);
    } else if (type === UpdateLeadDetailsType.Installment) {
      const patchParams = [
        { op: 'add', path: '/checkout/installments', value },
      ];
      setIsUpdateCustomerDetail(true);
      handleUpdateCustomerDetail(patchParams);
    } else {
      const patchParams = [{ op: 'add', path: '/preferredSumInsured', value }];
      setIsUpdateCustomerDetail(true);
      handleUpdateCustomerDetail(patchParams);
    }
  };

  const fakeDetail: any[] = [
    {
      id: 0,
      name: getString('text.customerProfile'),
      info: {
        firstName: 'SiriWan',
        lastName: 'Tongklean',
      },
    },
    {
      id: 1,
      name: `${getString('text.customerProfile')} 2`,
      info: {
        firstName: 'SiriWan',
        lastName: 'Tongklean',
      },
    },
    {
      id: 2,
      name: `${getString('text.customerProfile')} 3`,
      info: {
        firstName: 'SiriWan',
        lastName: 'Tongklean',
      },
    },
    {
      id: 3,
      name: `${getString('text.customerProfile')} 4`,
      info: {
        firstName: 'SiriWan',
        lastName: 'Tongklean',
      },
    },
    {
      id: 4,
      name: `${getString('text.customerProfile')} 5`,
      info: {
        firstName: 'SiriWan',
        lastName: 'Tongklean',
      },
    },
    {
      id: 5,
      name: `${getString('text.customerProfile')} 6`,
      info: {
        firstName: 'SiriWan',
        lastName: 'Tongklean',
      },
    },
  ];

  const emptyDetail: any[] = [];

  if (isFetching) {
    return <Loader />;
  }

  if (hasError || !isAssigned) {
    return <NotFound />;
  }
  const redirectToCustomQuotes = (leadId: string) => {
    history.push(`/lead/${leadId}/custom-quote`);
  };

  return (
    <>
      {success && isAssigned && (
        <>
          <Helmet title="Lead Page" />
          <Grid item xs={12} md={12}>
            <div className="lead-detail-page">
              <div className="lead-detail-page__icon" />
              <Grid
                container
                direction="row"
                className="lead-detail-page__header"
              >
                <Grid
                  item
                  container
                  lg={7}
                  md={7}
                  direction="row"
                  justify="flex-start"
                  className="pl-10"
                >
                  <Grid className="lead-detail-page__header__call-action-btn">
                    <MarkImportantButton />
                    <Controls.Button
                      text={getString('text.appointmentBtn')}
                      color="primary"
                      variant="outlined"
                      icon={<CalendarIcon className="calendar-icon" />}
                      onClick={setOpenScheduleModalOnPage}
                    />
                    <Controls.Button
                      text={getString('text.message')}
                      color="primary"
                      variant="outlined"
                      onClick={messageModalHandler}
                      icon={<EnvelopeIcon className="envelope-icon" />}
                      className="unittest-message-button"
                    />

                    {/* Not In call  */}
                    <Box mr={2} display={!callState.calling ? 'block' : 'none'}>
                      <CallButton
                        loading={callState.startCall}
                        onClick={startUpCall}
                      />
                    </Box>
                    <audio
                      ref={(audio) => {
                        if (audio) {
                          // eslint-disable-next-line no-param-reassign
                          audio.srcObject = audioStream;
                        }
                      }}
                      autoPlay
                    >
                      <track kind="captions" label="lead_call" />
                    </audio>
                    {/* In call */}
                    {callState.calling && (
                      <>
                        <Controls.Button
                          className="btn-multiline unitest-summary-button"
                          // text={}
                          variant="contained"
                          color="secondary"
                          startIcon={<PhoneInTalkIcon />}
                          onClick={() => {
                            handleOpenSummaryModal(summaryModalType.HANG_UP);
                            cancelCall();
                          }}
                        >
                          <div className="btn-multiline__label">
                            <p>{getString('text.hangUp')}</p>
                            <CallTimer />
                          </div>
                        </Controls.Button>
                        <Controls.Button
                          className="btn-multiline"
                          color="primary"
                          variant="outlined"
                          startIcon={<PhoneForwardedOutlinedIcon />}
                          onClick={() => {
                            transferCall();
                          }}
                        >
                          <div className="btn-multiline__label">
                            <p>{getString('text.transfer')}</p>
                            <p>{getString('text.call')}</p>
                          </div>
                        </Controls.Button>
                      </>
                    )}
                    <CommonModal
                      title={getString('text.summary')}
                      open={isOpenSummaryCallModal}
                      handleCloseModal={() => {
                        handleHideModal(
                          CONSTANTS.ModalConfig.leadSummaryCallModal
                        );
                      }}
                      isShowCloseBtn={isShowCloseSummaryModal}
                    >
                      <SummaryCallModal
                        showStatus
                        leadName={leadName}
                        close={() => {
                          handleHideModal(
                            CONSTANTS.ModalConfig.leadSummaryCallModal
                          );
                        }}
                      />
                    </CommonModal>

                    <CommonModal
                      title={
                        fakeDetail.length
                          ? getString('text.connectLeadToCustomer')
                          : getString('text.confirmToCreateCustomer')
                      }
                      open={isOpenCallModal}
                      handleCloseModal={() => {
                        handleHideModal(CONSTANTS.ModalConfig.leadCallModal);
                      }}
                      isShowCloseBtn={isShowCloseSummaryModal}
                      wrapperClass="modal-lead-call"
                      maxWidth={
                        !fakeDetail.length || fakeDetail.length === 2
                          ? 'md'
                          : 'lg'
                      }
                    >
                      <LeadCallModal
                        leadInfo={fakeDetail}
                        close={() => {
                          handleHideModal(CONSTANTS.ModalConfig.leadCallModal);
                        }}
                      />
                    </CommonModal>

                    {/* Empty modal for testing purpose */}
                    <CommonModal
                      title={getString('text.confirmToCreateCustomer')}
                      open={isShowEmptyModal}
                      handleCloseModal={() => setIsShowEmptyModal(false)}
                      isShowCloseBtn={isShowCloseSummaryModal}
                      wrapperClass="modal-lead-call"
                      maxWidth="md"
                    >
                      <LeadCallModal
                        leadInfo={emptyDetail}
                        close={() => setIsShowEmptyModal(false)}
                      />
                    </CommonModal>

                    {!callState.calling && (
                      <Controls.Button
                        text={getString('text.changeStatus')}
                        color="primary"
                        variant="outlined"
                        icon={<TrashIcon className="trash-icon" />}
                        onClick={() => {
                          handleOpenSummaryModal(
                            summaryModalType.CHANGE_STATUS
                          );
                        }}
                      />
                    )}
                    <ChooseNameModal />
                    <Controls.Button
                      text="Open empty modal"
                      color="primary"
                      variant="outlined"
                      icon={<TrashIcon className="trash-icon" />}
                      onClick={handleOpenEmptyModal}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  lg={5}
                  md={5}
                  direction="row"
                  justify="flex-end"
                  className="lead-detail-page__header__summary-buttons"
                >
                  <Grid item className="detail-header__summary">
                    <CallSummarySection />
                  </Grid>
                  <Grid item className="detail-header__buttons">
                    <CommonButton
                      type="phone"
                      variant="outlined"
                      color="primary"
                      onClick={openPhoneHandle}
                      open={openModalPhone}
                      close={() => setOpenModalPhone(false)}
                      handleCloseModal={() => {
                        setOpenModalPhone(false);
                      }}
                      title={getString('text.addPhoneTitle')}
                      modalClass="phone-modal"
                    >
                      <AddSharpIcon />
                      {getString('text.phone')}
                    </CommonButton>

                    <CommonButton
                      type="email"
                      variant="outlined"
                      color="primary"
                      onClick={() => setOpenModal(true)}
                      open={openModal}
                      close={() => setOpenModal(false)}
                      handleCloseModal={() => {
                        setOpenModal(false);
                      }}
                      title={getString('text.addNewEmailAddress')}
                      modalClass="email-modal"
                    >
                      <AddSharpIcon />
                      {getString('text.email')}
                    </CommonButton>

                    <CommonButton
                      type="address"
                      variant="outlined"
                      color="primary"
                      onClick={() => setOpenAddress(true)}
                      open={openAddress}
                      close={() => setOpenAddress(false)}
                      handleCloseModal={() => {
                        setOpenAddress(false);
                      }}
                      title={getString('text.addNewAddress')}
                      modalClass="address-modal test-modal"
                    >
                      <AddSharpIcon />
                      {getString('text.address')}
                    </CommonButton>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                className="lead-detail-page__boards"
              >
                <Grid
                  item
                  xs={12}
                  container
                  md={12}
                  lg={12}
                  xl={8}
                  direction="row"
                >
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    className="lead-detail-page__boards__item"
                  >
                    <CustomerSection data={customerInfo} />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    className="lead-detail-page__boards__item"
                  >
                    <CarInfoSection
                      onSaveLincense={handleUpdateLincensePlate}
                      abbreviation={abbreviation}
                      carInfo={carInfo}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    className="lead-detail-page__boards__item"
                  >
                    <InsurerInfoSection
                      insurerObject={insurerInfo}
                      insurers={preferredInsurersList}
                      checkoutPackage={currentCustomer?.data?.checkout}
                      onRequestQuote={() => redirectToCustomQuotes(id)}
                      onViewRenewal={() => console.log('view renewal')}
                      onAddPaySlip={() => paySlipModalHandler()}
                      onUpdate={handleOnChangeUpdate}
                      leadStatus={currentCustomer.status ?? ''}
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  xl={4}
                  className="lead-detail-page__boards__activity"
                >
                  <ActivitySection />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} lg={12}>
            {openScheduleModal ? (
              <LeadScheduleModal
                isOpen={openScheduleModal}
                onClose={() => closeModalSchedule(false)}
              />
            ) : null}
          </Grid>
          <Grid item xs={12} lg={12}>
            <MessageModal
              className="jacky-modal"
              openDialog={openMessageModal}
              closeDialog={setOpenMessageModal}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            {openPaySlipModal ? (
              <PaySlipModal
                openDialog={openPaySlipModal}
                closeDialog={setOpenPaySlipModal}
                leadId={id}
                user={user}
              />
            ) : null}
          </Grid>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  modalConfig: state.uiInitReducer.modal,
  callState: state.leadsDetailReducer.callReducer.data,
  user: state.authReducer.data?.user,
  currentCustomer: state.leadsDetailReducer.lead?.payload,
  success: state.leadsDetailReducer.getAgentReducer.success,
  isFetching: state.leadsDetailReducer.lead.isFetching,
  hasError:
    !state.leadsDetailReducer.lead.isFetching &&
    !state.leadsDetailReducer.lead.success,
  listInsurer: state.leadsDetailReducer.getListInsurerReducer.data?.listInsurer,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      hideModal,
      showModal,
      calling,
      endCall,
      showSnackBar,
      destroyModalSchedule,
      getLead,
      getListInsurer,
      updateCustomerDetail,
      getCallParticipants,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadPage);
