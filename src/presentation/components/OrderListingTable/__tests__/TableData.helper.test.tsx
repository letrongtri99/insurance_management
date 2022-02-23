import React from 'react';
import { Box, TableCell } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Color } from 'presentation/theme/variants';
import { showCell, showStatusTag, showArrow } from '../TableData';
import StatusTag from '../StatusTag';

test('Test showStatusTag run well in case 1st', () => {
  const input = {
    warningLbl: 'Primary',
  };
  expect(showStatusTag(input)).toEqual(<StatusTag text="Primary" />);
});

test('Test showStatusTag run well in case 2nd', () => {
  const input = null;
  expect(showStatusTag(input)).toEqual('');
});

test('Test showCell run well in case 1st', () => {
  const input = {
    order: {
      approvalStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      customer: 'Puitest E. Sricherng',
      documentsStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      id: 'orders/8025f39c-9e6b-4912-8a45-979031a70178',
      orderId: 'O158',
      products: [],
      qcStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      submissionStatus: {
        label: 'Unassigned',
        status: 'warning',
        type: 'text',
      },
    },
    column: {
      id: 'leadSource',
      label: 'text.leadSource',
    },
  };

  const result = null;
  expect(showCell(input)).not.toEqual(result);
});

test('Test showCell run well in case 2nd', () => {
  const input = {
    order: {
      approvalStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      customer: 'Puitest E. Sricherng',
      documentsStatus: { label: 'Unassigned', status: 'warning', type: 'text' },
      id: 'orders/8025f39c-9e6b-4912-8a45-979031a70178',
      orderId: 'O158',
      products: [],
      qcStatus: undefined,
      submissionStatus: {
        label: 'Unassigned',
        status: 'warning',
        type: 'text',
      },
    },
    column: {
      id: 'policyId',
      label: 'text.leadSource',
    },
  };

  const result = (
    <TableCell
      style={{ maxWidth: 'fit-content' }}
      key="policyId"
      align={undefined}
    >
      {undefined}
      <br />
      <Box component="span" color={Color.GREY_400}>
        {undefined}
      </Box>
    </TableCell>
  );
  expect(showCell(input)).toEqual(result);
});

test('Test showArrow run well with truthy open input', () => {
  expect(showArrow(true)).toEqual(<KeyboardArrowDownIcon color="primary" />);
});

test('Test showArrow run well with falsy open input', () => {
  expect(showArrow(false)).toEqual(<KeyboardArrowRightIcon color="primary" />);
});
