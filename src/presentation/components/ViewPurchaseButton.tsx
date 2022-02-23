import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { RabbitResource } from '../../data/gateway/api/resource';
import Controls from './controls/Control';
import { getString } from '../theme/localization';

interface IViewPurchaseBtnProps {
  packageId: string;
}
const ViewPurchaseBtn: React.FC<IViewPurchaseBtnProps> = ({ packageId }) => {
  const { id } = useParams();
  const isDisabled = useMemo(() => !packageId, [packageId]);

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
        disabled={isDisabled}
        variant="contained"
        className="unittest-view-purchase button-view-quotes"
      >
        {getString('text.viewPurchase')}
      </Controls.Button>
      <input type="hidden" name="action" value="package" />
      <input type="hidden" name="package" value={`${packageId}`} />
    </form>
  );
};

export default ViewPurchaseBtn;
