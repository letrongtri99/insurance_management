import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { Card, CardContent, Grid } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { getCarDiscountImport } from 'presentation/redux/actions/carDiscount';
import WithTableList from 'presentation/HOCs/WithTableList';
import CommonModal from 'presentation/components/modal/CommonModal';
import ImportCarDiscountFile from 'presentation/modules/ImportCarDiscountFile';
import columns from './importCarDiscountHelper';
import './index.scss';

interface IProps {
  children: React.ReactNode;
  top: React.ReactNode;
}

const ImportCarDiscountPage: React.FC<IProps> = ({ children, top }) => {
  const [isImportCarDiscount, setIsImportCarDiscount] = useState(false);

  return (
    <div className="car-discount-import-page">
      <Helmet title="Car Discount - Import Page" />
      <Grid container>
        <Card>
          <CardContent>
            <Grid
              container
              item
              xs={12}
              lg={12}
              className="car-discount-import-page__control-btn"
            >
              <Grid item className="control-btn-group">
                <Controls.Button
                  text={getString('text.importFile')}
                  color="primary"
                  onClick={() => {
                    setIsImportCarDiscount(true);
                  }}
                />
              </Grid>
              <Grid container item justify="flex-end" lg={6}>
                {top}
              </Grid>
            </Grid>
            {children}
          </CardContent>
        </Card>
      </Grid>
      <CommonModal
        title={getString('text.importCarDiscountFile')}
        open={isImportCarDiscount}
        handleCloseModal={() => setIsImportCarDiscount(false)}
      >
        <ImportCarDiscountFile close={setIsImportCarDiscount} />
      </CommonModal>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getCarDiscountImport,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(WithTableList(ImportCarDiscountPage, 'carDiscount', columns));
