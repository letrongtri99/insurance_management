import React, { ChangeEvent, useMemo, useState } from 'react';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import './index.scss';
import { Grid, Tab, Tabs } from '@material-ui/core';
import { Form, Formik } from 'formik';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';
import { deepCopy } from 'shared/helper/utilities';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  sendEmail,
  addAttachment,
  uploadAttachment,
} from 'presentation/redux/actions/leadDetail/email';
import { sendSms } from 'presentation/redux/actions/leadDetail/sms';
import { v4 as uuidv4 } from 'uuid';
import formatEmailTemplate from 'presentation/components/EmailTemplate';
import {
  MessageType,
  initialFormData,
  emailValidationSchema,
  smsValidationSchema,
  IFormData,
  getMailIndex,
  smsStatusTypes,
  mailTypes,
  ISmsRequestBody,
  IEmailRequestBody,
  IListAttachmentRequest,
} from './newMessage.helper';
import EmailForm from './EmailForm';
import SMSForm from './SMSForm';
import { ISms } from './SMSForm/sms.helper';

interface INewMessage {
  sendEmail: (payload: IEmailRequestBody) => void;
  sendSms: (payload: ISmsRequestBody) => void;
  handleCancelMessage: (value: boolean) => void;
  uploadAttachment: (payload: IListAttachmentRequest) => void;
}

const NewMessage: React.FC<INewMessage> = ({
  sendEmail: handleSendEmail,
  sendSms: handleSendSms,
  uploadAttachment: handleUploadAttachment,
  handleCancelMessage,
}) => {
  const [currentTab, setCurrentTab] = useState<string>(MessageType.Email);
  const [formData, setFormData] = useState<IFormData>(
    deepCopy(initialFormData)
  );
  const [validationSchema, setValidationSchema] = useState<any>(
    emailValidationSchema
  );

  const handleChangeTab = (
    event: ChangeEvent<unknown>,
    newTab: MessageType
  ) => {
    const schema = {
      [MessageType.SMS]: smsValidationSchema,
      [MessageType.Email]: emailValidationSchema,
    };
    setCurrentTab(newTab);
    setValidationSchema(schema[newTab]);
  };

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

  const handleChangeSmsForm = (formValue: ISms) => {
    setFormData({
      ...formData,
      sms: formValue,
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
    if (currentTab === MessageType.Email) {
      const mailId = uuidv4();
      const mailModal: IEmailRequestBody = {
        subject: formData.email.subject,
        body: formatEmailTemplate(formData.email.message),
        emailIndex: getMailIndex(formData.email.to),
        type: mailTypes.OUTBOUND,
        cc: formData.email.cc,
        bodyText: formData.email.message,
        name: `mails/${mailId}`,
      };
      if (formData.email.attachment.length === 0) {
        handleSendEmail(mailModal);
      } else {
        uploadFileAndSendEmail(mailId, mailModal);
      }
      // Reset the form
      setFormData(deepCopy(initialFormData));
    } else {
      const smsModal: ISmsRequestBody = {
        message: formData.sms.smsMessage,
        phoneIndex: +formData.sms.phone,
        status: smsStatusTypes.PENDING,
      };
      handleSendSms(smsModal);
      setFormData(deepCopy(initialFormData));
    }
  };

  const validateSubmit = useMemo(() => {
    if (currentTab === MessageType.Email) {
      if (
        formData.email.message &&
        formData.email.subject &&
        formData.email.to
      ) {
        return false;
      }
    } else if (
      currentTab === MessageType.SMS &&
      formData.sms.smsMessage &&
      formData.sms.phone
    ) {
      return false;
    }

    return true;
  }, [formData, currentTab]);

  return (
    <div className="new-message-section">
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
                className="new-message-section__header"
              >
                <Grid item xs={12} md={3}>
                  <h3 className="new-message-section__header__title">
                    {getString('text.newMessage')}
                  </h3>
                </Grid>

                <Grid item xs={12} md={9}>
                  <p>{getString('text.communicationType')}</p>
                  <Tabs
                    className="new-message-section__header__tab"
                    value={currentTab}
                    onChange={handleChangeTab}
                    aria-label="simple tabs example"
                  >
                    <Tab
                      label={getString('text.email')}
                      value={MessageType.Email}
                      icon={<EmailOutlinedIcon />}
                      className="tab-item"
                    />
                    <Tab
                      label={getString('text.sms')}
                      value={MessageType.SMS}
                      icon={<SmsFailedOutlinedIcon />}
                      className="tab-item"
                    />
                  </Tabs>
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid item xs={12} md={3} />
                <Grid item xs={12} md={6}>
                  {currentTab === MessageType.Email && (
                    <EmailForm
                      changeForm={handleChangeEmailForm}
                      email={formData.email}
                    />
                  )}
                  {currentTab === MessageType.SMS && (
                    <SMSForm
                      changeForm={handleChangeSmsForm}
                      sms={formData.sms}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                className="new-message-section__footer"
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  className="new-message-section__footer__buttons"
                >
                  <Controls.Button
                    color="primary"
                    text={getString('text.cancelButton')}
                    onClick={() => handleCancelMessageInternal(false)}
                  />

                  <Controls.Button
                    type="submit"
                    color="primary"
                    onClick={() => handleSubmitMessageInternal()}
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
  fileUploadUrl: state?.leadsDetailReducer?.emailReducer?.data?.fileUploadUrl,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      sendEmail,
      sendSms,
      addAttachment,
      uploadAttachment,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
