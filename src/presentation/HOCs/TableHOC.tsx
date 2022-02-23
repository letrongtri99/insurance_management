/* eslint-disable react/destructuring-assignment */
import { TableCell } from '@material-ui/core';
import { getString } from 'presentation/theme/localization';
import React, { Fragment, useEffect, useState } from 'react';
import {
  IColumn,
  renewalColumns,
  newColumns,
  retainerColumns,
  overflowColumns,
} from './TableHOC.helper';
import { capitalizeFirstLetter } from '../../shared/helper/utilities';

interface ITableType {
  tableType: string;
}
interface IState {
  columns: IColumn[];
}

const table = (Component: React.ComponentType<any>, tableType: ITableType) => {
  const WrappedComponent: React.FC<any> = (props: ITableType) => {
    const [columns, setColumns] = useState<IColumn[]>([]);
    useEffect(() => {
      if (tableType.tableType === 'overflow') {
        setColumns(overflowColumns);
      }
      if (props.tableType === 'renewal') {
        setColumns(renewalColumns);
      }
      if (props.tableType === 'new') {
        setColumns(newColumns);
      }
      if (props.tableType === 'retainer') {
        setColumns(retainerColumns);
      }
    }, [props.tableType]);
    const renderColumns = () => {
      return columns.map((item: IColumn) => {
        if (tableType.tableType === 'overflow') {
          return (
            <Fragment key={item.title}>
              <TableCell>
                {getString(`text.${item.localisationKey}`, {
                  role: item.role,
                })}
              </TableCell>
            </Fragment>
          );
        }
        return (
          <Fragment key={item.title}>
            <TableCell className="table-cell">
              {capitalizeFirstLetter(getString(item.title))}
            </TableCell>
          </Fragment>
        );
      });
    };
    return <Component {...props} columns={renderColumns()} />;
  };
  return WrappedComponent;
};
export default table;
