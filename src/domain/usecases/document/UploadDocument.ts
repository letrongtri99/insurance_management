import DocumentRepository from 'data/repository/document';
import { Observable } from 'rxjs';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';
import ResponseModel from 'models/response';

export default class UploadDocument implements IUseCaseObservable {
  private documentRepository: DocumentRepository;

  constructor(private body: any) {
    this.documentRepository = new DocumentRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute = (): Observable<ResponseModel<string>> => {
    return this.documentRepository.uploadDocument(this.body);
  };
}
