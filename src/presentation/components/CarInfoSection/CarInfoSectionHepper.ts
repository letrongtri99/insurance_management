/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import CarInfo, {
  carInfoField,
} from 'presentation/models/lead/CarInfo/CarInfo';
import { UNIT_OF_ENGINE_SIZE, UNIT_OF_INSURED } from 'shared/constants';
import { thaiYearFormat, capitalizeFirstLetter } from 'shared/helper/utilities';

export default class CarInfoSectionHepper {
  handleData(data: CarInfo) {
    return Object.keys(data).map((key) => {
      if (key === 'year') {
        return {
          title: 'Year',
          value:
            data[key].toString().length > 1
              ? thaiYearFormat(data[key].toString())
              : '',
        };
      }
      if (key === 'brand') {
        return { title: 'Brand', value: data[key] };
      }
      if (key === 'model') {
        return { title: 'Model', value: data[key] };
      }
      if (key === 'engineSize') {
        return {
          title: 'Engine size',
          // INFO: to avoid initialData return default value = 0.
          value: data[key] !== 0 ? `${data[key]} ${UNIT_OF_ENGINE_SIZE}` : '',
        };
      }
      if (key === 'transmission') {
        return { title: 'Transmission', value: data[key] };
      }
      if (key === 'noOfDoor') {
        return {
          title: 'No of door',
          value: data[key],
        };
      }
      if (key === 'cabType') {
        return {
          title: 'Cab type',
          value: data[key],
        };
      }
      if (key === 'dashCam') {
        return { title: 'Dash cam', value: data[key] ? 'Yes' : 'No' };
      }
      if (key === 'purpose') {
        return {
          title: 'Purpose',
          value: capitalizeFirstLetter(data[key]),
        };
      }
      if (key === 'province') {
        return { title: 'Province', value: data[key] };
      }
      if (key === 'modification') {
        return {
          title: 'Modification',
          value: data[key] ? 'Yes' : 'No',
        };
      }
      if (key === 'licensePlate') {
        return { title: 'License plate', value: data[key] };
      }
    });
  }
}
