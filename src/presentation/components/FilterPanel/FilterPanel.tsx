import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import {
  Card as MuiCard,
  CardContent,
  makeStyles,
  Paper as MuiPaper,
} from '@material-ui/core';
import styled from 'styled-components';
import { spacing } from '@material-ui/system';
import './index.scss';
import { isFocusDateRange } from '../controls/Services/serviceHandleDateRangeCollapse';

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

function FilterPanel({
  rows = 3,
  collapsedRows = 1,
  children,
  rowHeight = 60,
}: {
  rows?: number;
  collapsedRows?: number;
  children: any;
  rowHeight?: number;
}): any {
  const gutters = 5;
  const [minimized, setMinimized] = useState(false);

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const useStyles = makeStyles({
    minimizeForm: {
      overflow: 'hidden',
      maxHeight: collapsedRows * rowHeight + gutters * 2,
      minHeight: collapsedRows * rowHeight + gutters * 2,
    },

    showForm: {
      maxHeight: '1000px',
    },
  });

  useEffect(() => {
    const isFocusSubscription = isFocusDateRange.subscribe((val) => {
      if (val) {
        setMinimized(!val);
      }
    });
    return () => {
      isFocusSubscription.unsubscribe();
    };
  }, [isFocusDateRange]);

  const classes = useStyles();
  return (
    <Card
      mb={6}
      mt={-9}
      className="shared-filter-panel"
      style={{ overflow: 'inherit' }}
    >
      <CardContent
        className={clsx(
          'body',
          minimized ? classes.minimizeForm : classes.showForm
        )}
      >
        <Paper>{children}</Paper>
        <button
          type="button"
          className={clsx(
            'collapse-button-lead',
            minimized && 'minimize',
            'unittest-button-collapse'
          )}
          onClick={toggleMinimize}
        >
          {minimized ? (
            <KeyboardArrowDown
              className="shared-filter-panel__icon"
              color="secondary"
            />
          ) : (
            <KeyboardArrowUp color="secondary" />
          )}
        </button>
      </CardContent>
    </Card>
  );
}

FilterPanel.defaultProps = {
  rows: 3,
  collapsedRows: 1,
  rowHeight: 60,
};

export default FilterPanel;
