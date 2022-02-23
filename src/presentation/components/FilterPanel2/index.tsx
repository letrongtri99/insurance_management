import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  withTheme,
  ExpansionPanel as Accordion,
  ExpansionPanelSummary as MuiAccordionSummary,
  ExpansionPanelDetails as MuiAccordionDetails,
} from '@material-ui/core';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { showSnackBar } from 'presentation/redux/actions/ui';
import UsersRepository from 'data/repository/admin/user';
import OrderDetailRepository from 'data/repository/orderDetail';
import { TypeAssign } from 'presentation/components/TableAllLead/TableAllLead.helper';
import Controls from 'presentation/components/controls/Control';
import * as CONSTANTS from 'shared/constants';
import { OrderType } from 'shared/constants/orderType';
import { clearSelectedOrders } from 'presentation/redux/actions/orders/assignAgent';
import CommonModal from 'presentation/components/modal/CommonModal';
import AssignModal from 'presentation/components/TableAllLead/assignModal';
import {
  getRoleAgent,
  getNotificationSuccess,
  getNotificationFailed,
  getPayloadAssign,
  getUsersByRole,
  showRenderAgentName,
  getDisable,
} from 'presentation/components/FilterPanel2/Filterpanel.helper';
import { SelectElement } from 'shared/types/controls';
import useRefetchOrderList from './useRefetchOrderList';
import { IFilterFormField } from './FilterField';
import Button from '../Button';
import { getString } from '../../theme/localization';

import './index.scss';
import { clearSliderValue } from '../controls/Slider/Slider.helper';

const FormikWrapper = styled.div`
  &&& {
    width: 100%;
    .MuiCollapse-wrapper {
      padding: 15px 0;
    }
  }
`;

const AccordionSummary = styled(MuiAccordionSummary)`
  &&& {
    padding: 15px 40px;
    cursor: default;
    .MuiExpansionPanelSummary-content {
      margin: 0;
    }
    .MuiButton-containedPrimary .MuiButton-label {
      color: inherit;
    }
  }
  &&&.Mui-focused {
    background-color: transparent;
  }
`;

const AccordionDetails = withTheme(styled(MuiAccordionDetails)`
  &&& {
    padding: ${({ theme }) => theme.spacing(0, 10, 3, 10)};
  }
`);

const CollapseButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  visibility: visible;
  outline: none;
`;

enum fieldNames {
  search = 'search',
  searchKey = 'search.key',
  createTime = 'createTime',
  searchValue = 'search.value',
  startDate = 'date.startDate',
  endDate = 'date.endDate',
}

export interface IFilterPanelProps {
  fields: IFilterFormField[];
  initialValues: any;
  onSubmit: (values: any) => void;
  validationSchema?: any;
  onReset?: (values: any) => void;
  onChangeValue?: (values: any) => void;
  isOrderPage?: boolean;
  assignType?: OrderType;
}

export const RenderAgentName = ({ assignType }: { assignType?: OrderType }) => {
  const dispatch = useDispatch();
  const [agentList, setAgentList] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [statusAssign, setStatusAssign] = useState<TypeAssign | string>('');
  const [agentName, setAgentName] = useState('');
  const { refetchList } = useRefetchOrderList();
  const listCheckBox = useSelector((state: any) =>
    state.ordersReducer.orderAssignAgentReducer.listCheckBox.map(
      (order: any) => order.id
    )
  );

  useEffect(() => {
    dispatch(clearSelectedOrders());
  }, [dispatch]);

  useEffect(() => {
    const userRepository = new UsersRepository();
    const subscription = userRepository
      .lookUpUserByRole(getRoleAgent(assignType))
      .subscribe((res: any) => {
        const selectData = getUsersByRole(res.selectData);
        setAgentList(selectData);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [assignType]);

  const confirmAssign = (status: TypeAssign) => {
    setStatusAssign(status);
    setShowConfirmModal(true);
  };

  const assignOrderToAgent = (status: TypeAssign | string) => {
    setShowConfirmModal(false);
    const orderDetailRepository = new OrderDetailRepository();

    const payload = getPayloadAssign(
      listCheckBox,
      status,
      agentName,
      assignType
    );

    orderDetailRepository.assignOrder(payload).subscribe(
      () => {
        refetchList(assignType);
        dispatch(
          showSnackBar({
            isOpen: true,
            message: getNotificationSuccess(status),
            status: CONSTANTS.snackBarConfig.type.success,
          })
        );
      },
      () => {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: getNotificationFailed(status),
            status: CONSTANTS.snackBarConfig.type.error,
          })
        );
      }
    );
  };

  const handleAgentNameChange = (event: React.ChangeEvent<SelectElement>) =>
    setAgentName(event.target.value as string);

  return (
    <Grid container item xs={12} spacing={4} data-testid="agent-name">
      <Grid item xs={3} style={{ marginTop: 20 }}>
        <Controls.Select
          options={agentList}
          label={getString('text.agentName')}
          name="agentName"
          value={agentName}
          onChange={handleAgentNameChange}
          fixedLabel
          selectField="key"
        />
      </Grid>
      <Grid container item xs={3} justify="flex-end" style={{ marginTop: 38 }}>
        <Controls.Button
          disabled={getDisable(agentName, listCheckBox)}
          text={getString('text.assign')}
          color="primary"
          onClick={() => confirmAssign(TypeAssign.ASSIGN)}
          data-testid="assign-btn"
          style={{ textTransform: 'uppercase' }}
        />
        <Controls.Button
          disabled={listCheckBox.length === 0}
          text={getString('text.unassign')}
          color="primary"
          onClick={() => confirmAssign(TypeAssign.UNASSIGN)}
          data-testid="unassign-btn"
          style={{ textTransform: 'uppercase' }}
        />
        <CommonModal
          title=""
          open={showConfirmModal}
          handleCloseModal={() => {
            setShowConfirmModal(false);
          }}
        >
          <AssignModal
            closeModal={() => setShowConfirmModal(false)}
            type={statusAssign}
            quantity={listCheckBox.length}
            handleConfirm={() => assignOrderToAgent(statusAssign)}
            typeAssign="order"
          />
        </CommonModal>
      </Grid>
    </Grid>
  );
};

const FilterPanel: React.FC<IFilterPanelProps> = ({
  fields,
  onReset,
  onSubmit,
  initialValues,
  onChangeValue,
  validationSchema,
  isOrderPage,
  assignType,
}: IFilterPanelProps) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<boolean>(true);

  const formik = useFormik({
    onReset,
    onSubmit,
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    if (onChangeValue) onChangeValue(formik.values);
  }, [formik.values, onChangeValue]);

  const handleChange = async (
    fieldName: string | ChangeEvent<HTMLInputElement>,
    value: any,
    action: string
  ) => {
    if (
      (fieldName === fieldNames.startDate && value?.criteria === '') ||
      (fieldName === fieldNames.endDate && value?.criteria === '') ||
      (fieldName === fieldNames.createTime && value?.criteria === '')
    ) {
      return formik.setFieldValue(fieldName, {
        criteria: '',
        range: { startDate: null, endDate: null },
      });
    }

    if (fieldName === fieldNames.search) {
      if (action) {
        return formik.setFieldValue(fieldName, { key: '', value: '' });
      }

      if (value.key && !value.value) {
        await formik.setFieldValue(`${fieldName}`, value);
        return formik.setFieldError(
          fieldNames.searchValue,
          t('errorMessage.inputInvalid')
        );
      }
      if (!value.key && value.value) {
        await formik.setFieldValue(`${fieldName}`, value);
        return formik.setFieldError(
          fieldNames.searchKey,
          t('errorMessage.selectInvalid')
        );
      }
    }

    if (typeof fieldName !== 'string' && fieldName.target) {
      return formik.setFieldValue(
        fieldName.target.name,
        fieldName.target.value
      );
    }

    return formik.setFieldValue(`${fieldName}`, value);
  };

  const Buttons = useMemo(() => {
    const isValidSearch = !formik.dirty || (formik.dirty && !formik.isValid);
    const isValidReset = !formik.dirty;

    return (
      <Grid
        container
        item
        xs={6}
        md={3}
        justify="flex-end"
        className="filter-panel-button"
      >
        <Button
          type="reset"
          color="secondary"
          disabled={isValidReset}
          variant="contained"
          onClick={(event: React.ChangeEvent) => {
            clearSliderValue.next(true);
            formik.handleReset(event);
          }}
          data-testid="reset-btn"
        >
          {getString('text.clearAll')}
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={isValidSearch}
          variant="contained"
          onClick={formik.handleSubmit}
        >
          {getString('text.search')}
        </Button>
      </Grid>
    );
  }, [formik]);

  const renderFieldsSummary = () => {
    return fields.map(({ InputComponent, inputProps }: IFilterFormField) => {
      const { filterType, name, responsive, options, ...rest } = inputProps;
      const formatOptions = options?.map((item) => {
        return {
          ...item,
          title: getString(item.title),
        };
      });
      if (filterType === 'summary') {
        return (
          <Grid container item {...responsive} key={name}>
            <InputComponent
              name={name}
              {...rest}
              options={formatOptions}
              error={formik.errors[name]}
              value={formik.values[name]}
              onError={formik.setErrors}
              onChange={handleChange}
            />
          </Grid>
        );
      }

      return null;
    });
  };

  const renderFieldsDetail = () => {
    return fields.map(({ InputComponent, inputProps }: IFilterFormField) => {
      const { filterType, name, responsive } = inputProps;

      if (filterType === 'detail') {
        return (
          <Grid
            container
            item
            {...responsive}
            key={name}
            style={{ marginTop: 20 }}
          >
            <InputComponent
              {...inputProps}
              error={formik.errors[name]}
              value={formik.values[name]}
              onChange={handleChange}
            />
          </Grid>
        );
      }

      if (filterType === 'detail-empty') {
        return (
          <Grid
            container
            item
            {...responsive}
            key={name}
            style={{ marginTop: 20 }}
          />
        );
      }

      return null;
    });
  };

  const renderAccordion = () => {
    return (
      <Accordion expanded={expanded} style={{ padding: '15px 0' }}>
        <AccordionSummary>
          <Grid container spacing={5} justify="space-between">
            {renderFieldsSummary()}
            {Buttons}
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={5}>
            {renderFieldsDetail()}
            {showRenderAgentName(isOrderPage, assignType)}
          </Grid>
        </AccordionDetails>
        <CollapseButton
          data-testid="collapse-button"
          type="button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <KeyboardArrowUp color="secondary" />
          ) : (
            <KeyboardArrowDown color="secondary" />
          )}
        </CollapseButton>
      </Accordion>
    );
  };

  return (
    <FormikWrapper data-testid="filter-panel">
      <form onSubmit={formik.submitForm}>{renderAccordion()}</form>
    </FormikWrapper>
  );
};

export default FilterPanel;
