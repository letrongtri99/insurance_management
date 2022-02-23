/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Button, Container, Paper, withTheme } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ReplyIcon from '@material-ui/icons/Reply';
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import './index.scss';
import { convertDateTime } from 'shared/helper/convertDateTime';
import { getString } from 'presentation/theme/localization';
import { replyEmail } from 'presentation/redux/actions/leadDetail/addEmail';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PdfAttachment from '../Attachment';
import {
  fakeFromEmail,
  fakeToEmail,
  fakeTemplate,
  IItemEmail,
  ReplyTypes,
} from '../messageModal.helper';

const ReplyButton = withTheme(styled(Button)`
  &&& {
    padding-left: 10px;
    display: flex;
    align-items: center;
    border-radius: 0;
    margin-top: 12px;
    float: right;
    min-width: 100px;
    margin-left: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
  }
`);

const ReplyAllButton = styled(ReplyButton)`
  margin-left: 0;
`;

export interface IMessageEmail {
  from: string;

  to: string;

  cc: Array<string>;

  subject: string;

  body: string;
  // eslint-disable-next-line camelcase
  body_text: string;

  createdAt: string;

  template: string;

  attachments: Array<IAttachment>;
}
export interface IAttachment {
  name: string;
  fileSize: string;
  label: string;
  embedded: boolean;
  createTime: string;
  updateTime: string;
  deleteTime: string;
  createdBy: string;
}

interface IPropsMessageModalEmail {
  email: IItemEmail;
  attachmentLoading: boolean;
  attachment: [IAttachment];
  onClick: () => void;
  handleReplyEmail: (value: string) => void;
}

const MessageModalEmail: React.FC<IPropsMessageModalEmail> = ({
  email,
  attachment,
  attachmentLoading,
  onClick,
  handleReplyEmail,
}) => {
  const dispatch = useDispatch();
  const [isTemplate, setIsTemplate] = useState<boolean>(false);
  const { i18n } = useTranslation();

  const listToEmail = useSelector(
    (state: any) =>
      state.leadsDetailReducer?.getAgentReducer?.data?.agent?.data
        ?.customerEmail || []
  );
  const [toEmail, setToEmail] = useState(listToEmail[email.emailIndex]);
  const [fromEmail, setFromEmail] = useState(fakeFromEmail);

  useEffect(() => {
    if (email.emailIndex === -1) {
      setToEmail(fakeFromEmail);
      setFromEmail(listToEmail[email.emailIndex]);
    } else {
      setToEmail(listToEmail[email.emailIndex]);
      setFromEmail(fakeFromEmail);
    }
  }, [email.emailIndex, listToEmail]);

  const renderAttachment = useMemo(() => {
    const listAttachment = attachment.map(
      (item: IAttachment, index: number) => (
        <PdfAttachment key={index} data={item} />
      )
    );
    return !attachmentLoading ? listAttachment : '';
  }, [attachment, attachmentLoading]);

  const handleRepLyBtn = (type: string) => {
    const parentEmail = {
      to: email.type === 'OUTBOUND' ? fakeFromEmail : '',
      name: email.name,
      subject: email.subject,
      body: email.body,
      bodyText: email.bodyText,
      cc: email.cc,
      attachments: [],
      parentId: email.name,
      from: fakeToEmail,
    };

    dispatch(replyEmail(parentEmail));
    handleReplyEmail(type);
  };

  const template = { __html: email.body };

  useEffect(() => {
    if (template) {
      setIsTemplate(
        template.__html.indexOf('class="rabbit-email-template') !== -1
      );
    }
  }, [template]);

  const addressClass = useMemo(
    () => (i18n.language === 'en' ? 'address' : 'address th'),
    [i18n.language]
  );

  return (
    <Grid item xs={12} md={12} className="message-model-email">
      <Grid container xs={12} md={12} className="modal-header-email">
        <Grid
          container
          xs={12}
          md={12}
          lg={12}
          xl={12}
          className="modal-header-email__content"
        >
          <Grid item xs={12} md={12} lg={6} xl={9}>
            <Paper className="custom-name unittest-template">
              {fakeTemplate}
            </Paper>
            <h2 className="modal-header-email__content__subject unittest-subject">
              {email.subject}
              {!attachmentLoading && attachment.length ? (
                <AttachFileIcon className="subject-icon" />
              ) : (
                ''
              )}
            </h2>
          </Grid>
          <Grid item xs={12} md={12} lg={6} xl={3}>
            <div>
              <ReplyAllButton
                onClick={() => handleRepLyBtn(ReplyTypes.REPLY_ALL)}
                variant="contained"
                color="primary"
              >
                <div className="mail-info__icon">
                  <ReplyAllIcon
                    fontSize="small"
                    className="mail-info__icon__svg"
                  />
                </div>
                {getString('text.replyAll')}
              </ReplyAllButton>
              <ReplyButton
                onClick={() => handleRepLyBtn(ReplyTypes.REPLY)}
                variant="contained"
                color="primary"
              >
                <div className="mail-info__icon">
                  <ReplyIcon
                    fontSize="small"
                    className="mail-info__icon__svg"
                  />
                </div>
                {getString('text.reply')}
              </ReplyButton>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} md={12} className="modal-body">
        <Grid item xs={12} md={12} className="modal-body__content">
          <Grid item xs={12} md={8} className="modal-body__content__left">
            <div className="modal-body__content__left__item">
              <div className={addressClass}>
                <div className="address__key">
                  <span>{getString('text.from')}</span>
                </div>
                <span>
                  :&nbsp;
                  <a href={`mailto:${fromEmail}`}>{fromEmail}</a>
                </span>
              </div>
              <div className={addressClass}>
                <div className="address__key">
                  <span>{getString('text.to')}</span>
                </div>
                <span>
                  :&nbsp;
                  <a href={`mailto:${toEmail}`}>{toEmail}</a>
                </span>
              </div>
              {email.cc.length ? (
                <div className={addressClass}>
                  <div className="address__key">
                    <span>{getString('text.cc')}</span>
                  </div>
                  <div className="cc_list">
                    {email.cc.map((item: any, index: number) => (
                      <span key={index}>
                        {index > 0 ? null : ':'}
                        &nbsp;
                        <a className="cc_list__value" href={`mailto:${item}`}>
                          {item}
                        </a>
                        {index === email.cc.length - 1 ? null : ','}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Grid>
          <Grid item xs={12} md={4} className="modal-body__content__right">
            <span>{convertDateTime(email.createTime)}</span>
          </Grid>
        </Grid>
        <Container className="modal-body__email">
          <Paper className="modal-body__email__template">
            <div
              className={
                !isTemplate && email.type !== 'INBOUND'
                  ? 'pre-wrap'
                  : 'body-text'
              }
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={template}
            />
          </Paper>
          <div className="modal-body__email__group-item">
            {renderAttachment}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default MessageModalEmail;
