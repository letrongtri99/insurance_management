import {
  ExpansionPanelDetails as MuiAccordionDetails,
  withTheme,
  Grid,
} from '@material-ui/core';
import React from 'react';
import { packageSearchSchema } from 'shared/constants/packageSearchFields';
import styled from 'styled-components';
import PackageSearchControl from '../packageSearchControl';

const AccordionDetails = withTheme(styled(MuiAccordionDetails)`
  &&& {
    padding: ${({ theme }) => theme.spacing(0, 10, 3, 10)};
  }
`);

interface IPackageSearchFilter {
  packageSearchSchemaState: any;
  numberOfAccSumary: any;
}

const PackageSearchFilter = ({
  packageSearchSchemaState,
  numberOfAccSumary,
}: IPackageSearchFilter) => {
  return (
    <AccordionDetails>
      <Grid container>
        {packageSearchSchemaState
          .filter(
            (scheme: any, idx: number) =>
              idx >= numberOfAccSumary && idx < packageSearchSchema.length
          )
          .map((data: any) => (
            <PackageSearchControl key={data.name} input={data} />
          ))}
      </Grid>
    </AccordionDetails>
  );
};

export default PackageSearchFilter;
