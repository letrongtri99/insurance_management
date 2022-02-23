import OrderDetailRepository from 'data/repository/orderDetail';
import { Observable } from 'rxjs';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';
import ResponseModel from 'models/response';

export default class GetUploadedDocumentsUseCase implements IUseCaseObservable {
  private orderDetailRepository: OrderDetailRepository;

  constructor(private body: string) {
    this.orderDetailRepository = new OrderDetailRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute = (): Observable<ResponseModel<string>> => {
    return this.orderDetailRepository.getUploadedDocuments(this.body);
  };
}
