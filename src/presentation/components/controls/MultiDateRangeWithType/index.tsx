import { Grid } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import { SelectDateTypeLeadAll } from 'presentation/pages/leads/LeadDashBoard/LeadDashBoard.helper';
import { getString } from 'presentation/theme/localization';
import React, { useState } from 'react';
import DateRangeWithType from '../DateRangeWithType';
import './index.scss';

enum dateName {
  startDate = 'date.startDate',
  endDate = 'date.endDate',
}

const MultiDateRangeWithType = (props: any) => {
  const { onChange, name, value, options, hasExpand } = props;

  const [isAddDate, setIsAddDate] = useState(false);

  const handleClickAddDate = (event: boolean) => {
    setIsAddDate(event);
  };

  const localeSelectDateTypeLeadAll = SelectDateTypeLeadAll.map((type) => ({
    ...type,
    title: getString(type.title),
  }));

  return (
    <Grid container>
      <Grid
        container
        spacing={5}
        alignItems="flex-start"
        className="date-range-content"
      >
        <Grid
          container
          item
          xs={12}
          md={!hasExpand ? 6 : 8}
          className="date-range-container"
        >
          <Grid container item xs={12}>
            <DateRangeWithType
              fixedLabel
              name={name}
              selectName="date"
              value={{ ...value.startDate }}
              options={options || localeSelectDateTypeLeadAll}
              label={getString('text.selectDateType')}
              onChange={(fieldName: string, fieldValue: any) => {
                onChange(dateName.startDate, fieldValue);
              }}
            />
          </Grid>
          {isAddDate && (
            <Grid container item xs={12} style={{ marginTop: 40 }}>
              <DateRangeWithType
                fixedLabel
                name={name}
                selectName="date"
                value={{ ...value.endDate }}
                options={options || localeSelectDateTypeLeadAll}
                label={getString('text.selectDateType')}
                onChange={(fieldName: string, fieldValue: any) => {
                  onChange(dateName.endDate, fieldValue);
                }}
              />
            </Grid>
          )}
        </Grid>

        <Grid
          container
          item
          xs={!hasExpand ? 6 : 4}
          className="date-range-btn"
          style={{ paddingTop: 35, paddingBottom: 20 }}
        >
          {!isAddDate ? (
            <Grid container item xs={12}>
              <AddCircleOutlineIcon
                fontSize="small"
                className="share-btn add-btn"
                onClick={() => handleClickAddDate(true)}
              />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} md={6} xl={6}>
                <RemoveCircleOutlineRoundedIcon
                  fontSize="small"
                  className="share-btn remove-btn"
                  onClick={() => handleClickAddDate(false)}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MultiDateRangeWithType;
