import {
  formatListLeadScore,
  IListScoreFormat,
  IListScoring,
} from 'presentation/redux/reducers/leadSetting/scoring/scoringReducer.helper';

const scoreListResult: Array<IListScoreFormat> = [
  {
    name: 'products/car-insurance/weightset/leadtypes/new',
    values: {
      leadSource: 18,
      sumInsured: 4,
      webActivity: 78,
    },
    title: 'text.newLead',
    type: 'text.new',
    tableType: 'new',
    isEdit: false,
    isLoading: false,
  },
  {
    name: 'products/car-insurance/weightset/leadtypes/renewal',
    values: {
      lastPremium: 11,
      lifetime: 3,
      webActivity: 86,
    },
    title: 'text.renewalLead',
    type: 'text.renewal',
    tableType: 'renewal',
    isEdit: false,
    isLoading: false,
  },
  {
    name: 'products/car-insurance/weightset/leadtypes/retainer',
    values: {
      leadAge: 18,
      sumInsured: 52,
      webActivity: 30,
    },
    title: 'text.retainerLead',
    type: 'text.retainer',
    tableType: 'retainer',
    isEdit: false,
    isLoading: false,
  },
];

const scoreList: Array<IListScoring> = [
  {
    name: 'products/car-insurance/weightset/leadtypes/new',
    values: {
      leadSource: 18,
      sumInsured: 4,
      webActivity: 78,
    },
  },
  {
    name: 'products/car-insurance/weightset/leadtypes/renewal',
    values: {
      lastPremium: 11,
      lifetime: 3,
      webActivity: 86,
    },
  },
  {
    name: 'products/car-insurance/weightset/leadtypes/retainer',
    values: {
      leadAge: 18,
      sumInsured: 52,
      webActivity: 30,
    },
  },
];

test('Valid format list Score data.', () => {
  expect(formatListLeadScore(scoreList)).toEqual(scoreListResult);
});
