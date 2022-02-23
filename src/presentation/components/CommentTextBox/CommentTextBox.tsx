import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper as MuiPaper,
  Tab,
  Tabs,
  TextareaAutosize,
  Typography,
  withTheme,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import DocumentSection from 'presentation/components/ActivityOrderSection/DocumentSection';
import styled from 'styled-components';
import { uploadDocument } from 'presentation/redux/actions/document';
import {
  createDocumentLead,
  deleteDocumentLead,
  getDocumentLead,
} from 'presentation/redux/actions/leads/upload';
import { pushComment } from '../../redux/actions/leadDetail/comment';
import { isScrollTop$ } from '../controls/Services/serviceHandleScroll';
import { getString } from '../../theme/localization';

interface TabPanelProps {
  children?: React.ReactNode | undefined;
  dir?: string | undefined;
  index: any;
  value: any;
}

const EX_LEAD_ID = '24a09e89-2bbd-4b46-af26-f91671aefa79';

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.defaultProps = {
  children: null,
  dir: null,
};

type commentPayload = {
  createBy: string;
  text: string;
};
interface IProps {
  isFetching: boolean;
  loading: boolean;
  leadID: string;
  documentName: string;
  uploadedDocuments: any;
  pushCommentAction: (params: commentPayload) => void;
  uploadDocument: (payload: any) => void;
  createDocumentLead: (payload: any) => void;
  deleteDocumentLead: (payload: any) => void;
  getDocumentLead: (payload: any) => void;
}

enum TabValue {
  Comment = 0,
  Remark = 1,
  Document = 2,
}

const Paper = withTheme(styled(MuiPaper)`
  &&& {
    box-shadow: none;
    border-top: 1px solid ${({ theme }) => theme.border.color};
    border-bottom: 1px solid ${({ theme }) => theme.border.color};
  }
`);

const CommentTextBox = ({
  pushCommentAction,
  isFetching,
  loading,
  leadID,
  documentName,
  uploadedDocuments,
  uploadDocument: handleUploadDocument,
  createDocumentLead: handleCreateDocumentLead,
  deleteDocumentLead: handleDeleteDocumentLead,
  getDocumentLead: handleGetDocumentLead,
}: IProps) => {
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const [remark, setRemark] = useState('');
  const [params, setParams] = useState<any>(null);

  useEffect(() => {
    handleGetDocumentLead(leadID);
  }, []);

  useEffect(() => {
    if (isFetching) {
      setComment('');
    }
  }, [isFetching]);

  useEffect(() => {
    if (documentName) {
      handleCreateDocumentLead({
        params: {
          ...params,
          document: documentName,
        },
        parents: leadID,
      });
    }
  }, [documentName]);

  const handleChangeComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const commentValue = event.target.value;
    setComment(commentValue);
  };

  const handleChangeRemark = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const remarkValue = event.target.value;
    setRemark(remarkValue);
  };

  const handleSubmit = () => {
    const { location } = history;
    const leadId = location.pathname.split('lead/')[1] || EX_LEAD_ID;
    const payload = {
      createBy: '',
      text: '',
      leadId,
    };

    if (value === 0) {
      payload.createBy = '';
      payload.text = comment.trim();
      pushCommentAction(payload);
      isScrollTop$.next(true);
      return;
    }

    payload.createBy = '';
    payload.text = remark.trim();
    pushCommentAction(payload);
    isScrollTop$.next(true);
  };

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  const getCurrentDoc = (label: string) => {
    const currentDoc = uploadedDocuments.filter(
      (doc: any) => doc.label === label
    );
    if (!currentDoc[0]) return null;
    return currentDoc[0];
  };

  const onDeleteDocumentLead = (label: string) => {
    const document = getCurrentDoc(label);
    if (document) handleDeleteDocumentLead(document.name);
  };

  const onUploadDocument = (fileUpload: any) => {
    setParams({
      type: fileUpload?.documentType,
      label: `${fileUpload?.label}-${fileUpload?.fileName}`,
    });
    handleUploadDocument({
      contentType: fileUpload?.file.type,
      displayName: fileUpload?.fileName,
      file: fileUpload?.file,
    });
  };

  return (
    <Paper square className="shared-comment-text-box">
      {loading && (
        <div className="back-drop">
          <CircularProgress color="inherit" size={20} />
        </div>
      )}
      <AppBar
        position="static"
        color="transparent"
        className="shared-comment-text-box__app-bar"
      >
        <Tabs
          className="shared-comment-text-box__tab-header"
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab
            label={getString('lead.comment')}
            color="primary"
            className="unittest-tab-comment tab-comment-btn"
          />
          <Tab
            label={getString('lead.remark')}
            className="unittest-tab-comment tab-comment-btn"
          />
          <Tab
            label={getString('lead.document')}
            className="unittest-tab-comment tab-comment-btn"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TextareaAutosize
          className="shared-comment-text-box__text-area unittest-text-area-comment"
          value={comment}
          onChange={handleChangeComment}
          aria-label="empty textarea"
          rowsMin={5}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TextareaAutosize
          className="shared-comment-text-box__text-area"
          value={remark}
          onChange={handleChangeRemark}
          aria-label="empty textarea"
          rowsMin={5}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DocumentSection
          handleUploadDocument={onUploadDocument}
          handleDeleteDocument={onDeleteDocumentLead}
          documents={uploadedDocuments}
        />
      </TabPanel>
      {value !== TabValue.Document && (
        <Grid className="shared-comment-text-box__btn-container">
          <Button
            color="primary"
            variant="contained"
            className="shared-comment-text-box__btn unittest-text-box-btn"
            disabled={
              value === TabValue.Comment
                ? comment.length <= 0
                : remark.length <= 0
            }
            onClick={handleSubmit}
          >
            {getString('text.save')}
          </Button>
        </Grid>
      )}
    </Paper>
  );
};

const mapStateToProps = (state: any) => ({
  isFetching: state.leadsDetailReducer.commentReducer.isFetching,
  loading: state.leadsDetailReducer.commentReducer.data.loading,
  documentName: state.documentReducer.data?._data?.document.name || '',
  leadID: state.leadsDetailReducer.lead.payload.name,
  uploadedDocuments: state.leadsReducer.createDocumentReducer.documents || [],
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      pushCommentAction: pushComment,
      uploadDocument,
      createDocumentLead,
      deleteDocumentLead,
      getDocumentLead,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CommentTextBox);
