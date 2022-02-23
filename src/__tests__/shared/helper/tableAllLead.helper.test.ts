import {
  returnTableAllLeadSetting,
  changeSortStatus,
  SORT_TABLE_TYPE,
  getOrderLead,
} from 'presentation/components/TableAllLead/TableAllLead.helper';

const inputTableAllLeadSettings = [
  {
    id: 'teamName',
    label: 'text.team',
    sorting: 'none',
    minWidth: 80,
    sortingField: 'team.displayName',
  },
  {
    id: 'user',
    label: 'text.user',
    sorting: 'none',
    minWidth: 80,
    sortingField: 'assigned.firstName',
  },
  {
    id: 'name',
    label: 'text.name',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insuree.fullName',
  },
  {
    id: 'expiryDate',
    label: 'text.expiryDate',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insurance.policyExpiryDate',
  },
  {
    id: 'leadType',
    label: 'text.leadType',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'lead.type',
  },
  {
    id: 'leadStatus',
    label: 'text.leadStatus',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'lead.status',
  },
  {
    id: 'leadScore',
    label: 'text.leadScore',
    sorting: 'none',
    minWidth: 150,
    sortingField: '',
    isNotSorting: true,
  },
  {
    id: 'sumInsured',
    label: 'text.sumInsuredLabel',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insurance.sumInsured',
  },
  {
    id: 'appointmentDate',
    label: 'text.appointmentDate',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'appointments.startTime',
  },
  {
    id: 'leadId',
    label: 'text.leadId',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'lead.humanId',
  },
  {
    id: 'phoneNumber',
    label: 'text.phoneNumber',
    sorting: 'none',
    minWidth: 150,
    isNotSorting: true,
  },
  {
    id: 'licensePlate',
    label: 'text.licensePlate',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.licensePlate',
  },
  {
    id: 'leadSource',
    label: 'text.leadSource',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'source.source',
  },
  {
    id: 'customerId',
    label: 'text.customerId',
    sorting: 'none',
    minWidth: 150,
    isNotSorting: true,
  },
  {
    id: 'createdOn',
    label: 'text.createdOn',
    sorting: 'none',
    minWidth: 200,
    sortingField: 'lead.createTime',
  },
  {
    id: 'updatedOn',
    label: 'text.updatedOn',
    sorting: 'none',
    minWidth: 200,
    sortingField: 'lead.updateTime',
  },
  {
    id: 'assignedOn',
    label: 'text.assignOn',
    sorting: 'none',
    minWidth: 200,
    sortingField: 'assigned.createTime',
  },
  {
    id: 'dob',
    label: 'text.dob',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'insuree.dateOfBirth',
  },
  {
    id: 'gender',
    label: 'text.gender',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'insuree.gender',
  },
  {
    id: 'age',
    label: 'text.age',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'insuree.age',
  },
  {
    id: 'email',
    label: 'text.email',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'insuree.email',
  },
  {
    id: 'marketingConsent',
    label: 'text.marketingConsent',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'lead.data.marketingConsent',
  },
  {
    id: 'carBranch',
    label: 'text.carBrand',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'car.brand',
  },
  {
    id: 'carModel',
    label: 'text.carModel',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'car.model',
  },
  {
    id: 'carYear',
    label: 'text.carYear',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'car.year',
  },
  {
    id: 'carEngineSize',
    label: 'text.carEngineSize',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.engineSize',
  },
  {
    id: 'carTransmission',
    label: 'text.carTransmission',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.transmission',
  },
  {
    id: 'carDashcam',
    label: 'text.carDashcam',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.dashcam',
  },
  {
    id: 'carUsage',
    label: 'text.carUsage',
    sorting: 'none',
    minWidth: 100,
    sortingField: 'car.usage',
  },
  {
    id: 'carRegisteredProvince',
    label: 'text.carRegisteredProvince',
    sorting: 'none',
    minWidth: 200,
    sortingField: 'car.registeredProvince',
  },
  {
    id: 'carModification',
    label: 'text.carModification',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'car.modified',
  },
  {
    id: 'currentInsurer',
    label: 'text.currentInsurer',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insurance.currentInsurer',
  },
  {
    id: 'lastInsurer',
    label: 'text.lastInsurer',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'insurance.preferredInsurer',
  },
  {
    id: 'policyStartDate',
    label: 'text.policyStartDate',
    sorting: 'none',
    minWidth: 150,
    sortingField: 'lead.data.policyStartDate',
  },
  {
    id: 'policyPreferredType',
    label: 'text.policyPreferredType',
    sorting: 'none',
    minWidth: 170,
    sortingField: 'insurance.voluntaryInsuranceType',
  },
];

const expectSetting = JSON.parse(JSON.stringify(inputTableAllLeadSettings));

test('Check table setting when pass empty array', () => {
  expect(returnTableAllLeadSetting('LEAD_ASSIGNMENT', [])).toEqual([]);
});

test('Check table setting when pass valid array', () => {
  expect(
    returnTableAllLeadSetting(
      'LEAD_ASSIGNMENT',
      inputTableAllLeadSettings as any[]
    )
  ).toEqual(expectSetting);
});

test('Check change status from none to asc', () => {
  expect(changeSortStatus(SORT_TABLE_TYPE.NONE)).toEqual(SORT_TABLE_TYPE.ASC);
});

test('Check change status from asc to desc', () => {
  expect(changeSortStatus(SORT_TABLE_TYPE.ASC)).toEqual(SORT_TABLE_TYPE.DESC);
});

test('Check change status from desc to none', () => {
  expect(changeSortStatus(SORT_TABLE_TYPE.DESC)).toEqual(SORT_TABLE_TYPE.NONE);
});

test('Check order by string with field is empty string', () => {
  expect(getOrderLead('')).toEqual('');
});

test('Check order by string', () => {
  expect(getOrderLead('lead.type')).toEqual('order_by=lead.type desc');
});

test('Check order by string with field is empty string and order by asc', () => {
  expect(getOrderLead('', SORT_TABLE_TYPE.ASC)).toEqual('');
});

test('Check order by string with order by none', () => {
  expect(getOrderLead('lead.type', SORT_TABLE_TYPE.NONE)).toEqual('');
});

test('Check order by string with order by asc', () => {
  expect(getOrderLead('lead.type', SORT_TABLE_TYPE.ASC)).toEqual(
    'order_by=lead.type'
  );
});

test('Check order by string with order by desc', () => {
  expect(getOrderLead('lead.type', SORT_TABLE_TYPE.DESC)).toEqual(
    'order_by=lead.type desc'
  );
});
