import { Button, Dialog, Grid, withTheme, makeStyles } from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import { getString } from 'presentation/theme/localization';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.scss';
import NewMessage from 'presentation/components/NewMessage';
import { StatusLeadAll } from 'presentation/pages/leads/LeadDashBoard/LeadDashBoard.helper';
import { useDispatch, connect } from 'react-redux';
import {
  getListEmail,
  getAttachment,
} from 'presentation/redux/actions/leadDetail/email';
import MessageModalReply from 'presentation/components/modal/MessageModal/MessageModalReply';
import styled from 'styled-components';
import LeadCloud from 'data/repository/lead/cloud';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  getPostRejectValue,
  updatePostRejectValue,
} from 'presentation/components/controls/Services/serviceHandlePostRejections';
import MessageModalEmail from './MessageModalEmail';
import MessageModalItem from './MessageModalItem';
import {
  IPropsMessageModal,
  initialMailData,
  initialId,
} from './messageModal.helper';

export const clearRejectionSub$ = new Subject();

const TopHeader = withTheme(styled(Grid)`
  &&& {
    padding: 24px 20px;
    flex-basis: auto;
    min-height: 90px;
    background-color: ${({ theme }) => theme.palette.info.main};
    border-radius: 16px 0 0 0;
  }
`);

const ComposeSection = withTheme(styled(Grid)`
  &&& {
    padding: 16px;
    flex-basis: auto;
    min-height: 90px;
    background-color: ${({ theme }) => theme.palette.info.light};
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.palette.common.black};
  }
`);

enum ComponentType {
  MESSAGE_NEW = 'MESSAGE_NEW',
  MESSAGE_DETAIL = 'MESSAGE_DETAIL',
  MESSAGE_REPLY = 'MESSAGE_REPLY',
}

const INITIAL_STATUS_VALUE = null;

const useStyles = makeStyles({
  statusGreen: {
    backgroundColor: '#1AA886',
    '&:hover': {
      backgroundColor: '#1AA886',
    },
  },
  statusOrange: {
    backgroundColor: '#FF9D00',
    '&:hover': {
      backgroundColor: '#FF9D00',
    },
  },
  statusGray: {
    backgroundColor: '#D9D9D9',
    '&:hover': {
      backgroundColor: '#D9D9D9',
    },
  },
});

const MessageModal: React.FC<
  IPropsMessageModal & React.HTMLAttributes<HTMLDivElement>
> = ({ openDialog, closeDialog, data, attachment, currentCustomer }) => {
  const classes = useStyles();
  const [mailData, setMailData] = useState(initialMailData);
  const [itemActiveId, setItemActiveId] = useState(initialId);
  const [isComposing, setIsComposing] = useState<string>(
    ComponentType.MESSAGE_DETAIL
  );
  const [replyType, setReplyType] = useState<string>('');
  const [isPendingRejection, setIsPendingRejection] = useState<boolean | null>(
    INITIAL_STATUS_VALUE
  );
  const dispatch = useDispatch();
  const listEmail = data.data?.emails || [];
  const listAttachment = attachment.data?.attachments || [];
  const attachmentLoading = attachment.data?.loading || false;

  useEffect(() => {
    if (openDialog) {
      dispatch(getListEmail());
    }
  }, [openDialog, dispatch]);

  const itemHandleClick = useCallback(
    (item: any) => {
      setMailData(item);
      setItemActiveId(item.name);
      dispatch(getAttachment(item.name));
      setIsComposing(ComponentType.MESSAGE_DETAIL);
    },
    [dispatch]
  );

  const handleCloseDialog = () => {
    closeDialog(false);
    setMailData(initialMailData);
    setItemActiveId(initialId);
  };

  const handleComposing = () => {
    setIsComposing(ComponentType.MESSAGE_NEW);
    setItemActiveId(initialId);
  };

  const handleCancelMessage = (value: boolean) => {
    setIsComposing(ComponentType.MESSAGE_DETAIL);
    setMailData(initialMailData);
    return value;
  };

  const handleReply = (type: string) => {
    setReplyType(type);
    setIsComposing(ComponentType.MESSAGE_REPLY);
  };

  const mappingCustomerStatus = (status: string) => {
    let customerStatus = '';
    StatusLeadAll.forEach((item) => {
      if (status === item.value) {
        customerStatus = item.title;
      }
    });

    return getString(customerStatus);
  };

  const getListRejections = (name: string) => {
    return LeadCloud.getLeadRejectionById(name)
      .pipe(takeUntil(clearRejectionSub$))
      .subscribe((response: any) => {
        let isPending = false;
        if (response?.rejections?.length) {
          isPending = response.rejections.find(
            (item: any) => item.decideTime === INITIAL_STATUS_VALUE
          );
        }
        setIsPendingRejection(!!isPending);
      });
  };

  useEffect(() => {
    if (!currentCustomer.name) {
      updatePostRejectValue(false);
    }
  }, [currentCustomer]);

  useEffect(() => {
    getPostRejectValue()
      .pipe(takeUntil(clearRejectionSub$))
      .subscribe((val) => {
        if (val && currentCustomer.name) {
          getListRejections(currentCustomer.name);
        }
      });
  }, [currentCustomer]);

  useEffect(() => {
    if (currentCustomer.name) {
      getListRejections(currentCustomer.name);
    }

    return () => {
      clearRejectionSub$.next(true);
    };
  }, [currentCustomer]);

  const noneRejectedStatus = (isPending: boolean | null) => {
    if (isPending !== INITIAL_STATUS_VALUE) {
      const result = isPending ? classes.statusOrange : classes.statusGreen;
      return result;
    }
    return '';
  };

  const renderMessageItem = useMemo(() => {
    return listEmail.map((item: any, index: number) => (
      <MessageModalItem
        key={index as number}
        isActive={itemActiveId}
        onClick={() => {
          itemHandleClick(item);
        }}
        messageItem={item}
      />
    ));
  }, [listEmail, itemActiveId, itemHandleClick]);

  return (
    <Dialog
      open={openDialog}
      aria-labelledby="form-dialog-title"
      className="message-modal-wrap shared-common-modal"
    >
      <div className="message-modal-override">
        <div className="modal-button-close no-background">
          <div className="close-btn">
            <Icon.Close
              onClick={() => handleCloseDialog()}
              className="unittest__message__close-btn"
            />
          </div>
        </div>
        <Grid item container xs={12} md={12} className="message-modal">
          <Grid
            item
            container
            xs={4}
            md={4}
            lg={3}
            className="message-modal__list"
          >
            <TopHeader item container xs={12} md={12} className="modal-header">
              <Grid item xs={12} sm={12} md={8}>
                <h3 style={{ margin: 0, paddingRight: 10 }}>
                  <span className="unittest-customer-name">
                    {`${currentCustomer.data.customerFirstName} ${currentCustomer.data.customerLastName}` ||
                      'N/A'}
                  </span>
                </h3>
                <div>
                  <span>Lead ID: </span>
                  <span className="unittest-lead-reference">
                    {currentCustomer.humanId}
                  </span>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div className="header-button">
                  {isPendingRejection !== INITIAL_STATUS_VALUE && (
                    <Button
                      variant="contained"
                      className={`header-button__valid ${
                        currentCustomer.isRejected
                          ? classes.statusGray
                          : noneRejectedStatus(isPendingRejection)
                      }`}
                    >
                      {mappingCustomerStatus(currentCustomer.status)}
                    </Button>
                  )}
                </div>
              </Grid>
            </TopHeader>
            <ComposeSection
              item
              container
              xs={12}
              md={12}
              className="modal-header"
            >
              <Grid item xs={12} sm={12} md={8}>
                <h3 style={{ marginRight: 5 }}>
                  {getString('text.mailboxCommunications')}
                </h3>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <div className="header-button">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComposing}
                    className="header-button__compose"
                  >
                    {getString('text.compose')}
                  </Button>
                </div>
              </Grid>
            </ComposeSection>
            <div className="message-modal__list__items">
              {renderMessageItem}
            </div>
          </Grid>
          {isComposing === ComponentType.MESSAGE_DETAIL && (
            <Grid item xs={8} md={8} lg={9} className="message-modal__detail">
              {!mailData.createTime ? (
                <div className="no-message-wrapper">
                  <h1 className="no-message-wrapper__text">
                    {getString('text.noMessageSelected')}
                  </h1>
                </div>
              ) : (
                <MessageModalEmail
                  onClick={() => 'clicked'}
                  email={mailData}
                  attachmentLoading={attachmentLoading}
                  attachment={listAttachment}
                  handleReplyEmail={handleReply}
                />
              )}
            </Grid>
          )}
          {isComposing === ComponentType.MESSAGE_NEW && (
            <Grid item xs={8} md={8} lg={9} className="message-modal__compose">
              <div className="new-message-wrapper">
                <NewMessage handleCancelMessage={handleCancelMessage} />
              </div>
            </Grid>
          )}
          {isComposing === ComponentType.MESSAGE_REPLY && (
            <Grid
              item
              xs={8}
              md={8}
              lg={9}
              className="message-modal__reply-compose"
            >
              <div className="message-reply-wrapper">
                <MessageModalReply
                  handleCancelMessage={handleCancelMessage}
                  replyType={replyType}
                />
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state: any) => ({
  data: state.leadsDetailReducer.emailReducer,
  attachment: state.leadsDetailReducer.attachmentReducer,
  currentCustomer: state.leadsDetailReducer.lead?.payload,
});

export default connect(mapStateToProps)(MessageModal);
