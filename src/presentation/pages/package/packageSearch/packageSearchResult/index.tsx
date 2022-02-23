import { Grid, makeStyles } from '@material-ui/core';
import Controls from 'presentation/components/controls/Control';
import { getString } from 'presentation/theme/localization';
import React, { useEffect, useMemo } from 'react';
import { clearSliderValue$ } from '../../../../components/controls/Slider/Slider.helper';

const useStyles = makeStyles(() => ({
  gridRoot: {
    background: 'white',
    padding: '30px 56px',
    marginTop: '24px',
  },
  gridItem: {
    marginBottom: '20px',
  },
  table: {
    height: '100px',
  },
}));
interface IProps {
  packagesLength: any;
  clearPackages: () => void;
  downloadPackages: () => void;
}
const PackageSearchResult: React.FC<IProps> = ({
  packagesLength,
  clearPackages,
  downloadPackages,
}) => {
  const classes = useStyles();
  const total = useMemo(() => {
    return typeof packagesLength === 'number' ? packagesLength : '-';
  }, [packagesLength]);
  useEffect(() => {
    const clearSubscription = clearSliderValue$.subscribe((res) => {
      if (res) {
        clearPackages();
      }
    });
    return () => {
      clearSubscription.unsubscribe();
    };
  }, []);

  const handleDownloadPackages = () => {
    downloadPackages();
  };
  return (
    <Grid container classes={{ root: classes.gridRoot }}>
      <Grid item xs={12} sm={12} xl={12} classes={{ root: classes.gridItem }}>
        <b>{getString('text.searchResults', { results: total })}</b>
      </Grid>
      <Grid item xs={12} sm={12} xl={12}>
        <Controls.Button
          color="primary"
          text={getString('package.downloadPackageAllBtn')}
          disabled={!packagesLength}
          onClick={handleDownloadPackages}
        />
      </Grid>
      <Grid item sm={12} xl={12} classes={{ root: classes.table }} />
    </Grid>
  );
};

export default PackageSearchResult;
