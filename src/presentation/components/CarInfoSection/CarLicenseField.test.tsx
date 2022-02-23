import React from 'react';
import { shallow } from 'enzyme';
import CarLicenseField from './CarLicenseField';

const LICENSE_PLATE = 'License plate';

const handleSaveLicense = jest.fn();

const initialProps = {
  title: LICENSE_PLATE,
  value: '',
  abbreviation: 'กท',
  handleSaveLicense,
};
const onSubmit = jest.fn();
const wrapper = shallow(<CarLicenseField {...initialProps} />);
const simulateChangeInput = (
  shallowWrapper: any,
  selector: any,
  newValue: string,
  type: string
) => {
  const input = shallowWrapper.find(selector);
  input.simulate(
    'change',
    {
      target: { value: newValue },
    },
    type
  );
  return shallowWrapper.find(selector);
};
describe('<CarLicenseField Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('call save license with `redplate` when `Yes` button is selected', () => {
    const redPlateRdoGroup = wrapper.find('.unit-test-radio-group');
    expect(redPlateRdoGroup.exists()).toBe(true);
    const yesRadio = redPlateRdoGroup.find('.unit-test-red-plate');
    expect(yesRadio.exists()).toBe(true);
    redPlateRdoGroup.simulate('change', {}, 'yes');
    expect(handleSaveLicense).toHaveBeenCalledWith('redplate');
  });

  it('call save license with license value when `No` button is selected and input changes', () => {
    const redPlateRdoGroup = wrapper.find('.unit-test-radio-group');
    expect(redPlateRdoGroup.exists()).toBe(true);
    const yesRadio = redPlateRdoGroup.find('.unit-test-non-red-plate');
    expect(yesRadio.exists()).toBe(true);
    redPlateRdoGroup.simulate('change', {}, 'no');
    const freeText = simulateChangeInput(
      wrapper,
      '#unittest-input-license-free-text',
      '123',
      'freeText'
    );
    expect(freeText.props().value).toEqual('123');

    const numericText = simulateChangeInput(
      wrapper,
      '#unittest-input-license-numeric-text',
      '1234',
      'numericText'
    );
    expect(numericText.props().value).toEqual(1234);
    const button = wrapper.find('.unittest-button-license');
    expect(button.exists()).toBe(true);
    button.simulate('click');
    expect(handleSaveLicense).toHaveBeenCalledWith('123-1234 กท');
  });

  afterEach(() => {
    onSubmit.mockClear();
    handleSaveLicense.mockClear();
  });
});
