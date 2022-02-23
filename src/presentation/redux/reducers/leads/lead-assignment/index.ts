import moment from 'moment';
import { UNIT_OF_ENGINE_SIZE } from 'shared/constants';
import i18n from 'i18next';
import { IAction, IState } from 'shared/interfaces/common';
import { LeadAssignmentActions } from 'presentation/redux/actions/leads/lead-assignment';
import {
  formatDDMMYYYY,
  formatDDMMYYYYHHMMSS,
  formatDDMMYYYYHHMMSSUTC,
  modelValidationField,
} from 'shared/helper/utilities';
import {
  StatusLeadAll,
  LeadType,
} from 'presentation/pages/leads/LeadDashBoard/LeadDashBoard.helper';
import { fakeTypes } from 'presentation/pages/LeadDetailsPage/leadDetailsPage.helper';
import { RejectReason } from 'mock-data/LeadSourceSelect.mock';
import { getString, LANGUAGES } from 'presentation/theme/localization';

const initialState: IState<any> & { totalItem?: number } & {
  pageState: any;
} = {
  data: [],
  isFetching: false,
  success: true,
  status: '',
  totalItem: 0,
  tableType: '',
  pageState: {
    pageSize: 15,
    currentPage: 1,
  },
};
enum STATUS {
  YES = 'Yes',
  NO = 'No',
}
enum GENDER {
  MALE = 'm',
  FEMALE = 'f',
}

export const customTrueFalse = (value: boolean) => {
  if (typeof value === 'boolean') {
    if (value) {
      return STATUS.YES;
    }
    return STATUS.NO;
  }
  return '';
};
export const customerGender = (gender: string) => {
  if (gender) {
    if (gender === GENDER.MALE) {
      return 'Male';
    }
    if (gender === GENDER.FEMALE) {
      return 'Female';
    }
  }
  return '';
};
export const customerLeadStatus = (status: string) => {
  const findLeadStatus = StatusLeadAll.find((item) => item.value === status);
  return findLeadStatus?.title || '';
};

export const customerLeadType = (status: string) => {
  const findLeadType = LeadType.find((item) => item.value === status);
  return findLeadType?.title || '';
};

export const customerPolicyType = (policy: string[]) => {
  return (
    (policy || [])
      .map((policyItem) => {
        return fakeTypes.find((item) => item.value === policyItem)?.title || '';
      })
      .join(', ') || ''
  );
};

export const customRejectionReason = (reasonValue: string) => {
  const reason = RejectReason.find((item) => item.value === reasonValue);
  return reason ? reason.title : null;
};

export interface IAppointment {
  appointmentType: string;
  lead: string;
  payment: boolean;
  subject: string;
}

export interface IAppointmentDetail {
  appointment?: IAppointment;
  createBy?: string;
  createTime?: string;
  deleteTime?: string | null;
  endTime?: string;
  name?: string;
  startTime: string;
  updateTime?: string;
}

export const getTime = (date?: Date | string) => {
  return date ? new Date(date).getTime() : 0;
};

export const getSortedDate = (appointments: IAppointmentDetail[]) => {
  return JSON.parse(JSON.stringify(appointments)).sort(
    (a: IAppointmentDetail, b: IAppointmentDetail) => {
      return getTime(a.startTime) - getTime(b.startTime);
    }
  );
};

export const getValidAppointmentDate = (appointments: IAppointmentDetail[]) => {
  if (appointments.length === 1) {
    return formatDDMMYYYYHHMMSSUTC(appointments[0].startTime);
  }

  const sortedDate = getSortedDate(appointments);
  const futureDates: IAppointmentDetail[] = [];
  const pastDates: IAppointmentDetail[] = sortedDate.filter(
    (date: IAppointmentDetail) => {
      const currentTime = moment().format('YYYY-MM-DD HH:mm');
      const startTime = moment(date.startTime).utc().format('YYYY-MM-DD HH:mm');
      const endTime = moment(date.endTime).utc().format('YYYY-MM-DD HH:mm');

      const isFutureDate =
        moment(startTime).diff(currentTime) > 0 ||
        moment(endTime).diff(currentTime) > 0;

      if (isFutureDate) {
        futureDates.push(date);
      }

      return !isFutureDate;
    }
  );

  if (pastDates.length === 0 && futureDates.length) {
    return formatDDMMYYYYHHMMSSUTC(futureDates[0].startTime);
  }

  if (pastDates.length && futureDates.length) {
    return formatDDMMYYYYHHMMSSUTC(pastDates[pastDates.length - 1].startTime);
  }

  return formatDDMMYYYYHHMMSSUTC(pastDates[pastDates.length - 1].startTime);
};

export const findShortInsurerName = (id: string, defaultValue = '') => {
  if (i18n.language === LANGUAGES.ENGLISH) {
    return defaultValue;
  }
  if (id) {
    return getString(`shortInsurers.${id}`);
  }
  return '';
};

export const findLongInsurerName = (name: string, defaultValue = '') => {
  const id = name.split('/')[1];
  if (i18n.language === LANGUAGES.ENGLISH) {
    return defaultValue;
  }
  if (id) {
    return getString(`longInsurers.${id}`);
  }
  return '';
};

export const formatLeadAssignment = (listAssignment: any[]) => {
  const data = listAssignment.map((item) => {
    const rejections = item?.rejections;
    const firstRejection = rejections?.find(
      (rejection: any) => rejection.decideTime === null
    );
    return {
      phoneNumber: item?.insuree?.phone?.length
        ? item.insuree.phone[item.insuree.phone.length - 1]
        : '',
      email: item?.insuree?.email?.length
        ? item.insuree.email[item.insuree.email.length - 1]
        : '',
      carEngineSize: item?.car?.engineSize
        ? `${item.car.engineSize} ${UNIT_OF_ENGINE_SIZE}`
        : '',
      leadDetailId: item?.lead?.name
        ? item.lead.name.replace('leads/', '')
        : '',
      leadType: customerLeadType(item?.lead.type),
      leadStatus: customerLeadStatus(item?.lead.status),
      gender: customerGender(item?.insuree?.gender),
      marketingConsent: customTrueFalse(item?.lead?.data?.marketingConsent),
      carDashcam: customTrueFalse(item?.car?.dashcam),
      carModification: customTrueFalse(item?.car?.modified),
      policyPreferredType: customerPolicyType(
        item?.insurance?.voluntaryInsuranceType
      ),
      expiryDate: formatDDMMYYYY(item?.insurance?.policyExpiryDate),
      createdOn: formatDDMMYYYYHHMMSS(item?.lead?.createTime),
      updatedOn: formatDDMMYYYYHHMMSS(item?.lead?.updateTime),
      assignedOn: formatDDMMYYYYHHMMSS(item?.assigned?.createTime),
      dob: formatDDMMYYYY(item?.insuree?.dateOfBirth),
      policyStartDate: formatDDMMYYYY(item?.insurance?.policyStartDate),
      user: `${modelValidationField(
        item?.assigned?.firstName
      )} ${modelValidationField(item?.assigned?.lastName)}`,
      teamName: modelValidationField(item?.team?.displayName),
      name: `${modelValidationField(
        item?.lead?.data?.customerFirstName
      )} ${modelValidationField(item?.lead?.data?.customerLastName)}`,
      leadScore: modelValidationField(item?.score),
      sumInsured: modelValidationField(item?.insurance?.sumInsured),
      appointmentDate: item?.appointments?.length
        ? getValidAppointmentDate(item.appointments)
        : '',
      leadId: modelValidationField(item.lead.humanId),
      licensePlate: modelValidationField(item?.car?.licensePlate),
      leadSource: modelValidationField(item?.source?.source),
      customerId: modelValidationField(item?.customer?.humanId),
      referralId: modelValidationField(item?.insurance?.preferredInsurerId),
      age: modelValidationField(item?.insuree?.age),
      carBranch: modelValidationField(item?.car?.brand),
      carModel: modelValidationField(item?.car?.model),
      carYear: modelValidationField(item?.car?.year),
      carTransmission: modelValidationField(item?.car?.transmission),
      carUsage: modelValidationField(item?.car?.usage),
      carRegisteredProvince: modelValidationField(
        item?.car?.registeredProvince
      ),
      currentInsurer: findShortInsurerName(
        item?.insurance?.currentInsurerId,
        item?.insurance?.currentInsurer
      ),
      lastInsurer: findShortInsurerName(
        item?.insurance?.preferredInsurerId,
        item?.insurance?.preferredInsurer
      ),
      isChecked: false,
      failedDials: '',
      connectDials: '',
      leadSubStatus: '',
      totalDials: '',
      paymentDate: '',
      renewalId: '',
      piwikId: '',
      lastVisitedOn: '',
      rejectionComment: '',
      commentId: modelValidationField(firstRejection?.comment),
      rejectionReason: customRejectionReason(firstRejection?.reason),
      rejectedDate: formatDDMMYYYYHHMMSS(firstRejection?.createTime),
      rejectionId: modelValidationField(firstRejection?.name),
      isRejected: item?.lead.isRejected,
      rejections,
    };
  });
  return data;
};

export default function LeadAssignmentReducer(
  state = initialState,
  action: IAction<any>
): any {
  switch (action.type) {
    case LeadAssignmentActions.GET_LEAD_ASSIGNMENT: {
      const { pageSize, currentPage, orderBy } = action.payload;

      return {
        ...state,
        isFetching: true,
        pageState: {
          pageSize: pageSize || state.pageState.pageSize,
          currentPage: currentPage || state.pageState.currentPage,
          orderBy,
        },
      };
    }
    case LeadAssignmentActions.GET_LEAD_ASSIGNMENT_SUCCESS: {
      const formatList =
        formatLeadAssignment(action.payload?.data?.leads || []) || [];
      return {
        ...state,
        data: formatList,
        success: true,
        isFetching: false,
        totalItem: Number(action.payload?.data?.total),
        tableType: action.tableType,
      };
    }
    case LeadAssignmentActions.GET_LEAD_ASSIGNMENT_FAILED: {
      return {
        ...state,
        success: false,
        isFetching: false,
        data: [],
        totalItem: 0,
      };
    }
    case LeadAssignmentActions.GET_COMMENT_LEAD_ASSIGNMENT_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        success: true,
        isFetching: false,
        totalItem: Number(action.totalItem),
      };
    }
    case LeadAssignmentActions.CLEAR_LEAD_ASSIGNMENT_PAGE_STATE: {
      return {
        ...state,
        pageState: {
          pageSize: 15,
          currentPage: 1,
        },
      };
    }
    default:
      return state;
  }
}
