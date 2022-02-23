import React, { useState } from 'react';
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
  data?: any;
  columns?: any;
}

function AdminUserTable({ onClick }: any) {
  const handleClickEdit = (event: any) => {
    const data = event;
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
      {
        title: 'User',
        field: 'user',
        type: 'string',
        width: 20,
        align: 'center',
      },
      { title: 'Name', field: 'userName', type: 'string' },
      { title: 'Product', field: 'product', type: 'string' },
      { title: 'Team', field: 'team', type: 'string' },
      { title: 'User Role', field: 'userRole', type: 'string' },
      {
        title: 'Agent Score',
        field: 'agentScore',
        type: 'numeric',
        align: 'center',
      },
      { title: 'Status', field: 'status', type: 'string' },
      { title: 'Last Login On', field: 'lastLoginOn', type: 'date' },
      { title: 'Create by', field: 'createBy', type: 'string' },
      { title: 'Create on', field: 'createOn', type: 'date' },
    ],
  });

  return (
    <>
      <BasicTable
        table={newLead}
        updateDataHandler={setNewLead}
        tableOption={{ paging: true, showFirstLastPageButtons: false }}
      />
    </>
  );
}

export default AdminUserTable;
