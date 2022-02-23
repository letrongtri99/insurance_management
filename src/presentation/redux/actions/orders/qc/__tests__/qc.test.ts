import {
  QCModuleActions,
  getQCModule,
  getQCModuleSuccess,
  getQCModuleFailed,
} from '..';

describe('Test QCModuleActions', () => {
  it('Should getQCModule run well', () => {
    const input = {
      filters: ['order.qc_by != ""', 'order.qcStatus="QC_STATUS_PENDING"'],
    };
    const output = {
      type: QCModuleActions.GET_QC_MODULE,
      payload: {
        filters: ['order.qc_by != ""', 'order.qcStatus="QC_STATUS_PENDING"'],
      },
    };
    expect(getQCModule(input)).toEqual(output);
  });

  it('Should getQCModuleSuccess run well', () => {
    const input = {
      orders: [],
    };
    const output = {
      type: QCModuleActions.GET_QC_MODULE_SUCCESS,
      payload: {
        orders: [],
      },
    };
    expect(getQCModuleSuccess(input)).toEqual(output);
  });

  it('Should getQCModuleFailed run well', () => {
    const input = {
      orders: [],
    };
    const output = {
      type: QCModuleActions.GET_QC_MODULE_FAILED,
      payload: {
        orders: [],
      },
    };
    expect(getQCModuleFailed(input)).toEqual(output);
  });
});
