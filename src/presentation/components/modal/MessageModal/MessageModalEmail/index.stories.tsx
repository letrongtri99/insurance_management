import React from 'react';
import { emailMockData } from '../../../../../mock-data/MessageModal.mock';
import MessageModalEmail from '.';
import { IAttachment } from '../Attachment';

export default {
  title: 'Components/Controls/MessageModalEmail',
  component: MessageModalEmail,
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

const Template = (args) => {
  const mockEmail = emailMockData;
  return (
    <div style={{ width: 1500 }}>
      <MessageModalEmail email={mockEmail} isStoryBook {...args} />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  email: emailMockData,
  attachment: PdfData,
  attachmentLoading: false,
};
