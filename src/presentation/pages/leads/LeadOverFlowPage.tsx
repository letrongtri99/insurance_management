/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { getString } from 'presentation/theme/localization';
import OverflowLeadTableRow from 'presentation/components/leads/OverflowLeadTableRow';
import EditableTable from 'presentation/components/leads/EditableTable';
import table from 'presentation/HOCs/TableHOC';
import {
  getAllNewLead,
  getAllRetainerLead,
  editOverflowNewLead,
  editOverflowRetainerLead,
} from 'presentation/redux/actions/leadSetting/overflowSetting';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TableCell, TableRow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  IScoringTable,
  IScoringTableOverflow,
} from '../../models/lead/scoring';
import { destroyPage } from '../../redux/actions/page';

const LOADER_TABLE_ROW = 4;

const OverflowEditableTable = table(EditableTable, { tableType: 'overflow' });

interface IProps {
  newLead: any;
  retainerLead: any;
  getAllNewLead: () => void;
  getAllRetainerLead: () => void;
  editOverflowNewLead: (payload: any) => void;
  editOverflowRetainerLead: (payload: any) => void;
}

// eslint-disable-next-line no-shadow
const LeadOverFlowPage = ({
  getAllNewLead,
  getAllRetainerLead,
  editOverflowNewLead,
  editOverflowRetainerLead,
  newLead,
  retainerLead,
}: IProps) => {
  const dispatch = useDispatch();
  const [newLeadArr, setNewLeadArr] = useState<IScoringTableOverflow>([]);
  const [retainerLeadArr, setRetainerLeadArr] = useState<IScoringTableOverflow>(
    []
  );

  useEffect(() => {
    getAllNewLead();
    getAllRetainerLead();
    return () => {
      dispatch(destroyPage());
    };
  }, []);

  useEffect(() => {
    setNewLeadArr(newLead);
  }, [newLead]);

  useEffect(() => {
    setRetainerLeadArr(retainerLead);
  }, [retainerLead]);

  const handelSaveNewLeads = (data: any, name: string) => {
    const values = data.map((val: any) => val.value);
    const payload = { values, name };
    editOverflowNewLead(payload);
  };

  const handelSaveRetainerLeads = (data: any, name: string) => {
    const values = data.map((val: any) => val.value);
    const payload = { values, name };
    editOverflowRetainerLead(payload);
  };

  const renderLoaderTable = () => {
    let count = 0;
    const loaderTable = [];
    while (count < LOADER_TABLE_ROW) {
      loaderTable.push(
        <TableRow key={count}>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" />
          </TableCell>
        </TableRow>
      );
      count += 1;
    }
    return loaderTable;
  };

  const renderNewLeadTable = (props: IScoringTableOverflow) => {
    if (!props.length) {
      return renderLoaderTable();
    }
    return props.map((item: IScoringTable) => (
      <OverflowLeadTableRow
        key={item.id}
        data={item.data}
        type={item.type}
        loading={item.loading}
        edit={item.edit}
        handelSave={(data: any) => {
          handelSaveNewLeads(data.data, item.name);
        }}
      />
    ));
  };

  const renderRetainerLeadTable = (props: IScoringTableOverflow) => {
    if (!props.length) {
      return renderLoaderTable();
    }
    return props.map((item: IScoringTable) => (
      <OverflowLeadTableRow
        key={item.id}
        data={item.data}
        type={item.type}
        loading={item.loading}
        edit={item.edit}
        handelSave={(data: any) => {
          handelSaveRetainerLeads(data.data, item.name);
        }}
      />
    ));
  };
  return (
    <>
      <Helmet title="Leads - Overflow" />
      <OverflowEditableTable
        table={newLeadArr}
        tableTitle={getString('text.newLead')}
        tableRenderRows={renderNewLeadTable}
      />
      <OverflowEditableTable
        table={retainerLeadArr}
        tableTitle={getString('text.retainerLead')}
        tableRenderRows={renderRetainerLeadTable}
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  newLead: state.leadSettingReducer.leadOverFlowReducer.data.newLead,
  retainerLead: state.leadSettingReducer.leadOverFlowReducer.data.retainerLead,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getAllNewLead,
      getAllRetainerLead,
      editOverflowNewLead,
      editOverflowRetainerLead,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LeadOverFlowPage);
