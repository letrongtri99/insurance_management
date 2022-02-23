import React, { useEffect, useMemo, useState } from 'react';
import RenderInputDateItem from 'presentation/pages/OrderDetailPage/InfoPanel/RenderInputDateItem';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { useDispatch, useSelector } from 'react-redux';
import LeadDetailRepository from 'data/repository/leadDetail';
import { getLeadIdFromPath } from 'presentation/redux/epics/leadDetail/scheduleModal/scheduleModal.helper';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { getString } from 'presentation/theme/localization';
import { thaiDateFormatV2 } from 'shared/helper/thaiDateFormat';
import {
  errorMessage,
  getPayloadForPolicyHolder,
  INSURANCE_KIND,
  isDisabled,
  POLICY_TYPE,
} from '../InsurerInfoSection.helper';

interface IProps {
  dateType: POLICY_TYPE;
  insuranceKind: INSURANCE_KIND;
}
const clearSub$ = new Subject();
const PolicyHolderDateTime: React.FC<IProps> = ({
  dateType,
  insuranceKind,
}) => {
  const leadInfo = useSelector(
    (state: any) => state.leadsDetailReducer.lead.payload
  );
  const [dateSelect, setDateSelect] = useState<string | Date>('');

  useEffect(() => {
    const value =
      dateType === POLICY_TYPE.POLICY_START_DATE
        ? leadInfo?.data?.policyStartDate
        : leadInfo?.data?.compulsoryPolicyStartDate;
    setDateSelect(value ? new Date(value) : '');
  }, [leadInfo]);

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const validateDate = (date: any) => {
    setError(errorMessage(date));
    setDateSelect(date);
    if (!errorMessage(date)) {
      const leadDetailRepository = new LeadDetailRepository();
      const payload = getPayloadForPolicyHolder(dateType, date);
      leadDetailRepository
        .updateLead(getLeadIdFromPath(), payload)
        .pipe(takeUntil(clearSub$))
        .subscribe(
          () => {
            dispatch(
              showSnackBar({
                isOpen: true,
                message: getString('text.updateLeadSuccess'),
                status: 'success',
              })
            );
          },
          () => {
            dispatch(
              showSnackBar({
                isOpen: true,
                message: getString('text.updateLeadFail'),
                status: 'error',
              })
            );
          }
        );
    }
  };
  const disabledHandle = useMemo(() => {
    return isDisabled(insuranceKind, dateType);
  }, [insuranceKind, dateType]);

  useEffect(() => {
    return () => {
      clearSub$.next(true);
    };
  }, []);

  return (
    <RenderInputDateItem
      value={dateSelect}
      name="test"
      onUpdateOrder={() => null}
      format={dateSelect ? thaiDateFormatV2(dateSelect) : 'dd/MM/yyyy'}
      onHandleChangeDate={validateDate}
      error={error as string}
      addColon={false}
      isDisabled={disabledHandle}
      isPossibleInput={false}
    />
  );
};
export default PolicyHolderDateTime;
