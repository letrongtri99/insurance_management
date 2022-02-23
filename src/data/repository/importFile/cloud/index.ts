import { concatMap, pluck } from 'rxjs/operators';

import getConfig from 'data/setting';
import ApiGateway from 'data/gateway/api';
import { RabbitResource } from 'data/gateway/api/resource';

const apiGateway = ApiGateway.createAPIConnection(getConfig());

const importCSV = (payload: any) => {
  const { file, ...rest } = payload;
  let uniqueFilename: string = file.name;

  const importCsvFilesResource = RabbitResource.ImportFile.ImportCSV();
  return apiGateway.doPostAjaxRequest(importCsvFilesResource, rest).pipe(
    pluck('data'),
    concatMap((data: { name: string; filename: string }) => {
      const importId = data.name.split('/')[1];
      uniqueFilename = data.filename;
      return apiGateway.doPutAjaxRequest(
        RabbitResource.ImportFile.GenerateUploadUrl(importId)
      );
    }),
    pluck('data'),
    concatMap((res: { url: string }) => {
      return apiGateway.uploadCSVFile(
        RabbitResource.ImportFile.UploadFileByUrl(res.url).Path,
        file,
        {
          'Content-Type': 'text/csv',
          'X-Goog-Content-Length-Range': '0,5242880',
          'Content-Disposition': `attachment;filename=${uniqueFilename}`,
        }
      );
    })
  );
};

export default {
  importCSV,
};
