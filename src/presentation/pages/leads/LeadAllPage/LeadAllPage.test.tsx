import React from 'react';
import { shallow } from 'enzyme';
import LeadAllPage from '.';

const wrapper = shallow(<LeadAllPage />);

describe('<LeadAllPage Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
