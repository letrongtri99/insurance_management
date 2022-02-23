import {
  IconButton,
  Input,
  Paper as MuiPaper,
  withTheme,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';

export const Field = withTheme(styled.div`
  &&& {
    display: flex;
    padding: 10px 15px;
    align-items: flex-start;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
  }
`);

export const FieldItem = styled.span`
  &&& {
    width: 50%;
    display: flex;
    align-items: center;

    .MuiOutlinedInput-notchedOutline {
      border: 1px solid #222222;
    }

    .MuiSelect-iconOutlined {
      right: 4px;
    }

    .MuiOutlinedInput-input {
      height: 8px;
      line-height: 0.5em;
    }

    .MuiInputBase-formControl {
      .MuiFormHelperText-filled {
        color: 1px solid ${({ theme }) => theme.palette.danger.main}
    }
  }
`;

export const HeaderTitle = withTheme(styled.div`
  &&& {
    display: inline-block;
    width: 100%;
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.grey[200]};
    border-radius: 6px 6px 0 0;

    b {
      font-size: 16px;
    }

    .header-content {
      padding: 10px 15px;
      margin: auto;
      word-break: break-word;
    }
  }
`);

export const Paper = withTheme(styled(MuiPaper)`
  &&& {
    height: 100%;
    border: 1px solid ${({ theme }) => theme.border.color};
    border-radius: 6px;
  }
`);

export const Colon = styled.span`
  padding-bottom: 6px;
  margin-right: 3px;
`;

export const FieldInput = styled(TextField)`
  &&& {
    margin-right: 10px;
    width: 80%;

    input {
      padding-top: 0px;
    }
  }
`;

export const EditButton = styled(IconButton)`
  &&& {
    padding: 1px;
  }
`;
