import React, { FormEvent } from 'react';
import { FormControl, Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import './index.scss';
import { addPhone } from 'presentation/redux/actions/leadDetail/phone';
import { useDispatch } from 'react-redux';

const PHONE_PATTERN = /^(0)\d{8,9}$/;

interface IProps {
  close: () => void;
}

interface IFormValue {
  phone: string;
}

const PhoneModal: React.FC<IProps> = ({ close }) => {
  const dispatch = useDispatch();

  const handleSubmit = (phone: string) => {
    const phoneData: IFormValue = {
      phone,
    };
    dispatch(addPhone(phoneData));
    close();
  };

  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(
        PHONE_PATTERN,
        'Phone number should be 9 or 10 digits and start with 0'
      )
      .trim()
      .required('Required'),
  });

  return (
    <Formik
      initialValues={{
        phone: '',
      }}
      onSubmit={close}
      validationSchema={phoneSchema}
    >
      {(props) => {
        const {
          values,
          isValid,
          errors,
          touched,
          handleChange,
          handleBlur,
          dirty,
          setFieldTouched,
        } = props;

        const handleChangeNumber = (event: FormEvent) => {
          event.persist();
          handleChange(event);
          setFieldTouched('phone', true, false);
        };

        const handleKeyPress = (event: React.KeyboardEvent) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        };

        return (
          <Form className="lead-add-phone">
            <FormControl
              margin="normal"
              required
              style={{ position: 'relative' }}
            >
              <Controls.Input
                onKeyPress={handleKeyPress}
                label={getString('text.phoneNumber')}
                name="phone"
                value={values.phone}
                onChange={handleChangeNumber}
                onBlur={handleBlur}
                margin="normal"
                error={touched.phone ? errors.phone : ''}
                placeholder={getString('text.enterPhoneNumber')}
                fixedLabel
              />
            </FormControl>
            <Grid container item xs={12} md={12} className="button-group">
              <Controls.Button
                className="button-group__btn"
                text={getString('text.cancelButton')}
                color="secondary"
                variant="text"
                onClick={close}
              />
              <Controls.Button
                className="button-group__btn"
                color="primary"
                disabled={!(isValid && dirty)}
                onClick={() => handleSubmit(values.phone)}
                text={getString('text.addButton')}
              />
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PhoneModal;
