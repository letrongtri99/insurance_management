import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import './index.scss';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Color } from 'presentation/theme/variants';
import styled, { StyledComponent } from 'styled-components';
import { createCustomQuote } from 'presentation/redux/actions/leadDetail/customQuote';
import { getLead } from 'presentation/redux/actions/leadDetail/getLeadByName';
import LeadDetail from 'data/repository/leadDetail/cloud';

import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getString } from 'presentation/theme/localization';
import {
  validationSchema,
  initialCustomQuoteFormData,
  getCarSubModel,
  prepareCreateCustomQuoteData,
  getCarAgeAndSubModel,
  validate,
} from './customQuote.helper';

import Coverage from './Coverage';
import CarSumInsured from './CarSumInsured';
import Package from './Package';

const useStyles = makeStyles((theme) => ({
  button: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderRadius: '7px',
    padding: '10px 40px',
    [theme.breakpoints.up('lg')]: {
      fontSize: '11px',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '14px',
    },
    '&:hover': {
      backgroundColor: Color.BLUE_DARK,
      color: theme.palette.common.white,
    },
  },
  formBackground: {
    background: Color.WHITE,
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.h6.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  titleBackground: {
    background: theme.palette.info.main,
  },
  inputRow: {
    '&:nth-child(2n - 1)': {
      background: Color.BLUE_WHITE,
      '& .MuiInputBase-root': {
        background: Color.WHITE,
        borderRadius: '10px',
      },
    },
    '& .custom-quote-page__field--item': {
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}));
const Wrapper: StyledComponent<any, any> = styled.div`
  height: 100%;
`;

const CustomQuotePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();

  const [carSubModel, setCarSubModel] = useState<number>(0);
  const [carSubModelName, setCarSubModelName] = useState<string>('');
  const [carYear, setCarYear] = useState<number>(0);

  const leadData = useSelector(
    (state: any) => state?.leadsDetailReducer?.lead?.payload?.data
  );
  const destroy$ = new Subject();

  useEffect(() => {
    if (leadData) {
      if (carSubModel === 0 && carYear === 0) {
        // api wont be called if carSubModel or carYear already exist
        LeadDetail.getCarBySubModelYear(leadData.carSubModelYear)
          .pipe(
            takeUntil(destroy$),
            mergeMap((res: any) => {
              return getCarAgeAndSubModel(res);
            })
          )
          .subscribe((res: any) => {
            const [carSubModelData, carYearData] = res;
            setCarSubModel(getCarSubModel(carSubModelData));
            setCarSubModelName(carSubModelData.displayName);
            setCarYear(carYearData.year);
          });
      }
    } else {
      dispatch(getLead());
    }
    return () => {
      destroy$.next(true);
    };
  }, [destroy$, dispatch, leadData, carSubModel, carYear]);

  const onSubmit = (formVal: FormikValues) => {
    dispatch(
      createCustomQuote({
        lead: id,
        package: prepareCreateCustomQuoteData(formVal, carSubModel),
      })
    );
  };

  return (
    <Wrapper className={clsx('custom-quote-page', classes.formBackground)}>
      <Formik
        initialValues={initialCustomQuoteFormData}
        validationSchema={validationSchema}
        isInitialValid={false}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(formik: FormikProps<any>) => {
          return (
            <Form>
              <Grid container direction="row" justify="center">
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  className="custom-quote-page__action"
                >
                  <Button
                    size="medium"
                    className="custom-quote-page--backbtn"
                    onClick={() => history.goBack()}
                  >
                    <ArrowBackIosIcon />
                    <b>{getString('package.backButton')}</b>
                  </Button>
                  <Button
                    className={classes.button}
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    {getString('package.saveAndSendPackageButton')}
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                spacing={5}
                className="custom-quote-page__form"
              >
                <Grid item xs={12} md={4} lg={4}>
                  <Package style={classes} />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <CarSumInsured
                    style={classes}
                    carSubmodels={carSubModelName}
                    carAge={carYear}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Coverage style={classes} />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default CustomQuotePage;
