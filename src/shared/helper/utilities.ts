import moment from 'moment';
import libPhoneNumber from 'google-libphonenumber';

// Get an instance of `PhoneNumberUtil`
const phoneUtil = libPhoneNumber.PhoneNumberUtil.getInstance();
const THAI_YEAR_DIFFERENCE = 543;
const DEFAULT_UNIT = 1000;
const DEFAULT_DECIMALS = 2;
export default class Utilities {
  static delay = (duration = 1000): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

  static getRandomArbitrary = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  static getRandomInt = (min: number, max: number): number => {
    const minVar = Math.ceil(min);
    const maxVar = Math.floor(max);
    return Math.floor(Math.random() * (maxVar - minVar + 1)) + minVar;
  };
}

export const toUpperCase = (x: string): string => {
  return x.toUpperCase();
};

export const convertToIdTitle = (oldArr: any) => {
  if (!oldArr) {
    return [];
  }
  return oldArr.map((val: any) => {
    return {
      ...val,
      id: val.name,
      title: val.displayName,
    };
  });
};

export const deepCopy = (target: any) => {
  return JSON.parse(JSON.stringify(target));
};

export const millisToMinutesAndSeconds = (millis: number) => {
  let minutes: string | number = Number(Math.floor(millis / 60000));
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const toBuddhistYear = (date: Date) => {
  const time = moment(date);
  const timeDiff = 543;
  const christianYear = time.format('YYYY');

  // eslint-disable-next-line radix
  const buddhishYear = (parseInt(christianYear) + timeDiff).toString();
  return `${time.format(
    ` DD / MM /YYYY`
  )}  (${buddhishYear}) <br/> ( ${time.format('HH:mm:ss')} PM )`;
};

export const thaiDateFormat = (isoDate: string) => {
  const date = new Date(isoDate);
  let day = String(date.getDate());
  let month = String(date.getMonth() + 1);
  const year = date.getFullYear();
  const thaiYear = year + THAI_YEAR_DIFFERENCE;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return `${day} / ${month} / ${year} (${thaiYear})`;
};

export const thaiYearFormat = (isoDate: string) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const thaiYear = year + THAI_YEAR_DIFFERENCE;

  return `${year} (${thaiYear})`;
};

export const formatBytes = (bytes: any, decimals = DEFAULT_DECIMALS) => {
  if (bytes === 0) return '0 Bytes';

  const unit = DEFAULT_UNIT;
  const fixedDecimal = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const sizeOrder = Math.floor(Math.log(bytes) / Math.log(unit));
  const dividend = unit ** sizeOrder;

  return `${parseFloat((bytes / dividend).toFixed(fixedDecimal))} ${
    sizes[sizeOrder]
  }`;
};

export const capitalizeFirstLetter = (originalString: string) => {
  if (originalString?.length) {
    return (
      originalString.charAt(0).toUpperCase() +
      originalString.slice(1).toLowerCase()
    );
  }
  return '';
};

export const countingAgeToPresent = (DOB: string) => {
  const today = new Date();
  const birthDate = new Date(DOB);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
};

export const LeadTypeFilter = [
  {
    id: 0,
    value: 'new',
    title: 'leadTypeFilter.new',
    leadType: 'LEAD_TYPE_NEW',
  },
  {
    id: 1,
    value: 'retainer',
    title: 'leadTypeFilter.retainer',
    leadType: 'LEAD_TYPE_RETAINER',
  },
  {
    id: 2,
    value: 'renewal',
    title: 'leadTypeFilter.renewal',
    leadType: 'LEAD_TYPE_RENEWAL',
  },
];

export const mappingLeadType = (type: string) => {
  let leadTypeName = '';
  LeadTypeFilter.forEach((item) => {
    if (item.leadType === type) {
      leadTypeName = item.title;
    }
  });

  return leadTypeName;
};

export const formatDDMMYYYY = (date: string) => {
  if (date) {
    return moment(new Date(date)).format('DD/MM/YYYY');
  }
  return '';
};

export const formatDDMMYYYYHHMMSS = (date: string) => {
  if (date) {
    return `${moment(new Date(date)).format('DD/MM/YYYY')} (${moment(
      date
    ).format('hh:mm:ss A')})`;
  }
  return '';
};

export const formatDDMMYYYYHHMMSSUTC = (date: string) => {
  if (date) {
    return moment(new Date(date)).utc().format('DD/MM/YYYY (hh:mm:ss A)');
  }
  return '';
};

export const lowercaseFirstLetter = (str: string) => {
  return str ? str.charAt(0).toLocaleLowerCase() + str.slice(1) : '';
};

export const processErrMessage = (errMessage: string) => {
  let resultMessage = errMessage;
  const fieldsMapping: { [key: string]: string } = {
    human_id: 'username',
  };

  Object.entries(fieldsMapping).forEach(([key, value]: any) => {
    if (resultMessage.includes(key))
      resultMessage = resultMessage.replaceAll(key, value);
  });

  return resultMessage.replaceAll('_', ' ');
};

export const modelValidationField = (value: string | number | boolean) => {
  return value || '';
};

// Check is string is possible phone number
export const isPossiblePhoneNumber = (phoneNumber: string) => {
  let parsedNumber;
  try {
    parsedNumber = phoneUtil.parse(phoneNumber, 'TH');
    return phoneUtil.isValidNumberForRegion(parsedNumber, 'TH');
  } catch (error) {
    return false;
  }
};

// Format number in the E164 format
export const formatE164 = (phoneNumber: string) => {
  // Parse number with country code and keep raw input.
  const number = phoneUtil.parseAndKeepRawInput(phoneNumber, 'TH');
  return phoneUtil.format(number, libPhoneNumber.PhoneNumberFormat.E164);
};

const formatPhoneNumber = (number: any) => number.replace(/^\+66/, 0);

export const maskPhoneNumber = (phone: string) =>
  formatPhoneNumber(phone).replace(/.{4}$/gi, '****');

export const isInvalidCharacters = (input: string) => {
  const numberPattern = /\d/;
  const specialCharacters = /[^A-Za-z 0-9]/g;
  return numberPattern.test(input) || specialCharacters.test(input);
};
