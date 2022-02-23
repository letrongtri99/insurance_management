import { getString } from 'presentation/theme/localization';

export const documentStatusOptions = [
  {
    id: 1,
    value: 'Unassigned',
    title: getString('text.unassigned'),
  },
  {
    id: 2,
    value: 'Pending',
    title: getString('text.pending'),
  },
  {
    id: 3,
    value: 'Complete',
    title: getString('text.complete'),
    color: '#2FCE82',
  },
  {
    id: 5,
    value: 'Failed',
    title: getString('importFileStatus.error'),
    color: '#EA4548',
  },
];

export const qcStatusOptions = [
  {
    id: 1,
    value: 'Unassigned',
    title: getString('text.unassigned'),
  },
  {
    id: 6,
    value: 'Pending',
    title: getString('text.pending'),
  },
  {
    id: 2,
    value: 'Pre-approved',
    title: getString('qcStatus.preApproved'),
  },
  {
    id: 3,
    value: 'Critical Issues',
    title: getString('qcStatus.criticalIssues'),
  },
  {
    id: 4,
    value: 'Issues Fixed',
    title: getString('qcStatus.issuesFixed'),
  },
  {
    id: 7,
    value: 'Complete',
    title: getString('text.complete'),
  },
  {
    id: 5,
    value: 'Rejected',
    title: getString('text.rejected'),
  },
];

export const submissionStatusOptions = [
  {
    id: 1,
    value: 'Unassigned',
    title: getString('text.unassigned'),
  },
  {
    id: 2,
    value: 'Pending',
    title: getString('text.pending'),
  },
  {
    id: 4,
    value: 'Pre-Submitted',
    title: getString('statusOption.preSubmitted'),
  },
  {
    id: 3,
    value: 'Submitted',
    title: getString('text.submitted'),
  },
];

export const approvalStatusOptions = [
  {
    id: 1,
    value: 'Unassigned',
    title: getString('text.unassigned'),
  },
  {
    id: 2,
    value: 'Pending',
    title: getString('text.pending'),
  },
  {
    id: 4,
    value: 'Endorsement',
    title: getString('approveStatus.endorsement'),
  },
  {
    id: 6,
    value: 'Other Problems',
    title: getString('approveStatus.otherProblems'),
  },
  {
    id: 3,
    value: 'Approved',
    title: getString('text.approved'),
    color: '#2FCE82',
  },
  {
    id: 5,
    value: 'Rejected',
    title: getString('text.rejected'),
    color: '#EA4548',
  },
];

export const documentStatusSubmissionOptions = [
  {
    id: 1,
    value: 'Unassigned',
    title: getString('text.unassigned'),
    prefixColor: '#A5AAC0',
  },
  {
    id: 2,
    value: 'Pending',
    title: getString('text.pending'),
    prefixColor: '#F78F1E',
  },
  {
    id: 3,
    value: 'Complete',
    title: getString('text.complete'),
    prefixColor: '#2FCE82',
  },
  {
    id: 4,
    value: 'Failed',
    title: getString('importFileStatus.error'),
    prefixColor: '#EA4548',
  },
];

export const qcStatusSubmissionOptions = [
  {
    id: 1,
    value: 'Unassigned',
    title: getString('text.unassigned'),
    prefixColor: '#A5AAC0',
  },
  {
    id: 2,
    value: 'Pending',
    title: getString('text.pending'),
    prefixColor: '#F78F1E',
  },
  {
    id: 3,
    value: 'Pre-Approved',
    title: getString('qcStatus.preApproved'),
    prefixColor: '#F78F1E',
  },
  {
    id: 4,
    value: 'Approved',
    title: getString('text.approved'),
    prefixColor: '#2FCE82',
  },
  {
    id: 5,
    value: 'Rejected',
    title: getString('text.rejected'),
    prefixColor: '#EA4548',
  },
  {
    id: 6,
    value: 'Critical Issues',
    title: getString('qcStatus.criticalIssues'),
    prefixColor: '#F78F1E',
  },
  {
    id: 7,
    value: 'Issues Fixed',
    title: getString('qcStatus.issuesFixed'),
    prefixColor: '#F78F1E',
  },
];

export const submissionStatusSubmissionOptions = [
  {
    id: 1,
    value: 'Unassigned',
    title: getString('text.unassigned'),
    prefixColor: '#A5AAC0',
  },
  {
    id: 2,
    value: 'Pending',
    title: getString('text.pending'),
    prefixColor: '#F78F1E',
  },
  {
    id: 3,
    value: 'Pre-Submitted',
    title: getString('statusOption.preSubmitted'),
    prefixColor: '#F78F1E',
  },
  {
    id: 4,
    value: 'Submitted',
    title: getString('text.submitted'),
    prefixColor: '#2FCE82',
  },
];

export const approvalStatusSubmissionOptions = [
  {
    id: 1,
    value: 'Unassigned',
    title: getString('text.unassigned'),
    prefixColor: '#A5AAC0',
  },
  {
    id: 2,
    value: 'Pending',
    title: getString('text.pending'),
    prefixColor: '#F78F1E',
  },
  {
    id: 3,
    value: 'Approved',
    title: getString('text.approved'),
    prefixColor: '#2FCE82',
  },
  {
    id: 4,
    value: 'Rejected',
    title: getString('text.rejected'),
    prefixColor: '#EA4548',
  },
  {
    id: 5,
    value: 'Endorsement',
    title: getString('approveStatus.endorsement'),
    prefixColor: '#F78F1E',
  },
  {
    id: 6,
    value: 'Other Problems',
    title: getString('approveStatus.otherProblems'),
    prefixColor: '#F78F1E',
  },
];
