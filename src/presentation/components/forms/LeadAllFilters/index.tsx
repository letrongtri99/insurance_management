import React, { useState, useEffect } from 'react';
import { FormControl, Grid, makeStyles } from '@material-ui/core';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import './index.scss';
import { connect } from 'react-redux';
import { getString } from 'presentation/theme/localization';
import { useForm } from '../../useForm';
import Controls from '../../controls/Control';
import FilterPanel from '../../FilterPanel/FilterPanel';

const useStyles = makeStyles({
  datepicker: {
    borderTop: '1px solid grey',
    borderLeft: '1px solid grey',
    borderBottom: '1px solid grey',
  },
});

function LeadAllFilters({ currencies, lang }: any): any {
  console.log('language lang', lang);

  const [datePickerState, setDatePickerState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);
  const [calOpen, setCalOpen] = useState(false);
  console.log('currencies', currencies);

  const handleSelectChange = (e: any) => {
    console.log(e.selection.startDate);
    console.log(e.selection.endDate);
    setDatePickerState([
      {
        startDate: e.selection.startDate,
        endDate: e.selection.endDate,
        key: 'selection',
      },
    ]);
  };

  const handleTimeChange = () => {
    setCalOpen(true);
  };

  useEffect(() => {
    const label = document.createElement('div');
    const text = document.createTextNode('Date Presets');
    label.setAttribute('class', 'preset-label');
    label.appendChild(text);
    const parentItem = document.querySelector('.rdrDefinedRangesWrapper');
    (parentItem as any).appendChild(label);

    // Calendar modification 1 day
    const last7Daysbutton = document.createElement('button');
    const last14Daysbutton = document.createElement('button');
    const last30Daysbutton = document.createElement('button');

    last7Daysbutton.setAttribute('class', 'rdrStaticRange');
    last7Daysbutton.setAttribute('type', 'button');

    last14Daysbutton.setAttribute('class', 'rdrStaticRange');
    last14Daysbutton.setAttribute('type', 'button');

    last30Daysbutton.setAttribute('class', 'rdrStaticRange');
    last30Daysbutton.setAttribute('type', 'button');

    const node7Days = document.createElement('span');
    const node14Days = document.createElement('span');
    const node30Days = document.createElement('span');

    const textnode7Days = document.createTextNode('Last 7 Days');
    const textnode14Days = document.createTextNode('Last 14 Days');
    const textnode30Days = document.createTextNode('Last 30 Days');

    node14Days.setAttribute('class', 'rdrStaticRangeLabel');
    node14Days.appendChild(textnode14Days);

    node7Days.setAttribute('class', 'rdrStaticRangeLabel');
    node7Days.appendChild(textnode7Days);

    node30Days.setAttribute('class', 'rdrStaticRangeLabel');
    node30Days.appendChild(textnode30Days);

    last7Daysbutton.appendChild(node7Days);
    last14Daysbutton.appendChild(node14Days);
    last30Daysbutton.appendChild(node30Days);

    // Click to element
    const clickEventFunc7Days = () => {
      // handleSelectChange(e);
      setDatePickerState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection',
        },
      ]);
    };

    // Click to element
    const clickEventFunc14Days = () => {
      // handleSelectChange(e);
      setDatePickerState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection',
        },
      ]);
    };

    // Click to element
    const clickEventFunc30Days = () => {
      // handleSelectChange(e);
      setDatePickerState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection',
        },
      ]);
    };
    last7Daysbutton.addEventListener('click', clickEventFunc7Days);
    last14Daysbutton.addEventListener('click', clickEventFunc14Days);
    last30Daysbutton.addEventListener('click', clickEventFunc30Days);
    const last7DaysbuttonSelector = document.querySelector('.rdrStaticRanges');
    (last7DaysbuttonSelector as any).appendChild(last7Daysbutton);
    const last14DaysbuttonSelector = document.querySelector('.rdrStaticRanges');
    (last14DaysbuttonSelector as any).appendChild(last14Daysbutton);
    const last30DaysbuttonSelector = document.querySelector('.rdrStaticRanges');
    (last30DaysbuttonSelector as any).appendChild(last30Daysbutton);
    const elementToHide = document.querySelector('.rdrInputRanges');
    (elementToHide as any).style.display = 'none';
    return () => {
      last7Daysbutton.removeEventListener('click', clickEventFunc7Days);
      last14Daysbutton.removeEventListener('click', clickEventFunc14Days);
      last30Daysbutton.removeEventListener('click', clickEventFunc30Days);
    };
  }, []);

  const initialFValues = {
    product: '',
    search: '',
    selectDataType: '',
    date: new Date().toDateString(),
    leadSource: '',
    leadStatus: 1,
    leadScore: '',
    sumInsured: 1,
    carBrand: '',
    leadType: '',
    assignedToUser: '',
    assignToTeam: '',
  };

  const productCollection = () => [
    { id: '1', title: 'Car Insurance' },
    { id: '2', title: 'Health Insurance' },
    { id: '3', title: 'Life Insurance' },
  ];

  const classes = useStyles();

  const { values, errors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    true
  );

  return (
    <div className="lead-all-filter">
      <FilterPanel rows={4} collapsedRows={1} rowHeight={75}>
        <Grid container spacing={6}>
          <Grid container item spacing={6} alignItems="center">
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="search"
                label="Select"
                value={values.search}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.departmentId}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="search"
                label="Select"
                value={values.search}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.departmentId}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Input
                name="search"
                label={getString('text.cancelButton')}
                value={values.search}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid container item xs={6} md={3}>
              <Controls.Button
                text={getString('text.cancelButton')}
                color="primary"
                onClick={resetForm}
              />
              <Controls.Button
                color="primary"
                text={getString('text.search')}
              />
            </Grid>
          </Grid>

          <Grid container item spacing={6}>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="selectDataType"
                label="Select"
                value={values.selectDataType}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.selectDataType}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Input
                name="date"
                label="Date"
                onFocus={handleTimeChange}
                value={values.date}
                onChange={handleTimeChange}
              />
            </Grid>
            <div
              className="form-date"
              style={{ display: !calOpen ? 'none' : '' }}
            >
              <FormControl
                margin="normal"
                required
                style={{ position: 'relative', zIndex: 1000 }}
              >
                <DateRangePicker
                  onChange={handleSelectChange}
                  showSelectionPreview
                  moveRangeOnFirstSelection={false}
                  editableDateInputs={false}
                  months={2}
                  ranges={datePickerState}
                  className={classes.datepicker}
                  direction="horizontal"
                />
              </FormControl>
            </div>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="selectDataType"
                label="Select"
                value={values.selectDataType}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.selectDataType}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="selectDataType"
                label="Select"
                value={values.selectDataType}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.selectDataType}
              />
            </Grid>
          </Grid>

          <Grid container item spacing={6}>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="leadSource"
                label="Select"
                value={values.leadSource}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.leadSource}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="leadStatus"
                label="Select"
                value={1}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.leadStatus}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="leadScore"
                label="Select"
                value={values.leadScore}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.leadScore}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="sumInsured"
                label="Select"
                value={1}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.sumInsured}
              />
            </Grid>
          </Grid>

          <Grid container item spacing={6}>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="carBrand"
                label="Select"
                value={values.carBrand}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.carBrand}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="leadType"
                label="Select"
                value={values.leadType}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.leadType}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="assignedToUser"
                label="Select"
                value={values.assignedToUser}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.assignedToUser}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controls.Select
                name="assignToTeam"
                label="Select"
                value={values.assignToTeam}
                onChange={handleInputChange}
                options={productCollection()}
                error={errors.assignToTeam}
              />
            </Grid>
          </Grid>
        </Grid>
      </FilterPanel>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  lang: state.languageReducer,
});

export default connect(mapStateToProps)(LeadAllFilters);
