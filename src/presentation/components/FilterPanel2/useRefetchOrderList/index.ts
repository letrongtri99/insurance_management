import { useDispatch } from 'react-redux';
import { OrderType } from 'shared/constants/orderType';
import { getOrdersDocuments } from 'presentation/redux/actions/orders/documents';
import { getQCModule } from 'presentation/redux/actions/orders/qc';

function useRefetchOrderList() {
  const dispatch = useDispatch();
  const refetchList = (orderType: OrderType | undefined) => {
    switch (orderType) {
      case OrderType.Document:
        dispatch(
          getOrdersDocuments({
            filters: [
              encodeURIComponent('order.documentBy != ""'),
              encodeURIComponent(
                'order.documentStatus="DOCUMENT_STATUS_PENDING"'
              ),
            ],
          })
        );
        break;
      case OrderType.QC:
        dispatch(
          getQCModule({
            filters: [
              encodeURIComponent('order.qc_by != ""'),
              encodeURIComponent(
                'order.qcStatus IN ("QC_STATUS_PENDING","ITEM_QC_STATUS_PREAPPROVED","ITEM_QC_STATUS_CRITICAL_ISSUES","ITEM_QC_STATUS_ISSUES_FIXED")'
              ),
            ],
          })
        );
        break;
      default:
    }
  };

  return { refetchList };
}

export default useRefetchOrderList;
