import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { Dialog, Typography, Grid } from '@material-ui/core';
import * as Icon from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import downloadDocumentFromBlobURL from 'shared/helper/downloadDocumentHelper';
import CommonModal from 'presentation/components/modal/CommonModal';
import DeleteDocumentModal from 'presentation/components/modal/DeleteDocumentModal';
import Controls from 'presentation/components/controls/Control';
import {
  FileListIcon,
  DownloadFileIcon,
  TrashIcon,
  UploadFileIcon,
} from 'presentation/components/icons';
import { getFieldTitle } from 'presentation/pages/LeadDetailsPage/leadDetailsPage.helper';
import { getString } from 'presentation/theme/localization';
import {
  fakeDocuments,
  FilesDownload,
  IFakeDocument,
  IUploadedDocument,
  UpdateTypes,
} from 'presentation/components/ActivityOrderSection/DocumentSection';
import './index.scss';

interface IPropsFileBrowseModal {
  openDialog: boolean;
  handleCloseDialog: () => void;
  label: string;
  fileLink: string;
  listFiles: (FilesDownload | undefined)[];
  documents: (IUploadedDocument | null)[];
  handleUpdateListFiles: (
    newFile: FilesDownload | undefined,
    typeUpdate: UpdateTypes
  ) => void;
  handleDeleteDocument: (payload: string) => void;
}

const DropFileZone = styled.div`
  cursor: pointer;
`;

const StyledImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin-top: 10px;
  border-radius: 7px;
`;

enum FAKE_DOCUMENT_FIELDS {
  TITLE = 'title',
  VALUE = 'value',
  LABEL = 'label',
}

enum DOCUMENT_FIELDS {
  LABEL = 'label',
  DOCUMENT = 'document',
}

const FileBrowseModal: React.FC<IPropsFileBrowseModal> = ({
  openDialog,
  handleCloseDialog,
  label,
  fileLink,
  documents,
  handleUpdateListFiles = () => null,
  handleDeleteDocument,
}) => {
  const [currentFile, setCurrentFile] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const getFieldFrmFakeDocsByLbl = (
    lbl: string,
    field: FAKE_DOCUMENT_FIELDS
  ) => {
    const currentField = fakeDocuments.filter(
      (doc: IFakeDocument) => doc.label === lbl
    )[0];
    if (!currentField) return '';
    return currentField[field];
  };

  const getFieldFromDocsByLbl = (lbl: string, field: DOCUMENT_FIELDS) => {
    const currentUploadedDoc = (documents || []).filter(
      (doc: any) => doc.label.split('-')[0] === lbl
    )[0];
    if (!currentUploadedDoc) return '';
    return currentUploadedDoc[field];
  };

  const handleOpenCloseModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const onDeleteDocument = () => {
    handleDeleteDocument(
      getFieldFromDocsByLbl(currentFile, DOCUMENT_FIELDS.LABEL)
    );
    handleOpenCloseModal();
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: any) => {
        const newFileUpload = {
          file,
          fileName: file.name,
          documentType: getFieldFrmFakeDocsByLbl(
            currentFile,
            FAKE_DOCUMENT_FIELDS.VALUE
          ),
          label: getFieldFrmFakeDocsByLbl(
            currentFile,
            FAKE_DOCUMENT_FIELDS.LABEL
          ),
        };
        handleUpdateListFiles(newFileUpload, UpdateTypes.Upload);
      });
    },
    [handleUpdateListFiles, currentFile]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    setCurrentFile(label);
  }, [label, fileLink, openDialog]);

  const handleChangeCurrentFile = (document: string) => () => {
    setCurrentFile(document);
  };

  const handleDownloadDocument = () => {
    const documentID = getFieldFromDocsByLbl(
      currentFile,
      DOCUMENT_FIELDS.DOCUMENT
    );
    if (documentID) downloadDocumentFromBlobURL(documentID);
  };

  return (
    <Dialog open={openDialog} className="file-browser-modal-wrap">
      <div className="file-browser-modal-override">
        <div className="modal-button-close no-background">
          <div className="close-btn">
            <Icon.Close onClick={() => handleCloseDialog()} />
          </div>
        </div>
        <Grid
          container
          item
          direction="row"
          xs={12}
          md={12}
          spacing={2}
          className="file-browser-list"
        >
          <Grid container item xs={12} md={12} spacing={5}>
            <Grid item xs={8} className="iframe-container">
              {!getFieldFromDocsByLbl(currentFile, DOCUMENT_FIELDS.DOCUMENT) ? (
                <DropFileZone {...getRootProps()}>
                  <input {...getInputProps()} />
                  <span className="drop-area">
                    <UploadFileIcon className="upload-icon" />
                    {getString('text.dragOrDropFile')}
                    <u>{getString('text.chooseFile')}</u>
                  </span>
                </DropFileZone>
              ) : (
                <StyledImg
                  alt="Document Preview"
                  src={`${
                    process.env.REACT_APP_API_ENDPOINT
                  }/api/document/v1alpha1/${getFieldFromDocsByLbl(
                    currentFile,
                    DOCUMENT_FIELDS.DOCUMENT
                  )}:file`}
                  title={getFieldFrmFakeDocsByLbl(
                    currentFile,
                    FAKE_DOCUMENT_FIELDS.TITLE
                  )}
                />
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" className="document-type">
                {getFieldFrmFakeDocsByLbl(
                  currentFile,
                  FAKE_DOCUMENT_FIELDS.TITLE
                )}
              </Typography>
              {getFieldFromDocsByLbl(currentFile, DOCUMENT_FIELDS.DOCUMENT) && (
                <Grid container item xs={12}>
                  <Grid item sm={12} md={6}>
                    <Controls.Button
                      text={getString('text.download')}
                      color="primary"
                      variant="contained"
                      startIcon={<DownloadFileIcon />}
                      className="download-button"
                      onClick={handleDownloadDocument}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <Controls.Button
                      text={getString('text.remove')}
                      color="primary"
                      variant="outlined"
                      startIcon={<TrashIcon />}
                      className="remove-button"
                      onClick={handleOpenCloseModal}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          {fakeDocuments.map((e) => (
            <Grid
              item
              xs={1}
              key={e.title}
              className={clsx(
                currentFile === e.label && 'file-active',
                'file-name-list'
              )}
              onClick={handleChangeCurrentFile(e.label)}
            >
              <FileListIcon />
              <div>{getFieldTitle(e.title)}</div>
            </Grid>
          ))}
        </Grid>
        <CommonModal
          title=""
          open={openDeleteModal}
          handleCloseModal={handleOpenCloseModal}
        >
          <DeleteDocumentModal
            handleOpenCloseModal={handleOpenCloseModal}
            handleRemoveDocument={onDeleteDocument}
            documentType={getFieldFrmFakeDocsByLbl(
              currentFile,
              FAKE_DOCUMENT_FIELDS.TITLE
            )}
          />
        </CommonModal>
      </div>
    </Dialog>
  );
};

export default FileBrowseModal;
