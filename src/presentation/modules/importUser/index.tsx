import React, { useEffect, useRef, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import Dropzone from 'presentation/components/dropzone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CsvValidation from 'presentation/components/validation/CsvValidation';
import { csvUserColumns } from 'shared/constants/csvUserColumns';
import { resetFile } from 'presentation/redux/actions/importFile';
import { importUser } from 'presentation/redux/actions/admin/user/index';
import {
  FILE_EMPTY_ERROR,
  MINETYPE_ERROR,
} from 'shared/constants/csvErrorType';
import { getRowMissing, getListErrorHandle } from './importUser.helper';
import './index.scss';
import { getUsersToImport } from '../../redux/selectors/user';
import { ImportStatus } from 'shared/constants/importFile';

// TODO: we will fix that any later
interface IProps {
  usersToImport: any;
  close: (isClose: boolean) => void;
  resetFile: () => void;
  importUser: () => void;
}

interface IError {
  index: number;
  error: string;
}

const ImportUser: React.FC<IProps> = ({
  usersToImport,
  close,
  resetFile: handleResetFile,
  importUser: handleImportUser,
}) => {
  const [errorMessages, setErrorMessages] = useState<IError[]>([]);
  const [status, setStatus] = useState<ImportStatus>(ImportStatus.Default);
  const [state, setState] = useState({
    title: false,
    isDisabled: true,
    isErrorMessage: true,
    requiredColumns: ['User Status', 'User Name'],
    isCsv: [
      'application/csv',
      'application/x-csv',
      'text/csv',
      'text/comma-separated-values',
      'text/x-comma-separated-values',
      'text/tab-separated-values',
      'application/vnd.ms-excel',
    ],
  });
  const childRef: any = useRef();

  const closeModal = () => {
    close(false);
    setState((prevState) => {
      return {
        ...prevState,
        title: false,
      };
    });
    handleResetFile();
  };

  const addIndexErrorList = (errorList: string[]): IError[] => {
    return errorList.map((error: string, index: number) => {
      return {
        error,
        index,
      };
    });
  };

  const getListError = (
    missTeam: number[],
    missDaily: number[],
    missTotal: number[],
    missScore: number[],
    hasTeam: number[],
    hasDaily: number[],
    hasTotal: number[],
    hasScore: number[],
    hasRoleInvalid: any[],
    hasStatusInvalid: any[]
  ) => {
    const errors = addIndexErrorList(
      getListErrorHandle(
        missTeam,
        missDaily,
        missTotal,
        missScore,
        hasTeam,
        hasDaily,
        hasTotal,
        hasScore,
        hasRoleInvalid,
        hasStatusInvalid
      )
    );
    setErrorMessages(errors);
  };

  const checkUserRole = () => {
    const result = usersToImport?.result;
    if (result?.length) {
      const {
        missTeam,
        missDaily,
        missTotal,
        missScore,
        hasTeam,
        hasDaily,
        hasTotal,
        hasScore,
        hasRoleInvalid,
        hasStatusInvalid,
      } = getRowMissing(result);
      getListError(
        missTeam,
        missDaily,
        missTotal,
        missScore,
        hasTeam,
        hasDaily,
        hasTotal,
        hasScore,
        hasRoleInvalid,
        hasStatusInvalid
      );
    }
  };

  useEffect(() => {
    const users = usersToImport;
    if (users?.errorFileMessage === MINETYPE_ERROR) {
      setState((prevState) => {
        return {
          ...prevState,
          isErrorMessage: true,
          isDisabled: true,
        };
      });
    }
    checkUserRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersToImport]);

  const handleClick = () => {
    handleImportUser();
  };
  const checkError = (errors: string[]) => {
    setStatus(ImportStatus.Default);
    const isEmptyFileMessage = usersToImport?.errorFileMessage;
    if (
      errors.length ||
      isEmptyFileMessage === FILE_EMPTY_ERROR ||
      isEmptyFileMessage === MINETYPE_ERROR
    ) {
      setStatus(ImportStatus.Failure);
      setState((prevState) => {
        return {
          ...prevState,
          isDisabled: true,
          title: false,
        };
      });
    } else if (usersToImport) {
      setStatus(ImportStatus.Success);
      setState((prevState) => {
        return {
          ...prevState,
          title: true,
          isDisabled: false,
        };
      });
    }
  };

  const getUserUnit = () => {
    const userLength = usersToImport?.result?.length || 0;
    // INFO: if length userList > 1 => Unit is Users
    const displayUnitUser = userLength > 1 ? 'Users' : 'User';
    return displayUnitUser;
  };

  const { title, isDisabled, isCsv, isErrorMessage, requiredColumns } = state;
  const isDisplayResult = () => {
    return (
      title && isCsv.includes(usersToImport?.fileType) && !errorMessages.length
    );
  };

  const isDisabledConfirmButton = () => {
    return isDisabled || errorMessages.length > 0;
  };

  return (
    <Grid item xs={12} md={12} className="import-user">
      <Dropzone importStatus={status} />
      {status === ImportStatus.Success && (
        <div className="import-user__filename-container">
          <Typography
            variant="h6"
            className="import-user__filename-container__title"
          >
            {getString('text.fileName')}
            &nbsp;
          </Typography>
          <Typography
            variant="h6"
            className="import-user__filename-container__value"
          >
            {usersToImport?.fileName}
          </Typography>
        </div>
      )}
      {isDisplayResult() ? (
        <p className="lead-title">
          {`${getString('text.userFound', {
            count: usersToImport.result.length,
            user: getUserUnit(),
          })} `}
        </p>
      ) : (
        ''
      )}
      {status === ImportStatus.Failure && (
        <Typography variant="h6" className="failure-text">
          {getString('errors.errorReasons')}
        </Typography>
      )}
      <CsvValidation
        style={{
          textAlign: 'left',
          padding: 0,
        }}
        isErrorCheck={isErrorMessage}
        template={csvUserColumns}
        csvName="User"
        ref={childRef}
        requiredColumns={requiredColumns}
        checkError={checkError}
        file={usersToImport}
      />
      {errorMessages?.length
        ? errorMessages.map((item: IError) => {
            return (
              <li className="text-error" key={item.index}>
                {item.error}
              </li>
            );
          })
        : ''}
      <div className="button-group">
        <Controls.Button
          type="button"
          color="secondary"
          text="Cancel"
          onClick={() => closeModal()}
        />
        <Controls.Button
          type="submit"
          color="primary"
          disabled={isDisabledConfirmButton()}
          onClick={handleClick}
          text={getString('text.confirmImport')}
        />
      </div>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  usersToImport: getUsersToImport(state),
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ resetFile, importUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImportUser);
