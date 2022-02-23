import React, { useState } from 'react';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';
import downloadDocumentFromBlobURL, {
  runAsyncFuntionsConsecutively,
} from 'shared/helper/downloadDocumentHelper';
import { DownloadFileIcon } from 'presentation/components/icons';
import { getString } from 'presentation/theme/localization';
import CustomUploadFile from './common/CustomUploadFile';

const Field = withTheme(styled.div`
  &&& {
    display: flex;
    padding: 10px 15px;
    align-items: flex-start;
    background: ${({ theme }) => theme.palette.common.white};
    border-bottom: 1px solid ${({ theme }) => theme.border.color};
    cursor: pointer;
  }
`);

const TitleDownloadFile = withTheme(styled.div`
  &&& {
    margin-left: 8px;
    color: ${({ theme }) => theme.palette.common.sky};
  }
`);

export const fakeDocuments = [
  {
    title: getString('leadDetailFields.idCard'),
    value: 'DOCUMENT_TYPE_ID_CARD',
    label: 'idCard',
  },
  {
    title: getString('leadDetailFields.firstNamedDriverLicense'),
    value: 'DOCUMENT_TYPE_DRIVER_LICENCE',
    label: 'firstNamedDriverLicense',
  },
  {
    title: getString('leadDetailFields.secondNamedDriverLicense'),
    value: 'DOCUMENT_TYPE_DRIVER_LICENCE',
    label: 'secondNamedDriverLicense',
  },
  {
    title: getString('leadDetailFields.vehicleRegistration'),
    value: 'DOCUMENT_TYPE_CAR_REGISTRATION',
    label: 'vehicleRegistration',
  },
  {
    title: getString('leadDetailFields.vehiclePictureFront'),
    value: 'DOCUMENT_TYPE_CAR_PICTURES',
    label: 'vehiclePictureFront',
  },
  {
    title: getString('leadDetailFields.vehiclePictureBack'),
    value: 'DOCUMENT_TYPE_CAR_PICTURES',
    label: 'vehiclePictureBack',
  },
  {
    title: getString('leadDetailFields.vehiclePictureRight'),
    value: 'DOCUMENT_TYPE_CAR_PICTURES',
    label: 'vehiclePictureRight',
  },
  {
    title: getString('leadDetailFields.vehiclePictureLeft'),
    value: 'DOCUMENT_TYPE_CAR_PICTURES',
    label: 'vehiclePictureLeft',
  },
  {
    title: getString('leadDetailFields.dashCamPicture'),
    value: 'DOCUMENT_TYPE_CAR_PICTURES',
    label: 'dashCamPicture',
  },
  {
    title: getString('leadDetailFields.others'),
    value: 'DOCUMENT_TYPE_UNSPECIFIED',
    label: 'others',
  },
];

export enum UpdateTypes {
  Upload = 'upload',
  Remove = 'remove',
}

export interface FilesDownload {
  file: any;
  fileName: string;
  documentType: string;
  label: string;
}

interface IProps {
  handleUploadDocument: (payload: any) => void;
  handleDeleteDocument: (payload: any) => void;
  documents?: (IUploadedDocument | null)[];
}

interface IDocument {
  document: string;
  label: string;
  type: string;
}

export interface IUploadedDocument {
  document: string;
  label: string;
  name: string;
  type: string;
  createBy: string;
  createTime: string;
  deleteTime: string | null;
  updateTime: string | null;
}

export interface IFakeDocument {
  title: string;
  value: string;
  label: string;
}

const DocumentSection = ({
  handleUploadDocument = () => null,
  handleDeleteDocument = () => null,
  documents = [],
}: IProps) => {
  const [listFiles, setListFiles] = useState<(FilesDownload | undefined)[]>([]);

  const handleUpdateListFiles = (
    newFile: FilesDownload | undefined,
    typeUpdate: UpdateTypes
  ) => {
    if (typeUpdate === UpdateTypes.Upload) {
      setListFiles([...listFiles, newFile]);
      handleUploadDocument(newFile);
    } else {
      setListFiles(
        listFiles.filter((item) => item?.documentType !== newFile?.documentType)
      );
    }
  };

  const formatDoc = (doc: IDocument) => ({
    file: doc.document,
    fileName: doc.label,
    documentType: doc.type,
  });

  const getDocByType = (type: string, label = '') => {
    let currentDoc: any = [];
    currentDoc = documents.filter(
      (doc: any) => doc.label.split('-')[0] === label
    );
    if (!currentDoc[0]) return '';
    return formatDoc(currentDoc[0]);
  };

  const mapDocumentToFakeDocuments = (docs: IFakeDocument[]) =>
    docs.map((doc: IFakeDocument) => ({
      ...doc,
      document: getDocByType(doc.value, doc?.label),
    }));

  const getDownloadDocuments = () =>
    mapDocumentToFakeDocuments(fakeDocuments).filter(
      (field: any) => !!field.document
    );

  const handleDownloadAllFiles = () => {
    const downloadDocuments = getDownloadDocuments().map((doc: any) => ({
      docID: doc.document.file,
      fileName: doc.document.fileName,
    }));
    const downloadDocumentsArray = downloadDocuments.map(
      (doc: any) => () => downloadDocumentFromBlobURL(doc.docID)
    );
    runAsyncFuntionsConsecutively(downloadDocumentsArray, 0);
  };

  return (
    <div>
      <Field onClick={handleDownloadAllFiles}>
        <DownloadFileIcon />
        <TitleDownloadFile>
          {getString('text.downloadFiles', {
            count: getDownloadDocuments().length,
          })}
        </TitleDownloadFile>
      </Field>
      {mapDocumentToFakeDocuments(fakeDocuments).map((field: any) => (
        <CustomUploadFile
          key={field.title}
          title={field.title}
          value={field.value}
          handleUpdateListFiles={handleUpdateListFiles}
          handleDeleteDocument={handleDeleteDocument}
          listFiles={listFiles}
          document={field.document}
          label={field?.label || ''}
          documents={documents}
        />
      ))}
    </div>
  );
};

export default DocumentSection;
