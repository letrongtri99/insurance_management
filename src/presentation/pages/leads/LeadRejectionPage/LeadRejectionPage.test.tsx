import React from 'react';
import { shallow } from 'enzyme';
import LeadRejectionPage from '.';

const wrapper = shallow(<LeadRejectionPage />);

describe('<LeadRejectionPage Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
