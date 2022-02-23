import OrderDetailRepository from 'data/repository/orderDetail';
import { Observable } from 'rxjs';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';
import ResponseModel from 'models/response';

export default class DeleteDocumentUseCase implements IUseCaseObservable {
  private orderDetailRepository: OrderDetailRepository;

  constructor(private body: any) {
    this.orderDetailRepository = new OrderDetailRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute = (): Observable<ResponseModel<string>> => {
    return this.orderDetailRepository.deleteDocument(this.body);
  };
}
