import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  Button as MuiButton,
  makeStyles,
  Paper as MuiPaper,
  withTheme,
} from '@material-ui/core';
import './index.scss';
import styled from 'styled-components';
import LeadCloud from 'data/repository/lead/cloud';

import {
  getPostRejectValue,
  updatePostRejectValue,
} from 'presentation/components/controls/Services/serviceHandlePostRejections';
import { getString } from '../../../theme/localization';
import {
  calculateDOBHelper,
  formValue,
  getPendingRejection,
  getStatusColor,
  ICustomerSectionProps,
  INITIAL_STATUS_VALUE,
  mappingCustomerStatus,
  mappingFiledValue,
} from './helper';
import RenderColumn from './RenderColumn';

export const clearRejectionSub$ = new Subject();

const Paper = withTheme(styled(MuiPaper)`
  &&& {
    height: 100%;
  }
`);

const HeaderTitle = withTheme(styled.div`
  &&& {
    display: inline-block;
    width: 100%;
    min-height: 43px;
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.grey[200]};
    b {
      font-size: 16px;
    }

    .header-content {
      padding: 10px 15px;
      margin: auto;
      word-break: break-word;
      span {
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
`);

const Title = withTheme(styled.h3`
  &&& {
    margin: 0;
    padding: 10px 15px;
    color: ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }
`);

const Button = styled(MuiButton)`
  &&& {
    float: right;
    padding: 0 5px;
    border-radius: 4px;
    text-transform: none;
    color: #fff;
  }
`;

const Item = withTheme(styled.div`
  &&& {
    margin-bottom: 11px;
    border-radius: 10px;

    h3 {
      border-radius: 10px 10px 0 0;
    }

    &.column-status {
      div:first-child {
        border-radius: 10px 10px 0 0;
        border-left: none;
        border-right: none;
      }
    }

    div {
      &:last-child {
        border-radius: 0 0 10px 10px;
      }
    }
  }
`);

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

const CustomerSection: React.FC<ICustomerSectionProps> = ({ data }) => {
  const classes = useStyles();
  const [isPendingRejection, setIsPendingRejection] = useState<boolean | null>(
    INITIAL_STATUS_VALUE
  );
  const [dataSchema, setDataSchema] = useState<any>(null);

  useEffect(() => {
    setDataSchema(mappingFiledValue(formValue, data));
  }, [data]);

  const getListRejections = (name: string) => {
    return LeadCloud.getLeadRejectionById(name)
      .pipe(takeUntil(clearRejectionSub$))
      .subscribe((response: any) => {
        setIsPendingRejection(getPendingRejection(response));
      });
  };

  useEffect(() => {
    if (!data.lead.name) {
      updatePostRejectValue(false);
    }
  }, [data.lead.name]);

  useEffect(() => {
    getPostRejectValue()
      .pipe(takeUntil(clearRejectionSub$))
      .subscribe(() => {
        getListRejections(data.lead.name);
      });
  }, [data.lead.name]);

  // INFO: get rejections of a lead to check request pending.
  useEffect(() => {
    if (data.lead.name) {
      getListRejections(data.lead.name);
    }

    return () => {
      clearRejectionSub$.next(true);
    };
  }, [data.lead.name]);

  const noneRejectedStatus = useCallback(
    (isPending: boolean | null) => {
      return getStatusColor(isPending, classes);
    },
    [classes.statusGreen, classes.statusOrange]
  );

  const headerSection = useMemo(
    () => (
      <HeaderTitle>
        <div className="header-content">
          <b className="unittest-header">{getString('text.leadInformation')}</b>
          {isPendingRejection !== INITIAL_STATUS_VALUE ? (
            <Button
              className={
                data.lead.isRejected
                  ? classes.statusGray
                  : noneRejectedStatus(isPendingRejection)
              }
              variant="contained"
            >
              {mappingCustomerStatus(data.lead.status)}
            </Button>
          ) : null}
        </div>
      </HeaderTitle>
    ),
    [classes.statusGray, data.lead, isPendingRejection, noneRejectedStatus]
  );

  const updateDOBHandle = (value: string | Date) => {
    setDataSchema(calculateDOBHelper(dataSchema, value));
  };

  return (
    <Paper className="customer-section-container">
      {dataSchema && (
        <div className="customer-section">
          <Item>
            <Title>{getString('text.customer')}</Title>
            <RenderColumn item={dataSchema.customer} />
          </Item>
          <Item>
            <Title>{getString('text.policyHolderInformation')}</Title>
            <RenderColumn
              item={dataSchema.policyHolder}
              updateDOB={updateDOBHandle}
            />
          </Item>
          <Item className="column-status">
            {headerSection}
            <RenderColumn item={dataSchema.leadInfo} />
          </Item>
        </div>
      )}
    </Paper>
  );
};

export default CustomerSection;
