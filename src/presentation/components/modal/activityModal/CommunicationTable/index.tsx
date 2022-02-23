import React, { memo, useEffect, useState, useMemo } from 'react';
import { RowsProp } from '@material-ui/data-grid';
import { mergeMap, pluck } from 'rxjs/operators';
import { of } from 'rxjs';
import LeadDetailRepository from 'data/repository/leadDetail/cloud';
import UsersRepository from 'data/repository/admin/user/cloud';
import { IPayLoad } from 'data/gateway/api/helper/queryString.helper';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import {
  useMediaQuery,
  useTheme,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { customForkJoin } from 'shared/helper/operator';
import { getString } from 'presentation/theme/localization';
import { CommunicationType } from './index.model';
import CommonModal from '../../CommonModal';
import VoiceModal from '../../../TableAllLead/voiceModal';
import { voiceModalStyles } from '../../../TableAllLead/TableRejectionLead.helper';
import { useStylesCommunication } from '../activityTable';
import {
  displayDuration,
  displayTimestamp,
  displayType,
  ICommunication,
} from './helper';
import CustomPagination from '../../../controls/CustomPagination';
import {
  FIRST_PAGE,
  INITIAL_ITEM_PER_PAGE,
  ITEM_PER_PAGE_LIST,
  listToken,
  prevPageHandle,
} from '../activityTable/activityTable.helper';
import Spinner from '../../../Spinner';
import './index.scss';

const CommunicationTable = ({ id }: { id: string }) => {
  const [pageState, setPageState] = React.useState({
    currentPage: 1,
    pageSize: 10,
    pageToken: '1',
  });
  const [perPage, setPerPage] = useState<number>(INITIAL_ITEM_PER_PAGE);
  const classes = useStylesCommunication();
  const [rows, setRows] = useState<RowsProp>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [callId, setCallId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const voiceModalClasses = voiceModalStyles();
  const { breakpoints } = useTheme();

  const flexibleWidth = useMediaQuery(breakpoints.up('lg'));

  const clickHandle = (callName: string) => {
    setShowConfirmModal(true);
    setCallId(callName);
  };

  const displayVoice = (row: ICommunication) => {
    if (
      row.communicationType === CommunicationType.CALL &&
      row.duration !== null
    ) {
      return (
        <PlayCircleFilledIcon
          className="button-action"
          onClick={() => clickHandle(row.name)}
        />
      );
    }
    return <span>-</span>;
  };

  const columns = [
    {
      field: 'id',
      headerName: getString('text.noDots'),
      flex: flexibleWidth ? 1 : undefined,
      width: 100,
      disableClickEventBubbling: true,
    },
    {
      field: 'createTime',
      headerName: getString('text.date'),
      flex: flexibleWidth ? 2.5 : undefined,
      width: 250,
      valueFormatter: displayTimestamp,
      disableClickEventBubbling: true,
    },
    {
      field: 'createBy',
      headerName: getString('text.name'),
      flex: flexibleWidth ? 2 : undefined,
      width: 200,
      disableClickEventBubbling: true,
    },
    {
      field: 'communicationType',
      headerName: getString('text.type'),
      flex: flexibleWidth ? 2 : undefined,
      width: 200,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: displayType,
      disableClickEventBubbling: true,
    },
    {
      field: 'duration',
      headerName: getString('text.callDuration'),
      flex: flexibleWidth ? 2 : undefined,
      width: 200,
      valueFormatter: displayDuration,
      align: 'center',
      headerAlign: 'center',
      disableClickEventBubbling: true,
    },
    {
      field: '',
      headerName: getString('text.voiceFile'),
      flex: flexibleWidth ? 2 : undefined,
      width: 200,
      renderCell: displayVoice,
      align: 'center',
      headerAlign: 'center',
      renderJSX: true,
    },
  ];

  const transformData = (messages: any, users: any) => {
    const { selectData } = users;
    const result = messages.map((message: any) => {
      const m = message;
      const { communication } = m;
      const createBy = selectData.find(
        (user: any) => communication.createBy === user.key
      );
      communication.createBy = createBy?.value || null;
      if (communication?.deleteTime) {
        communication.duration = moment.duration(
          moment(communication.deleteTime).diff(
            moment(communication.createTime)
          )
        );
      } else {
        communication.duration = null;
      }
      return {
        ...m,
      };
    });
    return result;
  };
  const rowsData = useMemo(() => {
    const from = (pageState.currentPage - 1) * pageState.pageSize;
    const to = pageState.currentPage * pageState.pageSize;
    return rows.slice(from, to);
  }, [rows, pageState]);

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
    setPageState(newPageState);
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
  useEffect(() => {
    const leadSubscription = LeadDetailRepository.getCommunications({
      id,
    } as IPayLoad)
      .pipe(
        mergeMap((res: any) => {
          return customForkJoin(
            UsersRepository.lookUpUser(),
            of(res).pipe(pluck('data', 'data'))
          );
        })
      )
      .subscribe(([selectData, messages]: any) => {
        const results = transformData(messages, selectData);
        setIsLoading(false);
        if (results && results.length) {
          setRows(
            results.map((result: any, index: number) => ({
              id: index + 1,
              communicationType: result.type,
              ...result.communication,
            }))
          );
        }
      });
    return () => {
      leadSubscription.unsubscribe();
    };
  }, [id]);

  const voiceModal = useMemo(() => {
    if (!callId) {
      return (
        <Grid className={voiceModalClasses.voiceModalMessage}>
          <div className="lds-dual-container">
            <div className="lds-dual-ring" />
          </div>
        </Grid>
      );
    }
    if (callId) {
      return <VoiceModal callId={callId} />;
    }
    return (
      <Grid className={voiceModalClasses.voiceModalMessage}>
        {getString('text.callErrorMessage')}
      </Grid>
    );
  }, [voiceModalClasses.voiceModalMessage, callId]);

  return (
    <Grid item container xs={12} md={12} className="communication-table">
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>
            {columns.map((item) => {
              return (
                <TableCell
                  width={item.width}
                  key={item.headerName}
                  className={classes.tHead}
                >
                  {item.headerName}
                </TableCell>
              );
            })}
          </TableHead>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {rowsData?.length ? (
                rowsData.map((item) => {
                  return (
                    <TableRow className={classes.tRow}>
                      {columns.map((column: any) => {
                        return column.renderJSX ? (
                          <>
                            <TableCell>
                              {column.renderCell.bind(null, item)()}
                            </TableCell>
                          </>
                        ) : (
                          <>
                            {column.valueFormatter ? (
                              <TableCell>
                                {column.valueFormatter.bind(null, item)()}
                              </TableCell>
                            ) : (
                              <TableCell>{item[column.field]}</TableCell>
                            )}
                          </>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className={classes.tRow}>
                  <TableCell align="center" colSpan={columns.length + 1}>
                    {getString('text.noData')}
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </Table>
      </TableContainer>
      <div className={classes.pagination}>
        {rows?.length ? (
          <CustomPagination
            page={pageState.currentPage as number}
            perPage={perPage}
            pageSizes={ITEM_PER_PAGE_LIST}
            nextToken={pageState.pageToken}
            onChangePage={handlePageChange}
            onChangePerPage={handlePerPageChange}
            isLoading={isLoading}
            totalItem={rows.length}
          />
        ) : null}
      </div>
      <CommonModal
        title={getString('text.voiceFile')}
        open={showConfirmModal}
        handleCloseModal={() => {
          setShowConfirmModal(false);
          setCallId('');
        }}
        wrapperClass={voiceModalClasses.voiceModalDialog}
      >
        {voiceModal}
      </CommonModal>
    </Grid>
  );
};

export default memo(CommunicationTable);
