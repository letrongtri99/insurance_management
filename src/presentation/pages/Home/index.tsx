import { Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isHealthRevamp, isRebranding } = useSelector(
    (state: { uiInitReducer: { flags: Record<string, boolean> } }) =>
      state.uiInitReducer.flags
  );

  return (
    <Box textAlign="center">
      <p>Welcome to the Lead Management system!</p>
      <Box display="flex" flexDirection="column">
        {isHealthRevamp && <b>With Health Revamp Enabled</b>}
        {isRebranding && <b>With Health Revamp Enabled</b>}
      </Box>
    </Box>
  );
};

export default Home;
