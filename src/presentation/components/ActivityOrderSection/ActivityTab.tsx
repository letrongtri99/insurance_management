import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
import {
  createOrderDocument,
  deleteDocument,
  getUploadedDocuments,
} from 'presentation/redux/actions/order/document';
import { uploadDocument } from 'presentation/redux/actions/document';
import CommentSectionContainer from './CommentSection';
import DocumentSection from './DocumentSection';
import { getString } from '../../theme/localization';
import CustomTab from '../common/details/CustomTab';

interface IActivityTabProps {
  documentName: string;
  uploadedDocuments: any;
  createOrderDocument: (payload: any) => void;
  uploadDocument: (payload: any) => void;
  deleteDocument: (payload: any) => void;
  getUploadedDocuments: (payload: string) => void;
}

const ActivityTab: React.FC<IActivityTabProps> = ({
  createOrderDocument: handleCreateOrderDocument,
  uploadDocument: handleUploadDocument,
  deleteDocument: handleDeleteDocument,
  getUploadedDocuments: handleGetUploadedDocuments,
  documentName,
  uploadedDocuments,
}) => {
  const { id } = useParams();
  const [params, setParams] = useState<any>(null);

  const onUploadDocument = (payload: any) => {
    setParams({
      type: payload?.documentType,
      label: `${payload?.label}-${payload?.fileName}`,
    });
    handleUploadDocument({
      contentType: payload?.file.type,
      displayName: payload?.fileName,
      file: payload?.file,
    });
  };

  const getCurrentDoc = (label: string) => {
    const currentDoc = uploadedDocuments.filter(
      (doc: any) => doc.label === label
    );
    if (!currentDoc[0]) return null;
    return currentDoc[0];
  };

  const onDeleteDocument = (label: string) => {
    const document = getCurrentDoc(label);
    if (document) handleDeleteDocument(document.name);
  };

  useEffect(() => {
    handleGetUploadedDocuments(`orders/${id}`);
  }, []);

  useEffect(() => {
    if (documentName) {
      handleCreateOrderDocument({
        params: {
          ...params,
          document: documentName,
        },
        orderName: `orders/${id}`,
      });
    }
  }, [documentName]);

  const tabs = [
    {
      label: getString('lead.document'),
      component: (
        <DocumentSection
          handleUploadDocument={onUploadDocument}
          handleDeleteDocument={onDeleteDocument}
          documents={uploadedDocuments}
        />
      ),
    },
    {
      label: getString('lead.comment'),
      component: <div className="fake-section" />,
    },
    {
      label: getString('lead.allActivity'),
      component: <CommentSectionContainer />,
    },
  ];
  return (
    <div className="order-activity-container">
      <CustomTab tabs={tabs} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  documentName: state.documentReducer.data?._data?.document.name || '',
  uploadedDocuments: state.orderUploadDocumentReducer.documents || [],
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      createOrderDocument,
      uploadDocument,
      deleteDocument,
      getUploadedDocuments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTab);
