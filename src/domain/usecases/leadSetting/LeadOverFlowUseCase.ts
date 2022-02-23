import LeadSettingRepository from 'data/repository/leadSetting';
import { executeWithoutPayloadFn } from 'shared/interfaces/common';
import { of } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { IUseCaseObservable } from '../../../shared/interfaces/common/usecase';

export default class LeadOverFlowUseCase implements IUseCaseObservable {
  private leadSettingRepository: LeadSettingRepository;

  constructor() {
    this.leadSettingRepository = new LeadSettingRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithoutPayloadFn = () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return of('');
  };

  getAllNewLead: executeWithoutPayloadFn = () => {
    return this.leadSettingRepository.getAllNewLead().pipe(pluck('data'));
  };

  getAllRetainerLead: executeWithoutPayloadFn = () => {
    return this.leadSettingRepository.getAllRetainerLead().pipe(pluck('data'));
  };
}
