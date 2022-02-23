import React, { useState, useMemo, useEffect } from 'react';
import { Grid, FormControl } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import './index.scss';
import { Source, Hide, Score } from 'mock-data/LeadSourceSelect.mock';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import { ILeadSources } from 'shared/interfaces/common/lead/sources';
import { bindActionCreators } from 'redux';
import { hideModal } from 'presentation/redux/actions/ui';
import { getProductSelectorTypes } from 'presentation/redux/actions/typeSelector/product';
import {
  createLeadSources,
  updateLeadSources,
  getLeadSourceScore,
  clearSourceScore,
} from 'presentation/redux/actions/leads/sources';
import * as CONSTANTS from 'shared/constants';
import { deepCopy } from 'shared/helper/utilities';
import {
  getInitialLeadSources,
  createValidationSchema,
} from './sourceModal.helper';

interface AddtionalParams {
  score: number;
  scoreName?: string;
}

interface ICreateLeadSourcesProps {
  data: any;
  isEdit: boolean;
  score: any;
  scoreName: string;
  globalProduct: string;
  hideModal: (payload: string) => void;
  getProductSelectorTypes: () => void;
  createLeadSources: (
    payload: ILeadSources,
    additional: AddtionalParams
  ) => void;
  updateLeadSources: (
    payload: ILeadSources,
    additional: AddtionalParams
  ) => void;
  getLeadSourceScore: (payload: string) => void;
  clearSourceScore: () => void;
}

const SourceModal: React.FC<any> = ({
  data,
  isEdit,
  score,
  scoreName,
  globalProduct,
  hideModal: handleHideModal,
  createLeadSources: handleCreateLeadSources,
  getProductSelectorTypes: handleGetProductSelectorTypes,
  updateLeadSources: handleUpdateLeadSources,
  getLeadSourceScore: handleGetLeadSourceScore,
  clearSourceScore: handleClearSourceScore,
}: ICreateLeadSourcesProps) => {
  const [isDisabled] = useState(true);
  const [leadSources, setLeadSources] = useState<ILeadSources>();

  const closeModal = () => {
    handleHideModal(CONSTANTS.ModalConfig.leadSourcesModal);
  };

  const handleGetTypeSelector = () => {
    handleGetProductSelectorTypes();
  };

  useEffect(() => {
    handleGetTypeSelector();
    return () => {
      handleClearSourceScore();
    };
  }, []);

  useEffect(() => {
    if (isEdit && score) {
      const _clone = deepCopy(leadSources);
      _clone.score = score;
      setLeadSources(_clone);
    }
  }, [score]);

  useMemo(() => {
    if (isEdit) {
      // INFO: Selected row
      const { name } = data;
      setLeadSources({
        ...data,
        score: '',
      });
      handleGetLeadSourceScore(`scores/${name}`);
      return;
    }
    setLeadSources(getInitialLeadSources());
  }, []);

  const createFormSchema = () => {
    return createValidationSchema();
  };

  const handleSubmit = (values: any) => {
    const payload: ILeadSources = {
      product: globalProduct,
      hidden: values.hidden === 'true',
      source: values.source,
      online: false,
    };

    if (isEdit) {
      payload.name = values.name;
      handleUpdateLeadSources(payload, {
        score: values.score,
        scoreName: `scores/${values.name}`,
      });
    } else {
      handleCreateLeadSources(payload, {
        score: values.score,
      });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={leadSources as ILeadSources}
      onSubmit={handleSubmit}
      validationSchema={createFormSchema}
    >
      {(props) => {
        const { values, dirty, isValid, handleChange } = props;
        return (
          <Form className="lead-source-form">
            <Grid item xs={12} md={12} className="lead-source-modal">
              <FormControl
                margin="normal"
                required
                style={{ position: 'relative', zIndex: 1000 }}
              >
                <Controls.Input
                  name="source"
                  label={getString('text.source')}
                  value={values.source}
                  onChange={handleChange}
                  options={Source}
                  selectField="title"
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                style={{ position: 'relative', zIndex: 1000 }}
              >
                <Controls.Select
                  name="score"
                  label={getString('text.score')}
                  value={values.score}
                  onChange={handleChange}
                  options={Score}
                  selectField="value"
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                style={{ position: 'relative', zIndex: 1000 }}
              >
                <Controls.Select
                  name="hidden"
                  label={getString('text.hide')}
                  value={values.hidden}
                  selectField="value"
                  onChange={handleChange}
                  options={Hide}
                />
              </FormControl>

              <Grid container className="button-group">
                <Controls.Button
                  type="button"
                  variant="text"
                  color="secondary"
                  text={getString('text.cancelButton')}
                  onClick={closeModal}
                />
                <Controls.Button
                  type="submit"
                  color="primary"
                  disabled={!(isValid && dirty)}
                  style={{ opacity: isDisabled ? 0.5 : 1 }}
                  text={
                    !isEdit
                      ? `${getString('text.createSource')}`
                      : `${getString('text.updateSource')}`
                  }
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
  score: state.leadSourceReducer.sourceReducer.scoreSource.score,
  scoreName: state.leadSourceReducer.sourceReducer.scoreSource.name,
  globalProduct: state.typeSelectorReducer.globalProductSelectorReducer.data,
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      hideModal,
      getProductSelectorTypes,
      createLeadSources,
      updateLeadSources,
      getLeadSourceScore,
      clearSourceScore,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SourceModal);
