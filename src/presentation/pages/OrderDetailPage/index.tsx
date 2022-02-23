import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getString } from 'presentation/theme/localization';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid as MuiGrid, Box } from '@material-ui/core';
import './index.scss';
import CommonButton from 'presentation/components/LeadDetails/CommonButton';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import Controls from 'presentation/components/controls/Control';
import VehiclePolicySection from 'presentation/components/VehiclePolicySection/VehiclePolicySection';
import CallSummarySection from 'presentation/components/CallSummarySection/CallSummarySection';
import ActivityOrderSection from 'presentation/components/ActivityOrderSection';
import { destroyModalSchedule } from 'presentation/redux/actions/leadDetail/scheduleModal';
import MarkImportantButton from 'presentation/components/LeadDetails/MarkImportantButton';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SaleInfo from './SaleInfo';
import PolicyholderInfo from './PolicyholderInfo';
import CallButton from '../../components/LeadDetails/CallButtonOrder';
import OrderScheduleModal from '../../components/modal/OrderScheduleModal';
import { OrderActionTypes } from '../../redux/actions/order';
import CalendarIcon from '../../components/svgicons/CalendarIcon';
import EnvelopeIcon from '../../components/svgicons/EnvelopeIcon';

interface IOrderPageProps {
  callState: any;
  destroyModalSchedule: () => void;
}

const Grid = styled(MuiGrid)`
  &&& {
    .MuiButton-outlinedPrimary {
      border: 1px solid ${({ theme }) => theme.palette.info.main};
    }
  }
`;

export const OrderPage = ({
  callState,
  destroyModalSchedule: handleDestroyModalSchedule,
}: IOrderPageProps) => {
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const dispatch = useDispatch();
  const [isOpenScheduleModal, setIsOpenScheduleModal] =
    useState<boolean>(false);

  const [openModalPhone, setOpenModalPhone] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch({
        type: OrderActionTypes.GET_DETAIL,
        payload: {
          orderName: `orders/${id}`,
        },
      });
    }
  }, [dispatch, id]);

  const openPhoneHandle = () => {
    setOpenModalPhone(true);
  };

  const openUpdateModalHandle = () => {
    setOpenModalUpdate(true);
  };

  const handleCloseScheduleModal = () => {
    handleDestroyModalSchedule();
    setIsOpenScheduleModal(false);
  };

  return (
    <>
      <Helmet title="Order Page" />
      <Grid item xs={12} md={12}>
        <div className="lead-detail-page" data-testid="order-detail-page">
          <div className="lead-detail-page__icon" />
          <Grid container direction="row" className="lead-detail-page__header">
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
                <Controls.Button
                  text={getString('text.appointmentBtn')}
                  color="primary"
                  variant="outlined"
                  icon={<CalendarIcon fontSize="small" />}
                  onClick={() => setIsOpenScheduleModal(true)}
                />
                <MarkImportantButton />
                <Controls.Button
                  text={getString('text.message')}
                  color="primary"
                  variant="outlined"
                  icon={<EnvelopeIcon fontSize="small" />}
                  className="unittest-message-button"
                />

                {/* Not In call  */}
                <Box mr={2} display={!callState.calling ? 'block' : 'none'}>
                  <CallButton />
                </Box>
                <CommonButton
                  data-testid="update--order"
                  type="update--order"
                  color="primary"
                  onClick={openUpdateModalHandle}
                  open={openModalUpdate}
                  close={() => setOpenModalUpdate(false)}
                  handleCloseModal={() => setOpenModalUpdate(false)}
                  title=""
                  modalClass="order-update-modal"
                  hasGreyBg
                >
                  {getString('text.update')}
                </CommonButton>
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
                  handleCloseModal={() => setOpenModalPhone(false)}
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
                  handleCloseModal={() => setOpenModal(false)}
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
                  handleCloseModal={() => setOpenAddress(false)}
                  title={getString('text.addNewAddress')}
                  modalClass="address-modal"
                >
                  <KeyboardArrowDownIcon className="address-icon" />
                  {getString('text.address')}
                </CommonButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" className="lead-detail-page__boards">
            <Grid item xs={12} container md={12} lg={12} xl={8} direction="row">
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                className="lead-detail-page__boards__item"
              >
                <PolicyholderInfo />
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                className="lead-detail-page__boards__item"
              >
                <SaleInfo />
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                className="lead-detail-page__boards__item"
              >
                <VehiclePolicySection />
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
              <ActivityOrderSection />
            </Grid>
          </Grid>
        </div>
      </Grid>

      <OrderScheduleModal
        isOpen={isOpenScheduleModal}
        onClose={() => handleCloseScheduleModal()}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  callState: state.leadsDetailReducer.callReducer.data,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      destroyModalSchedule,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
