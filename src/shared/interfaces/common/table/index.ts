export interface IPageState {
  currentPage?: number;
  perPage?: number;
  pageSize?: number;
  pageIndex?: number;
  pageToken?: string;
  showDeleted?: boolean;
  orderBy?: string[] | string;
  filter?: string;
}
