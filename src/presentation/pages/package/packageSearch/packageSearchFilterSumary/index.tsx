import React from 'react';
import {
  ExpansionPanelSummary as MuiAccordionSummary,
  Grid,
} from '@material-ui/core';
import styled from 'styled-components';
import PackageSearchControl from '../packageSearchControl';

const AccordionSummary = styled(MuiAccordionSummary)`
  &&& {
    padding: ${({ theme }) => theme.spacing(0, 10)};

    .MuiExpansionPanelSummary-content {
      margin: 0;
    }

    .MuiButton-containedPrimary .MuiButton-label {
      color: inherit;
    }
  }

  &&&.Mui-focused {
    background-color: transparent;
  }
`;
interface IPackageSearchFilterSumary {
  packageSearchSchemaState: any;
  numberOfAccSumary: any;
}

const PackageSearchFilterSumary = ({
  packageSearchSchemaState,
  numberOfAccSumary,
}: IPackageSearchFilterSumary) => {
  return (
    <AccordionSummary>
      <Grid container>
        {packageSearchSchemaState
          .filter((scheme: any, idx: number) => idx < numberOfAccSumary)
          .map((data: any) => (
            <PackageSearchControl key={data.name} input={data} />
          ))}
      </Grid>
    </AccordionSummary>
  );
};

export default PackageSearchFilterSumary;
