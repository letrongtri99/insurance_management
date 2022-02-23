import React, { useMemo, useState } from 'react';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { deepCopy } from 'shared/helper/utilities';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  sendEmail,
  uploadAttachment,
} from 'presentation/redux/actions/leadDetail/email';
import './MessageModalReply.scss';
import {
  IEmailRequestBody,
  mailTypes,
  getMailIndex,
  IListAttachmentRequest,
} from 'presentation/components/NewMessage/newMessage.helper';
import { v4 as uuidv4 } from 'uuid';
import EmailReplyForm from './EmailReplyForm';
import {
  getParentMailUUID,
  IParentEmail,
  IReplyFormData,
  initialFormData,
} from './messageReply.helper';

interface IReplyMessage {
  sendEmail: (payload: IEmailRequestBody) => void;
  handleCancelMessage: (value: boolean) => void;
  parentMail: IParentEmail;
  replyType: string;
  uploadAttachment: (payload: IListAttachmentRequest) => void;
}

const MessageModalReply: React.FC<IReplyMessage> = ({
  sendEmail: handleSendEmail,
  handleCancelMessage,
  uploadAttachment: handleUploadAttachment,
  parentMail,
  replyType,
}) => {
  const [formData, setFormData] = useState<IReplyFormData>(
    deepCopy(initialFormData)
  );
  const [validationSchema] = useState<any>();

  const handleCancelMessageInternal = (value: boolean) => {
    handleCancelMessage(value);
    setFormData(deepCopy(initialFormData));
  };

  const handleChangeEmailForm = (formValue: any) => {
    setFormData({
      ...formData,
      email: formValue,
    });
  };

  const uploadFileAndSendEmail = (
    mailId: string,
    mailModal: IEmailRequestBody
  ) => {
    const attachments = formData.email?.attachment || [];
    const listAttachment = attachments.map((item: File) => {
      return {
        fileModal: {
          fileSize: item.size,
          label: item.name,
        },
        file: item,
        mailId,
      };
    });
    handleUploadAttachment({ listAttachment, mailModal });
  };

  const handleSubmitMessageInternal = () => {
    const mailId = uuidv4();
    const mailModal: IEmailRequestBody = {
      subject: formData.email.subject,
      body: formData.email.message,
      cc: formData.email.cc,
      bodyText: formData.email.message,
      emailIndex: getMailIndex(formData.email.to),
      parentId: getParentMailUUID(parentMail.name),
      type: mailTypes.OUTBOUND,
      name: `mails/${mailId}`,
    };
    if (!formData.email.attachment.length) {
      handleSendEmail(mailModal);
    } else {
      uploadFileAndSendEmail(mailId, mailModal);
    }
    setFormData(deepCopy(initialFormData));
  };

  const validateSubmit = useMemo(() => {
    if (
      formData.email.message &&
      formData.email.subject &&
      formData.email.to.length
    ) {
      return false;
    }

    return true;
  }, [formData]);

  return (
    <div className="reply-message-section">
      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmitMessageInternal}
        validateOnMount
      >
        {() => {
          return (
            <Form>
              <Grid
                container
                direction="row"
                className="reply-message-section__header"
              >
                <Grid item xs={12} md={3}>
                  <h3 className="reply-message-section__header__title">
                    {getString('text.replyMessage')}
                  </h3>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid item xs={12} md={3} />
                <Grid item xs={12} md={6}>
                  <EmailReplyForm
                    changeForm={handleChangeEmailForm}
                    email={formData.email}
                    replyType={replyType}
                    parentMail={parentMail}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                className="reply-message-section__footer"
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  className="reply-message-section__footer__buttons"
                >
                  <Controls.Button
                    color="primary"
                    text={getString('text.cancelButton')}
                    onClick={() => handleCancelMessageInternal(false)}
                  />

                  <Controls.Button
                    type="submit"
                    color="primary"
                    disabled={validateSubmit}
                    text={getString('text.send')}
                  />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  parentMail: state.leadsDetailReducer.emailReducer.data.emailReplyTo,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      sendEmail,
      uploadAttachment,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MessageModalReply);
