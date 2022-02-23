import React, { useMemo, useState } from 'react';
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  makeStyles,
} from '@material-ui/core';
import { convertDateTime } from 'shared/helper/convertDateTime';
import CustomPagination from 'presentation/components/controls/CustomPagination';
import clsx from 'clsx';
import {
  listToken,
  ITEM_PER_PAGE_LIST,
  INITIAL_ITEM_PER_PAGE,
  prevPageHandle,
  headerActivityData,
  FIRST_PAGE,
  LAST_PAGE,
} from './activityTable.helper';
import './index.scss';

export const useStylesCommunication = makeStyles((theme: any) => ({
  tHead: {
    background: theme.palette.info.main,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.h6.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  tRow: {
    '&:nth-child(even)': {
      background: '#e6edf6',
    },
    '&:nth-child(odd)': {
      background: theme.palette.common.white,
    },
  },
  status: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
    width: 'fit-content',
    minHeight: '20px',
    textTransform: 'none',
    display: 'block',
    borderRadius: '4px',
    padding: '2px 10px 2px 10px',
  },
  tableContainer: {
    position: 'relative',
    paddingBottom: '50px',
    // marginTop: '20px',
  },
  pagination: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const ActivityTable: React.FC<any> = ({ listData }) => {
  const [pageState, setPageState] = React.useState({
    currentPage: 1,
    pageToken: '1',
    pageSize: 10,
  });
  const [perPage, setPerPage] = useState<number>(INITIAL_ITEM_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState<any>(listData[0]);

  const classes = useStylesCommunication();

  const renderBodyRow = useMemo(() => {
    return dataTable.data.map((item: any) => {
      return (
        <TableRow
          className={clsx(`unittest-row-${item.sequenceNumber}`, classes.tRow)}
          key={item.sequenceNumber}
        >
          <TableCell>{item.sequenceNumber}</TableCell>
          <TableCell className="unittest-user-name" title={item.userName}>
            {item.userName}
          </TableCell>
          <TableCell title={convertDateTime(item.date)}>
            {convertDateTime(item.date)}
          </TableCell>
          <TableCell>
            <Paper
              className={clsx('unittest-status status', classes.status)}
              title={item.status}
            >
              {item.status}
            </Paper>
          </TableCell>
          <TableCell className="unittest-summary" title={item.summary}>
            {item.summary}
          </TableCell>
        </TableRow>
      );
    });
  }, [dataTable]);

  const renderHeaderRow = useMemo(() => {
    return headerActivityData.map((item: any) => (
      <TableCell key={item.id} className={classes.tHead}>
        {item.title}
      </TableCell>
    ));
  }, [headerActivityData]);

  const getDataForTable = (page: number) => {
    const findData = listData.find((item: any) => item.page === page);
    setDataTable(findData);
  };

  const handlePageChange = (
    page: number,
    tokenPage: string | null,
    isPrev?: boolean
  ) => {
    const newPageState = {
      ...pageState,
      currentPage: page,
    };
    if (isPrev) {
      const pageToken = prevPageHandle(listToken, page);
      if (pageToken) {
        newPageState.pageToken = pageToken.token;
      }
    }

    if (page === FIRST_PAGE) {
      newPageState.pageToken = '1';
    }

    // INFO: Hard code, waiting API
    if (page === LAST_PAGE) {
      newPageState.pageToken = '';
    }
    setPageState(newPageState);
    getDataForTable(page);
  };

  const handlePerPageChange = (itemsPerPage: number) => {
    setPerPage(itemsPerPage);
    const newPageState = {
      ...pageState,
      pageSize: itemsPerPage,
      pageToken: '2',
      currentPage: 1,
    };
    setPageState(newPageState);
  };

  return (
    <Grid item container xs={12} md={12} className="activity-table">
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>{renderHeaderRow}</TableHead>
          <TableBody>{renderBodyRow}</TableBody>
        </Table>
      </TableContainer>
      <div className={classes.pagination}>
        <CustomPagination
          page={pageState.currentPage as number}
          perPage={perPage}
          pageSizes={ITEM_PER_PAGE_LIST}
          nextToken={pageState.pageToken}
          onChangePage={handlePageChange}
          onChangePerPage={handlePerPageChange}
          isLoading={isLoading}
        />
      </div>
    </Grid>
  );
};

export default ActivityTable;
