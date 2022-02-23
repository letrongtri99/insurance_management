import { withTheme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { getFieldTitle } from 'presentation/pages/LeadDetailsPage/leadDetailsPage.helper';

interface CarFieldProp {
  title: string;
  value: string;
}

const FieldWrapper = withTheme(styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.border.color};
`);

const FieldItem = withTheme(styled.span`
  &&& {
    width: 50%;
    display: flex;
    align-items: center;
  }
`);

const CarInfoField = ({ title, value }: CarFieldProp) => {
  return (
    <FieldWrapper className="unit-test-car-info-field">
      <FieldItem>{getFieldTitle(title)}</FieldItem>
      <FieldItem>{`: ${value}`}</FieldItem>
    </FieldWrapper>
  );
};
export default CarInfoField;
