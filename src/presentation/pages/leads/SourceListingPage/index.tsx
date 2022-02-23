import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Card, CardContent, Grid } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import CommonModal from 'presentation/components/modal/CommonModal';
import DataTable from 'presentation/components/DataTable';
import SourceModal from 'presentation/components/modal/SourceModal';
import { FakeRowsSource, FakeRowsSortSource } from 'mock-data/TableData.mock';
import { getString } from 'presentation/theme/localization';
import './index.scss';
import LeadsFilter from 'presentation/components/forms/leadsFilter/LeadsFilter';

interface Column {
  id:
    | 'type'
    | 'source'
    | 'medium'
    | 'campaign'
    | 'product'
    | 'leadCount'
    | 'score'
    | 'hide'
    | 'autoAssign'
    | 'createdBy'
    | 'createdOn'
    | 'updatedOn';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'source', label: 'Source', minWidth: 100 },
  {
    id: 'medium',
    label: 'Medium',
    minWidth: 100,
  },
  {
    id: 'campaign',
    label: 'Campaign',
    minWidth: 100,
  },
  {
    id: 'product',
    label: 'text.product',
    minWidth: 100,
  },
  { id: 'leadCount', label: 'text.leadCount', minWidth: 100 },
  { id: 'score', label: 'text.score', minWidth: 100 },
  { id: 'hide', label: 'text.hide', minWidth: 100 },
  { id: 'autoAssign', label: 'text.autoAssign', minWidth: 100 },
  { id: 'createdBy', label: 'text.createBy', minWidth: 100 },
  { id: 'createdOn', label: 'text.createOn', minWidth: 100 },
  { id: 'updatedOn', label: 'text.updatedOn', minWidth: 100 },
];

function SourceListingPage(): any {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState({});

  const createSource = (source?: any) => {
    if (source?.id || source?.source) {
      setSelectedValue(source);
    } else {
      setSelectedValue(source);
    }
    setIsOpen(true);
  };

  return (
    <>
      <Helmet title="Analytics Dashboard" />
      <Grid container spacing={6}>
        <Grid container item xs={12} lg={12}>
          <LeadsFilter />
        </Grid>
        <Grid container item xs={12} lg={12} className="source-listing-table">
          <Card>
            <CardContent>
              <Grid item xs={12} lg={12}>
                <Controls.Button
                  text={getString('text.createSource')}
                  color="primary"
                  onClick={() => createSource()}
                  style={{ textTransform: 'uppercase', marginLeft: 56 }}
                  className="button"
                />
                <CommonModal
                  title={getString('text.createSource')}
                  open={isOpen}
                  handleCloseModal={() => setIsOpen(false)}
                >
                  <SourceModal data={selectedValue} close={setIsOpen} />
                </CommonModal>
              </Grid>
              <Grid item xs={12} lg={12}>
                <DataTable
                  columns={columns}
                  originalData={FakeRowsSource}
                  sortData={FakeRowsSortSource}
                  openEditModal={(source: any) => createSource(source)}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
export default SourceListingPage;
