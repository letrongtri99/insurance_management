export interface Insurer {
  name: string;
  displayName: string;
  order: number;
}

export interface InsurersResponse {
  insurers: Insurer[];
  nextPageToken: string;
}
