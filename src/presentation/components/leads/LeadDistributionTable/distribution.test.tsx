import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { configureStore } from 'presentation/redux/store';
import LeadDistributionTable from './index';
import { TableTypeEnum } from '../../../pages/leads/LeadDistributionPage';
import {
  DistributionActionTypes,
  updateNewLeads,
} from '../../../redux/actions/distribution';

const store = configureStore();
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
const isEdit = false;
useStateSpy.mockImplementation((() => [isEdit, setState]) as any);

const wrapper = mount(
  <Provider store={store}>
    <LeadDistributionTable
      columns={[]}
      tableName=""
      tableType={TableTypeEnum.NEW_LEAD}
    />
    ,
  </Provider>,
  { context: { store } }
);

describe('<LeadDistributionTable/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('check button edit exits', () => {
    const button = wrapper.find('#unittest-icon-edit-distribution');
    expect(button.exists()).toEqual(true);
  });

  it('click to button edit distribution', () => {
    const button = wrapper.find('#unittest-icon-edit-distribution');
    button.hostNodes().simulate('click');
    expect(setState).toHaveBeenCalledWith(true);
  });

  it('Update auto assign distribution', () => {
    const button = wrapper.find('#unittest-update-auto-assign');
    button.hostNodes().simulate('click');
    const expectedActions = {
      payload: {
        enableAutoAssign: true,
      },
      type: DistributionActionTypes.UPDATE_NEW_LEADS,
    };
    expect(
      updateNewLeads({
        enableAutoAssign: true,
      })
    ).toEqual(expectedActions);
  });

  afterEach(() => {
    setState.mockClear();
  });
});
