import React from 'react';
import { shallow } from 'enzyme';
import ICallSummary from 'presentation/models/lead/callSummary';
import CallSummarySection from './CallSummarySection';

const mockData: ICallSummary = {
  totalCall: 6,
  connectedCall: 5,
  totalCallDuration: 4,
};

const wrapper = shallow(<CallSummarySection callSummaryData={mockData} />);

describe('<CallSummarySection Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
