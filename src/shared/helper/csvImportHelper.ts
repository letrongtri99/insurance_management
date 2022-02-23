import { unparse } from 'papaparse';
import { getString } from 'presentation/theme/localization';

interface IError {
  errorCode: string;
  fieldName?: any;
  rowNumber?: any;
  message?: any;
}

export const getPackageErrorMessage = (error: IError) => {
  if (error.errorCode === 'REQUIRED') {
    const errorMessage = getString('importData.error.required', {
      fieldName: error.fieldName,
      rowNumber: error.rowNumber,
    });
    return errorMessage;
  }

  if (error.errorCode === 'TRANSIENT') {
    const errorMessage = getString('importData.error.transient', {
      message: error.message,
      rowNumber: error.rowNumber,
    });
    return errorMessage;
  }

  if (error.errorCode === 'INVALID') {
    let errorMessage = error.message;

    if (error.rowNumber && error.fieldName) {
      errorMessage = getString('importData.error.invalidWField', {
        message: error.message,
        fieldName: error.fieldName,
        rowNumber: error.rowNumber,
      });
    } else if (error.rowNumber && !error.fieldName) {
      errorMessage = getString('importData.error.invalidNoField', {
        message: error.message,
        rowNumber: error.rowNumber,
      });
    }

    return errorMessage;
  }

  const errorMessage = getString('importData.error.notExist', {
    fieldName: error.fieldName,
    rowNumber: error.rowNumber,
  });
  return errorMessage;
};

// Download file as csv file.
export const downloadBlobAsFile = (errorData: IError[], filename: string) => {
  const universalBOM = '\uFEFF';
  const csv = unparse(errorData);

  const downloadLink = window.document.createElement('a');
  downloadLink.href = `data:text/csv; charset=utf-8,${encodeURIComponent(
    universalBOM + csv
  )}`;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const handleFailedPackageClick = (data: any) => {
  if (data.errors?.length) {
    const errorData = data.errors.map((error: any) => {
      const message = getPackageErrorMessage(error);
      return {
        Errors: message,
      };
    });

    downloadBlobAsFile(
      errorData,
      `errors_${data?.importFileName ? data.importFileName : 'file'}.csv`
    );
  }
};

export default handleFailedPackageClick;
