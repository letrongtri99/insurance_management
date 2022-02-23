import React from 'react';
import styled from 'styled-components';
import GitInfo from 'react-git-info/macro';
import { getString } from '../../theme/localization';

const gitInfo = GitInfo();

const Hash = styled.p`
  text-align: center;
  margin: 0;
  color: #7d7777;
  transform: translateX(-50%);
  position: absolute;
  font-size: 0.825rem;
  right: 15px;
  bottom: 10px;
`;

const GitCommitHash = () => {
  return (
    <Hash>
      <span>{`${getString('text.gitVersion')}: `}</span>
      <span>
        {gitInfo.commit.shortHash || getString('text.gitVersionUnknown')}
      </span>
    </Hash>
  );
};

export default GitCommitHash;
