import React, { useEffect, useState } from 'react';
import LeadDetail from 'data/repository/leadDetail/cloud';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { capitalizeFirstLetter } from 'shared/helper/utilities';
import i18next from 'i18next';

const SubDistrictSelector = ({
  id,
  label,
  districtId,
  placeholder = '',
  value,
  ...rest
}: any) => {
  const [options, setOptions] = useState([]);
  const lang = capitalizeFirstLetter(i18next.language);

  const getSubDistrict = () => {
    if (!districtId) return;
    LeadDetail.getSubDistrict(districtId).subscribe((res: any) => {
      setOptions(res);
    });
  };

  useEffect(() => {
    getSubDistrict();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtId]);

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
        {options.map((subDistrict: any) => (
          <MenuItem key={subDistrict.name} value={subDistrict}>
            {subDistrict[`name${lang}`]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SubDistrictSelector;
