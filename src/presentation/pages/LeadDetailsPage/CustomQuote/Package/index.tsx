import React, { useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { getListInsurer } from 'presentation/redux/actions/leadDetail/insurer';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  mockPackageSchema,
  packageFields,
  packageSchema,
} from 'shared/constants/packageFormFields';
import { ISelectOptions } from 'shared/interfaces/common/lead/package';
import { getString } from 'presentation/theme/localization';
import {
  customSelectInsurersCompany,
  LIST_INSURERS_PAGE_SIZE,
  addSelectInsurersCompanyOptions,
  getTitle,
} from '../customQuote.helper';
import CustomQuoteField from '../customQuoteField';

const Package: React.FC<any> = ({ style }) => {
  const dispatch = useDispatch();
  const [insuranceCompany, setInsuranceCompany] = useState(false);
  const [packageSchemaState, setPackageSchemaState] = useState(
    getTitle(packageSchema())
  );

  const selectInsurersCompany = useSelector(
    (state: any) =>
      state?.leadsDetailReducer?.getListInsurerReducer?.data?.listInsurer ||
      null
  );

  useEffect(() => {
    if (selectInsurersCompany) {
      const customSelectInsurersCompanyArray: ISelectOptions[] =
        customSelectInsurersCompany(selectInsurersCompany);
      setPackageSchemaState(
        addSelectInsurersCompanyOptions(
          getTitle(packageSchema()),
          packageFields.insuranceCompanyId.name,
          customSelectInsurersCompanyArray
        )
      );
      setInsuranceCompany(true);
    } else {
      dispatch(getListInsurer(LIST_INSURERS_PAGE_SIZE));
      setInsuranceCompany(false);
    }
  }, [selectInsurersCompany, dispatch]);

  return (
    <Paper elevation={3} className="shared-insurer-info">
      <div className="package-section custom-quote-components">
        <div className="custom-quote-components--headerSection">
          <div
            className={clsx('custom-quote-page__name', style.titleBackground)}
          >
            <h5 className={clsx('custom-quote-page__name--text', style.title)}>
              {getString('package.packageTitle')}
            </h5>
          </div>
        </div>
        {insuranceCompany ? (
          <CustomQuoteField data={packageSchemaState} style={style} />
        ) : null}
        {!insuranceCompany ? (
          <CustomQuoteField data={mockPackageSchema} style={style} />
        ) : null}
      </div>
    </Paper>
  );
};

export default Package;
