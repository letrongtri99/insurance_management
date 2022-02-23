/* eslint-disable class-methods-use-this */
export interface ILeadData {
  overflows: Array<ILeadRank>;
}

export interface ILeadRank {
  name: string;
  values: Array<number>;
}
export default class LeadSettingHelper {
  static handelPriority(data: Array<number>) {
    let tmpData = [];
    tmpData = data.map((val: number) => ({
      id: `Priority A${val}`,
      name: `Priority A${val}`,
      value: val,
    }));
    return tmpData;
  }

  static handelEditSuccess(data: ILeadRank) {
    const tmpData = {
      loading: false,
      edit: false,
      name: data.name,
      title: 'Lead/Prioriry',
      localisationKey: 'lead',
      data: this.handelPriority(data.values),
    };
    return tmpData;
  }

  static handelDataNewLead(data: ILeadData) {
    const tmpData = data?.overflows.map((rank: ILeadRank, rankIdx: number) => ({
      id: rankIdx,
      loading: false,
      edit: false,
      name: rank.name,
      title: 'Lead/Prioriry',
      type: `Lead ${rankIdx + 1}`,
      localisationKey: 'lead',
      data: this.handelPriority(rank.values),
    }));
    return tmpData;
  }

  static handelDataRetainerLead(data: ILeadData) {
    const tmpData = data?.overflows.map((rank: ILeadRank, rankIdx: number) => ({
      id: rankIdx,
      loading: false,
      edit: false,
      name: rank.name,
      title: 'Lead/Prioriry',
      type: `Lead ${rankIdx + 1}`,
      localisationKey: 'lead',
      data: this.handelPriority(rank.values),
    }));
    return tmpData;
  }
}
