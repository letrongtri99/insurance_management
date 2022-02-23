import React from 'react';
import { shallow } from 'enzyme';
import LeadAssignmentPage from './index';

const wrapper = shallow(<LeadAssignmentPage />);

describe('<LeadAssignmentPage Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
