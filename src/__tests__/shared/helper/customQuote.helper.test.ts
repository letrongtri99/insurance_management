import moment from 'moment';
import {
  isMaxAge,
  isMinAge,
  validate,
} from 'presentation/pages/LeadDetailsPage/CustomQuote/customQuote.helper';
import { getString } from 'presentation/theme/localization';

describe('Test isMaxAge', () => {
  it('Should be max than 100 years', () => {
    expect(isMaxAge('12/12/1902')).toEqual(true);
  });
  it('Should be less than 100 years', () => {
    expect(isMaxAge('12/12/1950')).toEqual(false);
  });
});

describe('Test isMinAge', () => {
  it('Should be less than 18 years', () => {
    expect(isMinAge(moment().subtract('years', 5) as any)).toEqual(true);
  });
  it('Should be max than 100 years', () => {
    expect(isMinAge(moment().subtract('years', 20) as any)).toEqual(false);
  });
});

describe('Test validate', () => {
  let context: any = {};
  beforeEach(() => {
    context = {
      firstDriverDOB: '',
      secondDriverDOB: '',
    };
  });

  it('Should be return empty of error', () => {
    expect(validate(context)).toEqual({});
  });
  it('Should be return error first driver DOB error max than 100 years', () => {
    context = {
      firstDriverDOB: '12/12/1902',
    };
    expect(validate(context)).toEqual({
      firstDriverDOB: getString('package.policyDOBMaxThan100'),
    });
  });
  it('Should be return error first driver DOB error less than 18 years', () => {
    context = {
      firstDriverDOB: moment().subtract('years', 5),
    };
    expect(validate(context)).toEqual({
      firstDriverDOB: getString('package.policyDOBLessThan18'),
    });
  });
  it('Should be return error second driver DOB error max than 100 years', () => {
    context = {
      secondDriverDOB: '12/12/1902',
    };
    expect(validate(context)).toEqual({
      secondDriverDOB: getString('package.policyDOBMaxThan100'),
    });
  });
  it('Should be return error second driver DOB error less than 18 years', () => {
    context = {
      secondDriverDOB: moment().subtract('years', 5),
    };
    expect(validate(context)).toEqual({
      secondDriverDOB: getString('package.policyDOBLessThan18'),
    });
  });
});
