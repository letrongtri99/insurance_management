import React from 'react';
import { FormControl, Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import './index.scss';
import { addCoupon } from 'presentation/redux/actions/leadDetail/coupon';
import { useDispatch } from 'react-redux';

interface IProps {
  close: (isClose: boolean) => void;
  leadStatus: string;
}

const CouponModal: React.FC<IProps> = ({ close, leadStatus }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    close(false);
  };
  const handleSubmit = (coupon: string) => {
    const patchParams = {
      voucher: coupon,
    };
    dispatch(addCoupon(patchParams));
    closeModal();
  };

  const couponSchema = Yup.object().shape({
    coupon: Yup.string().trim().required('Required'),
  });

  const isDisableInput = () => {
    return [
      'LEAD_STATUS_PENDING_PAYMENT',
      'LEAD_STATUS_PURCHASED',
      'LEAD_STATUS_CANCELLED',
    ].includes(leadStatus);
  };
  return (
    <>
      <Formik
        initialValues={{
          coupon: '',
        }}
        onSubmit={() => closeModal()}
        validationSchema={couponSchema}
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
          } = props;

          return (
            <Form className="lead-add-coupon">
              <FormControl
                margin="normal"
                required
                className={isDisableInput() ? 'disabled-input' : ''}
                style={{ position: 'relative' }}
              >
                <Controls.Input
                  label={getString('text.couponCode')}
                  name="coupon"
                  value={values.coupon}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  error={touched.coupon ? errors.coupon : ''}
                  placeholder={getString('text.enterCoupon')}
                  fixedLabel
                  disabled={isDisableInput()}
                />
              </FormControl>
              <Grid container item xs={12} md={12} className="button-group">
                {isDisableInput}
                <Controls.Button
                  className="button-group__btn"
                  text={getString('text.cancelButton')}
                  color="secondary"
                  variant="text"
                  onClick={() => closeModal()}
                />
                <Controls.Button
                  className="button-group__btn"
                  color="primary"
                  disabled={!(isValid && dirty)}
                  onClick={() => handleSubmit(values.coupon)}
                  text={getString('text.apply')}
                />
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CouponModal;
