import React, { useEffect, useState } from 'react';
import Controls from 'presentation/components/controls/Control';
import { Grid, Typography } from '@material-ui/core';
import { getString } from '../../../theme/localization';

import './SearchField.scss';

interface ISearchData {
  key: string;
  value: string;
}

interface Props {
  error?: any;
  name?: string;
  label?: string;
  value: ISearchData;
  placeholder?: string;
  fixedLabel?: boolean;
  errorMessage?: string;
  searchOption: Array<any>;
  inputPlaceholder?: string;
  onChange: (field: string, value: any, action?: string) => void;
}

const DEFAULT_INPUT_PLACEHOLDER = 'text.search';
const DEFAULT_SELECT_PLACEHOLDER = '';
const DEFAULT_SELECT_LABEL = 'text.search';

const SearchField: React.FC<Props> = ({
  value,
  error,
  onChange,
  searchOption,
  fixedLabel = false,
  name = DEFAULT_SELECT_LABEL,
  label = DEFAULT_SELECT_LABEL,
  placeholder = DEFAULT_SELECT_PLACEHOLDER,
  inputPlaceholder = DEFAULT_INPUT_PLACEHOLDER,
}) => {
  const [data, setData] = useState<ISearchData>({
    key: '',
    value: '',
  });

  const handleSelectChange = (e: React.ChangeEvent<any>) => {
    const { value: selectValue } = e.target;
    if (selectValue) {
      onChange('search', { ...data, key: selectValue });
    } else {
      onChange('search', { ...data, key: selectValue }, 'clear');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    onChange('search', { ...data, value: inputValue });
  };

  useEffect(() => {
    setData({ ...value });
  }, [value]);

  return (
    <Grid container item xs={12} className="search-field">
      <Grid item lg={6} className="display-flex-md">
        <Controls.Select
          className="search-field__select"
          name="selectValue"
          label={label}
          value={data.key}
          onChange={handleSelectChange}
          options={searchOption}
          selectField="value"
          fixedLabel
        />
      </Grid>
      <Grid item lg={6} className="display-flex-md">
        <Controls.Input
          className={`search-field__input ${
            error?.value ? 'search-field__input--error' : ''
          }`}
          name="inputValue"
          value={data.value}
          fixedLabel={fixedLabel}
          onChange={handleInputChange}
          placeholder={getString(inputPlaceholder)}
        />
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={6}>
          <Typography variant="caption" color="error">
            {error?.key || ''}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="error">
            {error?.value || ''}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchField;
