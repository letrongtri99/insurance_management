import React, { useState, useEffect } from 'react';
import './index.scss';
import Helmet from 'react-helmet';
import { Card, CardContent, Grid } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import CommonModal from 'presentation/components/modal/CommonModal';
import AddLead from 'presentation/modules/addLead';
import ImportNewLead from 'presentation/modules/importLead/ImportNewLead';
import AddLeadSuccess from 'presentation/modules/addLeadSuccess';
import { getString } from 'presentation/theme/localization';
import typeCsvColumns from 'shared/constants/csvColumns';
import { useSelector, connect, useDispatch } from 'react-redux';

import { bindActionCreators } from 'redux';
import { getImportLead } from 'presentation/redux/actions/leads/import';
import WithTableList from 'presentation/HOCs/WithTableList';
import { initialPageState } from 'presentation/HOCs/WithTableListHelper';
import isCanCreateLead, { canDownload } from './ImportLeadPageHelper';
import { destroyPage } from '../../../redux/actions/page';
import DownloadIcon from '../../../components/svgicons/DownloadIcon';

interface Column {
  id:
    | 'sequenceNumber'
    | 'createBy'
    | 'createTime'
    | 'displayProduct'
    | 'leadRecord'
    | 'source'
    | 'status'
    | 'download';
  label: string;
  field?: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
  sorting?: 'none' | 'asc' | 'desc';
  disabled?: boolean;
  customField?: boolean;
  icon?: JSX.Element;
  clickable?: boolean;
}

const columns: Column[] = [
  {
    id: 'sequenceNumber',
    label: getString('text.sequence'),
    field: 'sequenceNumber',
    minWidth: 100,
    sorting: 'asc',
  },
  {
    id: 'createBy',
    label: getString('text.importedBy'),
    field: 'createBy',
    minWidth: 100,
    sorting: 'none',
    disabled: true,
  },
  {
    id: 'createTime',
    label: getString('text.importedOn'),
    field: 'createTime',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'displayProduct',
    label: getString('text.product'),
    field: 'product',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'leadRecord',
    label: getString('text.leadRecord'),
    field: 'imported',
    minWidth: 100,
    sorting: 'none',
  },
  {
    id: 'source',
    label: getString('text.source'),
    field: 'source',
    minWidth: 100,
    sorting: 'none',
    disabled: true,
  },
  {
    id: 'status',
    label: getString('text.status'),
    field: 'status',
    minWidth: 100,
    sorting: 'none',
    disabled: true,
  },
  {
    id: 'download',
    label: '',
    minWidth: 100,
    sorting: 'none',
    customField: true,
    disabled: true,
    icon: <DownloadIcon fontSize="large" style={{ cursor: 'pointer' }} />,
    clickable: true,
  },
];

const ImportLeadPage: React.FC<any> = ({ children }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isImportOpen, setisImportOpen] = useState(false);
  const [isAddLeadSuccess, setIsAddLeadSuccess] = useState(false);
  const [leadId, setLeadId] = useState('');
  const isNotOpen = true;
  const createLead = () => {
    setIsOpen(true);
  };

  const { user } = useSelector((state: any) => state.authReducer?.data);

  const csvColumns = [[...typeCsvColumns]];

  const downloadTemplate = () => {
    const link = document.createElement('a');
    link.setAttribute('download', 'template.csv');
    link.setAttribute('href', `data:text/plain;charset=utf-8,${csvColumns}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const callBackAddLead = (id: string) => {
    setIsAddLeadSuccess(true);
    setLeadId(id);
  };

  const importLead = () => {
    setisImportOpen(true);
  };

  useEffect(() => {
    return () => {
      dispatch(destroyPage());
    };
  }, []);

  return (
    <>
      <Helmet title="Leads - Import" />
      <Grid container spacing={6} className="lead-import">
        <Card>
          <CardContent>
            <Grid
              direction="row"
              container
              item
              xs={12}
              lg={12}
              style={{ marginLeft: 40 }}
            >
              {isCanCreateLead(user?.role) ? (
                <>
                  <Controls.Button
                    text={getString('text.addLead')}
                    color="primary"
                    onClick={createLead}
                  />
                  <CommonModal
                    title={getString('text.addLead')}
                    open={isOpen}
                    handleCloseModal={() => setIsOpen(false)}
                  >
                    <AddLead
                      close={setIsOpen}
                      callBackAddLead={(id: string) => callBackAddLead(id)}
                    />
                  </CommonModal>
                </>
              ) : null}

              <CommonModal
                title=""
                isNotHeader={isNotOpen}
                open={isAddLeadSuccess}
                handleCloseModal={() => setIsAddLeadSuccess(false)}
              >
                <AddLeadSuccess leadId={leadId} />
              </CommonModal>

              <Controls.Button
                text={getString('text.importLead')}
                color="primary"
                onClick={importLead}
              />
              <Controls.Button
                text={getString('text.template')}
                color="primary"
                onClick={downloadTemplate}
              />

              <CommonModal
                title={getString('text.importLead')}
                open={isImportOpen}
                handleCloseModal={() => setisImportOpen(false)}
              >
                <ImportNewLead close={setisImportOpen} />
              </CommonModal>
            </Grid>
            {children}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  modalConfig: state.uiInitReducer.modal,
  canDownload: canDownload(state.authReducer?.data.user?.role),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getImportLead,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  WithTableList(ImportLeadPage, 'leads', columns, {
    ...initialPageState,
  })
);
