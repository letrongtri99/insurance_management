import React, { FormEvent, useState } from 'react';
import { FormControl, Grid, withStyles } from '@material-ui/core';
import { Formik, Form } from 'formik';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { Color } from 'presentation/theme/variants';

interface IProps {
  close: () => void;
  warning?: any;
  classes?: any;
}

interface IFormValue {
  comment: string;
}

const styles = {
  warning: {
    color: Color.GREY_800,
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'end',

    '& span': {
      textDecoration: 'underline',
      display: 'inline-block',
      marginLeft: '0.5em',
    },
  },
  textArea: {
    '&& label': {
      fontSize: '1.3rem',
    },
    '& .MuiInput-multiline': {
      padding: '11px 16px',
      border: `1px solid ${Color.BLUE_MEDIUM}`,
      marginTop: '20px',
      borderRadius: '10px',
    },
  },
  btnGrp: {
    marginTop: '0',
    justifyContent: 'end',

    '& button': {
      marginBottom: '2em',
    },
  },
};

const OrderUpdateModal: React.FC<IProps> = ({ close, warning, classes }) => {
  const [selectedOpt, setSelectedOpt] = useState('');

  const options = [
    {
      id: 1,
      title: getString('orderUpdateFrm.pending'),
      value: 'pending',
    },
    {
      id: 2,
      title: getString('orderUpdateFrm.missing'),
      value: 'missing',
    },
    {
      id: 3,
      title: getString('orderUpdateFrm.complete'),
      value: 'complete',
    },
    {
      id: 4,
      title: getString('orderUpdateFrm.submission'),
      value: 'submission',
    },
  ];

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    val: string
  ) => {
    setSelectedOpt(val);
  };

  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      onSubmit={close}
    >
      {(props) => {
        const { handleChange, dirty } = props;

        const handleChangeComment = (event: FormEvent) => {
          handleChange(event);
        };

        return (
          <Form className="lead-add-phone" data-testid="order-update-modal">
            <FormControl margin="normal" required>
              <Controls.RadioGroup
                value={selectedOpt}
                name="status"
                onChange={onChange}
                items={options}
              />
            </FormControl>
            {warning && (
              <div data-testid="order-update-modal__warning">
                <p className={classes.warning}>
                  <ReportProblemOutlinedIcon style={{ fill: '#ea4548' }} />
                  <span>{getString('orderUpdateFrm.warning')}</span>
                </p>
                {warning}
              </div>
            )}
            <FormControl margin="normal" required className={classes.textArea}>
              <Controls.Input
                name="comment"
                margin="normal"
                label={getString('orderUpdateFrm.commentLbl')}
                onChange={handleChangeComment}
                placeholder={getString('orderUpdateFrm.commentPlaceholder')}
                rows={6}
                required
                multiline
                fixedLabel
              />
            </FormControl>
            <Grid container item xs={12} md={12} className={classes.btnGrp}>
              <Controls.Button
                color="primary"
                disabled={!(dirty && selectedOpt)}
                text={getString('text.update')}
                onClick={close}
              />
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default withStyles(styles)(OrderUpdateModal);
