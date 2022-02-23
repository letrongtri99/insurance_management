import { Chip, createStyles, Grid, makeStyles } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import React, { useEffect, useState } from 'react';
import {
  isEmail,
  isValidRabbitEmail,
  DomainConfigurations,
  AttachmentExtensions,
} from 'presentation/components/NewMessage/EmailForm/email.helper';
import { ISnackBarConfig } from 'shared/interfaces/common';
import * as CONSTANTS from 'shared/constants';
import { DropzoneArea } from 'material-ui-dropzone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSnackBar } from 'presentation/redux/actions/ui';
import { ReplyTypes } from '../../messageModal.helper';
import {
  IParentEmail,
  KEY_CODE,
  FILE_CONFIG,
  quotingBodyMessage,
  IEmail,
  handleRejectedMessage,
  checkTotalFileSize,
} from '../messageReply.helper';

interface IEmailFormProps {
  changeForm: (formData: IEmail) => void;
  showSnackBar: (payload: ISnackBarConfig) => void;
  email: IEmail;
  parentMail: IParentEmail;
  replyType: string;
}

const EmailReplyForm: React.FC<IEmailFormProps> = ({
  changeForm: handleChangeForm,
  showSnackBar: handleShowSnackBar,
  email,
  parentMail,
  replyType,
}) => {
  const useStyles = makeStyles((theme) =>
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
      },
    })
  );
  const [error, setError] = useState('');
  const classes = useStyles();

  const isInList = (_email: string) => {
    const isExist = email.cc.filter((val: string) => val === _email).length;
    return isExist;
  };

  useEffect(() => {
    if (parentMail) {
      if (replyType === ReplyTypes.REPLY_ALL) {
        handleChangeForm({
          ...email,
          to: parentMail.to,
          subject: parentMail.subject,
          message: quotingBodyMessage(parentMail.bodyText),
          cc: parentMail.cc,
        });
      } else {
        handleChangeForm({
          ...email,
          to: parentMail.to,
          subject: parentMail.subject,
          message: quotingBodyMessage(parentMail.bodyText),
        });
      }
    }
  }, [parentMail, replyType]);

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

    if (!isValidRabbitEmail(_email, DomainConfigurations) && isEmail(_email)) {
      errorMsg = getString('text.invalidRabbitEmail', {
        email: _email,
      });
    }

    if (errorMsg) {
      setError(errorMsg);

      return false;
    }

    return true;
  };

  const bindChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    handleChangeForm({
      ...email,
      [name]: value,
    });
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
  };

  const handleRejectedFile = (
    rejectedFile: { name: string; type: string | undefined; size: number },
    acceptedFiles: string[],
    maxFileSize: number
  ) => {
    const msg = handleRejectedMessage(rejectedFile, acceptedFiles, maxFileSize);

    handleShowSnackBar({
      isOpen: true,
      message: msg,
      status: CONSTANTS.snackBarConfig.type.error,
    });
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
      return email.attachment.map((file: any, index: number) => (
        <Chip
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

  const handleDropFile = (file: File) => {
    if (checkTotalFileSize(email.attachment)) {
      handleShowSnackBar({
        isOpen: true,
        message: getString('text.totalMaxFileSize', {
          fileName: file.name,
        }),
        status: CONSTANTS.snackBarConfig.type.error,
      });
    } else {
      email.attachment.push(file);
      handleChangeForm({
        ...email,
        attachment: email.attachment,
      });
    }
  };

  return (
    <div className="email-form">
      <Grid container className="email-container">
        <Grid item xs={12} md={12}>
          <Controls.Input
            name="to"
            label={getString('text.to')}
            value={email.to}
            onChange={bindChange}
            disabled
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <ChipInput
            className="email-form__cc"
            value={email.cc || []}
            label={getString('text.cc')}
            newChipKeyCodes={[KEY_CODE.ENTER, KEY_CODE.TAB]}
            onAdd={handleAddEmail}
            onDelete={handleDelete}
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
            label={getString('text.subject')}
            value={email.subject}
            onChange={bindChange}
            disabled
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Controls.Input
            name="message"
            label={getString('text.message')}
            value={email.message}
            multiline
            rows={8}
            onChange={bindChange}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <DropzoneArea
            dropzoneClass="email-form__attachment"
            dropzoneParagraphClass="email-form__attachment__text"
            acceptedFiles={AttachmentExtensions}
            filesLimit={100}
            dropzoneText="Drag and drop an attachment here or click"
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

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      showSnackBar,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmailReplyForm);
