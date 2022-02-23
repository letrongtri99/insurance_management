import {
  Box as MuiBox,
  CardContent as MuiCardContent,
  Checkbox as MuiCheckbox,
  Typography,
} from '@material-ui/core';
import { getString } from 'presentation/theme/localization';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const CardContent = styled(MuiCardContent)`
  &&& {
    padding: 0;
    border: 1px solid ${({ theme }) => theme.palette.common.blue};
    border-radius: 10px;
  }
`;

const Checkbox = styled(MuiCheckbox)`
  &&& {
    margin-left: auto;
    padding: 0 8px 0 0;
  }
`;

const Box = styled(MuiBox)`
  &&& {
    text-align: left;
    span:not(.MuiCheckbox-root) {
      width: 50%;
    }

    &.active {
      border: 1px solid ${({ theme }) => theme.palette.common.sky};
      border-radius: 10px;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  padding: 16px 0 16px 8px;
  background-color: ${({ theme }) => theme.palette.common.blue};
  color: ${({ theme }) => theme.palette.common.sky};
  display: flex;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  p {
    font-weight: bold;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  padding: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.common.blue};
  }
`;

const CustomerCard = ({ customer, selected, onChange }: any) => {
  const isActive = useMemo(
    () => customer.id === selected,
    [customer.id, selected]
  );
  return (
    <Box className={isActive ? 'active' : ''} m={4}>
      <CardContent>
        <Title>
          <Typography>{customer.name}</Typography>
          <Checkbox
            name={customer.name}
            checked={isActive}
            value={isActive}
            onChange={() => onChange(customer.id)}
          />
        </Title>
        <ItemContainer>
          <span>{getString('text.firstName')}</span>
          <span>{`: ${customer.info.firstName}`}</span>
        </ItemContainer>
        <ItemContainer>
          <span>{getString('text.lastName')}</span>
          <span>{`: ${customer.info.lastName}`}</span>
        </ItemContainer>
      </CardContent>
    </Box>
  );
};

export default CustomerCard;
