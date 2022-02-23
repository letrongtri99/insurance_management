import React from 'react';
import { shallow } from 'enzyme';
import { packageSearchSchema } from 'shared/constants/packageSearchFields';
import PackageSearchFilter from '.';

const numberOfAccSumary = 1;

const wrapper = shallow(
  <PackageSearchFilter
    packageSearchSchemaState={packageSearchSchema}
    numberOfAccSumary={numberOfAccSumary}
  />
);

describe('<PackageSearchFilter Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
