/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { withTheme } from '@material-ui/core';
import downloadDocumentFromBlobURL from 'shared/helper/downloadDocumentHelper';
import styled from 'styled-components';
import {
  UploadFileIcon,
  DownloadFileIcon,
  BrowserFileIcon,
  TrashIcon,
} from 'presentation/components/icons';
import { getString } from 'presentation/theme/localization';
import CommonModal from 'presentation/components/modal/CommonModal';
import DeleteDocumentModal from 'presentation/components/modal/DeleteDocumentModal';
import FileBrowseModal from 'presentation/components/modal/FileBrowseModal';
import { getFieldTitle } from 'presentation/pages/LeadDetailsPage/leadDetailsPage.helper';
import {
  FilesDownload,
  UpdateTypes,
  IUploadedDocument,
} from '../DocumentSection';

const Field = withTheme(styled.div`
  &&& {
    display: flex;
    padding: 10px 15px;
    align-items: flex-start;
    background: ${({ theme }) => theme.palette.common.white};
    border-bottom: 1px solid ${({ theme }) => theme.border.color};
  }
`);

const FieldItem = styled.span`
  &&& {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const DetailUploadFile = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.common.sky};
`;

const DeleteFileIcon = styled.span`
  border: 1px solid #005098;
  padding: 3px 6px;
  cursor: pointer;
  border-radius: 5px;
  color: ${({ theme }) => theme.palette.common.sky};
`;

const DropFileZone = withTheme(styled.div`
  cursor: pointer;
  color: #a5aac0;
`);

const UndelineTextFile = styled.u`
  margin-left: 5px;
  color: ${({ theme }) => theme.palette.common.sky};
`;

interface IProps {
  title: string;
  value: string;
  handleUpdateListFiles: (
    newFile: FilesDownload | undefined,
    typeUpdate: UpdateTypes
  ) => void;
  listFiles: (FilesDownload | undefined)[];
  handleDeleteDocument: (payload: string) => void;
  document: FilesDownload | undefined;
  label: string;
  documents: (IUploadedDocument | null)[];
}

const CustomUploadFile = ({
  title,
  value,
  handleUpdateListFiles,
  handleDeleteDocument,
  listFiles,
  document,
  label,
  documents,
}: IProps) => {
  const [fileName, setFileName] = useState('');
  const [fileURL, setFileURL] = useState('');
  const [fileCurrent, setFileCurrent] = useState<FilesDownload | undefined>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setFileCurrent(document);
    setFileName(document?.fileName || '');
  }, [document]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: any) => {
        const newFileUpload = {
          file,
          fileName: file.name,
          documentType: value,
          label,
        };
        handleUpdateListFiles(newFileUpload, UpdateTypes.Upload);
        setFileCurrent(newFileUpload);
        setFileURL(URL.createObjectURL(file));
        setFileName(file.name);
      });
    },
    [handleUpdateListFiles, value, label]
  );

  const handleDownloadDocument = () => {
    if (document) downloadDocumentFromBlobURL(document.file);
  };

  const handleOpenCloseModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleOpenCloseDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleRemoveDocument = () => {
    handleUpdateListFiles(fileCurrent, UpdateTypes.Remove);
    handleOpenCloseModal();
    setFileCurrent(undefined);
    setFileName('');
    setFileURL('');
  };

  const onDeleteDocument = () => {
    handleRemoveDocument();
    handleDeleteDocument(fileName);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const showFormatFile = () => {
    if (!fileName) return fileCurrent?.file?.type?.split('/')[1];
    return fileName?.split('.')[fileName?.split('.').length - 1];
  };

  return (
    <Field>
      <FieldItem>{getFieldTitle(title)}</FieldItem>
      {!document ? (
        <FieldItem>
          <DropFileZone {...getRootProps()}>
            <input {...getInputProps()} />
            <span>
              <span>: </span>
              <UploadFileIcon style={{ marginRight: '5px' }} />
              {getString('text.dragOrDropFile')}
              <UndelineTextFile>
                {getString('text.chooseFile')}
              </UndelineTextFile>
            </span>
          </DropFileZone>
        </FieldItem>
      ) : (
        <FieldItem>
          <DetailUploadFile
            onClick={handleOpenCloseDialog}
            style={{ textTransform: 'uppercase' }}
          >
            <BrowserFileIcon />
            {showFormatFile()}
          </DetailUploadFile>
          <DetailUploadFile onClick={handleDownloadDocument}>
            <DownloadFileIcon />
            <UndelineTextFile>{getString('text.download')}</UndelineTextFile>
          </DetailUploadFile>
          <DeleteFileIcon onClick={handleOpenCloseModal}>
            <TrashIcon />
          </DeleteFileIcon>
        </FieldItem>
      )}
      <CommonModal
        title=""
        open={openDeleteModal}
        handleCloseModal={handleOpenCloseModal}
      >
        <DeleteDocumentModal
          handleOpenCloseModal={handleOpenCloseModal}
          handleRemoveDocument={onDeleteDocument}
          documentType={title}
        />
      </CommonModal>
      <FileBrowseModal
        openDialog={openDialog}
        handleCloseDialog={handleOpenCloseDialog}
        handleDeleteDocument={handleDeleteDocument}
        label={label}
        fileLink={fileURL}
        listFiles={listFiles}
        documents={documents}
        handleUpdateListFiles={handleUpdateListFiles}
      />
    </Field>
  );
};

export default CustomUploadFile;
