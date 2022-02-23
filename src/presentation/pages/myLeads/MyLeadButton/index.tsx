import React from 'react';
import { Grid } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Controls from '../../../components/controls/Control';
import { TypeShowImportantStar, TypeStar } from '../myLeadsHelper';

const addBtnIcon = <StarBorderIcon style={{ marginRight: '4px' }} />;
interface IMyLeadButton {
  handleStarImportant: (type: TypeStar) => void;
  isDisabledBtn: { addStar: boolean; removeStar: boolean };
  isShowStarBtn: boolean;
  showImportantLead: (type: TypeShowImportantStar) => void;
}
const MyLeadButton: React.FC<IMyLeadButton> = ({
  handleStarImportant,
  isDisabledBtn,
  isShowStarBtn,
  showImportantLead,
}) => {
  return (
    <Grid item xs={12} md={6} lg={6} className="dp-flex">
      <Controls.Button
        text="Add Star"
        color="primary"
        icon={addBtnIcon}
        onClick={() => handleStarImportant(TypeStar.ADD)}
        style={{ textTransform: 'uppercase' }}
        className="button"
        disabled={isDisabledBtn.addStar}
      />
      <Controls.Button
        text="Remove Star"
        color="primary"
        onClick={() => handleStarImportant(TypeStar.REMOVE)}
        style={{ textTransform: 'uppercase' }}
        className="button"
        disabled={isDisabledBtn.removeStar}
      />
      {isShowStarBtn ? (
        <Controls.Button
          text="Show Only Star"
          color="primary"
          onClick={() => showImportantLead(TypeShowImportantStar.STAR)}
          style={{ textTransform: 'uppercase' }}
          className="button"
        />
      ) : (
        <Controls.Button
          text="Show All"
          color="primary"
          onClick={() => showImportantLead(TypeShowImportantStar.ALL)}
          style={{ textTransform: 'uppercase' }}
          className="button"
        />
      )}
    </Grid>
  );
};
export default MyLeadButton;
