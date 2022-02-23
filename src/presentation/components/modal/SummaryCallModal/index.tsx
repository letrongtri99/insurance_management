import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { Grid, FormControl } from '@material-ui/core';
import { RejectReason, LeadStatus } from 'mock-data/LeadSourceSelect.mock';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { handleSummaryModal } from 'presentation/redux/actions/leads/detail';
import { ISummaryCallModal } from 'shared/interfaces/common/lead/detail';
import createValidationSchema from './summaryCall.helper';
import './index.scss';

interface ISummaryCallProps {
  leadName: any;
  showStatus: boolean;
  leadDetail: any;
  handleSummaryModal: (payload: ISummaryCallModal) => void;
  isLeadLoading: boolean;
}
interface RejectionModalProps {
  comment: string;
  approved: boolean;
  reason?: string;
  status?: string;
}

const SummaryCallModal: React.FC<any> = ({
  leadName,
  showStatus = false,
  leadDetail,
  handleSummaryModal: handleSummaryModalClick,
  isLeadLoading,
}: ISummaryCallProps) => {
  const [summaryCall, setSummaryCall] = useState<RejectionModalProps>({
    comment: '',
    approved: false,
    reason: '',
    status: '',
  });

  useEffect(() => {
    setSummaryCall({
      ...summaryCall,
      status: leadDetail.status,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadDetail.status]);

  const createFormSchema = () => {
    return createValidationSchema();
  };

  const handleSubmit = (values: any) => {
    const SummaryCallModalData: ISummaryCallModal = {
      leadId: leadName,
      comment: values.comment,
      status: leadDetail.status !== values.status ? values.status : null,
      reason: values.approved ? values.reason : null,
    };

    handleSummaryModalClick(SummaryCallModalData);
  };

  const localeLeadStatus = LeadStatus.map((status) => ({
    ...status,
    title: getString(status.title),
  }));

  const localeRejectReason = RejectReason.map((reason) => ({
    ...reason,
    title: getString(reason.title),
  }));

  return (
    <Formik
      enableReinitialize
      initialValues={summaryCall as RejectionModalProps}
      onSubmit={handleSubmit}
      validationSchema={createFormSchema}
      validateOnMount
    >
      {(props) => {
        const { values, errors, handleChange } = props;
        return (
          <Form className="summary-call-form">
            <Grid item xs={12} md={12} className="summary-call-modal">
              <FormControl
                margin="normal"
                required
                style={{ position: 'relative', zIndex: 1000 }}
              >
                <Controls.Input
                  name="comment"
                  label={getString('text.comment')}
                  value={values.comment}
                  onChange={handleChange}
                  rows={4}
                  required
                  multiline
                  className="summary-call-form__comment"
                />
              </FormControl>
              {showStatus && (
                <FormControl
                  margin="normal"
                  required
                  style={{ position: 'relative', zIndex: 1000 }}
                >
                  <Controls.Select
                    name="status"
                    label={getString('text.leadStatus')}
                    value={values.status}
                    onChange={handleChange}
                    options={localeLeadStatus}
                    selectField="value"
                    required
                  />
                </FormControl>
              )}
              <Controls.Checkbox
                name="approved"
                value={values.approved}
                label={getString('text.rejectLead')}
                onChange={(e: React.ChangeEvent<any>) => {
                  setSummaryCall({
                    comment: values.comment,
                    status: values.status,
                    approved: e.target.checked,
                    reason: '',
                  });
                }}
              />

              {values.approved && (
                <FormControl
                  margin="normal"
                  required
                  style={{ position: 'relative', zIndex: 1000 }}
                >
                  <Controls.Select
                    name="reason"
                    label={getString('text.rejectionReason')}
                    value={values.reason}
                    onChange={handleChange}
                    options={localeRejectReason}
                    selectField="value"
                    required
                  />
                </FormControl>
              )}

              <Grid
                container
                className="button-group"
                style={{ justifyContent: 'center' }}
              >
                <Controls.Button
                  type="submit"
                  color="primary"
                  disabled={
                    (values.comment === '' || Object.keys(errors).length) &&
                    !isLeadLoading
                  }
                  text={getString('text.save')}
                />
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state: any) => ({
  typeSelector: state.typeSelectorReducer,
  leadDetail: state.leadsDetailReducer.lead.payload,
  isLeadLoading: state.leadsDetailReducer.lead.isLoading,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      handleSummaryModal,
    },
    dispatch
  );

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(SummaryCallModal),
  (prevProps, nextProps) => true
);
