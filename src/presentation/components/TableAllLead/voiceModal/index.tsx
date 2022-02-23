import React from 'react';
import { Box } from '@material-ui/core';
import Audio from '../../AudioPlayer';
import './index.scss';

interface IVoiceModal {
  callId: string;
}

const VoiceModal: React.FC<IVoiceModal> = ({ callId }) => {
  const audioUrl = `${process.env.REACT_APP_API_ENDPOINT}/api/call/v1alpha1/${callId}/recording`;

  return (
    <Box style={{ marginTop: '30px', marginBottom: '30px' }}>
      <Audio src={audioUrl} />
    </Box>
  );
};

export default VoiceModal;
