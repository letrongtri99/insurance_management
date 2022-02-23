import React from 'react';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import { coverageSchema } from 'shared/constants/packageFormFields';
import { getString } from 'presentation/theme/localization';
import CustomQuoteField from '../customQuoteField';
import { getTitle } from '../customQuote.helper';

const Coverage: React.FC<any> = ({ style }) => {
  return (
    <Paper elevation={3} className="shared-insurer-info">
      <div className="package-section custom-quote-components">
        <div className="custom-quote-components--headerSection">
          <div
            className={clsx('custom-quote-page__name', style.titleBackground)}
          >
            <h5 className={clsx('custom-quote-page__name--text', style.title)}>
              {getString('package.coverageTitle')}
            </h5>
          </div>
        </div>
        {/* eslint-disable-next-line react/forbid-component-props */}
        <CustomQuoteField data={getTitle(coverageSchema())} style={style} />
      </div>
    </Paper>
  );
};

export default Coverage;
