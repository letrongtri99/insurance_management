import ScoringCloud from './cloud/index';
import { ILeadScore } from '../../../shared/interfaces/common/lead/scoring';

export default class ScoringRepository {
  GetListLeadScore = () => {
    return ScoringCloud.getListLeadScore();
  };

  editRenewalLeadScore = (body: ILeadScore, params: any) => {
    return ScoringCloud.updateLeadScoreByName(body, params);
  };
}
