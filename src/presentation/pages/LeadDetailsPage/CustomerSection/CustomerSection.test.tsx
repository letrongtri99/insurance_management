import React from 'react';
import { shallow } from 'enzyme';
import CustomerSection from '.';
import {
  calculateDOBHelper,
  EDIT_TYPE,
  getAgeByDOB,
  getPendingRejection,
  getStatusColor,
  mappingCustomerStatus,
  mappingFiledValue,
  renderInputType,
  updateStateChange,
  getClassFieldItem,
} from './helper';

const mockData = {
  lead: {
    customerFirstName: '',
    customerLastName: '',
    status: '',
    gender: '',
    customerDob: '',
    age: '',
    customerProvince: 'Krabi',
    customerCity: '',
    customerReference: '',
    leadType: '',
    leadReference: '',
    leadParent: '',
    isRejected: false,
    name: '',
  },
  customerHistory: {
    numOrders: 0,
    numLeads: 0,
    previousLeadDate: '',
    previousVisitDate: '',
  },
};
const useStateSpy = jest.spyOn(React, 'useState');
const isPendingRejection = null;
const setIsPendingRejection = jest.fn();
const dataSchema = null;
const setDataSchema = jest.fn();
useStateSpy.mockImplementation((() => [
  isPendingRejection,
  setIsPendingRejection,
]) as any);
useStateSpy.mockImplementation((() => [dataSchema, setDataSchema]) as any);

const wrapper = shallow(<CustomerSection data={mockData as any} />);
describe('<CustomerSection Component/>', () => {
  it('will be mounted correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Test getAgeByDOB', () => {
  it('Should be return empty if input empty', () => {
    expect(getAgeByDOB('')).toEqual('');
  });
  it('Should be return age if input valid', () => {
    expect(getAgeByDOB('12/12/1996')).toEqual(24);
  });
});

describe('Test updateStateChange', () => {
  let state: any;
  let event: any;
  beforeEach(() => {
    state = {};
    event = {
      target: {
        value: '123',
      },
    };
  });
  it('Should be return error if input invalid', () => {
    expect(updateStateChange(event, state)).toEqual({
      isError: true,
      error: 'text.inputInvalid',
    });
  });
  it('Should be return error if input max length', () => {
    event = {
      target: {
        value:
          'Reference site about Lorem Ipsum giving information on its origins',
      },
    };
    expect(updateStateChange(event, state)).toEqual({
      isError: true,
      error: 'text.inputMaxLength',
    });
  });

  it('Should be not return error if input valid', () => {
    event = {
      target: {
        value: 'Siriwan',
      },
    };
    expect(updateStateChange(event, state)).toEqual({
      isError: false,
      error: '',
    });
  });
});

describe('Test mappingFiledValue', () => {
  const form = {
    customer: {
      firstName: {
        value: 'Rajendra',
        isEdit: false,
        isEditable: true,
        editType: 'input',
        title: 'First Name',
        id: 'a737e9d8-8a14-40a0-9825-f1e9a1a3f39e',
        isError: false,
      },
      lastName: {
        value: 'sharma',
        isEdit: false,
        isEditable: true,
        editType: 'input',
        title: 'Last Name',
        id: 'a38460e9-c0ae-451d-a67f-97af41059d42',
        isError: false,
      },
      gender: {
        value: 'm',
        isEdit: false,
        isEditable: true,
        editType: 'select',
        title: 'Gender',
        id: 'bd90328f-b256-4b41-89af-a7095c944073',
        isError: false,
        typeSelect: 'Gender',
      },
      latestLead: {
        value: '02/08/2020(2560) (5:13:39PM)',
        isEdit: false,
        isEditable: true,
        editType: 'date',
        title: 'Latest lead',
        id: 'b1edab1d-b851-4565-b640-2c7f0e39e355',
        isError: false,
      },
      latestOrder: {
        isEdit: false,
        isEditable: true,
        value: '02/08/2020(2560) (5:13:39PM)',
        editType: 'date',
        title: 'Latest order',
        id: '549c521b-b902-4589-8683-66cb25ac6367',
        isError: false,
      },
    },
    policyHolder: {
      title: {
        value: 'Mr',
        isEdit: false,
        isEditable: true,
        editType: 'select',
        title: 'Title',
        id: 'd4632487-bb60-4a46-a9c2-864b78afb703',
        isError: false,
        typeSelect: 'Title',
      },
      firstName: {
        value: 'Siriwan',
        isEdit: false,
        editType: 'input',
        isEditable: true,
        title: 'First Name',
        id: '9a82d09e-5e90-44da-8cd8-9d6093c0c6d5',
        isError: false,
      },
      lastName: {
        value: 'Siriwan',
        isEdit: false,
        isEditable: true,
        editType: 'input',
        title: 'Last Name',
        id: '007bf81d-67d6-467f-b363-9110aa5ed5e9',
        isError: false,
      },
      DOB: {
        isEdit: false,
        isEditable: true,
        editType: 'date picker',
        title: 'DOB',
        id: 'c5c4aede-7c06-41cc-96a2-54bcb48dac65',
        isError: false,
        value: '12/12/1996',
      },
      age: {
        value: 24,
        title: 'Age',
        isEdit: false,
        isEditable: false,
        id: '9c27785d-ef68-4536-b355-0d9f55a9bcae',
        isError: false,
      },
      province: {
        value: 'krabi',
        isEdit: false,
        isEditable: false,
        editType: 'input',
        title: 'Province',
        id: '55966f79-d233-470a-b8cf-f6ffb18b1c28',
        isError: false,
      },
      city: {
        value: 'Ao luk',
        isEdit: false,
        isEditable: false,
        editType: 'input',
        title: 'City',
        id: '5629218b-38d5-44b9-aaf3-9d6c3ecfc913',
        isError: false,
      },
    },
    leadInfo: {
      agentName: {
        value: 'Siriwan',
        isEdit: false,
        isEditable: false,
        title: 'Agent Name',
        id: 'd22e9b75-cd07-4f9b-b552-3a2e0d4aac3d',
        isError: false,
        editType: 'input',
      },
      id: {
        value: 'L62014',
        title: 'Lead ID',
        isEdit: false,
        isEditable: false,
        id: '731b5106-67a2-4d87-81b4-ca48f7a794e0',
        isError: false,
        editType: 'input',
      },
      type: {
        value: 'New',
        isEdit: false,
        isEditable: false,
        title: 'Lead type',
        id: 'fa472438-9bc7-418e-b00a-d606367ea35a',
        isError: false,
        editType: 'input',
      },
    },
  };
  const data = {
    lead: {
      customerFirstName: 'Rajendra',
      customerLastName: 'sharma',
      status: 'LEAD_STATUS_INTERESTED',
      gender: 'm',
      customerDob: '1993-03-09',
      age: 28,
      customerProvince: 'Bangkok',
      customerCity: 'Phra Nakhon',
      customerReference: '',
      leadType: 'leadTypeFilter.new',
      leadReference: 'L62014',
      leadParent: '',
      name: 'leads/91b82282-6745-4d66-a754-33b2f965f478',
      isRejected: false,
      reference: null,
      agentName: 'Siriwan',
    },
    customer: {
      firstName: 'Rajendra',
      lastName: 'sharma',
      gender: 'm',
      latestLead: '02/08/2020(2560) (5:13:39PM)',
      latestOrder: '02/08/2020(2560) (5:13:39PM)',
    },
    policyHolder: {
      title: 'Mr',
      firstName: 'Siriwan',
      lastName: 'Siriwan',
      DOB: '12/12/1996',
      age: '',
      province: 'krabi',
      city: 'Ao luk',
    },
    leadInfo: { agentName: 'Siriwan', id: 'L62014', type: 'New' },
  };
  const expected = {
    customer: {
      firstName: {
        value: 'Rajendra',
        isEdit: false,
        isEditable: true,
        editType: 'input',
        title: 'First Name',
        id: 'a737e9d8-8a14-40a0-9825-f1e9a1a3f39e',
        isError: false,
      },
      lastName: {
        value: 'sharma',
        isEdit: false,
        isEditable: true,
        editType: 'input',
        title: 'Last Name',
        id: 'a38460e9-c0ae-451d-a67f-97af41059d42',
        isError: false,
      },
      gender: {
        value: 'm',
        isEdit: false,
        isEditable: true,
        editType: 'select',
        title: 'Gender',
        id: 'bd90328f-b256-4b41-89af-a7095c944073',
        isError: false,
        typeSelect: 'Gender',
      },
      latestLead: {
        value: '02/08/2020(2560) (5:13:39PM)',
        isEdit: false,
        isEditable: true,
        editType: 'date',
        title: 'Latest lead',
        id: 'b1edab1d-b851-4565-b640-2c7f0e39e355',
        isError: false,
      },
      latestOrder: {
        isEdit: false,
        isEditable: true,
        value: '02/08/2020(2560) (5:13:39PM)',
        editType: 'date',
        title: 'Latest order',
        id: '549c521b-b902-4589-8683-66cb25ac6367',
        isError: false,
      },
    },
    policyHolder: {
      title: {
        value: 'Mr',
        isEdit: false,
        isEditable: true,
        editType: 'select',
        title: 'Title',
        id: 'd4632487-bb60-4a46-a9c2-864b78afb703',
        isError: false,
        typeSelect: 'Title',
      },
      firstName: {
        value: 'Siriwan',
        isEdit: false,
        editType: 'input',
        isEditable: true,
        title: 'First Name',
        id: '9a82d09e-5e90-44da-8cd8-9d6093c0c6d5',
        isError: false,
      },
      lastName: {
        value: 'Siriwan',
        isEdit: false,
        isEditable: true,
        editType: 'input',
        title: 'Last Name',
        id: '007bf81d-67d6-467f-b363-9110aa5ed5e9',
        isError: false,
      },
      DOB: {
        isEdit: false,
        isEditable: true,
        editType: 'date picker',
        title: 'DOB',
        id: 'c5c4aede-7c06-41cc-96a2-54bcb48dac65',
        isError: false,
        value: '12/12/1996',
      },
      age: {
        value: 24,
        title: 'Age',
        isEdit: false,
        isEditable: false,
        id: '9c27785d-ef68-4536-b355-0d9f55a9bcae',
        isError: false,
      },
      province: {
        value: 'krabi',
        isEdit: false,
        isEditable: false,
        editType: 'input',
        title: 'Province',
        id: '55966f79-d233-470a-b8cf-f6ffb18b1c28',
        isError: false,
      },
      city: {
        value: 'Ao luk',
        isEdit: false,
        isEditable: false,
        editType: 'input',
        title: 'City',
        id: '5629218b-38d5-44b9-aaf3-9d6c3ecfc913',
        isError: false,
      },
    },
    leadInfo: {
      agentName: {
        value: 'Siriwan',
        isEdit: false,
        isEditable: false,
        title: 'Agent Name',
        id: 'd22e9b75-cd07-4f9b-b552-3a2e0d4aac3d',
        isError: false,
        editType: 'input',
      },
      id: {
        value: 'L62014',
        title: 'Lead ID',
        isEdit: false,
        isEditable: false,
        id: '731b5106-67a2-4d87-81b4-ca48f7a794e0',
        isError: false,
        editType: 'input',
      },
      type: {
        value: 'New',
        isEdit: false,
        isEditable: false,
        title: 'Lead type',
        id: 'fa472438-9bc7-418e-b00a-d606367ea35a',
        isError: false,
        editType: 'input',
      },
    },
  };
  it('Should be return value of formValue with age', () => {
    expect(mappingFiledValue(form, data)).toEqual(expected);
  });
});

describe('Test mappingCustomerStatus', () => {
  it('Should be return status name', () => {
    expect(mappingCustomerStatus('LEAD_STATUS_NEW')).toEqual('leadStatus.new');
  });
  it('Should be return null if status not found', () => {
    expect(mappingCustomerStatus('LEAD_STATUS_NEW1')).toEqual('');
  });
});

describe('Test getStatusColor', () => {
  let classes: any = {};
  beforeEach(() => {
    classes = {
      statusOrange: { background: 'orange' },
      statusGreen: { background: 'green' },
    };
  });
  it('should be return orange status color', () => {
    expect(getStatusColor(true, classes)).toEqual({
      background: 'orange',
    });
  });
  it('Should be return empty if input is null', () => {
    expect(getStatusColor(null, classes)).toEqual('');
  });
  it('Should be return green if input is empty', () => {
    expect(getStatusColor('' as any, classes)).toEqual({
      background: 'green',
    });
  });
});

describe('Test getPendingRejection', () => {
  it('Should be return not pending ', () => {
    expect(getPendingRejection({})).toEqual(false);
  });
  it('Should be return  pending ', () => {
    expect(
      getPendingRejection({
        rejections: [{ decideTime: null }],
      })
    ).toEqual(true);
  });
});

it('Calculate DOB', () => {
  expect(
    calculateDOBHelper(
      {
        policyHolder: {
          age: {
            value: '',
          },
        },
      },
      '12/12/1996'
    )
  ).toEqual({
    policyHolder: {
      age: {
        value: 24,
      },
    },
  });
});

describe('Test renderInputType', () => {
  it('Should be return input', () => {
    expect(renderInputType({ editType: EDIT_TYPE.INPUT } as any)).toEqual(1);
  });
  it('Should be return select', () => {
    expect(renderInputType({ editType: EDIT_TYPE.SELECT } as any)).toEqual(2);
  });
  it('Should be return date picker', () => {
    expect(renderInputType({ editType: EDIT_TYPE.DATE_PICKER } as any)).toEqual(
      3
    );
  });
  it('Should be return default value', () => {
    expect(renderInputType({ editType: '' } as any)).toEqual(4);
  });
});

describe('Test getClassFieldItem', () => {
  it('Should be return class active', () => {
    expect(getClassFieldItem({ isEdit: true } as any)).toEqual(
      `field-item active`
    );
  });
  it('Should be return not have class active', () => {
    expect(getClassFieldItem({ isEdit: false } as any)).toEqual(`field-item `);
  });
});
