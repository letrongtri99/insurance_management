/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import './index.scss';
import {
  Button,
  Chip,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  OutlinedInput,
} from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import ChipInput from 'material-ui-chip-input';
import { DropzoneArea } from 'material-ui-dropzone';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import * as CONSTANTS from 'shared/constants';
import LeadRepository from 'data/repository/lead';
import { getLeadIdFromPath } from 'presentation/redux/epics/leadDetail/scheduleModal/scheduleModal.helper';
import { SelectElement } from 'shared/types/controls';
import {
  AttachmentExtensions,
  isEmail,
  customToEmail,
  EmailTemplateOptions,
  getTransformedMessage,
  isValidPackageUrl,
} from './email.helper';
import { FakeEmailTemplate } from '../newMessage.helper';

const KEY_CODE = {
  ENTER: 13,
  TAB: 9,
};

const FILE_CONFIG = {
  MAX_ONE_FILE_SIZE: 1e6,
  MAX_ALL_FILE_SIZE: 5e6,
};

interface IEmail {
  message: string;
  emailTemplate: string;
  to: string;
  cc: string[];
  subject: string;
  attachment: any[];
  packageUrl?: string;
}

interface IEmailFormProps {
  changeForm: (formData: IEmail) => void;
  email: IEmail;
}

const EmailForm: React.FC<IEmailFormProps> = ({
  changeForm: handleChangeForm,
  email,
}) => {
  const useStyles = makeStyles(() =>
    createStyles({
      previewChip: {
        minWidth: 100,
        maxWidth: 210,
        marginBottom: 5,
        marginRight: 5,
        float: 'left',
      },
      attachmentChip: {
        marginRight: 5,
        marginBottom: 5,
      },
      adornmentEnd: {
        paddingRight: 0,
        alignItems: 'stretch',
      },
    })
  );

  const dispatch = useDispatch();

  const listToEmail = useSelector(
    (state: any) =>
      state.leadsDetailReducer?.getAgentReducer?.data?.agent?.data
        ?.customerEmail || []
  );

  const leadId = useSelector(
    (state: any) =>
      state.leadsDetailReducer?.getAgentReducer?.data?.agent?.humanId ||
      '{{leadId}}'
  );

  const purchasePackage = useSelector(
    (state: any) =>
      state.leadsDetailReducer?.getAgentReducer?.data?.agent?.data?.checkout
        ?.package || ''
  );

  const customListToEmail = customToEmail(listToEmail);

  const classes = useStyles();
  const [error, setError] = useState('');

  const isInList = (_email: string) => {
    const isExist = email.cc.filter((val: string) => val === _email).length;
    return isExist;
  };

  useEffect(() => {
    // TODO: just add FakeTo now, wait API to get To List
    const checkIsOneEmailLead = (toList: any[]) => {
      if (toList.length === 1) {
        handleChangeForm({
          ...email,
          to: toList[0].id,
        });
      }
    };

    checkIsOneEmailLead(customListToEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid = (_email: string) => {
    let errorMsg = null;

    if (isInList(_email)) {
      errorMsg = getString('text.isExistedEmail', {
        email: _email,
      });
    }

    if (!isEmail(_email)) {
      errorMsg = getString('text.invalidEmail', {
        email: _email,
      });
    }

    if (errorMsg) {
      setError(errorMsg);

      return false;
    }

    return true;
  };

  const handleAddEmail = (emailChip: string) => {
    const value = emailChip.trim();

    if (value && isValid(value)) {
      email.cc.push(value);
      setError('');
    }
  };

  const handleDelete = (deletedEmail: string) => {
    const newCcList = email.cc.filter((val: string) => val !== deletedEmail);
    handleChangeForm({
      ...email,
      cc: [...newCcList],
    });
    setError('');
  };

  const checkTotalFileSize = (fileList: File[]): number => {
    let totalFileSize = 0;
    fileList.forEach((file) => {
      totalFileSize += file.size;
    });
    return totalFileSize;
  };

  const handleDropFile = (file: File) => {
    email.attachment.push(file);
    if (checkTotalFileSize(email.attachment) >= FILE_CONFIG.MAX_ALL_FILE_SIZE) {
      email.attachment.splice(-1, 1);
      dispatch(
        showSnackBar({
          isOpen: true,
          message: getString('text.totalMaxFileSize', {
            fileName: file.name,
          }),
          status: CONSTANTS.snackBarConfig.type.error,
        })
      );
    } else {
      handleChangeForm({
        ...email,
        attachment: email.attachment,
      });
    }
  };

  const bindEmailTemplate = (e: React.ChangeEvent<SelectElement>) => {
    const title = getString(`emailTemplateOption.${e.target.value}.title`, {
      leadId,
    });
    const template = getString(
      `emailTemplateOption.${e.target.value}.content`,
      {
        leadId,
        purchasePackage: purchasePackage || '',
      }
    );
    handleChangeForm({
      ...email,
      emailTemplate: e.target.value as string,
      subject: title,
      message: template,
    });
  };

  const bindChange = (e: React.ChangeEvent<SelectElement>) => {
    const { name, value } = e.target;
    handleChangeForm({
      ...email,
      [name as string]: value,
    });
  };

  const handleRejectedFile = (
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
    } else if (!acceptedFiles.includes(fileType)) {
      msg = getString('text.unsupportedFile', {
        fileName: rejectedFile.name,
      });
    }
    dispatch(
      showSnackBar({
        isOpen: true,
        message: msg,
        status: CONSTANTS.snackBarConfig.type.error,
      })
    );
  };

  const handleDeleteAttachment = (index: number) => {
    email.attachment.splice(index, 1);
    handleChangeForm({
      ...email,
      attachment: email.attachment,
    });
  };

  const renderAttachments = () => {
    if (email.attachment && email.attachment.length) {
      return email.attachment.map((file: File, index: number) => (
        <Chip
          key={index}
          label={file.name}
          onDelete={() => {
            handleDeleteAttachment(index);
          }}
          className={classes.attachmentChip}
          color="default"
        />
      ));
    }
    return null;
  };

  const transformPlaceholdersWithGivenUrl = () => {
    const newMessage = getTransformedMessage(email.message, email.packageUrl);
    const lead = getLeadIdFromPath();
    const payload = {
      body: newMessage,
    };
    const leadRepository = new LeadRepository();
    leadRepository.transformPlaceholders(payload, lead).subscribe(
      (res: any) => {
        const message = res?.data?.text;
        handleChangeForm({
          ...email,
          packageUrl: '',
          message,
        });
        dispatch(
          showSnackBar({
            isOpen: true,
            message: getString('text.emailMessageUpdatedSuccess'),
            status: CONSTANTS.snackBarConfig.type.success,
          })
        );
      },
      (err: any) => {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: err.message || '',
            status: CONSTANTS.snackBarConfig.type.error,
            isNotClose: true,
          })
        );
      }
    );
  };

  return (
    <div className="email-form">
      <Grid container className="email-container">
        <Grid item xs={12} md={12}>
          <Controls.Select
            name="emailTemplate"
            label={getString('text.emailTemplate')}
            value={email.emailTemplate}
            onChange={bindEmailTemplate}
            options={FakeEmailTemplate}
            selectField="value"
            fixedLabel
            placeholder={getString('text.select')}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Controls.Select
            name="to"
            label={getString('text.to')}
            value={email.to}
            onChange={bindChange}
            selectField="id"
            options={customListToEmail}
            fixedLabel
            placeholder={getString('text.select')}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <ChipInput
            className="email-form__cc"
            value={email.cc || []}
            label={getString('text.cc')}
            newChipKeyCodes={[KEY_CODE.ENTER, KEY_CODE.TAB]}
            onAdd={(chip) => handleAddEmail(chip)}
            onDelete={(chip) => handleDelete(chip)}
            allowDuplicates
            alwaysShowPlaceholder
            clearInputValueOnChange
            placeholder={getString('text.enterCC')}
            InputLabelProps={{ shrink: true }}
            disableUnderline
          />
          {error && <p className="invalid">{error}</p>}
        </Grid>

        <Grid item xs={12} md={12}>
          <Controls.Input
            name="subject"
            placeholder={getString('text.enterSubject')}
            label={getString('text.subject')}
            value={email.subject}
            onChange={bindChange}
            fixedLabel
          />
        </Grid>

        {email.emailTemplate === EmailTemplateOptions.quote && (
          <Grid item xs={12} md={12}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="package-url">
                {getString('text.quotesAndPackageURL')}
              </InputLabel>
              <OutlinedInput
                name="packageUrl"
                placeholder={getString('text.quotesAndPackageURL')}
                value={email.packageUrl}
                onChange={bindChange}
                id="package-url"
                type="text"
                className={classes.adornmentEnd}
                endAdornment={
                  <Button
                    onClick={transformPlaceholdersWithGivenUrl}
                    variant="contained"
                    color="primary"
                    disabled={!isValidPackageUrl(email.packageUrl)}
                  >
                    {getString('text.add')}
                  </Button>
                }
                labelWidth={70}
              />
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} md={12}>
          <Controls.Input
            name="message"
            label={getString('text.message')}
            value={email.message}
            multiline
            rows={8}
            onChange={bindChange}
            fixedLabel
            placeholder={getString('text.enterMessage')}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <DropzoneArea
            dropzoneClass="email-form__attachment"
            acceptedFiles={AttachmentExtensions}
            filesLimit={100}
            dropzoneText="Drag and drop an attachment here or click"
            dropzoneParagraphClass="email-form__attachment__text"
            maxFileSize={FILE_CONFIG.MAX_ONE_FILE_SIZE}
            showPreviewsInDropzone={false}
            previewChipProps={{ classes: { root: classes.previewChip } }}
            useChipsForPreview
            showPreviews={false}
            onDrop={handleDropFile}
            showAlerts={false}
            getDropRejectMessage={(
              rejectedFile,
              acceptedFiles,
              maxFileSize
            ) => {
              handleRejectedFile(rejectedFile, acceptedFiles, maxFileSize);
              return '';
            }}
          />
          {renderAttachments()}
        </Grid>
      </Grid>
    </div>
  );
};

export default EmailForm;
