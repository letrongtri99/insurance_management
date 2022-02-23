import {
  Paper as MuiPaper,
  withTheme,
  Input,
  IconButton,
} from '@material-ui/core';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss';
import { getString } from 'presentation/theme/localization';
import { thaiDateFormat } from 'shared/helper/thaiDateFormat';
import { provinceAbbreviationCollection } from 'shared/constants/provinceAbbreviation';
import RenderInputTextItem from 'presentation/pages/OrderDetailPage/InfoPanel/RenderInputTextItem';
import RenderInputDateItem from 'presentation/pages/OrderDetailPage/InfoPanel/RenderInputDateItem';
import CommonModal from 'presentation/components/modal/CommonModal';
import { getCarDetail } from 'presentation/redux/actions/carDetail';
import { getProvince } from 'presentation/redux/actions/provinceDetail';
import { updateOrder } from 'presentation/redux/actions/order';
import styled from 'styled-components';
import { capitalizeFirstLetter } from 'shared/helper/utilities';
import PenIcon from '../svgicons/PenIcon';
import FileSearchIcon from '../svgicons/FileSearchIcon';

const Paper = withTheme(styled(MuiPaper)`
  &&& {
    height: 100%;
    border: 1px solid ${({ theme }) => theme.palette.grey[200]};
    border-radius: 6px;
  }
`);

const SubTitleInfo = styled.h3`
  margin: 0;
`;

const UnitLicensePlate = styled.span`
  padding: 4px;
  background: ${({ theme }) => theme.palette.grey[200]};
`;

const VehicleInfoTitle = styled.h3`
  margin: 0;
  padding: 10px 15px;
  color: ${({ theme }) => theme.palette.primary.main};
  background: ${({ theme }) => theme.palette.grey[200]};
  border-radius: 6px 6px 0 0;
`;

const VehicleInfoField = withTheme(styled.div`
  &&& {
    display: flex;
    padding: 10px 15px;
    align-items: flex-start;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
  }
`);

const FieldItem = withTheme(styled.span`
  &&& {
    width: 50%;
    display: flex;
    align-items: center;

    fieldset {
      border: none;
    }

    .MuiAutocomplete-inputRoot {
      .MuiInputBase-input {
        border: 0;
      }
    }

    .shared-select,
    .shared-input {
      border-radius: 4px;
    }
  }
`);

const FieldInput = styled(Input)`
  &&& {
    margin-right: 10px;
    width: 80%;

    input {
      padding-top: 0px;
      margin-left: 3px;
    }
  }
`;

const LeftLicensePlateInput = styled(Input)`
  &&& {
    width: 35%;

    input {
      text-align: center;
    }
  }
`;

const RightLicensePlateInput = styled(Input)`
  &&& {
    width: 45%;

    input {
      text-align: center;
    }
  }
`;

const EditButton = styled(IconButton)`
  &&& {
    padding: 1px;
  }
`;

const Colon = styled.span`
  padding-bottom: 6px;
`;

const RenderInputPolicyItem: React.FC<any> = ({ valueText }: any) => {
  const [openModal, setOpenModal] = useState(false);

  const setOpenCloseModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <FieldItem>
      <Colon>: </Colon>
      <FieldInput readOnly disableUnderline value={valueText} />

      <EditButton onClick={setOpenCloseModal}>
        <FileSearchIcon />
      </EditButton>
      <CommonModal
        title={getString('text.detailPolicy')}
        open={openModal}
        handleCloseModal={setOpenCloseModal}
      >
        <div>{getString('text.detailPolicy')}</div>
      </CommonModal>
    </FieldItem>
  );
};

const RenderInputLicensePlate: React.FC<any> = ({
  licenseNo,
  name = '',
  handleOnEnter = () => null,
  handleOnBlur = () => null,
  registeredProvince = undefined,
}) => {
  const [isEditText, setIsEditText] = useState(false);
  const [leftInput, setLeftInput] = useState('');
  const [rightInput, setRightInput] = useState('');
  const [abbr, setAbbr] = React.useState<string>('');

  useEffect(() => {
    if (registeredProvince) {
      const province = provinceAbbreviationCollection().find(
        (p) => p.oic === registeredProvince
      );
      setAbbr(province?.abbreviation || '');
    }
  }, [registeredProvince]);

  useEffect(() => {
    if (licenseNo) {
      const licenseStr = licenseNo?.split(' ')[0] || '';
      setLeftInput(licenseStr.split('-')[0] || '');
      setRightInput(licenseStr.split('-')[1] || '');
    }
  }, [licenseNo]);

  const makeTextEditable = () => {
    setIsEditText(!isEditText);
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    const { value } = e.target;

    if (type === 'left') {
      setLeftInput(value);
    } else {
      setRightInput(value);
    }
  };

  const onEnter = (ev: any) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      handleOnEnter({
        name,
        value: `${leftInput}-${rightInput} ${abbr}`,
      });
      setIsEditText(false);
    }
  };

  const onBlur = () => {
    handleOnBlur({
      name,
      value: `${leftInput}-${rightInput} ${abbr}`,
    });
  };

  return (
    <FieldItem
      style={{
        position: 'relative',
        alignItems: 'baseline',
        justifyContent: 'space-around',
        paddingRight: '30px',
      }}
    >
      <span>: </span>
      <LeftLicensePlateInput
        readOnly={!isEditText}
        onChange={(event) => {
          handleChangeInput(event, 'left');
        }}
        value={leftInput}
        onKeyPress={onEnter}
        onBlur={onBlur}
      />
      <span> - </span>
      <RightLicensePlateInput
        readOnly={!isEditText}
        onChange={(event) => {
          handleChangeInput(event, 'right');
        }}
        value={rightInput}
        onKeyPress={onEnter}
        onBlur={onBlur}
      />
      <UnitLicensePlate>{abbr}</UnitLicensePlate>
      <EditButton
        onClick={makeTextEditable}
        style={{ position: 'absolute', right: '0px' }}
      >
        <PenIcon fontSize="small" color="primary" />
      </EditButton>
    </FieldItem>
  );
};

interface IVehiclePolicySectionProps {
  order?: any;
  carName?: string;
  province?: any;
  getCarDetail: (modelYear: number) => void;
  getProvince: (modelYear: number) => void;
  updateOrder: (payload: any) => void;
}

const VehiclePolicySection: React.FC<IVehiclePolicySectionProps> = ({
  order,
  carName,
  province,
  getCarDetail: handleGetCarDetail,
  getProvince: handleGetProvince,
  updateOrder: handleUpdateOrder,
}) => {
  const lang = capitalizeFirstLetter(i18next.language);
  const [vehicle, setVehicle] = useState<any>({});

  useEffect(() => {
    setVehicle((state: any) => ({
      ...state,
      ...order?.data,
    }));
    const { carSubModelYear, registeredProvince } = order?.data || {};
    if (carSubModelYear) {
      handleGetCarDetail(carSubModelYear);
    }
    if (registeredProvince) {
      handleGetProvince(registeredProvince);
    }
  }, [order, handleGetCarDetail, handleGetProvince]);

  useEffect(() => {
    setVehicle((state: any) => ({
      ...state,
      carName,
    }));
  }, [carName]);

  const onUpdateOrder = (payload: any) => {
    if (order?.name) {
      const formatedOrder = {
        name: order.name,
        data: {
          ...order.data,
          [payload.name]: payload.value,
        },
      };

      handleUpdateOrder(formatedOrder);
    }
  };

  return (
    <Paper elevation={3} className="shared-insurer-info">
      <VehicleInfoTitle>{getString('text.vehicle')}</VehicleInfoTitle>
      <VehicleInfoField>
        <FieldItem>{getString('text.typeOfVehicle')}</FieldItem>
        <FieldItem>{`: ${getString('lead.car')}`}</FieldItem>
      </VehicleInfoField>
      {vehicle?.carName && (
        <VehicleInfoField>
          <SubTitleInfo>{vehicle.carName || ''}</SubTitleInfo>
        </VehicleInfoField>
      )}
      <VehicleInfoField>
        <FieldItem>{getString('package.provinceSearchLabel')}</FieldItem>
        <FieldItem>{`: ${province[`name${lang}`] || ''}`}</FieldItem>
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>{getString('leadDetailFields.redPlate')}</FieldItem>
        <FieldItem>{`: ${getString('text.yes')}`}</FieldItem>
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>{getString('text.licensePlate')}</FieldItem>
        <RenderInputLicensePlate
          licenseNo={vehicle.carLicensePlate || ''}
          name="carLicensePlate"
          handleOnEnter={onUpdateOrder}
          handleOnBlur={onUpdateOrder}
          registeredProvince={vehicle.registeredProvince}
        />
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>{getString('text.chassisNumber')}</FieldItem>
        <RenderInputTextItem
          valueText={vehicle.chassisNumber}
          name="chassisNumber"
          handleOnEnter={onUpdateOrder}
          handleOnBlur={onUpdateOrder}
          isEditable
        />
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>{getString('leadDetailFields.engineNumber')}</FieldItem>
        <RenderInputTextItem
          valueText={vehicle.engineNumber}
          name="engineNumber"
          handleOnEnter={onUpdateOrder}
          handleOnBlur={onUpdateOrder}
          isEditable
        />
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>{getString('leadDetailFields.drivingPurpose')}</FieldItem>
        <FieldItem>
          {`: ${
            vehicle?.carUsageType
              ? getString(`text.${vehicle.carUsageType}`)
              : ''
          }`}
        </FieldItem>
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>{getString('leadDetailFields.firstDriverName')}</FieldItem>
        <RenderInputTextItem
          valueText={vehicle.firstDriverName}
          name="firstDriverName"
          handleOnEnter={onUpdateOrder}
          handleOnBlur={onUpdateOrder}
          isEditable
        />
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>{getString('leadDetailFields.firstDriverDOB')}</FieldItem>
        <RenderInputTextItem
          valueText={thaiDateFormat(
            new Date(vehicle.firstDriverDOB).toString()
          )}
          name="firstDriverDOB"
        />
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>{getString('leadDetailFields.secondDriverName')}</FieldItem>
        <RenderInputTextItem
          valueText={vehicle.secondDriverName}
          name="secondDriverName"
          handleOnEnter={onUpdateOrder}
          handleOnBlur={onUpdateOrder}
          isEditable
        />
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>{getString('leadDetailFields.secondDriverDOB')}</FieldItem>
        <RenderInputDateItem
          value={vehicle.secondDriverDOB || null}
          name="secondDriverDOB"
          onUpdateOrder={onUpdateOrder}
        />
      </VehicleInfoField>
      <VehicleInfoTitle>{getString('text.policies')}</VehicleInfoTitle>
      <VehicleInfoField>
        <FieldItem>
          {getString('leadDetailFields.motorInsuranceTypeOne')}
        </FieldItem>
        <RenderInputPolicyItem
          valueText={thaiDateFormat(new Date().toString())}
        />
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>
          {getString('leadDetailFields.motorInsuranceMandatory')}
        </FieldItem>
        <RenderInputPolicyItem
          valueText={thaiDateFormat(new Date().toString())}
        />
      </VehicleInfoField>
      <VehicleInfoField>
        <FieldItem>
          {getString('leadDetailFields.motorInsuranceMotorAddOn')}
        </FieldItem>
        <RenderInputPolicyItem
          valueText={thaiDateFormat(new Date().toString())}
        />
      </VehicleInfoField>
    </Paper>
  );
};

const mapStateToProps = (state: any) => ({
  order: state.order.payload,
  isFetching: state.order.isFetching,
  carName: state.carDetailReducer?.data?.displayName,
  province: state.provinceDetailReducer?.data || {},
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getCarDetail,
      getProvince,
      updateOrder,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehiclePolicySection);
