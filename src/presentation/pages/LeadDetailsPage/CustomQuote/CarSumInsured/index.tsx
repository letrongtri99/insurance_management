import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { carAndSumInsuredSchema } from 'shared/constants/packageFormFields';
import { getString } from 'presentation/theme/localization';
import CustomQuoteField from '../customQuoteField';
import { getTitle } from '../customQuote.helper';

const CarSumInsured: React.FC<any> = ({ style, carSubmodels, carAge }) => {
  // INFO: Set Car Submodels* Value when have data from Redux
  const { setFieldValue } = useFormikContext<any>();
  useEffect(() => {
    setFieldValue('car_submodels', carSubmodels);
  }, [carSubmodels, setFieldValue]);

  useEffect(() => {
    const carAgeValue = new Date().getFullYear() - carAge; // get related value of car age year from drop down
    setFieldValue('car_age', carAgeValue);
  }, [carAge, setFieldValue]);

  return (
    <Paper elevation={3} className="shared-insurer-info">
      <div className="package-section custom-quote-components">
        <div className="custom-quote-components--headerSection">
          <div
            className={clsx('custom-quote-page__name', style.titleBackground)}
          >
            <h5 className={clsx('custom-quote-page__name--text', style.title)}>
              {getString('package.carAndSumInsuredTitle')}
            </h5>
          </div>
        </div>
        <CustomQuoteField
          data={getTitle(carAndSumInsuredSchema)}
          style={style}
        />
      </div>
    </Paper>
  );
};

export default CarSumInsured;
