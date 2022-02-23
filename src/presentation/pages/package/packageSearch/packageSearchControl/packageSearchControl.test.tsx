import React from 'react';
import { shallow } from 'enzyme';
import { packageSearchSchema } from 'shared/constants/packageSearchFields';
import { Formik } from 'formik';
import PackageSearchControl from '.';

const CONTROL = packageSearchSchema[0];
const onSubmit = jest.fn();
const wrapper = shallow(
  <Formik initialValues={{ status: '' }} onSubmit={onSubmit}>
    <PackageSearchControl key={0} input={CONTROL} />
  </Formik>
);

describe('<PackageSearchControl Component/>', () => {
  it('will be mounted correctly', () => {
    const control = wrapper.find(PackageSearchControl);
    expect(control.exists()).toBe(true);
  });
});
