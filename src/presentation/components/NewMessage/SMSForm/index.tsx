import { Grid } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import React, { useEffect, useMemo, useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { maskPhoneNumber } from 'shared/helper/utilities';
import { SelectElement } from 'shared/types/controls';
import { ISms } from './sms.helper';

interface ISmsFormProps {
  changeForm: (formData: ISms) => void;
  sms: ISms;
}

const FIRST_PHONE_INDEX = '0';

const SMSForm: React.FC<ISmsFormProps> = ({
  changeForm: handleChangeForm,
  sms,
}) => {
  const leadDetail = useSelector(
    (state: any) => state.leadsDetailReducer?.lead?.payload || {}
  );
  const isSendEmail = useSelector(
    (state: any) => state.leadsDetailReducer?.smsReducer?.isFetching
  );
  const [charsCount, setCharsCount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');

  const bindSmsTemplate = (e: React.ChangeEvent<SelectElement>) => {
    setPhoneNumber(e.target.value as string);
  };

  const bindChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChangeForm({
      ...sms,
      [name]: value,
    });
  };

  const phoneNumbers = leadDetail?.data?.customerPhoneNumber ?? [];
  const maskedNumbers = phoneNumbers.map((num: any, index: number) => {
    return {
      id: `${index}`,
      title: maskPhoneNumber(num.phone),
      label: maskPhoneNumber(num.phone),
    };
  });

  const countMessageChars = useMemo(() => {
    return `${charsCount || 0} / 320 chars`;
  }, [charsCount]);

  useEffect(() => {
    if (sms?.phone) {
      setPhoneNumber(sms?.phone);
    }
  }, [sms]);

  useEffect(() => {
    if (maskedNumbers && maskedNumbers.length === 1) {
      setPhoneNumber(FIRST_PHONE_INDEX);
    }
  }, [maskedNumbers]);

  useEffect(() => {
    if (phoneNumber) {
      handleChangeForm({
        ...sms,
        phone: phoneNumber,
      });
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (isSendEmail && maskedNumbers.length === 1) {
      setPhoneNumber(FIRST_PHONE_INDEX);
      handleChangeForm({
        ...sms,
        phone: FIRST_PHONE_INDEX,
      });
    } else if (isSendEmail && !(maskedNumbers.length === 1)) {
      setPhoneNumber('');
    }
  }, [isSendEmail, maskedNumbers.length]);

  return (
    <div className="sms-form">
      <Grid container className="sms-container">
        <Grid item xs={12} md={12}>
          <Controls.Select
            name="phone"
            label={getString('text.phoneNumber')}
            value={phoneNumber}
            onChange={bindSmsTemplate}
            options={maskedNumbers}
            selectField="id"
            placeholder="Select"
            fixedLabel
          />
        </Grid>

        <Grid item xs={12} md={12} className="sms-container__textfield">
          <Controls.Input
            helperText={countMessageChars}
            inputProps={{ maxLength: 320 }}
            name="smsMessage"
            label={getString('text.message')}
            value={sms.smsMessage}
            multiline
            rows={4}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCharsCount(e.target.value.length);
              bindChange(e);
            }}
            placeholder={getString('text.enterMessage')}
            fixedLabel
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SMSForm;
