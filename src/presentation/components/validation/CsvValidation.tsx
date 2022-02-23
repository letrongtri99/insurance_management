import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import './scvValidation.scss';
import csvValidationErrors from 'shared/helper/csvValidationErrors';

const typeFileResult = {
  fileName: '',
  fileType: '',
  fileSize: 0,
  result: [],
};

interface FileResult {
  fileName: string;
  name: string;
  fileType: string;
  fileSize: number;
  result: any[];
}

interface CsvColumnData {
  name: string;
  dataType: string;
}

interface IValidation<T> {
  file: T;
  csvName: string;
  isErrorCheck?: boolean;
  requiredColumns: string[];
  template: string[];
  templateWithType?: CsvColumnData[];
  [key: string]: any;
  checkError: (error: string[]) => void;
}

const CsvValidation: React.FC<IValidation<FileResult>> = forwardRef(
  (
    {
      file = typeFileResult,
      template,
      isErrorCheck = false,
      csvName,
      requiredColumns,
      templateWithType,
      style,
      checkError,
      maximumUpload,
    },
    ref: any
  ) => {
    const [errorMessages, setErrorMessages]: any = useState([]);
    useEffect(() => {
      const iProps = {
        file,
        template,
        isErrorCheck,
        csvName,
        requiredColumns,
        templateWithType,
        maximumUpload,
      };
      setErrorMessages(csvValidationErrors(iProps));
      checkError(csvValidationErrors(iProps));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    const callBackChild = () => {
      // Some body can call this function if need more logic;
      return errorMessages;
    };
    useImperativeHandle(ref, () => {
      return {
        callBackChild,
        errors: errorMessages,
      };
    });
    return (
      <>
        {isErrorCheck &&
          errorMessages.length > 0 &&
          errorMessages.map((errors: any, index: number) => {
            return (
              <li className="text-error" key={errors} style={style}>
                {errors}
              </li>
            );
          })}
      </>
    );
  }
);

export default CsvValidation;
