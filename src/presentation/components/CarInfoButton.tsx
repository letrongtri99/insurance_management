import React from 'react';
import { useParams } from 'react-router-dom';
import { RabbitResource } from '../../data/gateway/api/resource';
import Controls from './controls/Control';
import { getString } from '../theme/localization';

const CarInfoBtn: React.FC = () => {
  const { id } = useParams();

  return (
    <form
      action={`${process.env.REACT_APP_GATEWAY_ENDPOINT}${
        RabbitResource.LeadDetail.getLeadToken(id).Path
      }`}
      method="POST"
      target="_blank"
      className="form-button"
      style={{ width: '100%' }}
    >
      <Controls.Button
        color="primary"
        type="submit"
        className="button-change-car unittest-handle-change-car"
      >
        {getString('lead.changeCar')}
      </Controls.Button>
      <input type="hidden" name="action" value="lead" />
    </form>
  );
};

export default CarInfoBtn;
