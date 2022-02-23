import {
  withTheme,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState, FormEvent } from 'react';
import styled from 'styled-components';
import './CarLicenseField.scss';
import { FormikValues, useFormik } from 'formik';
import { object, string } from 'yup';
import { getString } from 'presentation/theme/localization';
import { getFieldTitle } from 'presentation/pages/LeadDetailsPage/leadDetailsPage.helper';
import Controls from '../controls/Control';

interface CarFieldProp {
  title: string;
  value: string;
  handleSaveLicense: (payload: string) => void;
  abbreviation: string;
}

const RED_LICENSE_PLATE = 'redplate';
const regExp = /^([\u0E00-\u0E7F0-9]*)$/;

const FieldWrapper = withTheme(styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: flex-start;

  &:nth-child(odd) {
    background: ${({ theme }) => theme.palette.info.light};
  }
`);

const FieldItem = withTheme(styled.span`
  &&& {
    width: 70%;
    display: flex;
    align-items: center;

    .shared-input {
      margin-left: 5px;
    }

    .MuiInputBase-input {
      height: 26px;
      border-radius: 6px;
      padding: 3px 16px;
    }

    .shared-button {
      margin-left: 3px;

      span {
        text-transform: uppercase;
      }
    }

    .MuiFormHelperText-root {
      display: none;
    }

    .Mui-disabled {
      border: none !important;
    }
  }
`);
const validationSchema = object().shape({
  freeText: string().required().min(2).max(3).matches(regExp),
  numericText: string().required().min(1).max(4),
});

const CarLicenseField = ({
  title,
  value,
  handleSaveLicense,
  abbreviation,
}: CarFieldProp) => {
  const [isRedPlate, setIsRedPlate] = useState('');
  const [initialFormData, setInitialFormData] = useState({
    freeText: '',
    numericText: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = (formVal: FormikValues) => {
    setIsDisabled(!isDisabled);
    if (!isDisabled) {
      const licensePlateInput = formVal.freeText
        .trim()
        .concat('-', formVal.numericText.trim(), ' ', abbreviation);
      handleSaveLicense(
        licensePlateInput === abbreviation ? '' : licensePlateInput
      );
    }
  };

  const formik = useFormik({
    initialValues: initialFormData,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
    validateOnMount: true,
  });

  const handleChangeRedPlate = (
    event: React.ChangeEvent<HTMLInputElement>,
    val: string
  ) => {
    handleSaveLicense(val === 'yes' ? 'redplate' : '');
    setIsRedPlate(val);
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    formik.setFieldTouched(field);
    formik.setFieldValue(field, event.target.value);
  };

  useEffect(() => {
    if (value && value !== RED_LICENSE_PLATE) {
      const license = value.replace(abbreviation, '');
      setInitialFormData({
        freeText: license.trim().split('-')[0],
        numericText: license.trim().split('-')[1],
      });
    } else {
      setInitialFormData({
        freeText: '',
        numericText: '',
      });
    }
  }, [value, abbreviation]);

  useEffect(() => {
    switch (value) {
      case RED_LICENSE_PLATE:
        setIsRedPlate('yes');
        break;
      default:
        setIsRedPlate('no');
    }
  }, [value]);

  useEffect(() => {
    setIsDisabled(
      initialFormData?.freeText?.length > 0 &&
        initialFormData?.numericText?.length > 0
    );
  }, [initialFormData]);

  return (
    <>
      <FieldWrapper>
        <FieldItem>{getFieldTitle('Red plate')}</FieldItem>
        <FieldItem>
          <RadioGroup
            className="unit-test-radio-group radio-group"
            aria-label="redPlate"
            value={isRedPlate}
            name="redPlate"
            onChange={handleChangeRedPlate}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs className="license-red-plate__row">
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  className="unit-test-red-plate"
                  label="Yes"
                />
              </Grid>
              <Grid item xs className="license-red-plate__row">
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  className="unit-test-non-red-plate"
                  label="No"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FieldItem>
      </FieldWrapper>
      <FieldWrapper>
        <FieldItem>{getFieldTitle(title)}</FieldItem>
        <FieldItem>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs>
              <Controls.Input
                value={formik.values.freeText}
                id="unittest-input-license-free-text"
                name="freeText"
                className="license-red-plate__free-text"
                disabled={isRedPlate === 'yes' || isDisabled}
                error={formik.touched.freeText && formik.errors.freeText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleInput(event, 'freeText');
                }}
              />
            </Grid>
            <Grid item style={{ margin: '0 1px' }}>
              -
            </Grid>
            <Grid item xs>
              <Controls.Input
                value={parseInt(formik.values.numericText, 0) || ''}
                id="unittest-input-license-numeric-text"
                name="numericText"
                disabled={isRedPlate === 'yes' || isDisabled}
                error={formik.touched.numericText && formik.errors.numericText}
                className="license-red-plate__numeric-text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleInput(event, 'numericText');
                }}
              />
            </Grid>
            <div
              className={`license-red-plate__abbreviation ${
                isRedPlate === 'yes'
                  ? 'license-red-plate__abbreviation-disabled'
                  : ''
              }`}
            >
              <span>{abbreviation}</span>
            </div>
            <Grid item xs>
              <div className="share-save-button">
                <Controls.Button
                  color="primary"
                  size="small"
                  onClick={() => onSubmit(formik.values)}
                  disabled={!formik.isValid || isRedPlate === 'yes'}
                  className="unittest-button-license save-button"
                  style={{ minHeight: 0, padding: 5, margin: 0 }}
                >
                  {isDisabled ? 'Edit' : 'Save'}
                </Controls.Button>
              </div>
            </Grid>
          </Grid>
        </FieldItem>
      </FieldWrapper>
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ backgroundColor: '#e7eef7' }}
      >
        <span className="license-red-plate__error">
          {(formik.touched.freeText && formik.errors.freeText) ||
          (formik.touched.numericText && formik.errors.numericText)
            ? getString('errors.invalidLicense')
            : ''}
        </span>
      </Grid>
    </>
  );
};
export default CarLicenseField;
