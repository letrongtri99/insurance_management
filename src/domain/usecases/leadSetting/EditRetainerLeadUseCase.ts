import LeadSettingRepository from 'data/repository/leadSetting';
import { executeWithPayloadFn } from 'shared/interfaces/common';
import { pluck } from 'rxjs/operators';
import { IUseCaseObservable } from '../../../shared/interfaces/common/usecase';

export default class EditRetainerLeadUseCase implements IUseCaseObservable {
  private leadSettingRepository: LeadSettingRepository;

  constructor() {
    this.leadSettingRepository = new LeadSettingRepository();
  }

  validate = (): boolean => {
    return true;
  };

  execute: executeWithPayloadFn = (data) => {
    return this.leadSettingRepository
      .editRetainerLead(data)
      .pipe(pluck('data'));
  };
}
