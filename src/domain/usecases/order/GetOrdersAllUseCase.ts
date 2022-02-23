import { executeWithPayloadFn } from 'shared/interfaces/common';
import { IUseCaseObservable } from 'shared/interfaces/common/usecase';
import OrderDetailRepository from 'data/repository/orderDetail';

export default class GetOrdersAllUseCase implements IUseCaseObservable {
  private orderDetailRepository: OrderDetailRepository;

  constructor() {
    this.orderDetailRepository = new OrderDetailRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = (payload, productName) => {
    return this.orderDetailRepository.getOrdersList(payload, productName);
  };
}
