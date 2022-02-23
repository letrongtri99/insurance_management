import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { configureStore } from 'presentation/redux/store';
import ImportPackagePageHelper from '.';

const store = configureStore();
const wrapper = shallow(
  <Provider store={store}>
    <ImportPackagePageHelper />
  </Provider>
);

describe('<PackageSearchFilter Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
