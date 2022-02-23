import { Grid } from '@material-ui/core';
import React from 'react';
import { convertDateTime } from 'shared/helper/convertDateTime';
import './index.scss';
import {
  AutoMailIcon,
  InboundMailIcon,
  OutboundMailIcon,
  SupportMailIcon,
} from 'presentation/components/icons';
import { IItemEmail } from '../messageModal.helper';

export interface IMessageItem {
  id: number;
  subject: string;
  body: string;
  createdAt: string;
  isInComing: boolean;
}
export interface IPropsMessageModalItem {
  messageItem: IItemEmail;
  isStoryBook?: boolean;
  isActive: string;
  onClick: () => void;
}

const inboundType = 'INBOUND';
const systemType = 'SYSTEM';
const supportType = 'SUPPORT';

const MessageModalItem: React.FC<IPropsMessageModalItem> = ({
  messageItem,
  isStoryBook,
  isActive,
  onClick,
}) => {
  return (
    <Grid
      onClick={onClick}
      item
      xs={12}
      md={12}
      className={`mail-section__item ${
        isActive === messageItem.name ? 'active' : ''
      }`}
    >
      <div className="mail-section__item__info">
        {(() => {
          switch (messageItem.type) {
            case systemType:
              return (
                <div className="mail-info__icon">
                  <AutoMailIcon
                    fontSize="small"
                    className="mail-info__icon__svg"
                  />
                </div>
              );
            case inboundType:
              return (
                <div className="mail-info__icon">
                  <InboundMailIcon
                    fontSize="small"
                    className="mail-info__icon__svg"
                  />
                </div>
              );
            case supportType:
              return (
                <div className="mail-info__icon">
                  <SupportMailIcon
                    fontSize="small"
                    className="mail-info__icon__svg"
                  />
                </div>
              );
            default:
              return (
                <div className="mail-info__icon">
                  <OutboundMailIcon
                    fontSize="small"
                    className="mail-info__icon__svg"
                  />
                </div>
              );
          }
        })()}
        <div
          className={`mail-info__content${
            isStoryBook ? ' mail-info__content-storybook' : ''
          }`}
        >
          <h4 className="mail-info__content__subject">{messageItem.subject}</h4>
          <p className="mail-info__content__desc">{messageItem.bodyText}</p>
          <p className="mail-info__content__date">
            {convertDateTime(messageItem.createTime)}
          </p>
        </div>
      </div>
    </Grid>
  );
};
export default MessageModalItem;
