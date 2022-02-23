import * as Yup from 'yup';

export const createValidationSchema = () => {
  return Yup.object().shape({
    comment: Yup.string().trim().required('Required'),
    status: Yup.string().trim(),
    approved: Yup.boolean(),
    reason: Yup.string().when('approved', {
      is: (approved) => approved === true,
      then: Yup.string().required('Required'),
    }),
  });
};

export default createValidationSchema;
