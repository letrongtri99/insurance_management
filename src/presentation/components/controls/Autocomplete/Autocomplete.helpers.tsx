import { reduce, startWith } from 'rxjs/operators';
import { getString } from 'presentation/theme/localization';
import ResponseModel from 'models/response';
import { Observable, iif } from 'rxjs';
import { AsyncOptions } from './types';

export enum SelectReason {
  SELECT_OPTION = 'select-option',
  REMOVE_OPTION = 'remove-option',
  CLEAR = 'clear',
}

export const getOptionLabel = (
  option: any,
  labelField: string,
  multiple: boolean
) =>
  !multiple
    ? option[labelField]
    : option[labelField] || getString('text.selectAll');

export const getOptionSelected = (option: any, anotherOption: any) =>
  option.value === anotherOption.value;

export const loadingText = (isFalseApi: boolean) => {
  if (!isFalseApi) {
    return getString('text.loading');
  }
  return getString('text.dataIsUnavailable');
};

export const showListDataLookup = (autoCompleteData: any, labelField: any) => {
  return autoCompleteData.map((item: any, index: number) =>
    typeof item === 'string'
      ? {
          id: index,
          title: item,
          value: item,
        }
      : {
          id: item.key,
          [labelField]: item.value,
          value: item.key,
        }
  );
};

export const showListDataAsync = (autoCompleteData: any, valueField: any) => {
  return autoCompleteData.map((item: any, index: number) => {
    return typeof item === 'string'
      ? {
          id: index,
          value: item,
          title: item,
        }
      : {
          ...item,
          id: index,
          value: item[valueField],
        };
  });
};

export const getFilterKey = (val: any) => (typeof val !== 'string' ? '' : val);

export const getAutoCompleteData = (res: any) => {
  let autoCompleteData = res.selectData || res;

  if (!Array.isArray(autoCompleteData)) {
    autoCompleteData = [];
  }

  return autoCompleteData;
};

export const addFilterData = ({ field, value }: any) => {
  if (!field) return {};
  return { [field]: value };
};

export const getSelectAllProps = (option: any, allSelected: any) => {
  if (option.value === 'all') return { checked: allSelected };
  return {};
};

export const formatLookupOptions = (res: any, { label, value }: any) =>
  res.map((item: any, index: number) => ({
    id: index,
    [label]: item[label],
    value: item[value],
  }));

export const handleReducer = (accumulator: any, currentValue: any) =>
  accumulator.concat(currentValue);

export const getOptionsValue = ({ startWithValue, optionsBaseValue }: any) => {
  return iif(
    () => Boolean(startWithValue),
    optionsBaseValue.pipe(startWith(startWithValue), reduce(handleReducer, [])),
    optionsBaseValue
  );
};

export const getOptionsValueObservable = (
  asyncFn: (props: AsyncOptions) => Observable<ResponseModel<any>>,
  startWithValue?: { [key: string]: string },
  filter?: string,
  labelField?: string,
  pageSize?: number,
  pageToken?: string
) => {
  const orderBy = `&orderBy=${labelField}`;
  const optionsBaseValue = asyncFn({ filter, orderBy, pageSize, pageToken });
  const optionsValue = getOptionsValue({ startWithValue, optionsBaseValue });
  return optionsValue;
};

export const showQuantity = (label: any, count: number) => {
  if (!label)
    return `${
      count > 1
        ? getString('text.items', { count })
        : getString('text.item', { count })
    }`;
  return '';
};

export const getAllSelectedStatus = (
  multiple: boolean,
  options: any,
  selectedOptions: any
) => multiple && options.length === selectedOptions.length;

export const getReasonNotClear = (reason: string) =>
  reason === SelectReason.SELECT_OPTION ||
  reason === SelectReason.REMOVE_OPTION;

export const getOnChangeVal = ({
  reason,
  multiple,
  allSelectedOptions,
  allSelected,
  _options,
}: any) => {
  let val: any;
  if (getReasonNotClear(reason)) {
    if (multiple) {
      if (allSelectedOptions.find((option: any) => option.value === 'all')) {
        if (!allSelected) {
          val = [..._options];
        } else {
          val = [];
        }
      } else {
        val = [...allSelectedOptions];
      }
    } else {
      val = { ...allSelectedOptions };
    }
  } else if (reason === SelectReason.CLEAR) {
    val = [...allSelectedOptions];
  }
  return val;
};
