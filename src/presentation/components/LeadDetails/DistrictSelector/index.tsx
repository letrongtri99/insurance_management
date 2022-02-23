import React, { useEffect, useState } from 'react';
import LeadDetail from 'data/repository/leadDetail/cloud';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import i18next from 'i18next';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { capitalizeFirstLetter } from 'shared/helper/utilities';

const DistrictSelector = ({
  id,
  label,
  provinceId,
  placeholder = '',
  value,
  ...rest
}: any) => {
  const [options, setOptions] = useState([]);
  const lang = capitalizeFirstLetter(i18next.language);

  const getDistricts = () => {
    if (!provinceId) return;
    LeadDetail.getDistrict(provinceId).subscribe((res: any) => {
      setOptions(res);
    });
  };

  useEffect(() => {
    getDistricts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId]);

  return (
    <FormControl>
      <InputLabel id={`${id}-label`} shrink>
        {label}
      </InputLabel>
      <Select
        value={value}
        labelId={`${id}-label`}
        displayEmpty
        style={{ color: value ? '' : 'rgba(0, 0, 0, 0.54)' }}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }}
        disableUnderline
        IconComponent={KeyboardArrowDownIcon}
        {...rest}
      >
        {placeholder ? (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        ) : null}
        {options.map((district: any) => (
          <MenuItem key={district.name} value={district}>
            {district[`name${lang}`]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DistrictSelector;
