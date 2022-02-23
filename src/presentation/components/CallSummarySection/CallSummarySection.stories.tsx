import React from 'react';
import CallSummarySection from './CallSummarySection';

const mockData = {
  totalCall: 6,
  connectedCall: 5,
  totalCallDuration: 4,
};

export default {
  title: 'Components/LeadDetails/CallSummarySection',
  component: CallSummarySection,
};

const Template = (args) => (
  <div className="call-summary-story">
    <CallSummarySection {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  callSummaryData: mockData,
};
