import React from 'react';
import Controls from 'presentation/components/controls/Control';
import { useSelector, useDispatch } from 'react-redux';
import { getString } from 'presentation/theme/localization';
import { RootState } from 'presentation/redux/reducers';
import { updateLeadImportant } from 'presentation/redux/actions/leadDetail/updateLeadImportant';
import StarOutLineIcon from 'presentation/components/svgicons/StarOutLineIcon';

const MarkImportantButton: React.FC = () => {
  const dispatch = useDispatch();
  const isImportant = useSelector(
    (state: RootState) => state.leadsDetailReducer.lead.payload.important
  );
  const isLoading = useSelector(
    (state: RootState) =>
      state.leadsDetailReducer.updateLeadImportantReducer.isFetching
  );

  const handleClick = () =>
    dispatch(updateLeadImportant({ important: !isImportant }));

  return (
    <Controls.Button
      text={
        isImportant
          ? getString('text.markUnimportant')
          : getString('text.markImportant')
      }
      variant={isImportant ? 'contained' : 'outlined'}
      color={isImportant ? 'secondary' : 'primary'}
      loading={isLoading}
      onClick={handleClick}
      icon={<StarOutLineIcon fontSize="small" />}
    />
  );
};

export default MarkImportantButton;
