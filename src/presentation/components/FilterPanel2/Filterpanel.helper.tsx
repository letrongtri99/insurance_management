import React from 'react';
import { OrderType } from 'shared/constants/orderType';
import TeamRole from 'shared/constants/teamRole';
import { TypeAssign } from 'presentation/components/TableAllLead/TableAllLead.helper';
import { getString } from 'presentation/theme/localization';
import { RenderAgentName } from '.';

export const getRoleAgent = (assignType: OrderType | undefined) => {
  if (assignType === OrderType.QC) {
    return TeamRole.QualityControl;
  }

  if (assignType === OrderType.Submission) {
    return TeamRole.Submission;
  }

  return TeamRole.DocumentsCollection;
};

export const getAgentName = (
  status: TypeAssign | string,
  agentName: string
) => {
  if (status === TypeAssign.ASSIGN) {
    return agentName;
  }

  return '';
};

export const getNotificationSuccess = (status: TypeAssign | string) => {
  if (status === TypeAssign.ASSIGN) {
    return getString('text.assignedOrderSuccess');
  }

  return getString('text.unassignedOrderSuccess');
};

export const getNotificationFailed = (status: TypeAssign | string) => {
  if (status === TypeAssign.ASSIGN) {
    return getString('text.assignedOrderFailed');
  }

  return getString('text.unassignedOrderFailed');
};

export const getPayloadAssign = (
  orderList: any,
  status: TypeAssign | string,
  agentName: string,
  assignType: OrderType | undefined
) => {
  return {
    body: {
      orderNames: orderList,
      assignedTo: getAgentName(status, agentName),
    },
    assignType,
  };
};

export const getUsersByRole = (data: any) => {
  if (data?.length) {
    return data.map((item: any) => ({
      ...item,
      title: item.value,
    }));
  }
  return [];
};

export const showRenderAgentName = (
  isOrderPage: any,
  assignType: OrderType | undefined
) => {
  if (isOrderPage && assignType !== OrderType.All) {
    return <RenderAgentName assignType={assignType} />;
  }
  return '';
};

export const getDisable = (agentName: any, listCheckBox: any) =>
  !agentName || listCheckBox.length === 0;
