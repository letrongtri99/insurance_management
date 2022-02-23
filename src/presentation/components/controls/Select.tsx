import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  InputLabelProps,
  makeStyles,
  SelectProps,
} from '@material-ui/core';
import './Select.scss';
import { Color } from 'presentation/theme/variants';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import ResponseModel from 'models/response';
import { FormikErrors } from 'formik';

const useStyles = makeStyles(() => ({
  menuItem: {
    '&:hover': {
      background: Color.BLUE_AUTOCOMPLETE,
    },
    '&[aria-selected="true"]': {
      background: Color.BLUE_AUTOCOMPLETE,
    },
    '&[data-focus="true"]': {
      background: Color.BLUE_AUTOCOMPLETE,
    },
  },
}));

interface OptionProps {
  id?: string | number;
  name?: string;
  title?: string | number;
  value?: string | number;
  key?: string | number;
  prefixColor?: string;
  color?: string;
}

interface Props extends Omit<SelectProps, 'color'> {
  selectField?: 'title' | 'id' | 'value' | 'name' | 'key';
  styledDropdown?: string;
  fixedLabel?: boolean;
  errorType?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  // This is an object that can take any option for now
  options?: OptionProps[];
  // Any is passed here because no strict payload is defined.
  lookupFn?: () => Observable<ResponseModel<any>>;
  color?: Color;
}

export default function Select(props: Props) {
  const {
    name,
    label,
    value,
    error,
    onChange,
    onOpen = () => null,
    onClose,
    options,
    selectField = 'id',
    title = 'title',
    className,
    style,
    errorType,
    disabled,
    placeholder = '',
    fixedLabel = false,
    lookupFn,
    styledDropdown,
    color,
  } = props;

  const [labelProps, setLabelProps] = useState<InputLabelProps>({});
  const [_options, setOptions] = useState<OptionProps[]>();

  useEffect(() => {
    setLabelProps(fixedLabel ? { shrink: true } : {});
  }, [fixedLabel]);

  useEffect(() => {
    if (!lookupFn) {
      setOptions(options);
    }
  }, [options, lookupFn]);

  useEffect(() => {
    const destroyComponent$ = new Subject();
    if (lookupFn) {
      lookupFn()
        .pipe(takeUntil(destroyComponent$))
        .subscribe((res: any) => {
          const lookupOptions = res.map((item: any, index: number) => ({
            id: index,
            [title]: item[title],
            [selectField]: item[selectField],
          }));
          setOptions(lookupOptions);
        });
    }
    return () => {
      destroyComponent$.next(true);
    };
  }, [lookupFn, selectField, title]);

  const getColorSelect = () => {
    if (color) {
      return color;
    }
    if (value) {
      return '';
    }
    return Color.GREY_LIGHTER;
  };

  const classes = useStyles();

  // INFO: solution for fix error : "provided an out-of-range value"
  // INFO: Show the select after component is render (this is workaround)
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    setIsShow(true);
  }, []);

  return (
    <FormControl style={style} disabled={disabled} error={!!error}>
      {label && <InputLabel {...labelProps}>{label}</InputLabel>}
      {isShow ? (
        <MuiSelect
          className={className}
          label={label}
          name={name}
          value={value || ''}
          onChange={onChange}
          onOpen={onOpen}
          onClose={onClose}
          style={{
            color: getColorSelect(),
          }}
          displayEmpty
          defaultValue=""
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            classes: { paper: styledDropdown },
          }}
          disableUnderline
          IconComponent={KeyboardArrowDownIcon}
        >
          {placeholder ? (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          ) : null}

          {_options &&
            _options.map((item) => {
              return (
                <MenuItem
                  key={item.id || item.name || item.title}
                  value={`${item[selectField]}`}
                  className={classes.menuItem}
                  style={{ color: item.color }}
                >
                  {item?.prefixColor && (
                    <div
                      className="prefix"
                      style={{
                        border: `1px solid ${item.prefixColor}`,
                        marginRight: '5px',
                        marginBottom: '2px',
                        height: '10px',
                        width: '10px',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                  {item.title}
                </MenuItem>
              );
            })}
        </MuiSelect>
      ) : null}

      {error && <FormHelperText error={error}>{errorType}</FormHelperText>}
    </FormControl>
  );
}
