import React from 'react';
import styled from 'styled-components';

const Icon = styled.div`
  margin-top: 40px;

  &.vs-icon {
    margin-top: 60px;
  }
`;

const Square = styled.div`
  border: 2px solid ${({ theme }) => theme.palette.common.blue};
  position: relative;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 10px;
`;

const Item1 = styled(Square)`
  width: 0;
  height: 0;
`;

const Item2 = styled(Square)`
  position: absolute;
  top: -16px;
  left: -5px;
`;

const Item3 = styled(Square)`
  top: -12px;
  left: -10px;
  backdrop-filter: blur(20px);
  font-size: 8px;
  text-align: center;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.common.blue};
`;

const VSIcon = (props?: any) => {
  return (
    <Icon className={props.customClass}>
      <Item1>
        <Item2 />
        <Item3>V/S</Item3>
      </Item1>
    </Icon>
  );
};

export default VSIcon;
