import moment, { MomentInput } from 'moment';
import { ValueFormatterParams } from '@material-ui/data-grid';
import { CommunicationType } from './index.model';
import { capitalizeFirstLetter } from '../../../../../shared/helper/utilities';
import { getString } from '../../../../theme/localization';

export interface ICommunication {
  communicationType: string;
  createBy: string;
  createTime: string;
  deleteTime: string;
  duration: any;
  id: number;
  name: string;
  updateTime: string;
}
export const formatDuration = (duration: any) => {
  const minutes = moment.duration(duration?._data, 's').minutes();
  let seconds: string | number = moment
    .duration(duration?._data, 's')
    .seconds();
  if (seconds < 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds} ${getString('text.minutesAcronym')}`;
};

export const displayDuration = (communication: ICommunication) => {
  const { duration } = communication;
  if (communication.communicationType === CommunicationType.CALL) {
    return duration && duration?.value !== null
      ? `${formatDuration(duration)}`
      : 'In Progress';
  }
  return '-';
};

export const displayTimestamp = (timestamp: ValueFormatterParams) => {
  return moment(timestamp.value as MomentInput).format('DD/MM/YYYY (h:m:s A)');
};

export const displayType = (communication: ICommunication) => {
  return getString(`text.${communication.communicationType}`);
};
