import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getString } from 'presentation/theme/localization';
import Helmet from 'react-helmet';

import { Button as MuiButton, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { NotFoundIcon } from './icons';

const Button: FC<any> = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  border-radius: ${(props) => props.theme.border.radius};
  margin: 0 ${(props) => props.theme.spacing(3)}px;
  background: white;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;

  h2 {
    width: 20%;
  }
  span {
    text-transform: uppercase;
  }
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Helmet title="404 Error" />
      <NotFoundIcon />
      <Typography component="h2" variant="h3" align="center" gutterBottom>
        {getString('errorPage.notFoundText')}
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        mt={2}
        className="upper-case"
      >
        {getString('errorPage.backToHomePage')}
      </Button>
    </Wrapper>
  );
};

export default NotFound;
