import LeadSettingCloud from './cloud';

export default class LeadSettingRepository {
  /**
   *
   * @param user
   * @returns {Promise<ResponseModel<any>>}
   */
  getAllNewLead = () => {
    return LeadSettingCloud.getAllNewLead();
  };

  getAllRetainerLead = () => {
    return LeadSettingCloud.getAllRetainerlead();
  };

  editNewLead = (data: any) => {
    return LeadSettingCloud.editNewLead(data);
  };

  editRetainerLead = (data: any) => {
    return LeadSettingCloud.editRetainerLead(data);
  };
}
