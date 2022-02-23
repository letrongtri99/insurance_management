import {
  getSumColumn,
  getTableState,
} from '../../../presentation/components/leads/LeadDistributionTable/distribution.helper';

const LEAD_LIST_SUM = [
  { id: 1, agentLead: 'Agent 1', lead1: 100, lead2: 0, lead3: 0, lead4: 0 },
  { id: 2, agentLead: 'Agent 2', lead1: 0, lead2: 100, lead3: 0, lead4: 0 },
  { id: 3, agentLead: 'Agent 3', lead1: 0, lead2: 0, lead3: 100, lead4: 0 },
  { id: 4, agentLead: 'Agent 4', lead1: 0, lead2: 0, lead3: 0, lead4: 100 },
];
const expectResult = {
  sumTotalColumn: 400,
  result: {
    id: 10,
    agentLead: '0Agent 1Agent 2Agent 3Agent 4',
    lead1: 100,
    lead2: 100,
    lead3: 100,
    lead4: 100,
  },
};
test('Get sum column', () => {
  expect(JSON.stringify(getSumColumn(LEAD_LIST_SUM))).toEqual(
    JSON.stringify(expectResult)
  );
});
test('Get table distribution state', () => {
  expect(getTableState('distribution')).toEqual('distributionLeadReducer');
});
