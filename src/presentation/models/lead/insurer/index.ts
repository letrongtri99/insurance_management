export interface IInsurer {
  currentInsurer: string;

  preferredInsurer: number;

  preferredType: Array<ISelection>;

  preferredSumInsured: number;

  mandatory: string;

  expiryDate: string;

  startDate: string;

  youngestDriverDob: string;

  coupon: string;

  status: string;

  paymentSchedule?: number;

  policyStartDate?: string;

  compulsoryPolicyStartDate?: string;
}

export interface ISelection {
  title: string;
  value: string;
}
