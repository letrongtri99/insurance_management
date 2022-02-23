import React from 'react';
import {
  Box,
  createStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  withStyles,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  Column,
  Product,
  productColumnSettings,
  summaryOrderColumnSettings,
} from './helper';
import TextStatus, { ITextStatus } from './TextStatus';
import { getString } from '../../theme/localization';
import typography from '../../theme/typography';
import StatusTag from './StatusTag';

type IProp = {
  policies: Product[];
};

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightBold,
    },
  })
)(TableCell);

const useTableCellStyles = makeStyles({
  noneBorderBottom: {
    borderBottom: 'none',
  },
});

const PolicyTable = ({ policies }: IProp) => {
  const classes = useTableCellStyles();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {productColumnSettings.map((productColumnSetting: Column) => (
            <StyledTableCell
              key={productColumnSetting.id}
              align={productColumnSetting.align}
            >
              {getString(productColumnSetting.label)}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {policies?.map((product: Product) => (
          <TableRow key={product.policyRef} hover>
            {productColumnSettings.map((column: Column) => {
              const value = product[column.id as keyof Product];

              if ((value as ITextStatus)?.status) {
                return (
                  <StyledTableCell key={column.id}>
                    <TextStatus
                      status={(value as ITextStatus).status}
                      label={(value as ITextStatus).label}
                      type={(value as ITextStatus).type ?? 'circle'}
                    />
                  </StyledTableCell>
                );
              }

              if (column.id === 'policyRef') {
                return (
                  <TableCell key={column.id} align={column.align}>
                    {value}
                    {product?.warningLbl && (
                      <StatusTag text={product.warningLbl} />
                    )}
                  </TableCell>
                );
              }

              return (
                <TableCell key={column.id} align={column.align}>
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        <TableRow>
          <TableCell
            padding="none"
            className={classes.noneBorderBottom}
            colSpan={3}
          >
            &nbsp;
          </TableCell>
          <TableCell align="right" className={classes.noneBorderBottom}>
            {summaryOrderColumnSettings.map(({ id, label }: Column) => (
              <Box
                key={`sum-label-${id}`}
                mb={2}
                color={id === 'total' ? 'text.primary' : 'text.secondary'}
              >
                {`${getString(label)}:`}
              </Box>
            ))}
          </TableCell>
          <TableCell align="right" className={classes.noneBorderBottom}>
            {summaryOrderColumnSettings.map(({ id, value }: Column) => (
              <Box
                key={`sum-value-${id}`}
                mb={2}
                style={{
                  fontWeight:
                    id === 'total'
                      ? typography.fontWeightMedium
                      : typography.fontWeightRegular,
                }}
              >
                {value}
              </Box>
            ))}
          </TableCell>
          <TableCell colSpan={5} className={classes.noneBorderBottom}>
            &nbsp;
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PolicyTable;
