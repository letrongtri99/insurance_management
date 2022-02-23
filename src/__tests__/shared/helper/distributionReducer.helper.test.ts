import customLeadData from '../../../presentation/redux/reducers/distribution/distributionReducer.helper';
import { getString } from '../../../presentation/theme/localization';

const leadInput = {
  name: 'products/car-insurance/distribution/leadtypes/retainer',
  enableAutoAssign: true,
  values: [100, 0, 0, 0, 0, 100, 0, 0, 0, 0, 100, 0, 0, 0, 0, 100],
};

const leadOutput = {
  name: 'products/car-insurance/distribution/leadtypes/retainer',
  enabled: true,
  leadsRow: [
    {
      id: 1,
      agentLead: `${getString('text.agent')} 1`,
      lead1: 100,
      lead2: 0,
      lead3: 0,
      lead4: 0,
    },
    {
      id: 2,
      agentLead: `${getString('text.agent')} 2`,
      lead1: 0,
      lead2: 100,
      lead3: 0,
      lead4: 0,
    },
    {
      id: 3,
      agentLead: `${getString('text.agent')} 3`,
      lead1: 0,
      lead2: 0,
      lead3: 100,
      lead4: 0,
    },
    {
      id: 4,
      agentLead: `${getString('text.agent')} 4`,
      lead1: 0,
      lead2: 0,
      lead3: 0,
      lead4: 100,
    },
  ],
  values: [100, 0, 0, 0, 0, 100, 0, 0, 0, 0, 100, 0, 0, 0, 0, 100],
};
test('Custom lead distribution data', () => {
  expect(JSON.stringify(customLeadData(leadInput))).toEqual(
    JSON.stringify(leadOutput)
  );
});
