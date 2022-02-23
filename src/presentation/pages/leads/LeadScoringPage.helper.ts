import { IScoring } from '../../models/lead/scoring';

export const SCORE_SHIMMER = [
  {
    tableType: 'renewal',
    title: 'text.renewalLead',
    type: 'Renewal',
    values: {},
  },
  {
    tableType: 'renewal',
    title: 'text.renewalLead',
    type: 'Renewal',
    values: {},
  },
  {
    tableType: 'renewal',
    title: 'text.renewalLead',
    type: 'Renewal',
    values: {},
  },
];

export interface IScoreItem {
  edit: boolean;
  name: string;
  tableType: string;
  title: string;
  type: string;
  values: IScoring;
  isLoading: boolean;
  isEdit: boolean;
}
