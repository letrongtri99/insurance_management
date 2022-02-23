import { getString } from 'presentation/theme/localization';
import { csvTypeFiles } from 'shared/constants';
import { isValidDateFormat } from './DateTimeHelper';

interface CsvColumnData {
  name: string;
  dataType: string;
}

interface IProps<T> {
  file: T;
  csvName: string;
  isErrorCheck?: boolean;
  requiredColumns: string[];
  template: string[];
  [key: string]: any;
}

interface FileResult {
  fileName: string;
  name: string;
  fileType: string;
  fileSize: number;
  result: any[];
}

const isCsvFileError = (fileResult: FileResult): string | undefined => {
  let message: string | undefined;
  if (!csvTypeFiles.includes(fileResult.fileType)) {
    return getString('text.requiredCsvValidation');
  }
  return message;
};

const checkRowsRequiredValidation = (
  requiredArray: string[],
  result: any[],
  csvName: string
): any => {
  const checkRowsRequireErrorMessages: string[] = [];
  result.forEach((rows: any, index: number) => {
    // eslint-disable-next-line
    for (const [key, value] of Object.entries(rows)) {
      if (requiredArray.includes(key)) {
        if (!value) {
          checkRowsRequireErrorMessages.push(
            getString('text.requiredRowsValidation', {
              column: key,
              name: csvName,
              row: index + 1,
            })
          );
        }
      }
    }
  });

  return checkRowsRequireErrorMessages;
};

const checkTemplatesValidation = (csvTemplate: string[], result: any[]) => {
  const checkTemplatesErrorMessages: string[] = [];
  const col = result[0];
  if (col) {
    csvTemplate.forEach((cols: any) => {
      if (col[cols] === undefined) {
        checkTemplatesErrorMessages.push(
          getString('text.requiredColumnValidation', { column: cols })
        );
      }
    });
  }
  return checkTemplatesErrorMessages;
};

// eslint-disable-next-line no-useless-escape
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const validGender = ['m', 'f'];
const dateFormat = 'YYYY-MM-DD';

export const validateDataWithType = (
  dataType: string,
  value: string | any
): boolean => {
  switch (dataType) {
    case 'string':
      if (value) {
        return typeof value === 'string' && Number.isNaN(+value);
      }
      return true;
    case 'number':
      if (value) {
        return typeof +value === 'number' && !Number.isNaN(+value);
      }
      return true;
    case 'email':
      if (value) {
        return emailRegex.test(value);
      }
      return true;
    case 'gender':
      if (value) {
        return validGender.includes(value);
      }
      return true;
    case 'date':
      if (value) {
        return isValidDateFormat(value, dateFormat);
      }
      return true;
    default:
      return false;
  }
};

const rowsDataValidationWithType = (
  templateWithType: any[],
  result: any[]
): string[] => {
  const checkRowDataValidationWithType: string[] = [];
  result.forEach((rows: any, index: number) => {
    Object.entries(rows).forEach(([key, value]) => {
      templateWithType.forEach((field) => {
        if (field.name === key) {
          const validData = validateDataWithType(field.dataType, value);
          if (!validData) {
            checkRowDataValidationWithType.push(
              getString('text.invalidDataFormat', {
                column: key,
                row: index + 1,
              })
            );
          }
        }
      });
    });
  });

  return checkRowDataValidationWithType;
};

const csvValidationErrors = (props: IProps<any>): string[] => {
  let errors: string[] = [];
  if (props.file.errorFileMessage === 'Delimiter') {
    errors = [...errors, getString('text.missingHeaderFile')];
    props.template.forEach((cols: any) => {
      errors.push(getString('text.requiredColumnValidation', { column: cols }));
    });
  }

  if (props.file.errorFileMessage === 'FieldMismatch') {
    errors = [...errors, getString('text.fieldMismatch')];
  }

  if (props.file.fileSize > 0) {
    const csvFileError = isCsvFileError(props.file);
    if (csvFileError) {
      errors.push(csvFileError);
    } else {
      if (!props.file?.result?.length) {
        errors.push(getString('text.emptyFile'));
        return errors;
      }

      if (
        props.maximumUpload &&
        props.file?.result?.length > props.maximumUpload
      ) {
        errors = [
          ...errors,
          getString('text.maximumUpload', {
            type: props.csvName.toLowerCase(),
            maxNumber: props.maximumUpload,
          }),
        ];
      }

      const headerRequiredErrors = checkTemplatesValidation(
        props.template,
        props.file.result
      );

      const fieldRequiredValidation = checkRowsRequiredValidation(
        props.requiredColumns,
        props.file.result,
        props.csvName
      );

      const fieldWithDataValidation = props.templateWithType
        ? rowsDataValidationWithType(props.templateWithType, props.file.result)
        : [];

      if (headerRequiredErrors.length) {
        errors = [...errors, ...headerRequiredErrors];
      }
      if (fieldRequiredValidation.length) {
        errors = [...errors, ...fieldRequiredValidation];
      }
      if (fieldWithDataValidation.length) {
        errors = [...errors, ...fieldWithDataValidation];
      }
    }
  }

  return errors;
};
export default csvValidationErrors;
