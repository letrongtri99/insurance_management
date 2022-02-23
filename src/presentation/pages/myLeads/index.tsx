import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import './index.scss';
import { bindActionCreators } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getMyLeads } from 'presentation/redux/actions/myLeads';
import { DataTableMyLead } from 'presentation/components/DataTableMyLead';
import { mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  changeSortStatus,
  Column,
  columns,
  getMyLeadsApi,
  getTeamId,
  INITIAL_ITEM_PER_PAGE,
  initialPageState,
  IRowMyLead,
  SORT_TABLE_TYPE,
  TypeShowImportantStar,
  TypeStar,
} from './myLeadsHelper';
import MyLeadsFilter from './MyLeadsFilter';
import AdminUserCloud from '../../../data/repository/admin/user/cloud';
import ClientPagination from '../../components/controls/ClientPagination';
import MyLeadButton from './MyLeadButton';
import LeadDetailRepository from '../../../data/repository/leadDetail';
import { showSnackBar } from '../../redux/actions/ui';
import { UserRoles } from '../../../config/constant';
import { ITEM_PER_PAGE_LIST } from '../../HOCs/WithTableListHelper';
import { getString } from '../../theme/localization';

type TBulkImportBody = {
  ids: string[];
  important: boolean;
};
export const MyLeads: React.FC<any> = () => {
  const [pageState, setPageState] = useState(initialPageState);
  const [perPage, setPerPage] = useState<number>(INITIAL_ITEM_PER_PAGE);
  const [isDisabledBtn, setIsDisabledBtn] = useState({
    addStar: true,
    removeStar: true,
  });
  const [listItemChecked, setListItemChecked] = useState<IRowMyLead[]>([]);
  const [originalData, setOriginalData] = useState<IRowMyLead[]>([]);
  const [isShowStarBtn, setIsShowStarBtn] = useState(true);
  const [columnsSetting, setColumnSetting] = useState(columns);
  const [isLoading, setIsLoading] = useState(false);
  const [myLeadsData, setMyLeadData] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [productType, setProductType] = useState('');
  const importantRef = useRef<{ important: any[]; unimportant: any[] }>({
    important: [],
    unimportant: [],
  });
  const searchStateRef = useRef({});
  const dispatch = useDispatch();
  const user = useSelector(
    (state: any) => state?.authReducer?.data?.user || {}
  );

  const handleDisableBtn = (item: IRowMyLead) => {
    if (item.isChecked) {
      setListItemChecked((oldList: IRowMyLead[]) => [...oldList, item]);
    } else {
      const newList = listItemChecked.filter(
        (element: IRowMyLead) => element.id !== item.id
      );
      setListItemChecked(newList);
    }
  };

  const handleDisableBtnSelectedAll = (list: IRowMyLead[]) => {
    setListItemChecked(list);
  };

  const callApiHandle = (product = productType, state = pageState) => {
    setIsLoading(true);
    return getMyLeadsApi(product, {
      ...state,
      ...searchStateRef.current,
      assignedTo: user.name,
    }).pipe(
      tap((res: any) => {
        setIsLoading(false);
        setMyLeadData(res.data);
        setTotalItem(res.totalItem);
        setIsDisabledBtn({
          addStar: true,
          removeStar: true,
        });
      })
    );
  };

  const handlePageChange = (page: number) => {
    const newPageState = {
      ...pageState,
      currentPage: page,
    };
    callApiHandle(productType, newPageState).subscribe();
    setPageState(newPageState);
  };

  const handlePerPageChange = (itemsPerPage: number) => {
    setPerPage(itemsPerPage);
    const newPageState = {
      ...pageState,
      pageSize: itemsPerPage,
      pageToken: '',
      currentPage: 1,
    };
    callApiHandle(productType, newPageState).subscribe();
    setPageState(newPageState);
  };

  const callApiUpdateImportant = (body: TBulkImportBody) => {
    const leadDetailRepository = new LeadDetailRepository();
    leadDetailRepository.leadBulkImportant(body).subscribe(
      () => {
        dispatch(
          showSnackBar({
            isOpen: true,
            message:
              getString(
                body.important
                  ? 'text.bulkImportantSuccess'
                  : 'text.bulkUnimportantSuccess'
              ) || '',
            status: 'success',
          })
        );
        setTimeout(() => {
          callApiHandle(productType).subscribe();
        }, 300);
      },
      (err: any) => {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: err.message || '',
            status: 'error',
            isNotClose: true,
          })
        );
      }
    );
  };

  const handleStarImportant = (type: TypeStar) => {
    const important = type === TypeStar.ADD;
    const body = {
      important,
      ids: important
        ? importantRef.current.unimportant
        : importantRef.current.important,
    };
    callApiUpdateImportant(body);
  };

  const showImportantLead = (action: TypeShowImportantStar) => {
    const newPageState: any = {
      ...pageState,
    };
    if (action === TypeShowImportantStar.STAR) {
      newPageState.searchStar = true;
      setIsShowStarBtn(false);
    } else {
      newPageState.searchStar = false;
      setIsShowStarBtn(true);
    }
    callApiHandle(productType, newPageState).subscribe();
    setPageState(newPageState);
  };

  const handleRowImportant = (itemId: number, value: boolean) => {
    const newData = originalData.map((row: IRowMyLead) => {
      const newItem = { ...row };
      if (newItem.id === itemId) {
        newItem.important = value;
        return newItem;
      }
      return newItem;
    });

    setOriginalData(newData);
    setListItemChecked([]);
  };

  const getOrderByField = ({ sorting, field }: any) => {
    if (sorting === SORT_TABLE_TYPE.NONE) return '';
    if (sorting === SORT_TABLE_TYPE.ASC) return `&order_by=${field}`;
    return `&order_by=${field} desc`;
  };

  const findSortColumn = (newColumns: Column[], columnId: string) => {
    const findColumnSort = newColumns.find((item) => item.field === columnId);
    const orderQuery = getOrderByField({
      sorting: findColumnSort?.sorting,
      field: findColumnSort?.sortingField,
    });
    const newPageState: any = {
      ...pageState,
      currentPage: 1,
      pageToken: '',
      orderBy: orderQuery,
    };
    if (!findColumnSort?.sortingField) {
      delete newPageState.orderBy;
    }
    callApiHandle(productType, newPageState).subscribe();
    setPageState(newPageState);
  };

  const sortColumnHandle = (columnId: string) => {
    let newColumns = [...columnsSetting];
    newColumns = newColumns.map((item) => {
      return {
        ...item,
        sorting:
          item.id === columnId
            ? changeSortStatus(item.sorting as SORT_TABLE_TYPE)
            : SORT_TABLE_TYPE.NONE,
      };
    });
    findSortColumn(newColumns, columnId);
    setColumnSetting(newColumns);
  };

  const updateSingleImportant = (body: TBulkImportBody) => {
    callApiUpdateImportant(body);
  };

  useEffect(() => {
    if (user && user.role === UserRoles.SALE_ROLE) {
      setIsLoading(true);
      const teamFilter = encodeURI(`filter=user="${user.name}"`);
      AdminUserCloud.getTeamByUser(teamFilter)
        .pipe(
          mergeMap((res) => {
            const teamId = getTeamId(res);
            if (teamId) {
              return AdminUserCloud.getTeamInfo(teamId);
            }
            return of({
              productType: 'products/car-insurance',
            });
          }),
          tap((res: any) => {
            if (res) {
              setProductType(res.productType);
            }
          }),
          mergeMap((res: any) => {
            return callApiHandle(res.productType);
          })
        )
        .subscribe();
    } else if (user && user.role !== UserRoles.SALE_ROLE) {
      callApiHandle().subscribe();
    }
  }, user);

  const handleStarButton = (itemsChecked: any[]) => {
    const important = itemsChecked
      .filter((item) => item.important)
      .map((item) => item.fullLeadId);
    const unimportant = itemsChecked
      .filter((item) => !item.important)
      .map((item) => item.fullLeadId);
    importantRef.current = {
      unimportant,
      important,
    };
    let newStateBtn: any = {};
    if (important.length > 0) {
      newStateBtn = {
        ...newStateBtn,
        removeStar: false,
      };
    } else {
      newStateBtn = {
        ...newStateBtn,
        removeStar: true,
      };
    }
    if (unimportant.length > 0) {
      newStateBtn = {
        ...newStateBtn,
        addStar: false,
      };
    } else {
      newStateBtn = {
        ...newStateBtn,
        addStar: true,
      };
    }
    setIsDisabledBtn(newStateBtn);
  };

  const handleSearchData = (body: any) => {
    searchStateRef.current = body;
    const newPageState = { ...pageState, currentPage: 1, ...body };
    callApiHandle(productType, newPageState).subscribe();
    setPageState(newPageState);
  };

  const handleChangeForm = (body: any) => {
    searchStateRef.current = body;
  };

  return (
    <div className="my-leads-page">
      <Helmet title="Lead - My Leads" />
      <Grid container spacing={6}>
        <Grid item xs={12} md={12} lg={12} className="my-leads-filter">
          <MyLeadsFilter
            searchData={handleSearchData}
            handleChangeForm={handleChangeForm}
          />
        </Grid>
        <Grid container item xs={12} lg={12} className="my-leads-buttons">
          <MyLeadButton
            handleStarImportant={handleStarImportant}
            showImportantLead={showImportantLead}
            isShowStarBtn={isShowStarBtn}
            isDisabledBtn={isDisabledBtn}
          />
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            className="dp-flex paging-my-leads top-paging"
          >
            <div className="paging">
              <ClientPagination
                page={pageState.currentPage as number}
                perPage={perPage}
                pageSizes={ITEM_PER_PAGE_LIST}
                nextToken={pageState.pageToken}
                onChangePage={handlePageChange}
                onChangePerPage={handlePerPageChange}
                isLoading={isLoading}
                totalItem={totalItem}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12} className="my-leads-table">
          <DataTableMyLead
            columns={columnsSetting}
            originalData={myLeadsData}
            perPage={perPage}
            isLoading={isLoading}
            handleDisableBtn={handleDisableBtn}
            handleDisableBtnSelectedAll={handleDisableBtnSelectedAll}
            itemImportant={handleRowImportant}
            sortTable={sortColumnHandle}
            starButtonAction={handleStarButton}
            updateSingleImportant={updateSingleImportant}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          lg={12}
          className="dp-flex paging-my-leads"
        >
          <div className="paging">
            <ClientPagination
              page={pageState.currentPage as number}
              perPage={perPage}
              pageSizes={ITEM_PER_PAGE_LIST}
              nextToken={pageState.pageToken}
              onChangePage={handlePageChange}
              onChangePerPage={handlePerPageChange}
              isLoading={isLoading}
              totalItem={totalItem}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ getMyLeads }, dispatch);

export default connect(null, mapDispatchToProps)(MyLeads);
