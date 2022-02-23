import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Box, Button } from '@material-ui/core';
import { getString } from 'presentation/theme/localization';
import styled from 'styled-components';
import VSIcon from 'presentation/components/VSIcon';
import CustomerCard from './CustomerCard';

const LeadCallContainer = styled.div`
  .d-flex {
    display: flex;
  }

  .mask-image {
    justify-content: center;

    img {
      margin: 30px 0;
    }
  }

  .mr10 {
    margin-right: 10px;
  }
`;

const ButtonContainer = styled(Box)`
  &&& {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
`;

const ItemGrid = styled(Grid)`
  &&& {
    &.MuiGrid-grid-md-4 {
      flex-basis: 33%;
      max-width: 33%;
    }
    &.MuiGrid-grid-md-6 {
      flex-basis: 49%;
      max-width: 49%;
    }
  }
`;

const LeadCallModal: React.FC<any> = ({ leadInfo, close }: any) => {
  const [selected, setSelected] = useState<number>(0);

  const handleChange = (id: number) => {
    setSelected(id);
  };

  const renderIcon = (item: any, index: number) => {
    if (item.length === 2 && (index + 1) % 2 === 0) {
      return '';
    }

    if ((index + 1) % 3 === 0) {
      return '';
    }
    return <VSIcon customClass="vs-icon" />;
  };

  return (
    <LeadCallContainer>
      <Grid container className={leadInfo.length === 0 ? 'mask-image' : ''}>
        {leadInfo.length > 0 ? (
          leadInfo.map((item: any, index: number) => (
            <>
              <ItemGrid
                item
                xs={12}
                md={leadInfo.length === 2 ? 6 : 4}
                key={item.name}
              >
                <CustomerCard
                  customer={item}
                  selected={selected}
                  onChange={handleChange}
                />
              </ItemGrid>
              {renderIcon(leadInfo, index)}
            </>
          ))
        ) : (
          <img alt="" src="/static/img/leads/mask-group.png" />
        )}
      </Grid>

      <ButtonContainer>
        <Button variant="outlined" color="primary" className="mr10">
          {leadInfo.length === 0
            ? getString('text.cantConfirmNow')
            : getString('text.createNewCustomer')}
        </Button>
        <Button variant="contained" color="primary">
          {getString('text.confirmCustomer')}
        </Button>
      </ButtonContainer>

      {leadInfo.length > 0 && (
        <Button color="primary" onClick={close}>
          {getString('text.cantConfirmNow')}
        </Button>
      )}
    </LeadCallContainer>
  );
};

const mapStateToProps = (state: any) => ({
  typeSelector: state.typeSelectorReducer,
  leadDetail: state.leadsDetailReducer.lead.payload,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(LeadCallModal),
  (prevProps, nextProps) => true
);
