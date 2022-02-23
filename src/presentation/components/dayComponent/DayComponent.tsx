import React, { useMemo } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import { getString } from 'presentation/theme/localization';
import { dayComponent } from 'models/DayComponent';
import { Skeleton } from '@material-ui/lab';
import { dayComponentColors } from '../../../shared/constants';
import TimeUtils from '../../../shared/helper/TimeUtils';
import './DayComponent.scss';

interface IProps {
  data: dayComponent;
  onSelect: (dayData: dayComponent) => any;
  isLoading: boolean;
  isDisabled: boolean;
}

const useStyles = makeStyles((theme) => ({
  titleSkeletonDays: {
    margin: '0 auto',
  },
  skeletonTextMargin: {
    margin: '10px 0',
  },
  dayActive: {
    border: `4px solid ${theme.palette.primary.main} !important`,
    borderRadius: '7px !important',
  },
}));

const DayComponent: React.FC<IProps> = ({
  data,
  onSelect,
  isLoading,
  isDisabled,
}) => {
  const classes = useStyles();

  const isToday = (): boolean => {
    const today = moment().format('DD');
    const dateData = moment(data.date).format('DD');

    return dateData === today;
  };

  const getDayLabel = () =>
    !isToday()
      ? getString(
          `weekDay.${TimeUtils.formartCustomOption(
            data.date,
            'ddd'
          ).toLowerCase()}`
        ).toUpperCase()
      : getString('text.today').toUpperCase();

  const getDayHeader = useMemo(() => {
    return (
      <>
        {!isLoading ? (
          <>
            <Typography className="title" color="textPrimary" gutterBottom>
              {getDayLabel()}
            </Typography>
            <Typography
              className="sub-title"
              variant="caption"
              data-testid={`day-${TimeUtils.formartCustomOption(
                data.date,
                'D'
              )}`}
              gutterBottom
            >
              {`${TimeUtils.formartCustomOption(
                data.date,
                'Do'
              )} - ${TimeUtils.formartCustomOption(data.date, 'MMM')}`}
            </Typography>
          </>
        ) : (
          <>
            <Skeleton
              variant="text"
              width="60%"
              className={classes.titleSkeletonDays}
            />
            <Skeleton variant="text" />
          </>
        )}
      </>
    );
  }, [isToday, data.date, isLoading]);

  const handleSelected = (dayData: any) => {
    if (isDisabled) {
      return;
    }
    onSelect(dayData);
  };

  const isPropExists = (prop: string): boolean => {
    return Object.prototype.hasOwnProperty.call(data, prop);
  };

  return (
    <Grid
      container
      className={`${
        isDisabled ? ' app-day-component-disabled ' : ''
      }app-day-component unittest-app-day-component`}
      onClick={() => handleSelected(data)}
    >
      <Card
        className={`app-day-component__container ${
          data.isActive && !isLoading ? classes.dayActive : ''
        }`}
      >
        <CardContent
          className={`app-day-component__container__header ${
            isLoading ? 'day-loading' : ''
          }`}
        >
          {getDayHeader}
        </CardContent>
        {!isLoading ? (
          <CardActions className="app-day-component__container__action unittest-day-component-exists">
            <div className="app-day-component__item">
              <small>{getString('text.free')}</small>
              {isPropExists('paymentCalls') && (
                <small>{getString('text.paymentCall')}</small>
              )}
              {isPropExists('urgentCalls') && (
                <small>{getString('text.urgentCall')}</small>
              )}
              <small>{getString('text.appointment')}</small>
            </div>
            <div className="app-day-component__item">
              <small>{data.freeSlots}</small>
              {isPropExists('paymentCalls') && (
                <small style={{ color: dayComponentColors.paymentCalls }}>
                  {data.paymentCalls}
                </small>
              )}
              {isPropExists('urgentCalls') && (
                <small style={{ color: dayComponentColors.urgentCalls }}>
                  {data.urgentCalls}
                </small>
              )}
              <small style={{ color: dayComponentColors.appointmentCalls }}>
                {data.appointmentCalls}
              </small>
            </div>
          </CardActions>
        ) : (
          <div className={classes.skeletonTextMargin}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </div>
        )}
      </Card>
    </Grid>
  );
};

export default DayComponent;
