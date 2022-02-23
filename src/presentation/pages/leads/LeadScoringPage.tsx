import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditableTable from 'presentation/components/leads/EditableTable';
import ScoringTableRow from 'presentation/components/leads/ScoringTableRow';
import table from 'presentation/HOCs/TableHOC';
import {
  getListLeadScore,
  updateLeadScoreByName,
} from 'presentation/redux/actions/leadSetting/scoringSetting';
import SkeletonTableRow from 'presentation/components/leads/SkeletonTableRow';
import { SCORE_SHIMMER, IScoreItem } from './LeadScoringPage.helper';
import { IScoring } from '../../models/lead/scoring';
import { destroyPage } from '../../redux/actions/page';
import { getString } from '../../theme/localization';

const ScoringTable = table(EditableTable, { tableType: '' });

interface IProps {
  listLeadScore: any;
  isEdit: boolean;
  getListLeadScore: () => void;
  updateLeadScoreByName: (payload: any, leadType: string) => void;
}

const LeadScoringPage = ({
  listLeadScore,
  isEdit,
  getListLeadScore,
  updateLeadScoreByName,
}: IProps) => {
  const dispatch = useDispatch();
  const data = listLeadScore?.data || [];
  const isLoading = listLeadScore?.isLoading;

  useEffect(() => {
    getListLeadScore();
    return () => {
      dispatch(destroyPage());
    };
  }, []);

  const handleSaveLeadScoreByName = (
    data: IScoring,
    name: string,
    type: string
  ) => {
    const values = data;
    const leadType = type;
    const payload = { values, name };
    updateLeadScoreByName(payload, leadType);
  };

  return (
    <>
      {(isLoading ? SCORE_SHIMMER : data).map(
        (table: IScoreItem, index: number) => {
          return (
            <ScoringTable
              key={index}
              table={table}
              tableType={table.tableType}
              tableTitle={table.title}
              tableRenderRows={(props: IScoreItem) => {
                const values = [props.values];
                return values.map((item: IScoring, index: number) => {
                  return isLoading ? (
                    <SkeletonTableRow key={index} row={1} column={6} />
                  ) : (
                    <ScoringTableRow
                      key={index}
                      data={item}
                      isLoading={table.isLoading}
                      edit={table.isEdit}
                      type={getString(props.type)}
                      handleSave={(data: IScoring) => {
                        handleSaveLeadScoreByName(data, props.name, props.type);
                      }}
                    />
                  );
                });
              }}
            />
          );
        }
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  listLeadScore: state.leadSettingReducer.leadScoreReducer,
  retainerLead: state.leadSettingReducer.leadScoreReducer,
  isEdit: state.uiInitReducer.isEdit,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getListLeadScore,
      updateLeadScoreByName,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadScoringPage);
