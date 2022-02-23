export interface IResponse {
  enabled?: boolean;
  name: string;
  values: number[];
}
export interface IRowData {
  id: number;
  agentLead: string;
  lead1: number;
  lead2: number;
  lead3: number;
  lead4: number;
  total?: number;
}
export const SHIMMER_ARRAY = [{}, {}, {}, {}, {}];
export const LEAD_PERCENT_VALID = 100;
export const TOTAL_ROW_INDEX = 4;

export const getTableState = (tableType: string) => {
  return `${tableType}LeadReducer`;
};

export const getSumColumn = (leadListSum: IRowData[]) => {
  if (leadListSum?.length) {
    const result = leadListSum.reduce(
      (acc: any, cur: any) => (
        Object.keys(cur).forEach((key) => {
          acc[key] = (acc[key] || 0) + cur[key];
          // eslint-disable-next-line no-sequences
        }),
        acc
      ),
      {}
    ) as IRowData;
    const sumTotalColumn =
      result.lead1 + result.lead2 + result.lead3 + result.lead4;
    return {
      sumTotalColumn,
      result,
    };
  }
  return {};
};
