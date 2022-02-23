import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { useDispatch } from 'react-redux';
import TableSkeleton from 'presentation/components/TableAllLead/TableAllLeadComponent/TableSkeleton';
import {
  DEFAULT_PER_PAGE_TABLE,
  ITEM_PER_PAGE_LIST,
  Order,
  Column,
} from './helper';
import WithTableScrollHoc from '../../HOCs/WithTableScroll';
import { destroyPage } from '../../redux/actions/page';
import Pagination from '../controls/OldPagination';
import TableBlank from './TableBlank';
import TableData from './TableData';
import TableHeader from './TableHeader';
import { TableContainer } from '../table/TableStyledComponent';
import 'presentation/components/TableAllLead/TableAllLead.scss';

interface IProps {
  tableRefContainer: React.Ref<HTMLDivElement>;
  isDisableExpand?: boolean;
  columnSettings: Column[];
  orders: Order[];
  handleChangePageCurrent?: (newPageState: any) => void;
  isLoading?: boolean;
  totalItem?: number;
  pageState?: any;
}

const OrderListing: React.FC<IProps> = ({
  tableRefContainer,
  isDisableExpand,
  columnSettings,
  orders,
  handleChangePageCurrent = () => null,
  isLoading = false,
  totalItem = 0,
  pageState = null,
}) => {
  const dispatch = useDispatch();
  const tableRef = useRef<HTMLDivElement>(null);
  const [page] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PER_PAGE_TABLE);

  const handlePerPageChange = (itemsPerPage: number) => {
    setRowsPerPage(itemsPerPage);
    const newPageState = {
      ...pageState,
      pageSize: itemsPerPage,
      currentPage: 1,
    };

    handleChangePageCurrent(newPageState);
  };

  const handlePageChange = (pageId: number) => {
    const newPageState = {
      ...pageState,
      currentPage: pageId,
    };

    handleChangePageCurrent(newPageState);
  };

  useEffect(() => {
    return () => {
      dispatch(destroyPage());
    };
  }, [dispatch]);

  return (
    <Grid
      item
      xs={12}
      className="table-all-lead"
      ref={tableRef}
      data-testid="order-list-table"
    >
      <Card>
        <CardContent>
          <Grid item xs={12}>
            <TableContainer className="table-scrollbar" ref={tableRefContainer}>
              <Table stickyHeader aria-label="sticky table">
                <TableHeader
                  columnSettings={columnSettings}
                  isDisableExpand={isDisableExpand}
                />
                {isLoading ? (
                  <TableSkeleton
                    configTable={columnSettings}
                    pageState={pageState}
                    tableType="orders_list"
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                ) : (
                  <TableBody>
                    {orders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((order: Order) => (
                        <TableData
                          key={`row-${order.id}`}
                          columnsSettings={columnSettings}
                          order={order}
                          isDisableExpand={isDisableExpand}
                        />
                      ))}

                    {!orders.length && (
                      <TableBlank columnSettings={columnSettings} />
                    )}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12} md={6} />
            <Grid item xs={12} md={6} className="footer-pagination">
              <Pagination
                totalItem={totalItem}
                pageSize={rowsPerPage}
                page={pageState?.currentPage}
                changePage={handlePageChange}
                options={ITEM_PER_PAGE_LIST}
                addClass="custom-pagination"
                changePerPage={(event) =>
                  handlePerPageChange(Number(event.target.value))
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default WithTableScrollHoc(OrderListing);
