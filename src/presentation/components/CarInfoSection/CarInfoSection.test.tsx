import React from 'react';
import { shallow } from 'enzyme';
import CarInfoSection from './CarInfoSection';
import { carInfoField } from '../../models/lead/CarInfo/CarInfo';
import CarInfoSectionHepper from './CarInfoSectionHepper';

const carInfo = {
  year: '2017 (2560)',
  brand: 'Nissan',
  model: 'Juke',
  sumInsured: 500000,
  engineSize: 1.4,
  transmission: 'Auto',
  noOfDoor: '',
  cabType: '',
  dashCam: true,
  purpose: 'Personal',
  province: 'Krabi',
  modification: true,
  licensePlate: '',
};

const getCardData = () => {
  const carInfoHelper = new CarInfoSectionHepper();
  return carInfoHelper.handleData(carInfo) as Array<carInfoField>;
};

const carInfoState = getCardData();

const handleChangeCar = jest.fn();
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((() => [carInfoState, setState]) as any);
jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ id: '123' }),
}));

const initialProps = {
  carInfo,
};

const wrapper = shallow(
  <CarInfoSection {...initialProps} onSaveLincense={() => null} />
);

describe('<CarInfoSection Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
