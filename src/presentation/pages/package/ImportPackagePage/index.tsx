import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { Card, CardContent, Grid } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import './index.scss';
import { getPackageImport } from 'presentation/redux/actions/package';
import WithTableList from 'presentation/HOCs/WithTableList';
import CommonModal from 'presentation/components/modal/CommonModal';
import ImportPackages from 'presentation/modules/ImportPackages';
import { columns } from './importPackagePageHelper';

const ImportPackagePage: React.FC<any> = ({ children, top }) => {
  const [isImportPackage, setIsImportPackage] = useState(false);
  const [isImportRenewPackage, setIsImportRenewPackage] = useState(false);

  return (
    <div className="package-import-page">
      <Helmet title="Package - Import Page" />
      <Grid container>
        <Card>
          <CardContent>
            <Grid
              container
              item
              xs={12}
              lg={12}
              className="package-import-page__control-btn"
            >
              <Grid
                item
                style={{ paddingLeft: 56 }}
                className="control-btn-group"
                lg={8}
              >
                <Controls.Button
                  text={getString('text.importPackages')}
                  color="primary"
                  style={{ textTransform: 'uppercase' }}
                  onClick={() => {
                    setIsImportPackage(true);
                  }}
                />
                <Controls.Button
                  text={getString('text.importRenewPackages')}
                  color="primary"
                  style={{ textTransform: 'uppercase' }}
                  onClick={() => {
                    setIsImportRenewPackage(true);
                  }}
                />
              </Grid>
              <Grid container item justify="flex-end" lg={4}>
                {top}
              </Grid>
            </Grid>
            {children}
          </CardContent>
        </Card>
      </Grid>
      <CommonModal
        title={getString('text.importPackages')}
        open={isImportPackage}
        handleCloseModal={() => setIsImportPackage(false)}
      >
        <ImportPackages
          isStandardPackage={isImportPackage}
          close={setIsImportPackage}
        />
      </CommonModal>
      <CommonModal
        title={getString('text.importRenewPackages')}
        open={isImportRenewPackage}
        handleCloseModal={() => setIsImportRenewPackage(false)}
      >
        <ImportPackages close={setIsImportRenewPackage} />
      </CommonModal>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  modalConfig: state.uiInitReducer.modal,
  packageImportState: state.packageImportReducer,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getPackageImport,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithTableList(ImportPackagePage, 'package', columns));
