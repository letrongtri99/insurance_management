import React from 'react';
import { useParams } from 'react-router-dom';
import { RabbitResource } from '../../data/gateway/api/resource';
import Controls from './controls/Control';
import { getString } from '../theme/localization';

const InsurerInfoBtn: React.FC = () => {
  const { id } = useParams();

  return (
    <form
      action={`${process.env.REACT_APP_GATEWAY_ENDPOINT}${
        RabbitResource.LeadDetail.getLeadToken(id).Path
      }`}
      method="POST"
      target="_blank"
    >
      <Controls.Button
        color="primary"
        type="submit"
        variant="contained"
        className="unittest-view-quoutes button-view-quotes"
      >
        {getString('text.viewQuotes')}
      </Controls.Button>
      <input type="hidden" name="action" value="quotes" />
    </form>
  );
};

export default InsurerInfoBtn;
