import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';
import OrderDetailRepository from 'data/repository/orderDetail';

export default class UpdateOrderUseCase implements IUseCaseObservable {
  private orderDetailRepository: OrderDetailRepository;

  constructor(private body: any) {
    this.orderDetailRepository = new OrderDetailRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    return this.orderDetailRepository.updateOrder(this.body);
  };
}
