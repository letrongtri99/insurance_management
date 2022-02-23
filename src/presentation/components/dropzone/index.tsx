import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { parse } from 'papaparse';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getString } from 'presentation/theme/localization';
import { setFile } from 'presentation/redux/actions/importFile';
import LeadImportDefault from 'images/icons/import-lead.svg';
import LeadImportSuccess from 'images/icons/import-lead-complete.svg';

const SharedDropzone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  margin-top: 20px;
  border: 1px dashed ${({ theme }) => theme.palette.info.main};
  border-radius: 4px;

  .placeholder-image {
    width: 70px;
    border-radius: 50%;
    height: 70px;
    background-color: #e0e0e0;
  }

  p {
    margin-bottom: 0;
  }

  .container {
    .dropzone {
      border: none;
    }
  }
`;

const DefaultDropzone: React.FC<any> = (props: any) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file: any) => {
      if (props.setCsvFile) {
        props.setCsvFile(file);
      }
      file.text().then((res: any) => {
        const result = parse(res, { skipEmptyLines: true, header: true });
        let errorType = '';
        if (result.errors.length) {
          errorType = result.errors[0].type;
        }
        const data = {
          fileType: file.type,
          fileName: file.name,
          fileSize: file.size,
          result: props.transformResult
            ? result.data.map(props.transformResult)
            : result.data,
          errorFileMessage: errorType,
        };
        props.setFile(data);
      });
      return (
        <li key={file.path}>
          <strong>Name:</strong>
          {file.path}
        </li>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  const getSrcUrl = useMemo(() => {
    if (props.importStatus === 'success') {
      return LeadImportSuccess;
    }

    return LeadImportDefault;
  }, [props.importStatus]);

  return (
    <SharedDropzone {...getRootProps()} style={{ cursor: 'pointer' }}>
      <input {...getInputProps()} accept="text/csv" />
      <div>
        <img
          className="placeholder-image"
          alt="upload placeholder"
          src={getSrcUrl}
        />
        {isDragActive ? (
          <p>{` ${getString('text.dropFilesHere')}...`}</p>
        ) : (
          <p>{getString('text.selectFiles')}</p>
        )}
      </div>
    </SharedDropzone>
  );
};

const mapStateToProps = (state: any) => ({ propsData: state });
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ setFile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DefaultDropzone);
