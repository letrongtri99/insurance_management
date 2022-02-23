import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import ButtonMultiSelect from 'presentation/components/controls/ButtonMultiSelect';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { Grid, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { FormikValues, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import ProvinceSelector from 'presentation/components/LeadDetails/ProvinceSelector';
import DistrictSelector from 'presentation/components/LeadDetails/DistrictSelector';
import SubDistrictSelector from 'presentation/components/LeadDetails/SubDistrictSelector';
import './index.scss';
import { array, mixed, object, string } from 'yup';
import { getLeadIdFromPath } from 'presentation/redux/epics/leadDetail/scheduleModal/scheduleModal.helper';
import { addAddress } from 'presentation/redux/actions/leadDetail/addressModal';
import LeadDetailRepository from 'data/repository/leadDetail';
import {
  AddressType,
  AddressUsage,
  AddressUsageList,
  getNameFromApi,
  getNameValue,
  isNameFromApi,
  getSubmitBody,
  initialFormData,
  setInitialName,
  validate,
  validateForm,
} from './helper';

const validationSchema = object().shape({
  addressUsage: array().required(
    getString('errors.required', { field: 'Address use' })
  ),
  addressType: string().required(
    getString('errors.required', { field: 'Address type' })
  ),
  firstName: string().when('addressType', {
    is: AddressType.COMPANY,
    then: string().notRequired(),
    otherwise: string().notRequired(),
  }),
  lastName: string().when('addressType', {
    is: AddressType.COMPANY,
    then: string().notRequired(),
    otherwise: string().notRequired(),
  }),
  companyName: string().when('addressType', {
    is: AddressType.COMPANY,
    then: string().required().trim(),
    otherwise: string().notRequired(),
  }),
  taxId: string().when('addressType', {
    is: AddressType.COMPANY,
    then: string().required().trim(),
    otherwise: string().notRequired(),
  }),
  address: string()
    .required(getString('errors.required', { field: 'Address' }))
    .trim(),
  province: mixed().required(
    getString('errors.required', { field: 'Province' })
  ),
  district: mixed().required(
    getString('errors.required', { field: 'District' })
  ),
  subDistrict: mixed().required(
    getString('errors.required', { field: 'Sub District' })
  ),
  postCode: string().required(
    getString('errors.required', { field: 'Postcode' })
  ),
});

const AddressModal: React.FC<{ close: () => void }> = ({ close }) => {
  const modalState = useSelector(
    (state: any) => state.leadsDetailReducer.addAddressReducer
  );
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisableFirstName, setIsDisableFirstName] = useState(false);
  const [isDisabledLastName, setIsDisableLastName] = useState(false);
  const [leadData, setLeadData] = useState<any>(null);
  const onSubmit = (formVal: FormikValues) => {
    dispatch(addAddress(getSubmitBody(formVal)));
    close();
  };

  useEffect(() => {
    // INFO: get latest lead information
    const leadDetailRepository = new LeadDetailRepository();
    const leadId = getLeadIdFromPath();
    leadDetailRepository.getAgent(leadId).subscribe((res: any) => {
      setLeadData(res);
    });
  }, []);

  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema,
    onSubmit,
    validate,
  });

  const handleSubDistrictChange = (e: ChangeEvent) => {
    const { postcode }: any = (e.target as HTMLSelectElement).value;
    if (postcode) {
      formik.setFieldValue('postCode', postcode);
      formik.setFieldError('postCode', undefined);
    } else {
      formik.setFieldError(
        'postCode',
        getString('errors.required', { field: 'Postcode' })
      );
    }
    setTimeout(() => formik.setFieldTouched('postCode', true));
    formik.handleChange(e);
  };

  useEffect(() => {
    const { addressUsage } = formik.values;
    if (leadData) {
      const { policyFirstName, policyLastName } = getNameFromApi(leadData);
      const { lastName, firstName } = setInitialName(
        addressUsage,
        getNameValue(
          addressUsage,
          policyFirstName,
          formik.values.firstName as string
        ),
        getNameValue(
          addressUsage,
          policyLastName,
          formik.values.lastName as string
        ),
        Boolean(isNameFromApi(policyFirstName, policyLastName))
      );
      formik.setValues({
        ...formik.values,
        firstName: firstName.value,
        lastName: lastName.value,
      });
      setIsDisableFirstName(firstName.disabled);
      setIsDisableLastName(lastName.disabled);
    }
  }, [formik.values.addressUsage]);

  useMemo(() => {
    const { addressType } = formik.values;
    if (addressType === AddressType.COMPANY) {
      formik.setFieldValue('companyName', '');
      formik.setFieldValue('taxId', '');
    } else {
      formik.setFieldValue('companyName', undefined);
      formik.setFieldValue('taxId', undefined);
    }
  }, [formik.values.addressType]);

  useEffect(() => {
    if (modalState.success && !modalState.data.error && isSubmitted) {
      close();
      setIsSubmitted(false);
    }
  }, [modalState]);

  const isValid = useMemo(() => {
    return validateForm(formik.values);
  }, [formik.values]);

  return (
    <div className="address-modal" data-testid="add-address-modal">
      <form onSubmit={formik.handleSubmit}>
        <p className="address-modal__label">
          {getString('text.addressUseMultiple')}
        </p>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <ButtonMultiSelect
            items={AddressUsageList}
            onChange={formik.handleChange}
            value={formik.values.addressUsage}
            name="addressUsage"
          />
        </Grid>

        <p className="address-modal__label" data-testid="add-address-label">
          {getString('text.addressType')}
        </p>
        <RadioGroup
          className="radio-group"
          aria-label="gender"
          name="addressType"
          onChange={formik.handleChange}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs>
              <FormControlLabel
                checked={formik.values.addressType === AddressType.PERSONAL}
                value={AddressType.PERSONAL}
                control={<Radio />}
                className={
                  formik.values.addressType === AddressType.PERSONAL
                    ? 'radio-button-checked'
                    : ''
                }
                label={getString('text.personal')}
              />
            </Grid>
            <Grid item xs>
              <FormControlLabel
                checked={formik.values.addressType === AddressType.COMPANY}
                value={AddressType.COMPANY}
                control={<Radio />}
                className={
                  formik.values.addressType === AddressType.COMPANY
                    ? 'radio-button-checked'
                    : ''
                }
                label={getString('text.company')}
              />
            </Grid>
            <Grid item xs>
              <FormControlLabel
                checked={formik.values.addressType === AddressType.OTHER}
                value={AddressType.OTHER}
                control={<Radio />}
                className={
                  formik.values.addressType === AddressType.OTHER
                    ? 'radio-button-checked'
                    : ''
                }
                label={getString('text.other')}
              />
            </Grid>
          </Grid>
        </RadioGroup>
        <Grid container>
          {formik.values.addressType === AddressType.COMPANY ? (
            <>
              <Grid item xs={12} md={12} className="form-input">
                <Controls.Input
                  name="companyName"
                  label={getString('text.companyName')}
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  placeholder={getString('text.enterCompanyName')}
                  fixedLabel
                />
              </Grid>

              <Grid item xs={12} md={12} className="form-input">
                <Controls.Input
                  name="taxId"
                  label={getString('text.taxId')}
                  value={formik.values.taxId}
                  onChange={formik.handleChange}
                  placeholder={getString('text.enterTaxId')}
                  fixedLabel
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={12} className="form-input">
                <Controls.Input
                  name="firstName"
                  label={getString('text.firstName')}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  placeholder={getString('text.enterFirstName')}
                  fixedLabel
                  error={
                    formik.touched.firstName ? formik.errors.firstName : ''
                  }
                  disabled={isDisableFirstName}
                  onKeyUp={() => {
                    formik.setFieldTouched('firstName', true, false);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12} className="form-input">
                <Controls.Input
                  name="lastName"
                  label={getString('text.lastName')}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  placeholder={getString('text.enterLastName')}
                  fixedLabel
                  error={formik.touched.lastName ? formik.errors.lastName : ''}
                  disabled={isDisabledLastName}
                  onKeyUp={() => {
                    formik.setFieldTouched('lastName', true, false);
                  }}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={12} className="form-input">
            <Controls.Input
              name="address"
              label={getString('text.address')}
              value={formik.values.address}
              onChange={formik.handleChange}
              placeholder={getString('text.enterAddress')}
              fixedLabel
            />
          </Grid>

          <Grid item xs={12} md={12} className="form-input">
            <ProvinceSelector
              name="province"
              label={getString('text.province')}
              placeholder={getString('text.select')}
              value={formik.values.province}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} md={12} className="form-input">
            <DistrictSelector
              name="district"
              label={getString('text.district')}
              placeholder={getString('text.select')}
              value={formik.values.district}
              onChange={formik.handleChange}
              provinceId={formik.values.province?.name}
              disabled={!formik.values.province}
            />
          </Grid>

          <Grid item xs={12} md={12} className="form-input">
            <SubDistrictSelector
              name="subDistrict"
              label={getString('text.subDistrict')}
              placeholder={getString('text.select')}
              value={formik.values.subDistrict}
              onChange={handleSubDistrictChange}
              districtId={formik.values.district?.name}
              disabled={!formik.values.province}
            />
          </Grid>

          <Grid item xs={12} md={12} className="form-input">
            <Controls.Input
              name="postCode"
              label={getString('text.postcode')}
              value={formik.values.postCode}
              disabled
              fixedLabel
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          className="button-group"
        >
          <Controls.Button
            className="button-group__btn add-address-cancel"
            color="secondary"
            variant="text"
            data-testid="add-address-cancel"
            text={getString('text.cancelButton')}
            onClick={close}
          />

          <Controls.Button
            className="button-group__btn"
            data-testid="add-address-submit"
            type="submit"
            color="primary"
            disabled={!isValid}
            text={getString('text.addButton')}
          />
        </Grid>
      </form>
    </div>
  );
};

export default AddressModal;
