/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */
import React, { useEffect, useMemo, useState } from 'react';
import CarInfo, {
  carInfoField,
} from 'presentation/models/lead/CarInfo/CarInfo';
import { Paper as MuiPaper, withTheme } from '@material-ui/core';
import './CarInfoSection.scss';
import styled from 'styled-components';
import CarInfoSectionHepper from './CarInfoSectionHepper';
import CarInfoField from './CarInfoField';
import CarLicenseField from './CarLicenseField';
import CarInfoButton from '../CarInfoButton';
import { getString } from '../../theme/localization';

const LICENSE_PLATE = 'License plate';

interface IProps {
  carInfo: CarInfo;
  onSaveLincense: (payload: string) => void;
  abbreviation?: string;
}

const Paper = withTheme(styled(MuiPaper)`
  &&& {
    height: 100%;
    border: 1px solid ${({ theme }) => theme.border.color};
    border-radius: 6px;
  }
`);

const CarInfoTitle = styled.h3`
  margin: 0;
  padding: 10px 15px;
  color: ${({ theme }) => theme.palette.primary.main};
  background: ${({ theme }) => theme.palette.grey[200]};
  border-radius: 6px 6px 0 0;
`;

export default function CarInfoSection({
  carInfo,
  onSaveLincense,
  abbreviation,
}: IProps) {
  const carInfoHelper = new CarInfoSectionHepper();
  const [carInfoState, setCarInfoState] = useState<Array<carInfoField>>([]);
  const [licensePlateInput, setlicensePlateInput] = useState('');
  useEffect(() => {
    const carData = carInfoHelper.handleData(carInfo) as Array<carInfoField>;
    setCarInfoState(carData);
  }, [carInfo]);

  useEffect(() => {
    if (carInfoState) {
      carInfoState.forEach((carField: carInfoField) => {
        if (carField?.title === LICENSE_PLATE) {
          setlicensePlateInput(carField.value);
        }
      });
    }
  }, [carInfoState]);

  const handleSaveLicense = (value: string) => {
    onSaveLincense(value);
  };

  const renderCarInfoField = useMemo(() => {
    return carInfoState.map((value: any) => {
      if (value?.title === LICENSE_PLATE) {
        return (
          <CarLicenseField
            title={value.title}
            value={value.value}
            key={value.title}
            handleSaveLicense={handleSaveLicense}
            abbreviation={abbreviation || ''}
          />
        );
      }
      return (
        <CarInfoField
          title={value?.title}
          value={value?.value}
          key={value?.title}
        />
      );
    });
    // eslint-disable-next-line
  }, [carInfoState, licensePlateInput]);

  return (
    <Paper elevation={3}>
      <CarInfoTitle>{getString('lead.car')}</CarInfoTitle>
      {renderCarInfoField}
      <div className="shared-car-info__button">
        <CarInfoButton />
      </div>
    </Paper>
  );
}
