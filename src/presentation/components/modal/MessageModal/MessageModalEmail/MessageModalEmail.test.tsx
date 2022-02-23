import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { configureStore } from 'presentation/redux/store';
import MessageModalEmail from '.';
import { IItemEmail } from '../messageModal.helper';
import { IAttachment } from '../Attachment';

const emailMockData: IItemEmail = {
  name: '',
  subject: '',
  body: '',
  cc: [],
  bodyText: '',
  createdBy: '',
  emailIndex: 1,
  createTime: '',
  updateTime: '',
  deleteTime: '',
  type: '',
  parentId: '',
};

const PdfData: [IAttachment] = [
  {
    name: '/mails/5cf7f5d2-2972-4f89-9479-6d412bf31d3c/attachments/2a52ecc8-2ef1-450e-974b-3df216701901',
    fileSize: '21252',
    label: 'Screenshot from 2021-02-04 15-03-23.png',
    embedded: false,
    createTime: '2021-02-18T11:31:58.382051Z',
    updateTime: '2021-02-18T11:31:59.127343Z',
    deleteTime: '0001-01-01T00:00:00Z',
    createdBy: '',
  },
];

const handleClick = jest.fn();
const handleReplyEmail = jest.fn();
const store = configureStore();

const wrapper = shallow(
  <Provider store={store}>
    <MessageModalEmail
      attachmentLoading={false}
      attachment={PdfData}
      email={emailMockData}
      onClick={handleClick}
      handleReplyEmail={handleReplyEmail}
    />
  </Provider>,
  { context: { store } }
);

describe('<MessageModalEmail Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
