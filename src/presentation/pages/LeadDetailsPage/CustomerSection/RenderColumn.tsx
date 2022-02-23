import React from 'react';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';
import { EDIT_TYPE, getClassFieldItem } from './helper';
import SearchFileIcon from '../../../../images/icons/searchfile.svg';
import RenderValue from './RenderValue';
import { getFieldTitle } from '../leadDetailsPage.helper';

const Field = withTheme(styled.div`
  &&& {
    display: flex;
    padding: 10px 15px;
    align-items: flex-start;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
  }
`);

const FieldItem = styled.span`
  &&& {
    width: 50%;
    display: flex;
    align-items: center;
  }
`;
const RenderColumn = ({ item, updateDOB }: any) => {
  const renderIcon = (editType: EDIT_TYPE) => {
    if (editType === EDIT_TYPE.DATE) {
      return <img src={SearchFileIcon} alt="" />;
    }
    return null;
  };

  return (
    <>
      {Object.entries(item).map(([key, keyValue]: [string, any]) => {
        return (
          <Field key={keyValue.id}>
            <FieldItem className={getClassFieldItem(keyValue)}>
              {getFieldTitle(keyValue.title)}
            </FieldItem>
            <div className="field-item">
              <RenderValue
                objValue={keyValue}
                key={key}
                updateDOB={updateDOB}
              />
              {renderIcon(keyValue.editType)}
            </div>
          </Field>
        );
      })}
    </>
  );
};

export default RenderColumn;
