import DistributionCloud from './cloud';
import { IDistributionLead } from '../../../shared/interfaces/common/admin/user';

export default class DistributionRepository {
  getRetainer = () => {
    return DistributionCloud.getRetainer();
  };

  getNewLeads = () => {
    return DistributionCloud.getNewLeads();
  };

  updateNewLeads = (body: IDistributionLead) => {
    return DistributionCloud.updateNewLeads(body);
  };

  updateRetainerLeads = (body: IDistributionLead) => {
    return DistributionCloud.updateRetainerLeads(body);
  };
}
