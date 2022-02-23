import React, { ChangeEvent } from 'react';
import { Grid } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { useFormikContext } from 'formik';
import { SelectElement } from 'shared/types/controls';

const FakeProvince = [
  { id: 1, value: 1, title: 'krabi' },
  { id: 2, value: 2, title: 'Somewhere' },
];

export default function CompanyForm(): JSX.Element {
  const {
    values: { company },
    handleChange,
  } = useFormikContext<any>();

  const handleProvinceChange = (event: ChangeEvent<SelectElement>) => {
    if (company.district) company.district = '';
    if (company.subDistrict) company.district = '';
    if (company.postCode) company.postCode = '';

    handleChange(event);
  };

  const handleDistrictChange = (event: ChangeEvent<SelectElement>) => {
    if (company.subDistrict) company.district = '';
    if (company.postCode) company.postCode = '';
    handleChange(event);
  };

  const handleSubDistrictChange = (event: ChangeEvent<SelectElement>) => {
    if (company.postCode) company.postCode = '';
    handleChange(event);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Controls.Input
          name="company.companyName"
          label={getString('text.companyName')}
          value={company.companyName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Controls.Input
          name="company.taxId"
          label={getString('text.taxId')}
          value={company.taxId}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Controls.Input
          name="company.address"
          label={getString('text.address')}
          value={company.address}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Controls.Select
          name="company.province"
          label={getString('text.province')}
          value={company.province}
          onChange={handleProvinceChange}
          options={FakeProvince}
          selectField="value"
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Controls.Select
          name="company.district"
          label={getString('text.district')}
          value={company.district}
          onChange={handleDistrictChange}
          options={FakeProvince}
          selectField="value"
          disabled={!company.province}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Controls.Select
          name="company.subDistrict"
          label={getString('text.subDistrict')}
          value={company.subDistrict}
          onChange={handleSubDistrictChange}
          options={FakeProvince}
          selectField="value"
          disabled={!company.district}
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <Controls.Select
          name="company.postCode"
          label={getString('text.postcode')}
          value={company.postCode}
          onChange={handleChange}
          options={FakeProvince}
          selectField="value"
          disabled={!company.subDistrict}
        />
      </Grid>
    </Grid>
  );
}
