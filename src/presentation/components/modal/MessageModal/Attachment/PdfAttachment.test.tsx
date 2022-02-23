import React from 'react';
import { shallow } from 'enzyme';
import { formatBytes } from 'shared/helper/utilities';
import PdfAttachment, { IAttachment } from '.';

const PdfData: IAttachment = {
  name: '/mails/5cf7f5d2-2972-4f89-9479-6d412bf31d3c/attachments/2a52ecc8-2ef1-450e-974b-3df216701901',
  fileSize: '21252',
  label: 'Screenshot from 2021-02-04 15-03-23.png',
  embedded: false,
  createTime: '2021-02-18T11:31:58.382051Z',
  updateTime: '2021-02-18T11:31:59.127343Z',
  deleteTime: '0001-01-01T00:00:00Z',
  createdBy: '',
};

const wrapper = shallow(<PdfAttachment data={PdfData} />);

describe('<PdfAttachment Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('check title of pdf file', () => {
    expect(wrapper.find('.unittest-title').text()).toEqual(PdfData.label);
  });

  it('check size of pdf file', () => {
    expect(wrapper.find('.unittest-size').text()).toEqual(
      formatBytes(PdfData.fileSize)
    );
  });
});
