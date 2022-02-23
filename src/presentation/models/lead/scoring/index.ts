/* eslint-disable camelcase */
export interface IScoring {
  [key: string]: number;
}
/* eslint-enable camelcase */

export interface IScoringTable {
  title: string;
  type: string;
  data: any | IScoring[];
  localisationKey?: string;
  name?: string | any;
  id?: number;
  loading?: boolean;
  edit?: boolean;
}

export type IScoringTableOverflow = IScoringTable[];

export type IScoringTableBase = IScoringTableOverflow | IScoringTable;
