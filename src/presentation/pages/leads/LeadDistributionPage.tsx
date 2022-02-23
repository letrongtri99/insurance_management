import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import LeadDistributionTable from 'presentation/components/leads/LeadDistributionTable';
import { getString } from 'presentation/theme/localization';
import { useDispatch } from 'react-redux';
import { destroyPage } from '../../redux/actions/page';

export enum TableTypeEnum {
  NEW_LEAD = 'new',
  RETAINER_LEAD = 'retainer',
}
export interface Column {
  id: 'agentLead' | 'lead1' | 'lead2' | 'lead3' | 'lead4' | 'total';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'agentLead', label: getString('text.agentLead'), minWidth: 100 },
  { id: 'lead1', label: getString('text.lead', { number: 1 }), minWidth: 100 },
  {
    id: 'lead2',
    label: getString('text.lead', { number: 2 }),
    minWidth: 100,
  },
  {
    id: 'lead3',
    label: getString('text.lead', { number: 3 }),
    minWidth: 100,
  },
  {
    id: 'lead4',
    label: getString('text.lead', { number: 4 }),
    minWidth: 100,
  },
];

const tablesConfig = [
  {
    id: 1,
    columns,
    tableName: getString('text.newLeads'),
    tableType: TableTypeEnum.NEW_LEAD,
  },
  {
    id: 2,
    columns,
    tableName: getString('text.retainerLeads'),
    tableType: TableTypeEnum.RETAINER_LEAD,
  },
];
const LeadDistribution = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(destroyPage());
    };
  }, []);
  return (
    <>
      <Helmet title="Lead distribution" />
      {tablesConfig.map((item) => {
        return (
          <LeadDistributionTable
            key={item.id}
            columns={item.columns}
            tableName={item.tableName}
            tableType={item.tableType}
          />
        );
      })}
    </>
  );
};

export default LeadDistribution;
