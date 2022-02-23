import moment from 'moment';
import { getString } from 'presentation/theme/localization';

export enum POLICY_TYPE {
  'POLICY_START_DATE' = 'POLICY_START_DATE',
  'COMPULSORY_POLICY_START_DATE' = 'COMPULSORY_POLICY_START_DATE',
}
export enum INSURANCE_KIND {
  BOTH = 'both',
  VOLUNTARY = 'voluntary',
  MANDATORY = 'mandatory',
}
export const isAfterCurrent = (date: string) => {
  return moment().isAfter(date);
};

export const isAfterSixMonth = (date: string) => {
  const sixMonthLater = moment().add(6, 'months');
  return moment(date).isAfter(sixMonthLater);
};

export const errorMessage = (date: string) => {
  if (isAfterCurrent(date)) {
    return getString('text.invalidDateWithCurrent');
  }
  if (isAfterSixMonth(date)) {
    return getString('text.invalidDateFromCurrent', { month: 6 });
  }
  return '';
};

export const getPayloadForPolicyHolder = (
  policyType: POLICY_TYPE,
  value: string
) => {
  return [
    {
      op: 'add',
      path:
        policyType === POLICY_TYPE.POLICY_START_DATE
          ? '/policyStartDate'
          : '/compulsoryPolicyStartDate',
      value: value ? moment(value).format('yyyy-MM-DD') : '',
    },
  ];
};

export const isDisabled = (
  insuranceKind: INSURANCE_KIND,
  policyType: POLICY_TYPE
) => {
  if (policyType === POLICY_TYPE.POLICY_START_DATE) {
    return !(
      insuranceKind === INSURANCE_KIND.BOTH ||
      insuranceKind === INSURANCE_KIND.VOLUNTARY
    );
  }
  if (policyType === POLICY_TYPE.COMPULSORY_POLICY_START_DATE) {
    return !(
      insuranceKind === INSURANCE_KIND.BOTH ||
      insuranceKind === INSURANCE_KIND.MANDATORY
    );
  }
  return false;
};
