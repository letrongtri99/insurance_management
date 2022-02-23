import LeadSettingHelper from 'presentation/redux/epics/leadSetting/LeadSettingHelper';

const newLeadData = {
  overflows: [
    {
      name: 'products/car-insurance/overflow/leadtypes/new/ranks/1',
      values: [3, 1, 2, 4],
    },
    {
      name: 'products/car-insurance/overflow/leadtypes/new/ranks/2',
      values: [1, 2, 3, 4],
    },
    {
      name: 'products/car-insurance/overflow/leadtypes/new/ranks/3',
      values: [1, 2, 3, 4],
    },
    {
      name: 'products/car-insurance/overflow/leadtypes/new/ranks/4',
      values: [1, 3, 2, 4],
    },
  ],
};

const resultNewLeadData = [
  {
    id: 0,
    loading: false,
    edit: false,
    name: 'products/car-insurance/overflow/leadtypes/new/ranks/1',
    title: 'Lead/Prioriry',
    type: 'Lead 1',
    localisationKey: 'lead',
    data: [
      { id: 'Priority A3', name: 'Priority A3', value: 3 },
      { id: 'Priority A1', name: 'Priority A1', value: 1 },
      { id: 'Priority A2', name: 'Priority A2', value: 2 },
      { id: 'Priority A4', name: 'Priority A4', value: 4 },
    ],
  },
  {
    id: 1,
    loading: false,
    edit: false,
    name: 'products/car-insurance/overflow/leadtypes/new/ranks/2',
    title: 'Lead/Prioriry',
    type: 'Lead 2',
    localisationKey: 'lead',
    data: [
      { id: 'Priority A1', name: 'Priority A1', value: 1 },
      { id: 'Priority A2', name: 'Priority A2', value: 2 },
      { id: 'Priority A3', name: 'Priority A3', value: 3 },
      { id: 'Priority A4', name: 'Priority A4', value: 4 },
    ],
  },
  {
    id: 2,
    loading: false,
    edit: false,
    name: 'products/car-insurance/overflow/leadtypes/new/ranks/3',
    title: 'Lead/Prioriry',
    type: 'Lead 3',
    localisationKey: 'lead',
    data: [
      { id: 'Priority A1', name: 'Priority A1', value: 1 },
      { id: 'Priority A2', name: 'Priority A2', value: 2 },
      { id: 'Priority A3', name: 'Priority A3', value: 3 },
      { id: 'Priority A4', name: 'Priority A4', value: 4 },
    ],
  },
  {
    id: 3,
    loading: false,
    edit: false,
    name: 'products/car-insurance/overflow/leadtypes/new/ranks/4',
    title: 'Lead/Prioriry',
    type: 'Lead 4',
    localisationKey: 'lead',
    data: [
      { id: 'Priority A1', name: 'Priority A1', value: 1 },
      { id: 'Priority A3', name: 'Priority A3', value: 3 },
      { id: 'Priority A2', name: 'Priority A2', value: 2 },
      { id: 'Priority A4', name: 'Priority A4', value: 4 },
    ],
  },
];

const retainerLeadData = {
  overflows: [
    {
      name: 'products/car-insurance/overflow/leadtypes/retainer/ranks/1',
      values: [3, 1, 2, 4],
    },
    {
      name: 'products/car-insurance/overflow/leadtypes/retainer/ranks/2',
      values: [2, 1, 3, 4],
    },
    {
      name: 'products/car-insurance/overflow/leadtypes/retainer/ranks/3',
      values: [1, 2, 3, 4],
    },
    {
      name: 'products/car-insurance/overflow/leadtypes/retainer/ranks/4',
      values: [1, 2, 3, 4],
    },
  ],
};

const resultRetainerLeadData = [
  {
    id: 0,
    loading: false,
    edit: false,
    name: 'products/car-insurance/overflow/leadtypes/retainer/ranks/1',
    title: 'Lead/Prioriry',
    type: 'Lead 1',
    localisationKey: 'lead',
    data: [
      { id: 'Priority A3', name: 'Priority A3', value: 3 },
      { id: 'Priority A1', name: 'Priority A1', value: 1 },
      { id: 'Priority A2', name: 'Priority A2', value: 2 },
      { id: 'Priority A4', name: 'Priority A4', value: 4 },
    ],
  },
  {
    id: 1,
    loading: false,
    edit: false,
    name: 'products/car-insurance/overflow/leadtypes/retainer/ranks/2',
    title: 'Lead/Prioriry',
    type: 'Lead 2',
    localisationKey: 'lead',
    data: [
      { id: 'Priority A2', name: 'Priority A2', value: 2 },
      { id: 'Priority A1', name: 'Priority A1', value: 1 },
      { id: 'Priority A3', name: 'Priority A3', value: 3 },
      { id: 'Priority A4', name: 'Priority A4', value: 4 },
    ],
  },
  {
    id: 2,
    loading: false,
    edit: false,
    name: 'products/car-insurance/overflow/leadtypes/retainer/ranks/3',
    title: 'Lead/Prioriry',
    type: 'Lead 3',
    localisationKey: 'lead',
    data: [
      { id: 'Priority A1', name: 'Priority A1', value: 1 },
      { id: 'Priority A2', name: 'Priority A2', value: 2 },
      { id: 'Priority A3', name: 'Priority A3', value: 3 },
      { id: 'Priority A4', name: 'Priority A4', value: 4 },
    ],
  },
  {
    id: 3,
    loading: false,
    edit: false,
    name: 'products/car-insurance/overflow/leadtypes/retainer/ranks/4',
    title: 'Lead/Prioriry',
    type: 'Lead 4',
    localisationKey: 'lead',
    data: [
      { id: 'Priority A1', name: 'Priority A1', value: 1 },
      { id: 'Priority A2', name: 'Priority A2', value: 2 },
      { id: 'Priority A3', name: 'Priority A3', value: 3 },
      { id: 'Priority A4', name: 'Priority A4', value: 4 },
    ],
  },
];

const editData = {
  name: 'products/car-insurance/overflow/leadtypes/new/ranks/1',
  values: [3, 1, 2, 4],
};

const resultEditData = {
  loading: false,
  edit: false,
  name: 'products/car-insurance/overflow/leadtypes/new/ranks/1',
  title: 'Lead/Prioriry',
  localisationKey: 'lead',
  data: [
    { id: 'Priority A3', name: 'Priority A3', value: 3 },
    { id: 'Priority A1', name: 'Priority A1', value: 1 },
    { id: 'Priority A2', name: 'Priority A2', value: 2 },
    { id: 'Priority A4', name: 'Priority A4', value: 4 },
  ],
};

test('Valid format new lead data ', () => {
  expect(LeadSettingHelper.handelDataNewLead(newLeadData)).toEqual(
    resultNewLeadData
  );
});

test('Valid format retainer lead data ', () => {
  expect(LeadSettingHelper.handelDataRetainerLead(retainerLeadData)).toEqual(
    resultRetainerLeadData
  );
});

test('Valid format edit overflow data', () => {
  expect(LeadSettingHelper.handelEditSuccess(editData)).toEqual(resultEditData);
});
