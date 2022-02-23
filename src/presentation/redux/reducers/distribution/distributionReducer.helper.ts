import { from } from 'rxjs';
import { bufferCount } from 'rxjs/operators';
import { IDistributionLead } from '../../../../shared/interfaces/common/admin/user';
import { IRowData } from '../../../components/leads/LeadDistributionTable/distribution.helper';
import { getString } from '../../../theme/localization';

const TOTAL_ROW_LEAD_TABLE = 4;

const customLeadData = (payload: IDistributionLead) => {
  const leadsRow: IRowData[] = [];
  let agentIndex = 0;
  from(payload.values as number[])
    .pipe(bufferCount(TOTAL_ROW_LEAD_TABLE))
    .subscribe(([lead1, lead2, lead3, lead4]) => {
      // INFO: increment one for display agent name
      agentIndex += 1;
      leadsRow.push({
        id: agentIndex,
        agentLead: `${getString('text.agent')} ${agentIndex}`,
        lead1,
        lead2,
        lead3,
        lead4,
      });
    });
  return {
    name: payload.name,
    enabled: payload.enableAutoAssign,
    leadsRow,
    values: payload.values,
  };
};
export default customLeadData;
