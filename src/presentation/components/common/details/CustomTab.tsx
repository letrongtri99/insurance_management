import React from 'react';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Tabs, AppBar, Tab, Box } from '@material-ui/core';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface Props {
  tabs: { component: React.ReactNode; label: string }[];
  className?: string | string[];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.defaultProps = {
  children: <></>,
  dir: '#000',
};

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const CustomTab = ({ tabs, className, ...props }: Props) => {
  const useStyles = makeStyles((theme) => ({
    root: {},
    tabsRoot: {
      marginTop: theme.spacing(1.5),
      marginRight: theme.spacing(20),
    },
    wrapper: {},
    selected: {
      fontWeight: 'bolder',
    },
  }));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={clsx(className, 'shared-comment-text-box')} {...props}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          className="shared-comment-text-box__tab-header"
          value={value}
          classes={{ root: classes.tabsRoot }}
          textColor="primary"
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          {tabs.map((e, i) => (
            <Tab
              fullWidth={false}
              classes={{ selected: classes.selected, wrapper: classes.wrapper }}
              label={e.label}
              key={e.label}
              {...a11yProps(i)}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map((e, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <TabPanel key={i} value={value} index={i} dir={theme.direction}>
            {e.component}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};

CustomTab.defaultProps = {
  className: '',
};

export default CustomTab;
