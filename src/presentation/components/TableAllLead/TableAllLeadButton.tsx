import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import LeadRepository from 'data/repository/lead';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackBar } from 'presentation/redux/actions/ui';
import LocalStorage, { LOCALSTORAGE_KEY } from 'shared/helper/LocalStorage';
import Controls from '../controls/Control';
import { TableAllLeadButtonRow, TypeAssign } from './TableAllLead.helper';
import { getString } from '../../theme/localization';
import CommonModal from '../modal/CommonModal';
import AssignModal from './assignModal';
import UsersRepository from '../../../data/repository/admin/user';
import LeadRejectionModal from './rejectionModal';
import { RejectionType } from './TableRejectionLead.helper';

const localStorageService = new LocalStorage();

const isEnglish =
  localStorageService.getItemByKey(LOCALSTORAGE_KEY.LOCALE) === 'en';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '20px',
  },
  assignButton: {
    [theme.breakpoints.down('md')]: {
      marginBottom: '10px',
    },
  },
}));

enum Breakpoints {
  xl = 'xl',
  lg = 'lg',
}

const TableAllLeadButton: React.FC<any> = ({
  children,
  isAssign,
  isReject,
  buttonState,
  callApiAgain,
}) => {
  const classes = useStyles();
  const [agentName, setAgentName] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [assignType, setAssignType] = useState('');
  const [rejectionType, setRejectionType] = useState('');
  const [totalItem, setTotalItem] = useState(0);
  const [agentList, setAgentList] = useState([]);
  const userName = useSelector(
    (state: any) => state?.authReducer?.data?.user?.name
  );
  const dispatch = useDispatch();

  const handleAssignLead = (status: TypeAssign) => {
    setShowConfirmModal(true);
    setAssignType(status);
    if (status === TypeAssign.ASSIGN) {
      setTotalItem(buttonState[0]?.ids?.length);
    } else {
      setTotalItem(buttonState[1]?.ids?.length);
    }
  };
  const handleRejectionLead = (status: RejectionType) => {
    setShowConfirmModal(true);
    setRejectionType(status);
    setTotalItem(buttonState[2]?.rejections?.length || 0);
  };
  useEffect(() => {
    if (isAssign) {
      const userRepository = new UsersRepository();
      const subscription = userRepository
        .lookUpUserByRole('roles/sales')
        .subscribe((res: any) => {
          const selectData = (res.selectData || []).map((item: any) => {
            return {
              ...item,
              title: item.value,
            };
          });
          setAgentList(selectData);
        });
      return () => {
        subscription.unsubscribe();
      };
    }
    return () => null;
  }, [isAssign]);
  const confirmAssigned = () => {
    const leadRepository = new LeadRepository();
    const ids =
      assignType === TypeAssign.ASSIGN
        ? buttonState[0]?.ids
        : buttonState[1]?.ids;
    const name = agentName || userName;
    const body = {
      ids,
      assignedTo: assignType === TypeAssign.ASSIGN ? name : '',
    };
    leadRepository.assignLeads(body).subscribe(
      (res: any) => {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: res?.data?.message || '',
            status: 'success',
          })
        );
        setTimeout(() => {
          setAgentName('');
          setShowConfirmModal(false);
          callApiAgain();
        }, 300);
      },
      (error: any) => {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: error.message || '',
            status: 'error',
            isNotClose: true,
          })
        );
      }
    );
  };

  const confirmRejection = () => {
    const leadRepository = new LeadRepository();
    const body = buttonState[2];
    body.approve = rejectionType === RejectionType.APPROVE;
    leadRepository.rejectLeads(body).subscribe(
      (res: any) => {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: res?.data?.message || '',
            status: 'success',
          })
        );
        setTimeout(() => {
          setAgentName('');
          setShowConfirmModal(false);
          callApiAgain();
        }, 300);
      },
      (error: any) => {
        dispatch(
          showSnackBar({
            isOpen: true,
            message: error.message || '',
            status: 'error',
            isNotClose: true,
          })
        );
      }
    );
  };

  const rejectButtons = () => {
    return (
      <Grid
        container
        item
        xs={12}
        md={6}
        lg={4}
        xl={5}
        classes={{ root: classes.root }}
      >
        <Controls.Button
          text="Approve"
          color="primary"
          style={{ textTransform: 'uppercase' }}
          className="button"
          onClick={() => handleRejectionLead(RejectionType.APPROVE)}
          disabled={!buttonState[2].rejections.length} // Need to check with other params
        />
        <Controls.Button
          text="Decline"
          color="primary"
          style={{ textTransform: 'uppercase' }}
          className="button"
          onClick={() => handleRejectionLead(RejectionType.DECLINE)}
          disabled={!buttonState[2].rejections.length} // Need to check with other params
        />
        <CommonModal
          title=""
          open={showConfirmModal}
          handleCloseModal={() => {
            setShowConfirmModal(false);
          }}
        >
          <LeadRejectionModal
            closeModal={() => setShowConfirmModal(false)}
            type={rejectionType}
            quantity={totalItem}
            handleConfirm={confirmRejection}
          />
        </CommonModal>
      </Grid>
    );
  };

  const assignButtons = () => {
    return (
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        xl={5}
        className={`${classes.assignButton} dp-flex`}
        data-cy="search-lead-button"
      >
        <Grid
          item
          xs={12}
          md={!isEnglish ? 4 : 6}
          lg={5}
          xl={4}
          className="dp-flex all-leads-buttons__agent-block"
        >
          <Controls.Autocomplete
            options={agentList}
            label={getString('text.agentName')}
            name="agentName"
            onChange={(event: any) => setAgentName(event?.target?.value?.key)}
            fixedLabel
            disableClearable
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={!isEnglish ? 8 : 6}
          lg={7}
          xl={8}
          classes={{ root: classes.root }}
          className="assign-buttons"
        >
          <Controls.Button
            text={getString('text.assign')}
            color="primary"
            style={{ textTransform: 'uppercase' }}
            onClick={() => handleAssignLead(TypeAssign.ASSIGN)}
            className="button cypress-button-assign"
            data-cy="button-assign"
            disabled={!(buttonState[0]?.ids?.length && agentName)}
          />
          <Controls.Button
            text={getString('text.unassign')}
            color="primary"
            style={{ textTransform: 'uppercase' }}
            onClick={() => handleAssignLead(TypeAssign.UNASSIGN)}
            className="button"
            disabled={!buttonState[1].unassign}
          />
          <CommonModal
            title=""
            open={showConfirmModal}
            handleCloseModal={() => {
              setShowConfirmModal(false);
            }}
          >
            <AssignModal
              typeAssign="lead"
              closeModal={() => setShowConfirmModal(false)}
              type={assignType}
              quantity={totalItem}
              handleConfirm={confirmAssigned}
            />
          </CommonModal>
        </Grid>
      </Grid>
    );
  };

  const responsivePaging = (size: Breakpoints) => {
    if (isAssign) {
      return size === Breakpoints.lg
        ? TableAllLeadButtonRow.ASSIGN_PAGING_LG
        : TableAllLeadButtonRow.ASSIGN_PAGING_XL;
    }
    if (isReject) {
      return size === Breakpoints.lg
        ? TableAllLeadButtonRow.REJECT_PAGING_LG
        : TableAllLeadButtonRow.REJECT_PAGING_XL;
    }

    return TableAllLeadButtonRow.FULL_PAGING;
  };

  return (
    <Grid container item xs={12} lg={12} className="all-leads-buttons">
      {isAssign ? assignButtons() : null}
      {isReject ? rejectButtons() : null}
      <Grid
        item
        xs={12}
        md={isReject ? 6 : 12}
        lg={responsivePaging(Breakpoints.lg)}
        xl={responsivePaging(Breakpoints.xl)}
        className="dp-flex paging-my-leads top-paging"
      >
        <div className="paging">{children}</div>
      </Grid>
    </Grid>
  );
};

export default TableAllLeadButton;
