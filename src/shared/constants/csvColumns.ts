const csvColumns = [
  'First Name',
  'Last Name',
  'Gender',
  'Date of birth',
  'Phone',
  'Email',
  'Redbook ID',
  'Policy Start date',
];

export const csvColumnsWithType = [
  { name: 'First Name', dataType: 'string' },
  { name: 'Last Name', dataType: 'string' },
  { name: 'Gender', dataType: 'gender' },
  { name: 'Date of birth', dataType: 'date' },
  { name: 'Phone', dataType: 'number' },
  { name: 'Email', dataType: 'email' },
  { name: 'Redbook ID', dataType: 'string' },
  { name: 'Policy Start date', dataType: 'date' },
];

export default csvColumns;
