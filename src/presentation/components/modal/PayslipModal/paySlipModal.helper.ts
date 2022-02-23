import * as yup from 'yup';
import { getString } from 'presentation/theme/localization';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';

export const VALID_NUMBER_PATTERN = /^[0-9]*$/;
export const FILE_CONFIG = {
  MAX_ONE_FILE_SIZE: 2097152, // INFO MAX SIZE IS 2MB
};

export const validationSchema = yup.object().shape({
  paymentAmount: yup
    .string()
    .matches(VALID_NUMBER_PATTERN, 'Please enter number only')
    .required(getString('text.paymentAmountRequired')),
  paymentDate: yup.date().required(getString('text.paymentDateRequired')),
});

export interface IPaySlip {
  openDialog: boolean;
  closeDialog: boolean | any;
  leadId: string;
  user: any;
}

export const initialPaySlipFormData = {
  paymentAmount: '',
  paymentDate: null,
};

export const AttachmentExtensions: string[] = ['image/*'];

export const handleRejectedMessage = (
  rejectedFile: { name: string; type: string | undefined; size: number },
  acceptedFiles: string[],
  maxFileSize: number
) => {
  // INFO: Handle error when upload file type not supported or too big
  let msg = '';
  const fileType = rejectedFile.type || '';
  if (rejectedFile.size >= maxFileSize) {
    msg = getString('text.fileSizeLimit', {
      fileName: rejectedFile.name,
    });
    return msg;
  }
  if (!acceptedFiles.includes(fileType)) {
    msg = getString('text.unsupportedFile', {
      fileName: rejectedFile.name,
    });
    return msg;
  }

  return msg;
};

export const readFileAsync = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export enum NUMBER_TYPE {
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
}

export const formatNumber = (price: number, numberType?: NUMBER_TYPE) => {
  const newNumBer =
    typeof price === 'number' && !Number.isNaN(price) ? Math.ceil(price) : 0;
  const value = newNumBer.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return `${numberType === NUMBER_TYPE.NEGATIVE ? `- ${value}` : value} THB`;
};

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    '& .MuiDialog-paperWidthSm': {
      minWidth: '700px',
      minHeight: '700px',
    },
    '& .MuiDialogContent-root': {
      position: 'relative',
    },
  },
  content: {
    paddingTop: '16px',
    paddingBottom: '16px',
    '& hr': {
      marginTop: '25px',
      marginBottom: '25px',
    },
  },
  dropzone: {
    minHeight: '600px',
    border: '1px dashed #b0c6e3',
    borderRadius: '4px',
    background: 'transparent',
  },
  preview: {
    minHeight: '600px',
    position: 'relative',
    '& img': {
      width: '100%',
    },
  },
  deleteIcon: {
    width: '1.5em',
    height: '1.5em',
    cursor: 'pointer',
  },
  label: {
    marginBottom: '10px',
  },
  infoSection: {
    padding: `0 0 0 20px !important`,
  },
  textFieldLabel: {
    margin: '20px 0',

    '& .MuiInputLabel-root': {
      textTransform: 'unset',
    },
  },
  paymentDatePicker: {
    marginBottom: '20px',

    '& .MuiOutlinedInput-adornedEnd': {
      padding: '0',
    },
  },
}));

export const customComponentStyle = {
  Title: styled.span`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    width: 50%;
  `,
  Comma: styled.span`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    width: 5%;
    justify-content: flex-end;
  `,
  Value: styled.span`
    display: block;
    text-align: right;
    font-size: 15px;
    font-weight: 600;
    width: 40%;
  `,
};

export const flatErrors = (error: { [key: string]: any }) => {
  const errorList = error?.response?.errors;
  if (errorList) {
    return Object.entries(errorList)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }

  return error?.response?.message || getString('text.creteOrderFail');
};

export const DELAY_CLOSE_MODAL = 200;
