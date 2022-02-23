import React, { FC, useEffect, useRef, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { queryStringDynamic } from 'data/gateway/api/helper/queryString.helper';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Color } from 'presentation/theme/variants';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import styled, { StyledComponent } from 'styled-components';
import Poppers from './Popper';
import Input from '../Input';
import {
  getOptionLabel,
  getOptionSelected,
  loadingText,
  getFilterKey,
  addFilterData,
  formatLookupOptions,
  showListDataLookup,
  getAutoCompleteData,
  showListDataAsync,
  getAllSelectedStatus,
  getReasonNotClear,
  getOptionsValueObservable,
  getOnChangeVal,
} from './Autocomplete.helpers';
import useAutocomplete from '../useAutocomplete';
import { getString } from '../../../theme/localization';
import withPopper from '../../../HOCs/WithPopper';
import Option from './Option';
import { MyAutoCompleteProps } from './types';

const DEFAULT_DEBOUNCE_TIME = 1.5 * 1000;
const DEFAULT_PLACEHOLDER = 'text.select';

const useStyles = makeStyles((theme) => ({
  AutocompleteOption: {},
  chips: {
    background: Color.BLUE_AUTOCOMPLETE,
  },
  chipsDeleteIcon: {
    color: theme.palette.primary.main,
  },
}));

const WrapperAutocomplete: StyledComponent<any, any> = styled.div`
  position: relative;
  width: 100%;
`;

const MyAutocomplete: FC<MyAutoCompleteProps> = ({
  label,
  popper = 'none',
  placeholder = DEFAULT_PLACEHOLDER,
  multiple = true,
  options = [],
  limitTags = 1,
  marginRight = 0,
  variant = 'standard',
  fixedLabel = false,
  onChange,
  name,
  value,
  async,
  lookup = false,
  asyncFn,
  lookupFn,
  labelField = 'title',
  valueField = labelField,
  filterDataField,
  filterDataValue,
  startWithValue,
  disableClearable = false,
  hasSelectAll = false,
  loading = false,

  /**
   * TODO There is a limitation with the pagination implementation
   * wherein, searches made with the input text don't search through
   * all of the options from the database, and only search through the
   * existing options.
   */
  paginate = false,
  pageSize = 100,
}) => {
  const classes = useStyles();
  const inputRef: any = useRef();
  const [open, setOpen] = useState<boolean>(false);
  const [_options, setOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(loading);
  const [_placeholder, setPlaceholder] = useState<string>('');
  const [isFalseApi, setIsFalseApi] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [pageToken, setPageToken] = useState<string>('');
  const [onSearch$] = useState(new Subject());
  const { handleFilterOptions } = useAutocomplete();

  const allSelected = getAllSelectedStatus(multiple, _options, selectedOptions);

  const fetchOptions = (val: any) => {
    if (!async || !asyncFn) return;

    if (!paginate) setOptions([]);
    setIsLoading(true);
    const filter = queryStringDynamic({
      [labelField]: { value: getFilterKey(val) },
      ...addFilterData({
        field: filterDataField,
        value: filterDataValue,
      }),
    });

    const optionsValue = getOptionsValueObservable(
      asyncFn,
      startWithValue,
      filter,
      labelField,
      pageSize,
      pageToken
    );

    optionsValue.subscribe({
      next: (res: any) => {
        // Determines the field or value to be formatted.
        const field = lookup ? labelField : valueField;
        // Determines how the data should be formatted.
        const formatData = lookup ? showListDataLookup : showListDataAsync;
        const data = paginate ? res.data : res;

        let newOptions = formatData(getAutoCompleteData(data), field);

        const { nextPageToken } = res;

        if (paginate && nextPageToken !== '') {
          newOptions = [..._options, ...newOptions];
          setPageToken(nextPageToken as string);
        }

        setOptions(newOptions);
        setIsLoading(false);
      },
      error: (e) => {
        setIsFalseApi(true);
      },
    });
  };

  /**
   * Fetches more options when scrolling to the bottom of the list if
   * paginate flag is enabled and if the next page token exists.
   * @param event
   */
  const onScrollToBottom = (event: React.SyntheticEvent) => {
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.clientHeight ===
      listboxNode.scrollHeight
    ) {
      if (!isLoading && paginate && pageToken !== '') {
        fetchOptions('');
      }
    }
  };

  const handleToggleOption = (sltOptions: any) =>
    setSelectedOptions(sltOptions);
  const handleClearOptions = () => setSelectedOptions([]);

  const handleInputValueChange = (e: React.ChangeEvent<{ value: string }>) => {
    onSearch$.next(e.target.value);
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedOptions(_options);
    } else {
      handleClearOptions();
    }
  };

  const handleToggleSelectAll = () => {
    handleSelectAll(!allSelected);
  };

  const handleChange = (
    event: any,
    allSelectedOptions: any,
    reason: string
  ) => {
    if (onChange == null) return;
    if (getReasonNotClear(reason)) {
      if (multiple) {
        if (allSelectedOptions.find((option: any) => option.value === 'all')) {
          handleToggleSelectAll();
        } else {
          handleToggleOption(allSelectedOptions);
        }
      } else {
        handleToggleOption(allSelectedOptions);
      }
    } else if (reason === 'clear') {
      handleClearOptions();
    }
    const val = getOnChangeVal({
      reason,
      multiple,
      allSelectedOptions,
      allSelected,
      _options,
    });
    onChange(
      {
        ...event,
        target: {
          ...event.target,
          name,
          value: val,
        },
      },
      val
    );
  };

  const optionRenderer = (option: any, { selected }: any) => {
    const isAllSelected = option.value === 'all';
    return (
      <Option
        multiple={multiple}
        marginRight={marginRight}
        selected={selected || isAllSelected}
        option={option}
        numOptions={options.length}
        label={labelField}
      />
    );
  };

  const inputRenderer = (params: any) => (
    <Input
      {...params}
      placeholder={getString(_placeholder)}
      variant={variant}
      label={label}
      name={name}
      value={value}
      fixedLabel={fixedLabel}
      onChange={handleInputValueChange}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {isLoading ? (
              <CircularProgress
                color="inherit"
                size={20}
                data-testid="common-my-complete__circular"
              />
            ) : null}
            {params.InputProps.endAdornment}
          </>
        ),
        disableUnderline: true,
      }}
    />
  );

  useEffect(() => {
    setPlaceholder(value && value.length ? '' : placeholder);
  }, [placeholder, value]);

  useEffect(() => {
    if (async) {
      onSearch$
        .pipe(
          tap(() => {
            setIsLoading(true);
          }),
          debounceTime(DEFAULT_DEBOUNCE_TIME)
        )
        .subscribe((val: unknown) => {
          // NOT FULLY IMPLEMENTED:
          // fetchOptions(val);
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (typeof value === 'object') {
      setSelectedOptions(value);
    }
  }, [value]);

  useEffect(() => {
    if (!lookupFn && !async) {
      setOptions(options);
    }
  }, [options, lookupFn, async]);

  useEffect(() => {
    const destroyComponent$ = new Subject();
    if (lookupFn) {
      lookupFn()
        .pipe(takeUntil(destroyComponent$))
        .subscribe(
          (res: any) => {
            const lookupOptions = formatLookupOptions(res, {
              label: labelField,
              value: valueField,
            });
            setOptions(lookupOptions);
          },
          () => setIsFalseApi(true)
        );
    }
    return () => {
      destroyComponent$.next(true);
    };
  }, [labelField, lookupFn, valueField]);

  return (
    <WrapperAutocomplete>
      <Autocomplete
        classes={{
          option: classes.AutocompleteOption,
        }}
        popupIcon={<KeyboardArrowDownIcon />}
        PopperComponent={withPopper(Poppers, popper)}
        ListboxProps={{
          style: { maxHeight: '15rem', position: 'bottom' },
          onScroll: paginate && onScrollToBottom,
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onFocus={fetchOptions}
        options={_options}
        limitTags={limitTags}
        multiple={multiple}
        ref={inputRef}
        className="shared-autocomplete"
        data-testid="common-my-complete"
        value={selectedOptions}
        disableCloseOnSelect={multiple}
        loadingText={() => loadingText(isFalseApi)}
        noOptionsText={getString('text.dataIsUnavailable')}
        getOptionLabel={(option: any) =>
          getOptionLabel(option, labelField, multiple)
        }
        getOptionSelected={getOptionSelected}
        filterOptions={(opts: any, params: any) =>
          handleFilterOptions(hasSelectAll, opts, params)}
        onChange={handleChange}
        renderOption={optionRenderer}
        renderInput={inputRenderer}
        ChipProps={{
          size: 'small',
          deleteIcon: <CloseIcon />,
          classes: { root: classes.chips, deleteIcon: classes.chipsDeleteIcon },
        }}
        loading={isLoading}
        disableClearable={disableClearable}
      />
    </WrapperAutocomplete>
  );
};

export default MyAutocomplete;
