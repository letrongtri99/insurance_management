import React, { useEffect, useMemo } from 'react';
import { Grid, FormControl } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import './index.scss';
import { Formik, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as Yup from 'yup';
import { getLeadSource } from '../../redux/actions/leads/sources';
import {
  ICreateLead,
  ILeadSourcesReponse,
} from '../../../shared/interfaces/common/lead/sources';
import {
  PAGE_SIZE_GET_SOURCE,
  IFormValue,
  addLeadInitialValue,
  firstProduct,
  customFormValue,
} from './addLead.helper';
import { showSnackBar } from '../../redux/actions/ui';
import LeadRepository from '../../../data/repository/lead';

interface IProps {
  close: (isClose: boolean) => void;
  callBackAddLead: (id: string) => void;
}
const PHONE_PATTERN = /^(0)\d{9}$/;

const addLeadSchema = Yup.object().shape({
  firstName: Yup.string().trim().required(getString('text.requiredFirstName')),
  lastName: Yup.string().trim().required(getString('text.requiredLastName')),
  phone: Yup.string()
    .matches(PHONE_PATTERN, getString('text.validatePhone'))
    .required(getString('text.requiredPhone'))
    .trim(),
  email: Yup.string().email(getString('text.invalidEmail2')).trim(),
  reference: Yup.string().trim(),
  source: Yup.object().shape({
    title: Yup.string().trim().required(getString('text.required')),
  }),
});

const useStyles = makeStyles({
  popper: {
    border: '1px solid grey !important',
  },
});

const clearSub$ = new Subject();

const AddLead: React.FC<IProps> = ({ close, callBackAddLead }) => {
  const dispatch = useDispatch();
  const sources = useSelector(
    (state: any) => state.leadSourceReducer?.listReducer?.data || []
  ) as ILeadSourcesReponse[];
  const closeModal = () => {
    close(false);
  };

  const product = useSelector(
    (state: any) =>
      state.typeSelectorReducer.globalProductSelectorReducer?.data || ''
  );

  const searchSourceByProduct = (value: string) => {
    dispatch(
      getLeadSource({
        pageSize: PAGE_SIZE_GET_SOURCE,
        filter: `online= false product in ("${value}")`,
      })
    );
  };

  useEffect(() => {
    searchSourceByProduct(firstProduct);
  }, []);

  const sourceOption = useMemo(() => {
    const sourceCustomFields = sources.map((item, index: number) => {
      return {
        id: index,
        title: item.source,
        value: item.name,
      };
    });
    return sourceCustomFields;
  }, [sources]);

  const handleResultSubmitForm = (submitResult: any) => {
    const { data } = submitResult;
    closeModal();
    callBackAddLead(data.humanId || '');
    dispatch(
      showSnackBar({
        isOpen: true,
        message: getString('text.addLeadSuccess'),
        status: 'success',
      })
    );
  };

  const handleError = (error: any) => {
    dispatch(
      showSnackBar({
        isOpen: true,
        message: error.message || getString('text.createLeadFail'),
        status: 'error',
      })
    );
  };

  const handleSubmit = (formValue: IFormValue) => {
    const form = customFormValue(formValue);
    const newForm = { ...form, product };
    const leadRepository = new LeadRepository();
    leadRepository
      .createLead(newForm as ICreateLead)
      .pipe(takeUntil(clearSub$))
      .subscribe(handleResultSubmitForm, handleError);
  };

  useEffect(() => {
    return () => {
      clearSub$.next(true);
    };
  });

  const classes = useStyles();
  return (
    <Formik
      initialValues={addLeadInitialValue}
      onSubmit={handleSubmit}
      validationSchema={addLeadSchema}
      validateOnBlur
    >
      {(props) => {
        const {
          values,
          isValid,
          handleChange,
          dirty,
          setFieldTouched,
          touched,
          errors,
        } = props;

        return (
          <Form className="lead-add-lead">
            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.firstNameAsterisk')}
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName ? errors.firstName : ''}
                fixedLabel
                placeholder={getString('text.input')}
                onKeyUp={() => setFieldTouched('firstName', true, false)}
              />
            </FormControl>
            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.lastNameAsterisk')}
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                error={touched.lastName ? errors.lastName : ''}
                fixedLabel
                placeholder={getString('text.input')}
                onKeyUp={() => setFieldTouched('lastName', true, false)}
              />
            </FormControl>
            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.phoneAsterisk')}
                name="phone"
                value={values.phone}
                onChange={handleChange}
                error={touched.phone ? errors.phone : ''}
                onKeyUp={() => setFieldTouched('phone', true, false)}
                placeholder={getString('text.input')}
                fixedLabel
              />
            </FormControl>
            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.email')}
                name="email"
                onChange={handleChange}
                value={values.email}
                onKeyUp={() => setFieldTouched('email', true, false)}
                error={touched.email ? errors.email : ''}
                placeholder={getString('text.input')}
                fixedLabel
              />
            </FormControl>
            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.referenceId')}
                name="reference"
                value={values.reference}
                onChange={handleChange}
                onKeyUp={() => setFieldTouched('reference', true, false)}
                error={touched.reference ? errors.reference : ''}
                placeholder={getString('text.input')}
                fixedLabel
              />
            </FormControl>
            <FormControl margin="normal" required>
              <Controls.TypeSelector
                popper="none"
                name="source"
                label={getString('text.leadSourceAsterisk')}
                value={values.source}
                onChange={handleChange}
                onKeyUp={() => setFieldTouched('source', true, false)}
                margin="none"
                multiple={false}
                disableCloseOnSelect={false}
                options={values.product ? sourceOption : []}
                classes={{ popper: classes.popper }}
                fixedLabel
              />
            </FormControl>

            <Grid item xs={12} md={12}>
              <div className="button-list">
                <Controls.Button
                  text={getString('text.closeButton')}
                  color="secondary"
                  variant="text"
                  onClick={() => closeModal()}
                />
                <Controls.Button
                  color="primary"
                  disabled={!(isValid && dirty)}
                  onClick={() => handleSubmit(values)}
                  text={getString('text.addLeadButton')}
                />
              </div>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddLead;
