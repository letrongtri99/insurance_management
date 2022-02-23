import { IScoring } from 'presentation/models/lead/scoring';
import { IAction, IState } from '../../../../../shared/interfaces/common';

export interface IListScoring {
  name: string;
  values: IScoring;
}
export interface IListScoreFormat {
  name: string;
  values: IScoring;
  title: string;
  type: string;
  tableType: string;
  isEdit: boolean;
  isLoading: boolean;
}

export const formatListLeadScore = (payload: Array<IListScoring> = []) => {
  const newPayload = payload?.map((item: IListScoring) => {
    if (item.name.indexOf('renewal') !== -1) {
      return {
        ...item,
        title: 'text.renewalLead',
        type: 'text.renewal',
        tableType: 'renewal',
        isEdit: false,
        isLoading: false,
      };
    }
    if (item.name.indexOf('new') !== -1) {
      return {
        ...item,
        title: 'text.newLead',
        type: 'text.new',
        tableType: 'new',
        isEdit: false,
        isLoading: false,
      };
    }
    if (item.name.indexOf('retainer') !== -1) {
      return {
        ...item,
        title: 'text.retainerLead',
        type: 'text.retainer',
        tableType: 'retainer',
        isEdit: false,
        isLoading: false,
      };
    }
    return item;
  });

  (newPayload as Array<IListScoreFormat>).sort(
    (a: IListScoreFormat, b: IListScoreFormat) => {
      const fieldA = a.type.toLowerCase();
      const fieldB = b.type.toLowerCase();

      if (fieldA < fieldB) {
        return -1;
      }
      if (fieldA > fieldB) {
        return 1;
      }
      return 0;
    }
  );

  return newPayload;
};

const customListLeadScore = (action: IAction<any>) => {
  let newPayload = [...action.payload];
  newPayload = formatListLeadScore(newPayload);
  return {
    ...action,
    payload: newPayload,
    isLoading: false,
  };
};

export const leadScoreUpdateSuccess = (
  state: IState<any>,
  action: IAction<any>
) => {
  let leadData = [...state.data];
  leadData = leadData.map((item) => {
    if (item.name === action.payload.name) {
      return {
        ...item,
        isEdit: false,
        isLoading: false,
        values:
          item.name === action.payload.name
            ? action.payload.values
            : item.values,
      };
    }
    return item;
  });
  return leadData;
};

export const leadScoreUpdateFailed = (
  state: IState<any>,
  action: IAction<any>
) => {
  const leadData = [...state.data];
  const newLeadData = leadData.map((item) => {
    if (item.type === action.payload) {
      return {
        ...item,
        isLoading: false,
        isEdit: item.type === action.payload,
      };
    }
    return item;
  });
  return newLeadData;
};

export const leadScoreUpdate = (state: IState<any>, action: IAction<any>) => {
  let leadData = [...state.data];
  leadData = leadData.map((item) => {
    if (item.name === action.payload.name) {
      return {
        ...item,
        isEdit: true,
        isLoading: item.name === action.payload.name,
      };
    }
    return item;
  });
  return leadData;
};

export default customListLeadScore;
