import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FilesDownload } from 'presentation/components/ActivityOrderSection/DocumentSection';

const downloadDocumentFromBlobURL = (documentID: string) => {
  const downloadLink = window.document.createElement('a');
  downloadLink.href = `${process.env.REACT_APP_API_ENDPOINT}/api/document/v1alpha1/${documentID}:file?download=true`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const downloadFilesToZip = (
  arrFilesDownload: (FilesDownload | undefined)[]
) => {
  const zip = new JSZip();
  let count = 0;
  const zipFilename = 'Documents.zip';

  arrFilesDownload.forEach((e: FilesDownload | undefined) => {
    zip.file(e?.fileName || '', e?.file);
    count += 1;
    if (count === arrFilesDownload.length) {
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, zipFilename);
      });
    }
  });
};

export const runAsyncFuntionsConsecutively = (
  functions: (() => void)[],
  startIndex: number
) => {
  functions[startIndex]();
  if (startIndex < functions.length - 1) {
    setTimeout(() => {
      runAsyncFuntionsConsecutively(functions, startIndex + 1);
    }, 1000);
  }
};

export default downloadDocumentFromBlobURL;
