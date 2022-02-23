import { Box, Grid, makeStyles } from '@material-ui/core';
import { FastField, useFormikContext } from 'formik';
import Controls from 'presentation/components/controls/Control';
import { clearSliderValue } from 'presentation/components/controls/Slider/Slider.helper';
import { getString } from 'presentation/theme/localization';
import React, { ChangeEvent, useEffect } from 'react';
import { PackageSearchType } from 'shared/constants/packageSearchFields';

const PackageSearchControl = ({ input }: any) => {
  const {
    values,
    handleChange,
    setFieldTouched,
    setFieldValue,
    handleReset,
    isValid,
    validateForm,
    handleSubmit,
  } = useFormikContext<any>();

  const useStyles = makeStyles(() => ({
    gridRoot: {
      padding: '16px',
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    validateForm(values);
  }, [validateForm, values]);

  const SelectControl = (field: any) => {
    const { name, label, options, lookupFn, labelField, valueField } = field;
    return (
      <FastField name={name}>
        {() => (
          <Controls.Select
            name={name}
            placeholder={getString('text.select')}
            value={values[name]}
            onChange={handleChange}
            onClose={() => {
              setFieldTouched(name, true);
            }}
            options={options}
            fixedLabel
            label={label}
            lookupFn={lookupFn}
            title={labelField}
            selectField={valueField}
          />
        )}
      </FastField>
    );
  };

  const AutoCompleteControl = (field: any) => {
    const { name, label, options, lookupFn, labelField, valueField } = field;
    return (
      <FastField name={name}>
        {() => (
          <Controls.Autocomplete
            name={name}
            placeholder={getString('text.select')}
            value={values[name]}
            onChange={(event: ChangeEvent<any>, value: any) => {
              setFieldValue(event.target.name, value);
            }}
            label={label}
            options={options}
            fixedLabel
            lookupFn={lookupFn}
            labelField={labelField}
            valueField={valueField}
          />
        )}
      </FastField>
    );
  };

  const SliderControl = (field: any) => {
    const { name, label, min, max, step } = field;

    return (
      <FastField name={name}>
        {() => (
          <Controls.Slider
            name={name}
            label={label}
            min={min}
            max={max}
            value={values[name]}
            step={step}
            onChange={(fieldName: string, value: any) => {
              setFieldValue(fieldName, value);
            }}
            marks={false}
            isPlaceHolder
            fixedLabel
          />
        )}
      </FastField>
    );
  };

  const SearchField = (field: any) => {
    const { name, label } = field;
    return (
      <FastField name={name}>
        {() => (
          <Controls.Input
            name={name}
            label={label}
            value={values[name]}
            onChange={handleChange}
            multiple={false}
            fixedLabel
            placeholder={getString('text.select')}
            className="input-search-field"
          />
        )}
      </FastField>
    );
  };

  const renderActionButtons = () => {
    return (
      <Box display="flex" justifyContent="flex-end">
        <Controls.Button
          onClick={() => {
            handleReset();
            clearSliderValue.next(true);
          }}
          text={getString('text.clearAll')}
          variant="text"
          style={{
            textTransform: 'uppercase',
            marginLeft: 10,
            marginRight: 0,
          }}
          disabled={!isValid}
        />
        <Controls.Button
          color="primary"
          text={getString('text.search')}
          disabled={!isValid}
          onClick={() => {
            handleSubmit();
          }}
          style={{
            textTransform: 'uppercase',
            marginLeft: 10,
            marginRight: 0,
          }}
        />
      </Box>
    );
  };

  const renderInputs = (field: any) => {
    switch (field.type) {
      case PackageSearchType.SELECT:
        return SelectControl(field);
      case PackageSearchType.AUTO_COMPLETE:
        return AutoCompleteControl(field);
      case PackageSearchType.BUTTON:
        return renderActionButtons();
      case PackageSearchType.SLIDER:
        return SliderControl(field);
      case PackageSearchType.SEARCH_INPUT:
        return SearchField(field);
      default:
        return null;
    }
  };

  return (
    <>
      <Grid
        item
        xs={input.column.xs}
        sm={input.column.sm}
        md={input.column.md}
        xl={input.column.xl}
        classes={{ root: classes.gridRoot }}
      >
        {renderInputs(input)}
      </Grid>
    </>
  );
};

export default PackageSearchControl;
