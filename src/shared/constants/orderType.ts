export enum OrderType {
  All = 'ALL',
  Document = 'DOCUMENT',
  QC = 'QC',
  Submission = 'SUBMISSION',
  Approval = 'APPROVAL',
}

export enum DocumentStatus {
  DOCUMENT_STATUS_UNSPECIFIED = 'Unassigned',
  DOCUMENT_STATUS_PENDING = 'Pending',
  DOCUMENT_STATUS_COMPLETE = 'Complete',
  DOCUMENT_STATUS_FAILED = 'Failed',
}

export enum QCStatus {
  QC_STATUS_UNSPECIFIED = 'Unassigned',
  QC_STATUS_PENDING = 'Pending',
  QC_STATUS_PREAPPROVED = 'Pre-approved',
  QC_STATUS_APPROVED = 'Approved',
  QC_STATUS_REJECTED = 'Rejected',
  QC_STATUS_CRITICAL_ISSUES = 'Critical Issues',
  QC_STATUS_ISSUE_FIXED = 'Issue Fixed',
}

export enum SubmissionStatus {
  SUBMISSION_STATUS_UNSPECIFIED = 'Unassigned',
  SUBMISSION_STATUS_PENDING = 'Pending',
  SUBMISSION_STATUS_PRESUBMITTED = 'Pre-submitted',
  SUBMISSION_STATUS_SUBMITTED = 'Submitted',
}

export enum ApprovalStatus {
  APPROVAL_STATUS_UNSPECIFIED = 'Unassigned',
  APPROVAL_STATUS_PENDING = 'Pending',
  APPROVAL_STATUS_APPROVED = 'Approved',
  APPROVAL_STATUS_REJECTED = 'Rejected',
  APPROVAL_STATUS_ENDORSEMENT = 'Endorsement',
  APPROVAL_STATUS_PROBLEM = 'Other Problems',
}

export enum MotoTypes {
  MOTOR_TYPE_1 = 'MOTOR_TYPE_1',
  MOTOR_TYPE_2 = 'MOTOR_TYPE_2',
  MOTOR_TYPE_2_PLUS = 'MOTOR_TYPE_2_PLUS',
  MOTOR_TYPE_3 = 'MOTOR_TYPE_3',
  MOTOR_TYPE_3_PLUS = 'MOTOR_TYPE_3_PLUS',
}
