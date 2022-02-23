import { Box, Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as Icon from '@material-ui/icons';
import { getString } from 'presentation/theme/localization';
import { DropzoneArea } from 'material-ui-dropzone';
import Controls from 'presentation/components/controls/Control';
import { FastField, Form, Formik, FormikProps } from 'formik';
import { showSnackBar } from 'presentation/redux/actions/ui';
import * as CONSTANTS from 'shared/constants';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import moment from 'moment';
import Spinner from 'presentation/components/Spinner';
import './index.scss';
import LeadDetailRepository from 'data/repository/leadDetail';
import { Subject } from 'rxjs';
import { pluck, takeUntil, tap } from 'rxjs/operators';
import { Skeleton } from '@material-ui/lab';
import CommonModal from '../CommonModal';
import {
  AttachmentExtensions,
  customComponentStyle,
  DELAY_CLOSE_MODAL,
  FILE_CONFIG,
  flatErrors,
  formatNumber,
  handleRejectedMessage,
  initialPaySlipFormData,
  IPaySlip,
  NUMBER_TYPE,
  useStyles,
  validationSchema,
} from './paySlipModal.helper';

const clearSub$ = new Subject();
const PayslipModal: React.FC<IPaySlip> = ({
  openDialog,
  closeDialog,
  leadId,
  user,
}) => {
  const classes = useStyles();
  const [paySlipImage, setPaySlipImage] = useState<any>(undefined);
  const [key, setKey] = useState(0);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [leadPackage, setLeadPackage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const dispatch = useDispatch();
  const handleCloseDialog = () => {
    closeDialog(false);
    setPaySlipImage('');
  };

  const showAlert = (
    snackBarType: string,
    message: string,
    isNotClose = false
  ) => {
    dispatch(
      showSnackBar({
        isOpen: true,
        message,
        status: snackBarType,
        isNotClose,
      })
    );
  };

  const handleDropFile = (file: FileList) => {
    setDocumentFile(file[0]);
    setPaySlipImage(URL.createObjectURL(file[0]));
  };
  const handleDeleteImage = () => {
    setKey(key + 1); // Re-render Dropzone when delete image
    setPaySlipImage('');
    setDocumentFile(null);
  };
  const handleRejectedFile = (
    rejectedFile: { name: string; type: string | undefined; size: number },
    acceptedFiles: string[],
    maxFileSize: number
  ) => {
    const msg = handleRejectedMessage(rejectedFile, acceptedFiles, maxFileSize);
    showAlert(CONSTANTS.snackBarConfig.type.error, msg);
  };

  const onSubmit = ({ paymentAmount, paymentDate }: any) => {
    const form = new FormData();
    form.append('document', documentFile as any);
    form.append('amount', paymentAmount);
    form.append('paid_date', moment(paymentDate).format('YYYY-MM-DD'));
    form.append('user', user.id);
    const leadDetailRepository = new LeadDetailRepository();
    setIsOrderLoading(true);
    leadDetailRepository
      .createPaySlip(leadId, form)
      .pipe(
        takeUntil(clearSub$),
        tap(() => setIsOrderLoading(false))
      )
      .subscribe(
        (res: any) => {
          showAlert(
            CONSTANTS.snackBarConfig.type.success,
            res.message || getString('text.createOrderSuccess')
          );
          setTimeout(() => {
            closeDialog(false);
          }, DELAY_CLOSE_MODAL);
        },
        (error: any) => {
          setIsOrderLoading(false);
          const stringFyError = flatErrors(error);
          showAlert(CONSTANTS.snackBarConfig.type.error, stringFyError, true);
        }
      );
  };

  useEffect(() => {
    if (openDialog) {
      const leadDetailRepository = new LeadDetailRepository();
      setIsLoading(true);
      leadDetailRepository
        .getLeadPackage(leadId)
        .pipe(
          takeUntil(clearSub$),
          pluck('data'),
          tap(() => setIsLoading(false))
        )
        .subscribe(
          (res: any) => {
            setLeadPackage(res);
          },
          (error: any) => {
            setIsLoading(false);
            showAlert(
              CONSTANTS.snackBarConfig.type.error,
              error.message || getString('text.packageNotFound')
            );
          }
        );
    }
    return () => {
      clearSub$.next(true);
    };
  }, [openDialog]);

  const displayPrice = (price: number | string) => {
    return leadPackage ? price : '';
  };
  return (
    <CommonModal
      title={getString('text.paymentConfirmation')}
      open={openDialog}
      handleCloseModal={() => {
        handleCloseDialog();
      }}
      wrapperClass={clsx('pay-slip-modal', classes.wrapper)}
      className={classes.content}
    >
      <Grid container spacing={3}>
        <Grid item xs={5} className="pay-slip-modal__dropzone">
          {documentFile ? (
            <div className={classes.preview}>
              <img src={paySlipImage} alt="" />
              <Box position="absolute" bottom={0} right={0}>
                <Icon.Delete
                  onClick={() => handleDeleteImage()}
                  classes={{ root: classes.deleteIcon }}
                />
              </Box>
            </div>
          ) : (
            <div className="payment-confirmation-dropzone">
              <DropzoneArea
                key={key}
                dropzoneClass={classes.dropzone}
                clearOnUnmount
                acceptedFiles={AttachmentExtensions}
                filesLimit={1}
                showPreviews
                showPreviewsInDropzone={false}
                dropzoneText={getString('text.dragDropFileOrChooseFile')}
                maxFileSize={FILE_CONFIG.MAX_ONE_FILE_SIZE}
                useChipsForPreview
                onChange={handleDropFile}
                showAlerts={false}
                getDropRejectMessage={(
                  rejectedFile,
                  acceptedFiles,
                  maxFileSize
                ) => {
                  handleRejectedFile(rejectedFile, acceptedFiles, maxFileSize);
                  return '';
                }}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={7} className={classes.infoSection}>
          <Grid item xs={12}>
            <Box display="flex" padding="12px 0" alignItems="center">
              <customComponentStyle.Title>
                {getString('text.premiumBeforeDiscount')}
              </customComponentStyle.Title>
              <customComponentStyle.Comma>:</customComponentStyle.Comma>
              <customComponentStyle.Value>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width="80%"
                    style={{ float: 'right' }}
                  />
                ) : (
                  displayPrice(
                    formatNumber(leadPackage?.['price_without_discount'])
                  )
                )}
              </customComponentStyle.Value>
            </Box>
            <Box display="flex" padding="12px 0" alignItems="center">
              <customComponentStyle.Title>
                {getString('text.couponDiscount')}
              </customComponentStyle.Title>
              <customComponentStyle.Comma>:</customComponentStyle.Comma>
              <customComponentStyle.Value>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width="80%"
                    style={{ float: 'right' }}
                  />
                ) : (
                  displayPrice(
                    formatNumber(
                      leadPackage?.['voucher_discount'],
                      leadPackage?.['voucher_discount']
                        ? NUMBER_TYPE.NEGATIVE
                        : NUMBER_TYPE.POSITIVE
                    )
                  )
                )}
              </customComponentStyle.Value>
            </Box>
            <Box display="flex" padding="12px 0" alignItems="center">
              <customComponentStyle.Title>
                {getString('text.priceAfterDiscount')}
              </customComponentStyle.Title>
              <customComponentStyle.Comma>:</customComponentStyle.Comma>
              <customComponentStyle.Value>
                {isLoading ? (
                  <Skeleton
                    variant="text"
                    width="80%"
                    style={{ float: 'right' }}
                  />
                ) : (
                  displayPrice(formatNumber(leadPackage?.['invoice_price']))
                )}
              </customComponentStyle.Value>
            </Box>
          </Grid>
          <hr />
          <Grid item xs={12} className="pay-slip-modal__form">
            <Formik
              initialValues={initialPaySlipFormData}
              validationSchema={validationSchema}
              isInitialValid={false}
              onSubmit={onSubmit}
            >
              {(formik: FormikProps<any>) => {
                return (
                  <Form>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={5}
                    >
                      <Grid item xs={12}>
                        <FastField name="paymentAmount">
                          {(props: any) => {
                            const { field } = props;
                            return (
                              <Controls.NumberInput
                                name={field.name}
                                value={formik.values.paymentAmount}
                                onValueChange={(values: any) => {
                                  formik.setFieldValue(
                                    field.name,
                                    values.floatValue
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.paymentAmount
                                    ? formik.errors.paymentAmount
                                    : ''
                                }
                                label={getString('text.paymentAmount')}
                                placeholder={getString(
                                  'text.enterPaymentAmount'
                                )}
                                fixedLabel
                                className={classes.textFieldLabel}
                              />
                            );
                          }}
                        </FastField>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid item xs={12}>
                          <FastField name="paymentDate" id="keyboard-date">
                            {(props: any) => {
                              return (
                                <Controls.KeyBoardDatePicker
                                  name="paymentDate"
                                  value={formik.values.paymentDate}
                                  className={`${classes.paymentDatePicker} payment-date`}
                                  invalidDateMessage={false}
                                  minDateMessage={false}
                                  onChange={(date: Date | null, value: any) => {
                                    formik.setFieldValue('paymentDate', date);
                                  }}
                                  autoOk
                                  disableToolbar
                                  label={getString('text.paymentDate')}
                                  placeholder={getString(
                                    'text.enterPaymentDate'
                                  )}
                                  fixedLabel
                                  helperText={getString(
                                    'text.paymentDateRequired'
                                  )}
                                />
                              );
                            }}
                          </FastField>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        marginTop="20px"
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Button
                          variant="text"
                          className="shared-comment-text-box__btn unittest-text-box-btn"
                          onClick={() => {
                            handleCloseDialog();
                          }}
                          style={{ marginRight: '15px' }}
                          color="secondary"
                        >
                          CANCEL
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          className="shared-comment-text-box__btn unittest-text-box-btn"
                          disabled={
                            !(formik.isValid && documentFile && leadPackage)
                          }
                          color="primary"
                        >
                          CONFIRM PURCHASE
                        </Button>
                      </Box>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
        {isOrderLoading && <Spinner />}
      </Grid>
    </CommonModal>
  );
};

export default PayslipModal;
