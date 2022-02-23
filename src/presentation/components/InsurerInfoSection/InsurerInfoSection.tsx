import { makeStyles, Paper as MuiPaper, withTheme } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { IInsurer } from 'presentation/models/lead/insurer';
import Controls from 'presentation/components/controls/Control';
import './index.scss';
import { getString } from 'presentation/theme/localization';
import { thaiDateFormat } from 'shared/helper/thaiDateFormat';
import {
  getValueVoluntaryInsuranceType,
  ICheckoutPackage,
  IInsurerItem,
  IVoluntaryInsuranceType,
  UpdateLeadDetailsType,
} from 'presentation/pages/LeadDetailsPage/leadDetailsPage.helper';
import CouponModal from 'presentation/components/modal/LeadDetailsModal/Coupon Modal';
import { UserRoles } from 'config/constant';
import styled from 'styled-components';
import { Colon } from 'presentation/pages/OrderDetailPage/InfoPanel/index.style';
import { SelectElement } from 'shared/types/controls';
import CommonModal from '../modal/CommonModal';
import CouponTag from './CouponTag';
import InsureInfoButton from '../InsureInfoButton';
import ViewPurchaseButton from '../ViewPurchaseButton';
import { fakeTypes as InsurerTypes } from '../../pages/OrderDetailPage/leadDetailsPage.helper';
import { POLICY_TYPE } from './InsurerInfoSection.helper';
import PolicyHolder from './PolicyHolderDateTime';

interface IObjectKeys {
  [key: string]: string | number | boolean | any;
}

interface IInsurerInfoProps {
  insurerObject: IInsurer;
  insurers: IInsurerItem[];
  checkoutPackage: ICheckoutPackage;
  onUpdate: (type: string, payload: number | string[]) => void;
  onViewRenewal: () => void;
  onRequestQuote: () => void;
  onAddPaySlip: () => void;
  leadStatus: string;
}

const Paper = withTheme(styled(MuiPaper)`
  &&& {
    height: 100%;
    border: 1px solid ${({ theme }) => theme.border.color};
    border-radius: 6px;
  }
`);

const InsurerInfoTitle = styled.h3`
  margin: 0;
  padding: 10px 15px;
  color: ${({ theme }) => theme.palette.primary.main};
  background: ${({ theme }) => theme.palette.grey[200]};
  border-radius: 6px 6px 0 0;
`;

const InsurerInfoField = withTheme(styled.div`
  &&& {
    display: flex;
    padding: 10px 15px;
    align-items: flex-start;
    border-bottom: 1px solid ${({ theme }) => theme.border.color};
  }
`);

const FieldItem = withTheme(styled.span`
  &&& {
    width: 50%;
    display: flex;
    align-items: center;

    .MuiInputBase-input {
      line-height: 0.5em;
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.palette.blue};
      background: ${({ theme }) => theme.palette.white};
    }

    .MuiSelect-select {
      &[aria-expanded='true'] {
        border-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    .MuiAutocomplete-inputRoot {
      fieldset {
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.border.input};
      }

      .MuiInputBase-input {
        border: 0;
      }
    }

    .shared-select,
    .shared-input {
      background-color: #fff;
      border-radius: 4px;
    }
  }
`);

const SaveButtonWrapper = styled.span`
  &&& {
    display: flex;
    margin-left: 8px;

    .save-button {
      ${(props) => props.theme.breakpoints.up('md')} {
        font-size: small;
        min-width: 38px;
        height: 30px !important;
      }

      ${(props) => props.theme.breakpoints.up('xl1')} {
        font-size: 13px;
        min-width: 50px;
        height: 30px !important;
      }
    }
  }
`;

const useStyles = makeStyles({
  select: {
    '&&': {
      borderTop: '1px solid',
      borderTopRightRadius: '10px',
    },
  },
});

const InsurerInfoSection: React.FC<IInsurerInfoProps> = ({
  insurerObject,
  insurers,
  checkoutPackage,
  onUpdate,
  onViewRenewal,
  onRequestQuote,
  onAddPaySlip,
  leadStatus,
}) => {
  const userAuthRole = useSelector(
    (state: any) => state.authReducer?.data?.user?.role || ''
  );
  const leadInformation = useSelector(
    (state: any) => state.leadsDetailReducer.lead.payload
  );
  const NUMBER_VALUE = /^(\d+\.?\d*|\.\d+)$/;

  const [formData, setFormData] = useState<IObjectKeys>({
    paymentSchedule: '',
    preferredType: [],
    preferredInsurer: 0,
    preferredSumInsured: 0,
  });
  const [isOpenCouponModal, setIsOpenCouponModal] = useState(false);
  const classes = useStyles();

  const installmentOption = useSelector(
    (state: any) => state?.leadsDetailReducer?.InstallmentReducer?.installment
  );

  const isHaveCheckout = useSelector(
    (state: any) => state?.leadsDetailReducer?.lead?.payload?.data?.checkout
  );
  useEffect(() => {
    setFormData({
      ...formData,
      preferredInsurer: insurerObject.preferredInsurer,
      preferredType: insurerObject?.preferredType?.length
        ? insurerObject.preferredType
        : [],
      preferredSumInsured: insurerObject.preferredSumInsured,
      paymentSchedule: insurerObject.paymentSchedule,
    });
  }, [insurerObject]);

  const handleSelectChange = (
    type: string,
    event: React.ChangeEvent<SelectElement>
  ) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name as string]: value });

    let updatedValue;

    switch (type) {
      case UpdateLeadDetailsType.VoluntaryInsuranceType:
        updatedValue = getValueVoluntaryInsuranceType(
          value as unknown as IVoluntaryInsuranceType[]
        );
        break;
      case UpdateLeadDetailsType.Installment:
      default:
        updatedValue = Number(value);
        break;
    }

    onUpdate(type, updatedValue);
  };

  const handleInputChange = (e: any, inputName: string) => {
    const { value } = e;
    const name = inputName;
    if (value === '' || NUMBER_VALUE.test(value)) {
      setFormData((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  };

  const handleSave = (type: string, sumInsured: number) => {
    const value: number = +sumInsured;
    onUpdate(type, value);
  };

  const disableCondition = useMemo(() => {
    return (
      Number(formData.preferredSumInsured) ===
        Number(insurerObject.preferredSumInsured) ||
      formData.preferredSumInsured.toString().length <= 0
    );
  }, [formData.preferredSumInsured, insurerObject.preferredSumInsured]);

  const onOpenCoupon = () => {
    setIsOpenCouponModal(true);
  };
  return (
    <Paper elevation={3} className="shared-insurer-info">
      <InsurerInfoTitle>{getString('text.insurer')}</InsurerInfoTitle>
      <InsurerInfoField>
        <FieldItem>{getString('text.currentInsurer')}</FieldItem>
        <FieldItem>{`: ${insurerObject.currentInsurer}`}</FieldItem>
      </InsurerInfoField>
      <InsurerInfoField>
        <FieldItem>{getString('text.preferredInsurer')}</FieldItem>
        <FieldItem>
          <Controls.Select
            options={insurers || []}
            selectField="id"
            title="displayName"
            name="preferredInsurer"
            value={formData.preferredInsurer}
            onChange={(e) => {
              handleSelectChange(UpdateLeadDetailsType.PreferredInsurer, e);
            }}
            styledDropdown={classes.select}
          />
        </FieldItem>
      </InsurerInfoField>
      <InsurerInfoField>
        <FieldItem>{getString('text.preferredType')}</FieldItem>
        <FieldItem>
          {formData.preferredType ? (
            <Controls.Autocomplete
              options={InsurerTypes}
              placeholder=""
              name="preferredType"
              value={formData.preferredType}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleSelectChange(
                  UpdateLeadDetailsType.VoluntaryInsuranceType,
                  event
                );
              }}
              multiple
            />
          ) : null}
        </FieldItem>
      </InsurerInfoField>
      <InsurerInfoField>
        <FieldItem>{getString('text.sumInsured')}</FieldItem>
        <FieldItem>
          <Controls.NumberInput
            value={formData.preferredSumInsured}
            name="preferredSumInsured"
            onValueChange={(values: any) => {
              handleInputChange(values, 'preferredSumInsured');
            }}
          />
          <SaveButtonWrapper>
            <Controls.Button
              className="unittest-save-button save-button"
              disabled={disableCondition}
              color="primary"
              size="small"
              style={{ minHeight: 0, padding: 5 }}
              onClick={() => {
                handleSave(
                  UpdateLeadDetailsType.PreferredSumInsured,
                  formData.preferredSumInsured
                );
              }}
            >
              {getString('text.save')}
            </Controls.Button>
          </SaveButtonWrapper>
        </FieldItem>
      </InsurerInfoField>
      <InsurerInfoField>
        <FieldItem>{getString('text.mandatory')}</FieldItem>
        <FieldItem>{`: ${insurerObject.mandatory}`}</FieldItem>
      </InsurerInfoField>
      <InsurerInfoField>
        <FieldItem className="add-top-space">
          {getString('leadDetailFields.voluntaryPolicyStartDate')}
        </FieldItem>
        <Colon style={{ marginTop: '2px' }}>: </Colon>
        <PolicyHolder
          dateType={POLICY_TYPE.POLICY_START_DATE}
          insuranceKind={leadInformation?.data?.insuranceKind}
        />
      </InsurerInfoField>
      <InsurerInfoField>
        <FieldItem className="add-top-space">
          {getString('leadDetailFields.compulsoryPolicyStartDate')}
        </FieldItem>
        <Colon style={{ marginTop: '2px' }}>: </Colon>
        <PolicyHolder
          dateType={POLICY_TYPE.COMPULSORY_POLICY_START_DATE}
          insuranceKind={leadInformation?.data?.insuranceKind}
        />
      </InsurerInfoField>
      <InsurerInfoField>
        <FieldItem>{getString('text.startDate')}</FieldItem>
        <FieldItem>{`: ${thaiDateFormat(insurerObject.startDate)}`}</FieldItem>
      </InsurerInfoField>
      <InsurerInfoField>
        <FieldItem>{getString('text.paymentSchedule')}</FieldItem>
        <FieldItem>
          <Controls.Select
            selectField="id"
            title="displayName"
            name="paymentSchedule"
            value={formData.paymentSchedule}
            options={installmentOption || []}
            disabled={!(installmentOption && isHaveCheckout)}
            placeholder={getString('text.pleaseSelect')}
            onChange={(e) => {
              handleSelectChange(UpdateLeadDetailsType.Installment, e);
            }}
          />
        </FieldItem>
      </InsurerInfoField>
      <div className="shared-insurer-info__group-button">
        <span className="shared-insurer-info__group-button__item__button">
          <InsureInfoButton />
        </span>
        <span className="shared-insurer-info__group-button__item__button">
          <Controls.Button
            color="primary"
            variant="contained"
            className="unittest-view-renewal button-view-renewal"
            onClick={() => onViewRenewal()}
          >
            {getString('text.viewRenewal')}
          </Controls.Button>
        </span>
      </div>
      <div className="custom-quote shared-insurer-info__button">
        <Controls.Button
          color="primary"
          variant="contained"
          className="unittest-request-CustomQuote button-request-quote"
          onClick={() => onRequestQuote()}
        >
          {getString('text.requestCustomQuote')}
        </Controls.Button>
      </div>
      {[
        UserRoles.ADMIN_ROLE,
        UserRoles.MANAGER_ROLE,
        UserRoles.SALE_ROLE,
        UserRoles.SUPERVISOR_ROLE,
      ].includes(userAuthRole) ? (
        <>
          <div className="add-coupon shared-insurer-info__button">
            {insurerObject?.coupon ? (
              <CouponTag
                couponCode={insurerObject.coupon}
                leadStatus={insurerObject.status}
              />
            ) : (
              <Controls.Button
                color="primary"
                className="unittest-request-CustomQuote button-request-quote"
                onClick={() => onOpenCoupon()}
              >
                {getString('text.addCoupon')}
              </Controls.Button>
            )}
          </div>
          <div className="add-payslip shared-insurer-info__button">
            <Controls.Button
              color="primary"
              variant="contained"
              disabled={formData.paymentSchedule === ''}
              className="unittest-request-CustomQuote button-request-quote"
              onClick={() => onAddPaySlip()}
            >
              {getString('text.addPayslip')}
            </Controls.Button>
          </div>
          <div className="view-purchase shared-insurer-info__button">
            <ViewPurchaseButton packageId={checkoutPackage?.package} />
          </div>
        </>
      ) : null}

      <CommonModal
        title={getString('text.addCoupon')}
        open={isOpenCouponModal}
        handleCloseModal={() => setIsOpenCouponModal(false)}
      >
        <CouponModal
          close={() => setIsOpenCouponModal(false)}
          leadStatus={leadStatus}
        />
      </CommonModal>
    </Paper>
  );
};

export default InsurerInfoSection;
