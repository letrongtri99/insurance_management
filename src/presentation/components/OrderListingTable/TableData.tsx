import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  TableCell,
  TableRow,
  Collapse,
  Typography,
  IconButton,
} from '@material-ui/core';
import { common, grey } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import {
  Checkbox,
  StickyTableCell,
} from 'presentation/components/table/TableStyledComponent';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/styles';
import { Color } from 'presentation/theme/variants';
import { updateSelectedOrders } from 'presentation/redux/actions/orders/assignAgent';
import { Column, Order, Approval } from './helper';
import TextStatus, { ITextStatus } from './TextStatus';
import PolicyTable from './PolicyTable';
import FolderOpenIcon from '../svgicons/FolderOpenIcon';
import StarActiveIcon from '../svgicons/StarActiveIcon';
import StarIcon from '../svgicons/StarIcon';
import { getString } from '../../theme/localization';
import StatusTag from './StatusTag';

type IProps = {
  order: Order;
  columnsSettings: Column[];
  isDisableExpand: boolean | undefined;
};

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottomColor: 'transparent',
    },
  },
});

export const showArrow = (open: boolean) => {
  if (!open) return <KeyboardArrowRightIcon color="primary" />;
  return <KeyboardArrowDownIcon color="primary" />;
};

export const showStatusTag = (order: any) => {
  if (order?.warningLbl) {
    return <StatusTag text={order.warningLbl} />;
  }
  return '';
};

export const showCell = ({ order, column }: any) => {
  const value = order[column.id as keyof Order];
  if ((value as ITextStatus)?.status) {
    return (
      <TableCell style={{ maxWidth: 'fit-content' }} key={column.id}>
        <TextStatus
          status={(value as ITextStatus).status}
          label={(value as ITextStatus).label}
          type={(value as ITextStatus).type ?? 'circle'}
        />
      </TableCell>
    );
  }

  if (column.id === 'policyId') {
    return (
      <TableCell
        style={{ maxWidth: 'fit-content' }}
        key={column.id}
        align={column.align}
      >
        {value}
        <br />
        <Box component="span" color={Color.GREY_400}>
          {(order as unknown as Approval).createdOn}
        </Box>
      </TableCell>
    );
  }

  if (column.id === 'orderId') {
    return (
      <TableCell
        style={{
          maxWidth: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
        }}
        key={column.id}
        align={column.align}
      >
        {value}
        {showStatusTag(order)}
      </TableCell>
    );
  }

  return (
    <TableCell
      style={{ maxWidth: 'fit-content' }}
      key={column.id}
      align={column.align}
    >
      {value}
    </TableCell>
  );
};

const TableData = ({ order, columnsSettings, isDisableExpand }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const classes = useRowStyles();
  const dispatch = useDispatch();

  return (
    <>
      <TableRow className={classes.root} role="checkbox" hover>
        <StickyTableCell>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="space-around"
            alignItems="center"
            style={{ minWidth: '180px' }}
          >
            <Grid item>
              <Checkbox
                onChange={() => dispatch(updateSelectedOrders(order))}
              />
            </Grid>

            <Grid item alignItems="center">
              {order.isStar ? (
                <StarActiveIcon fontSize="large" />
              ) : (
                <StarIcon fontSize="large" />
              )}
            </Grid>
            {!isDisableExpand && (
              <Grid item>
                <Link to={`/order/${order.id}`} target="_blank" rel="noopener">
                  <FolderOpenIcon fontSize="large" />
                </Link>
              </Grid>
            )}
          </Grid>
        </StickyTableCell>

        {!isDisableExpand && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {showArrow(open)}
            </IconButton>
          </TableCell>
        )}

        {columnsSettings.map((column: Column) => showCell({ order, column }))}
      </TableRow>

      {!isDisableExpand && (
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              backgroundColor: common.white,
            }}
            colSpan={13}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={5} marginLeft={10} maxWidth={800}>
                <Box ml={3} color={grey[800]}>
                  <Typography variant="h3" color="textPrimary" gutterBottom>
                    {getString('text.policies')}
                  </Typography>
                </Box>
                <PolicyTable policies={order.products} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TableData;
