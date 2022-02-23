import {
  getID,
  getSubmitBody,
  isValidateName,
  setInitialName,
  validate,
  validateForm,
  getNameFromApi,
  getNameValue,
  isNameFromApi,
} from 'presentation/components/modal/LeadDetailsModal/AddressModal/helper';
import { getString } from 'presentation/theme/localization';
import { isInvalidCharacters } from 'shared/helper/utilities';

describe('Test isInvalidCharacters', () => {
  it('Should be return true if input include number', () => {
    expect(isInvalidCharacters('test1')).toEqual(true);
  });
  it('Should be return true if input include special characters', () => {
    expect(isInvalidCharacters(':(')).toEqual(true);
  });
  it('Should be return true if input include emoji', () => {
    expect(isInvalidCharacters('😀')).toEqual(true);
  });
  it('Should be return false if input valid', () => {
    expect(isInvalidCharacters('Test')).toEqual(false);
  });
});

describe('Test address validate', () => {
  let context: Record<string, string> = {};
  const limitLength = 40;
  beforeEach(() => {
    context = {
      firstName: '1234',
    };
  });
  // INFO: check only firstName
  it('Should be return firstName error when firstName has special characters', () => {
    expect(validate(context)).toEqual({
      firstName: getString('text.inputFirstNameValid'),
    });
  });
  it('Should be return firstName error when firstName greater than 40 characters', () => {
    context = {
      firstName:
        'aabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefbcdef',
    };
    expect(validate(context)).toEqual({
      firstName: getString('text.inputMaxLength', { length: limitLength }),
    });
  });
  // INFO: check only lastName
  it('Should be return lastName error when lastName has special characters', () => {
    context = {
      lastName: '1234',
    };
    expect(validate(context)).toEqual({
      lastName: getString('text.inputLastNameValid'),
    });
  });
  it('Should be return firstName error when lastName greater than 40 characters', () => {
    context = {
      lastName:
        'aabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefbcdef',
    };
    expect(validate(context)).toEqual({
      lastName: getString('text.inputMaxLength', { length: limitLength }),
    });
  });
  // INFO: check both of firstName and lastName
  it('Should be not return error when input is valid', () => {
    context = {
      firstName: 'John',
      lastName: 'Wick',
    };
    expect(validate(context)).toEqual({});
  });
});

describe('Test validateName', () => {
  it('Should be return true if input valid', () => {
    expect(isValidateName('John')).toEqual(true);
  });
  it('Should be return true if input invalid', () => {
    expect(isValidateName('123')).toEqual(false);
  });
});

describe('Test validateForm', () => {
  let context: any = {};
  beforeEach(() => {
    context = {
      address: 'Bangkok',
      addressType: 'company',
      addressUsage: ['policy'],
      district: '9999',
      postCode: '10000',
      province: '10002',
      subDistrict: '10003',
    };
  });
  it('Should be return true if form valid, addressType is company', () => {
    expect(
      validateForm({
        ...context,
        companyName: 'Smart',
        taxId: '1001',
      })
    ).toEqual(true);
  });

  it('Should be return true if form valid, addressType is personal', () => {
    expect(
      validateForm({
        ...context,
        addressType: 'personal',
        firstName: 'John',
        lastName: 'Wick',
      })
    ).toEqual(true);
  });
});

describe('Test getId', () => {
  it('should be return lead id', () => {
    expect(getID('lead/1234')).toEqual(1234);
  });
  it('Should be return empty if input is empty', () => {
    expect(getID('')).toEqual('');
  });
});

describe('Test setInitialData', () => {
  it('Should be return disabled false', () => {
    expect(setInitialName(['shipment'])).toEqual({
      firstName: {
        disabled: false,
        value: '',
      },
      lastName: {
        disabled: false,
        value: '',
      },
    });
  });
  it('Should be return name and disabled name field', () => {
    expect(setInitialName(['policy'], 'John', 'Wick')).toEqual({
      firstName: {
        value: 'John',
        disabled: false,
      },
      lastName: {
        value: 'Wick',
        disabled: false,
      },
    });
    expect(setInitialName(['policy'], 'John', 'Wick', true)).toEqual({
      firstName: {
        value: 'John',
        disabled: true,
      },
      lastName: {
        value: 'Wick',
        disabled: true,
      },
    });
  });
  it('Should be return firstName and disabled false', () => {
    expect(setInitialName(['policy'], 'John')).toEqual({
      firstName: {
        disabled: false,
        value: 'John',
      },
      lastName: {
        disabled: false,
        value: '',
      },
    });
  });
  it('Should be return lastName and disabled false', () => {
    expect(setInitialName(['policy'], '', 'Wick')).toEqual({
      firstName: {
        disabled: false,
        value: '',
      },
      lastName: {
        disabled: false,
        value: 'Wick',
      },
    });
  });
});

describe('Test getSubmitBody', () => {
  let context: any = {};
  beforeEach(() => {
    context = {
      id: '',
      province: '',
      district: '',
      subDistrict: '',
      addressType: 'personal',
      firstName: 'John',
      lastName: 'Wick',
    };
  });
  it('Should be return with firstName and lastName', () => {
    expect(JSON.stringify(getSubmitBody(context)).length).toEqual(
      JSON.stringify({
        id: '',
        province: '',
        district: '',
        subDistrict: '',
        addressType: 'personal',
        firstName: 'John',
        lastName: 'Wick',
      }).length
    );
  });
  it('Should be return without firstName and lastName', () => {
    context = {
      ...context,
      addressType: 'company',
    };
    expect(JSON.stringify(getSubmitBody(context)).length).toEqual(
      JSON.stringify({
        id: '',
        province: '',
        district: '',
        subDistrict: '',
        addressType: 'company',
      }).length
    );
  });
});

describe('Test getNameValue', () => {
  it('Should be return value name from api', () => {
    expect(getNameValue(['policy'], 'John', '')).toEqual('John');
  });
  it('Should be return value name from formik', () => {
    expect(getNameValue(['policy'], '', 'Wick')).toEqual('Wick');
  });
  it('Should be return value name from api if addressType not is policy', () => {
    expect(getNameValue(['billing'], 'John', 'Wick')).toEqual('Wick');
  });
});

describe('Test isNameFromApi', () => {
  it('Should be return true if we have firstName and lastName', () => {
    expect(isNameFromApi('John', 'Wick')).toEqual(true);
  });
  it('Should be return false if we not have firstName', () => {
    expect(isNameFromApi('', 'Wick')).toEqual(false);
  });
  it('Should be return false if we not have lastName', () => {
    expect(isNameFromApi('John', '')).toEqual(false);
  });
  it('Should be return false if we not have both of firstName and lastName', () => {
    expect(isNameFromApi('', '')).toEqual(false);
  });
});

describe('Test getNameFromApi', () => {
  let context: any;
  beforeEach(() => {
    context = {
      data: {
        policyHolderFirstName: 'John',
        policyHolderLastName: 'Wick',
      },
    };
  });
  it('Should be return both of policyFirstName and policyLastName', () => {
    expect(getNameFromApi(context)).toEqual({
      policyFirstName: 'John',
      policyLastName: 'Wick',
    });
  });
  it('Should be return policyFirstName ', () => {
    context = {
      data: {
        policyHolderFirstName: 'John',
      },
    };
    expect(getNameFromApi(context)).toEqual({
      policyFirstName: 'John',
      policyLastName: '',
    });
  });
  it('Should be return policyLastName ', () => {
    context = {
      data: {
        policyHolderLastName: 'Wick1',
      },
    };
    expect(getNameFromApi(context)).toEqual({
      policyFirstName: '',
      policyLastName: 'Wick1',
    });
  });
  it('Should be return empty both of name', () => {
    context = {
      data: {},
    };
    expect(getNameFromApi(context)).toEqual({
      policyFirstName: '',
      policyLastName: '',
    });
  });
});
