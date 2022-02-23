import React from 'react';
import { shallow } from 'enzyme';
import ActivityModal from '.';

const initialProps = {
  openDialog: true,
  activeId: 1,
};
const handleCloseModal = jest.fn();

const setItemActiveId = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
const itemActiveId = -1;
useStateSpy.mockImplementation((() => [itemActiveId, setItemActiveId]) as any);
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useParams: jest
    .fn()
    .mockReturnValue({ environment: 'dev', service: 'fakeService' }),
}));

const wrapper = shallow(
  <ActivityModal {...initialProps} closeDialog={handleCloseModal} />
);

const buttons = [
  { id: 1, label: 'lead.activity' },
  { id: 2, label: 'lead.communication' },
  { id: 3, label: 'lead.assignment' },
  { id: 4, label: 'lead.audit' },
];

describe('<ActivityModal Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display data of group header button', () => {
    buttons.map((item: any) => {
      return expect(wrapper.find(`.unittest-button-${item.id}`).text()).toEqual(
        item.label
      );
    });
  });

  it('should click to group header button', () => {
    buttons.map((item: any) => {
      const button = wrapper.find(`.unittest-button-${item.id}`);
      button.simulate('click');
      return expect(setItemActiveId).toHaveBeenCalledWith(item.id);
    });
  });

  it('should click to button close', () => {
    const button = wrapper.find('.unittest__activity__close-btn');
    button.simulate('click');
    expect(handleCloseModal).toHaveBeenCalledWith(false);
  });

  afterEach(() => {
    handleCloseModal.mockClear();
    setItemActiveId.mockClear();
  });
});
