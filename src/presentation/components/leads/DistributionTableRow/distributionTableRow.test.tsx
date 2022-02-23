import React from 'react';
import { shallow } from 'enzyme';
import DistributionTableRow from './index';
import { Column } from '../../../pages/leads/LeadDistributionPage';

const rowChangValue = jest.fn();
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
const rowData = {
  agentLead: 'Agent 4',
  id: 4,
  lead1: 0,
  lead2: 1,
  lead3: 0,
  lead4: 99,
  undefined: 0,
};
useStateSpy.mockImplementation((() => [rowData, setState]) as any);
const fakeColumns: Column[] = [
  { id: 'agentLead', label: 'Agent/Lead', minWidth: 100 },
  { id: 'lead1', label: 'ตะกั่ว 1', minWidth: 100 },
  { id: 'lead2', label: 'ตะกั่ว 2', minWidth: 100 },
  { id: 'lead3', label: 'ตะกั่ว 3', minWidth: 100 },
  { id: 'lead4', label: 'ตะกั่ว 4', minWidth: 100 },
];
const wrapper = shallow(
  <DistributionTableRow
    row={rowData}
    columns={fakeColumns}
    index={0}
    disabled={false}
    rowChangeValue={rowChangValue}
    isFetching={false}
  />
);

describe('<DistributionTableRow Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('check button edit exits', () => {
    const button = wrapper.find('.unittest-input-distribution');
    expect(button.exists()).toEqual(true);
  });

  it('update row value', () => {
    const lead1 = wrapper.find('[name="lead1"]');
    lead1.simulate('change', {
      target: {
        value: 0,
      },
    });
    expect(lead1.prop('value')).toEqual(0);
  });

  it('on change row handle', () => {
    expect(rowChangValue).toHaveBeenCalledWith(rowData, 0);
  });

  afterEach(() => {
    setState.mockClear();
  });
});
