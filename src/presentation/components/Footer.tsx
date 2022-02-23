import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(1) / 4}px
    ${(props) => props.theme.spacing(4)}px;
  background: ${(props) => props.theme.palette.common.white};
  position: relative;
`;

function Footer() {
  return <Wrapper />;
}
const mapStateToProps = (state: any) => ({
  lang: state.languageReducer,
});

export default connect(mapStateToProps)(Footer);
