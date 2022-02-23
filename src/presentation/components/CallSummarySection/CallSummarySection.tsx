import React, { useMemo, useState } from 'react';
import ICallSummary from 'presentation/models/lead/callSummary';
import './index.scss';
import { getString } from 'presentation/theme/localization';
import { CONSTANT_TOTAL_CALL } from 'config/constant';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core';

interface ICallSummaryProps {
  callSummaryData?: ICallSummary;
}

const mockData = {
  totalCall: 6,
  connectedCall: 5,
  totalCallDuration: 4,
};

const CallSummaryItem = withTheme(styled.div`
  border-right: 1px solid ${({ theme }) => theme.palette.info.main};

  span {
    display: block;
    padding: 2px 10px;
    line-height: 1;
    align-items: center;
    text-align: right;
  }

  &:last-child {
    border: none;
  }
`);

const CallSummarySection: React.FC<ICallSummaryProps> = ({
  callSummaryData = mockData,
}) => {
  const [formData, setFormData] = useState({
    totalCall: 0,
    connectedCall: 0,
    totalCallDuration: 0,
  });
  useMemo(() => {
    setFormData({
      totalCall: callSummaryData.totalCall,
      connectedCall: callSummaryData.connectedCall,
      totalCallDuration: callSummaryData.totalCallDuration,
    });
  }, [callSummaryData]);

  const minutes = Math.floor(formData.totalCallDuration / 60);
  const seconds = formData.totalCallDuration % 60;

  return (
    <div className="call-summary">
      <CallSummaryItem>
        <span>{getString('text.totalCall')}</span>
        <span>
          <b>{`${formData.totalCall}/${CONSTANT_TOTAL_CALL}`}</b>
        </span>
      </CallSummaryItem>
      <CallSummaryItem>
        <span>{getString('text.connectedCall')}</span>
        <span>
          <b>{formData.connectedCall}</b>
        </span>
      </CallSummaryItem>
      <CallSummaryItem>
        <span>{getString('text.totalCallDuration')}</span>
        <span>
          <b>
            {`${minutes} ${getString('text.min')} ${seconds} ${getString(
              'text.sec'
            )} `}
          </b>
        </span>
      </CallSummaryItem>
    </div>
  );
};

export default CallSummarySection;
