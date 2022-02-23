import { getFilterData } from '..';

test('Test getFilterData return correct value', () => {
  const filters = {
    assignToTeam: [],
    assignToUser: [],
    carBrand: [],
    currentPage: 1,
    date: {
      startDate: {
        criteria: '',
        range: { startDate: null, endDate: null },
      },
      endDate: {
        criteria: '',
        range: { startDate: null, endDate: null },
      },
    },
    lastPremium: [0, 0],
    leadStatus: [],
    leadType: [],
    orderBy: undefined,
    pageSize: 15,
    score: [],
    search: { key: '', value: '' },
    source: [],
    sumInsured: [0, 0],
    tableType: 'LEAD_ASSIGNMENT',
  };
  const path = 'lastInsurer';
  const output = null;
  expect(getFilterData(filters, path)).toEqual(output);
});
