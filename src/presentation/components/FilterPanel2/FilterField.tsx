import React, { ChangeEvent } from 'react';
import { Grid as MuiGrid, makeStyles, withTheme } from '@material-ui/core';
import { useField } from 'formik';
import styled from 'styled-components';

const Grid = withTheme(styled(MuiGrid)`
  &&& {
    padding: ${({ theme }) => theme.spacing(4)}px;
  }
`);

interface InputProps {
  name: string;
  label?: string;
  filterType?: string;
  min?: number;
  max?: number;
  multiple?: boolean;
  placeholder?: string;
  step?: number;
  type?: string;
  value?: any;
  options?: Array<any>;
  searchData?: {
    [key: string]: string;
  };
  onChange?: (e: any) => void;
  searchOption?: Array<any>;
  fixedLabel?: boolean;
  selectName?: string;
  marks?: boolean;
  async?: boolean;
  asyncFn?: any;
  lookup?: boolean;
  lookupFn?: any;
  labelField?: string;
  valueField?: string;
  isPlaceHolder?: boolean;
  isTeamPage?: boolean;
  children?: any;
  errorMessage?: string;
  isShow?: boolean;
  responsive?: {
    xs?: 3 | 6 | 9 | 12;
    md?: 3 | 6 | 9 | 12;
    lg?: 3 | 6 | 9 | 12;
    xl?: 3 | 6 | 9 | 12;
  };
  filterDataField?: string; // Passed as Key to the filter. example: role => filter=role%3D%22roles%2Fadmin%22
  filterDataValue?: string; // Passed as value to the filter. example: roles/admin => filter=role%3D%22roles%2Fadmin%22
  startWithValue?: any;
  hasExpand?: boolean;
  disableClearable?: boolean;
  hasSelectAll?: boolean;
  pageSize?: number;
  paginate?: boolean;
}

export interface IFilterFormField {
  InputComponent?: any;
  inputProps: InputProps;
  childNodes?: IFilterFormField[];
  xs?: 3 | 6 | 9 | 12;
  md?: 3 | 6 | 9 | 12;
  lg?: 3 | 6 | 9 | 12;
  xl?: 3 | 6 | 9 | 12;
}

const useStyles = makeStyles({
  displayFilters: {
    display: 'none',
  },
});

const FilterField = ({
  inputProps,
  InputComponent,
  childNodes,
  ...props
}: IFilterFormField) => {
  const classes = useStyles();
  const { name, onChange, isShow, ...rest } = inputProps;
  const [field] = useField(name);
  const _handleChange = (e: ChangeEvent) => {
    field.onChange(e);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Grid item {...props} className={isShow ? classes.displayFilters : ''}>
      <InputComponent
        {...field}
        {...rest}
        childNodes={childNodes}
        onChange={_handleChange}
        style={{ width: '100%' }}
      />
    </Grid>
  );
};

FilterField.defaultProps = {
  inputProps: { name: '' },
  xs: 6,
  md: 6,
  lg: 6,
  xl: 3,
};

export default FilterField;
