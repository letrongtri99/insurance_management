import Controls from 'presentation/components/controls/Control';
import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { FormControl, makeStyles } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AdminUserCloud from 'data/repository/admin/user/cloud';
import { getString } from 'presentation/theme/localization';
import './leadPageAddLead.scss';
import { mergeMap } from 'rxjs/operators';
import { IGetTeamByUser, ITeamInfo } from 'shared/interfaces/common/admin/user';
import { LeadTypeFilter } from 'shared/helper/utilities';
import {
  firstProduct,
  ISelect,
  PAGE_SIZE_GET_SOURCE,
} from 'presentation/modules/addLead/addLead.helper';
import { getLeadSource } from '../../redux/actions/leads/sources';
import { ILeadSourcesReponse } from '../../../shared/interfaces/common/lead/sources';

const PHONE_PATTERN = /^(0)\d{9}$/;

interface IProps {
  callBackAddLead: (value: IFormAddLead) => void;
  close: (isClose: boolean) => void;
}

export interface IFormAddLead {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  reference: string;
  source: ISelect;
  product?: string;
  type?: string;
}

const LeadPageAddLead: React.FC<IProps> = ({ callBackAddLead, close }) => {
  const [formData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    reference: '',
    source: {},
  });

  const user = useSelector(
    (state: any) => state?.authReducer?.data?.user || {}
  );

  const dispatch = useDispatch();

  const useStyles = makeStyles({
    popper: {
      border: '1px solid grey !important',
    },
  });

  const classes = useStyles();

  const sources = useSelector(
    (state: any) => state.leadSourceReducer?.listReducer?.data || []
  ) as ILeadSourcesReponse[];

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

  const getTeamId = (teamByUser: IGetTeamByUser) => {
    const ONLY_MEMBER = 0;
    let teamId = '';
    if (teamByUser.members) {
      teamId = teamByUser.members[ONLY_MEMBER].name.substring(
        0,
        teamByUser.members[ONLY_MEMBER].name.indexOf('/members')
      );
    }
    return teamId;
  };

  const getLeadTypeValue = (leadType: string) => {
    let leadTypeValue = '';
    LeadTypeFilter.forEach((item) => {
      if (item.value === leadType) {
        leadTypeValue = item.leadType;
      }
    });

    return leadTypeValue;
  };

  const handleSubmit = (value: IFormAddLead) => {
    if (user) {
      const { name } = user;
      const teamFilter = encodeURI(`filter=user="${name}"`);
      AdminUserCloud.getTeamByUser(teamFilter)
        .pipe(
          mergeMap((res) => {
            const teamId = getTeamId(res as IGetTeamByUser) || '';

            return AdminUserCloud.getTeamInfo(teamId);
          })
        )
        .subscribe((res) => {
          const newValue = { ...value };
          newValue.product = (res as unknown as ITeamInfo).productType;
          newValue.type = getLeadTypeValue(
            (res as unknown as ITeamInfo).leadType
          );
          callBackAddLead(newValue);
        });
    }
  };
  const handleCloseButton = () => {
    close(false);
  };

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

  return (
    <Formik
      initialValues={{
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        reference: formData.reference,
        source: formData.source,
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .trim()
          .required('First name is a required field'),
        lastName: Yup.string().trim().required('Last name is a required field'),
        phone: Yup.string()
          .matches(
            PHONE_PATTERN,
            'Phone number should be 10 digits and start with 0'
          )
          .required('Phone is a required field')
          .trim(),
        email: Yup.string().email('Invalid email').trim(),
        reference: Yup.string().trim(),
        source: Yup.object().shape({
          title: Yup.string().trim().required('Required'),
        }),
      })}
    >
      {(props) => {
        const {
          values,
          isValid,
          dirty,
          handleChange,
          errors,
          touched,
          setFieldTouched,
        } = props;

        const change = (name: string, e: FormEvent) => {
          e.persist();
          handleChange(e);
          setFieldTouched(name, true, false);
        };

        return (
          <Form className="lead-page-add-lead">
            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.firstNameAsterisk')}
                name="firstName"
                value={values.firstName}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={change.bind(null, 'firstName')}
                error={touched.firstName ? errors.firstName : ''}
                placeholder={getString('text.input')}
                fixedLabel
              />
            </FormControl>
            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.lastNameAsterisk')}
                name="lastName"
                value={values.lastName}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={change.bind(null, 'lastName')}
                error={touched.lastName ? errors.lastName : ''}
                placeholder={getString('text.input')}
                fixedLabel
              />
            </FormControl>
            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.phoneAsterisk')}
                name="phone"
                value={values.phone}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={change.bind(null, 'phone')}
                error={touched.phone ? errors.phone : ''}
                placeholder={getString('text.input')}
                fixedLabel
              />
            </FormControl>
            <FormControl margin="normal" required>
              <Controls.Input
                label={getString('text.email')}
                name="email"
                value={values.email}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={change.bind(null, 'email')}
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
                // eslint-disable-next-line react/jsx-no-bind
                onChange={change.bind(null, 'reference')}
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
                margin="none"
                multiple={false}
                disableCloseOnSelect={false}
                options={sourceOption}
                classes={{ popper: classes.popper }}
                fixedLabel
              />
            </FormControl>
            <div className="button-group">
              <Controls.Button
                color="primary"
                text={getString('text.cancelButton')}
                onClick={() => handleCloseButton()}
              />
              <Controls.Button
                type="submit"
                color="primary"
                disabled={!(isValid && dirty)}
                text={getString('text.add')}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state: any) => ({ propsData: state });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeadPageAddLead);
