import React, { useState } from 'react';
import { NewLeadMock } from '../../../shared/helper/LeadScoring.mock';
import BasicTable from '../../components/table/BasicTable';
import EditIcon from '../../components/svgicons/EditIcon';

interface Scoring {
  teamName: string;
  product: string;
  userCount: number;
  leadType: string;
  manager: string;
  supervisor: string;
  createdBy: string;
  createdOn: Date;
  updatedOn: Date;
}
interface TableState {
  title: string;
  type: string;
  data: Scoring[];
  columns?: any;
}

function AdminTeamTable({ onClick }: any) {
  const handleClickEdit = (event: any) => {
    const data = event;
    console.log(event);
    data.isEdit = true;
    onClick(data);
  };
  const [newLead, setNewLead] = useState<TableState>({
    title: '',
    type: '',
    columns: [
      {
        title: '',
        /* eslint-disable jsx-a11y/click-events-have-key-events */
        render: (e: any) => (
          <span
            className="handle-edit"
            role="button"
            tabIndex={e}
            onClick={() => handleClickEdit(e)}
          >
            {' '}
            <EditIcon fontSize="large" />
          </span>
        ),
      },
      { title: 'text.teamName', field: 'teamName', type: 'string' },
      { title: 'Product', field: 'product', type: 'string' },
      { title: 'User Count', field: 'userCount', type: 'numeric' },
      { title: 'Lead Type', field: 'leadType', type: 'numeric' },
      { title: 'Manager', field: 'manager', type: 'numeric' },
      { title: 'Supervisor', field: 'supervisor', type: 'string' },
      { title: 'Created By', field: 'createdBy', type: 'string' },
      { title: 'Created On', field: 'createdOn', type: 'date' },
      { title: 'Updated On', field: 'updatedOn', type: 'date' },
    ],
    data: NewLeadMock,
  });

  return (
    <>
      <BasicTable table={newLead} updateDataHandler={setNewLead} />
    </>
  );
}

export default AdminTeamTable;
