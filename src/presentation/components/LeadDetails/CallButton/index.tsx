import React, { useState, useRef, useMemo, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Box, Chip, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'presentation/redux/reducers';
import { getString } from 'presentation/theme/localization';
import { PhoneIcon } from 'presentation/components/icons';
import { maskPhoneNumber } from 'shared/helper/utilities';
import { SESSION_STORAGE_KEY } from 'shared/helper/SessionStorage';
import {
  sessionStorageService,
  setSessionPhoneNumber,
} from './CallButton.helper';

interface ICallButtonProps {
  onClick: (phoneIndex: number) => void;
  loading: boolean;
}

interface IPhoneNumberProps {
  phone: string;
  phoneIndex: number;
  status: string;
}

const CallButton = ({ onClick: handleCall, loading }: ICallButtonProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const phoneNumbers = useSelector(
    (state: RootState) =>
      state.leadsDetailReducer?.getAgentReducer?.data?.agent?.data
        ?.customerPhoneNumber || []
  );

  const reversedPhoneNumbers = useMemo(() => {
    return phoneNumbers
      .map((number: IPhoneNumberProps, index: number) => ({
        ...number,
        phoneIndex: index,
      }))
      .slice(0)
      .reverse();
  }, [phoneNumbers]);

  const lastCallPhoneIndex = useSelector(
    (state: RootState) =>
      state.leadsDetailReducer?.callReducer?.data?.callParticipants?.[0]
        ?.destination?.lead?.phoneIndex
  );

  const leadId = useSelector(
    (state: RootState) => state.leadsDetailReducer.lead?.payload?.name
  );

  useEffect(() => {
    const listPhoneSession = JSON.parse(
      sessionStorageService.getItemByKey(
        SESSION_STORAGE_KEY.LIST_PHONE_NUMBER
      ) || '[]'
    );
    if (leadId) {
      const existLead = listPhoneSession.find(
        (item: any) => item.value === leadId
      );
      if (existLead) {
        setSelectedIndex(existLead.index);
      }
    }
  }, [leadId]);

  useEffect(() => {
    const reversedPhoneNumberIndex = reversedPhoneNumbers.findIndex(
      (reversedPhoneNumber: IPhoneNumberProps) =>
        reversedPhoneNumber.phoneIndex === lastCallPhoneIndex
    );

    if (reversedPhoneNumberIndex !== -1) {
      setSelectedIndex(reversedPhoneNumberIndex);
    }
  }, [lastCallPhoneIndex, reversedPhoneNumbers]);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    if (leadId) {
      setSessionPhoneNumber(index, leadId);
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="outlined"
        color="primary"
        ref={anchorRef}
        disabled={loading}
      >
        <Button
          onClick={() => {
            handleCall(reversedPhoneNumbers[selectedIndex].phoneIndex);
          }}
        >
          <Box display="flex" mr={1}>
            <PhoneIcon />
          </Box>
          {getString('text.call')}
          <Box ml={2}>
            {maskPhoneNumber(reversedPhoneNumbers[selectedIndex].phone)}
          </Box>
          {loading && <CircularProgress size={20} className="loading" />}
        </Button>
        <Button
          color="primary"
          size="large"
          style={{ paddingLeft: '5px', paddingRight: '5px' }}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        style={{ zIndex: 1 }}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper variant="outlined">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {reversedPhoneNumbers.map(
                    ({ phone, status }: IPhoneNumberProps, index: number) => (
                      <MenuItem
                        key={phone}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {maskPhoneNumber(phone)}
                        <Box ml={3}>
                          <Chip
                            size="small"
                            label={getString(`text.${status}`)}
                            color="primary"
                          />
                        </Box>
                      </MenuItem>
                    )
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default CallButton;
