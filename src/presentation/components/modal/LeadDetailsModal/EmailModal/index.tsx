import React, { FormEvent } from 'react';
import { Formik, Form } from 'formik';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import * as Yup from 'yup';
import './index.scss';
import { useDispatch } from 'react-redux';
import { addEmail } from 'presentation/redux/actions/leadDetail/addEmail';

interface IAddEmailModal {
  close: () => void;
}

interface IEmailAddData {
  email: string;
}

const EmailModal: React.FC<IAddEmailModal> = ({ close }) => {
  const dispatch = useDispatch();

  const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').trim(),
  });

  const submitHandler = (value: IEmailAddData) => {
    dispatch(addEmail(value));
    close();
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={submitHandler}
      validationSchema={emailSchema}
    >
      {(props) => {
        const {
          values,
          dirty,
          handleChange,
          isValid,
          touched,
          errors,
          setFieldTouched,
        } = props;

        const handleChangeEmail = (event: FormEvent) => {
          handleChange(event);
          setFieldTouched('email', true, false);
        };

        return (
          <Form className="shared-form-email-container">
            <div className="clear">
              <Controls.Input
                name="email"
                label={getString('text.email')}
                value={values.email}
                onChange={handleChangeEmail}
                error={touched.email ? errors.email : ''}
                placeholder={getString('text.enterEmail')}
                fixedLabel
              />
            </div>

            <div className="clear">
              <Controls.Button
                type="submit"
                color="primary"
                className="clear__btn"
                disabled={!(isValid && dirty)}
                text={getString('text.addButton')}
              />

              <Controls.Button
                color="secondary"
                variant="text"
                className="clear__btn"
                text={getString('text.cancelButton')}
                onClick={close}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EmailModal;
