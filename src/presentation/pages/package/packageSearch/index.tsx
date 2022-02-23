import React, { useEffect, useState } from 'react';

import {
  ExpansionPanel as Accordion,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import styled from 'styled-components';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { Form, Formik } from 'formik';
import {
  packageSearchSchema,
  packageSearchSchemaMobile,
} from 'shared/constants/packageSearchFields';
import { useDispatch } from 'react-redux';
import './index.scss';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import PackageSearchResult from './packageSearchResult';
import {
  packageSearchValidationSchema,
  initialPackageSearchData,
  PackageSearch as PackageSearchClass,
} from './helper';
import PackageSearchFilter from './packageSearchFilter';
import PackageSearchFilterSumary from './packageSearchFilterSumary';
import PackageRepository from '../../../../data/repository/package';
import { IPackageFormValue } from '../../../../shared/interfaces/common/package';
import Spinner from '../../../components/Spinner';
import { LIMIT_TIME_SEARCH_PACKAGE } from '../../../../shared/constants/packageStaticData';
import { showSnackBar } from '../../../redux/actions/ui';
import { getString } from '../../../theme/localization';

const packageSearch = new PackageSearchClass();
const CollapseButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 50%;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  visibility: visible;
  outline: none;
`;
const clearSub$ = new Subject();
const PackageSearch = () => {
  const theme = useTheme();
  const [packageRepository] = useState(new PackageRepository());
  const [expanded, setExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState<any>(undefined);
  const dispatch = useDispatch();
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const [currentRes, setCurrentRes] = useState<'xlUp' | 'xlDown'>('xlUp');

  const [xlUp, xlDown] = [
    useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.xl)), // Key xl is default value from material UI => use custom values
    useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xl)),
  ];

  useEffect(() => {
    if (xlUp) setCurrentRes('xlUp');
    if (xlDown) setCurrentRes('xlDown');
  }, [xlUp, xlDown]);

  const [packageSearchSchemaState, setPackageSearchSchemaState] =
    useState<any>(packageSearchSchema);

  const [numberOfAccSumary, setNumberOfAccSumary] = useState(0);

  useEffect(() => {
    switch (currentRes) {
      case 'xlDown':
        setPackageSearchSchemaState(packageSearchSchemaMobile);
        setNumberOfAccSumary(1); // Accordion Summary when collapse on Mobile
        break;
      default:
        setPackageSearchSchemaState(packageSearchSchema);
        setNumberOfAccSumary(4); // Accordion Summary when collapse on Desktop
        break;
    }
  }, [currentRes]);

  const handleSearchPackageFail = (message: string) => {
    setPackages(undefined);
    dispatch(
      showSnackBar({
        isOpen: true,
        message,
        status: 'error',
        isNotClose: true,
      })
    );
  };
  const searchPackage = (formValues: IPackageFormValue) => {
    const query = packageSearch.queryForm(formValues);
    setIsLoading(true);
    packageRepository
      .searchPackage(query)
      .pipe(takeUntil(clearSub$))
      .subscribe(
        (res) => {
          setIsLoading(false);
          if (res === LIMIT_TIME_SEARCH_PACKAGE) {
            handleSearchPackageFail(
              getString('package.limitTimeSearchPackage')
            );
          } else {
            setPackages(res);
          }
        },
        () => {
          setIsLoading(false);
          handleSearchPackageFail(getString('text.networkError'));
        }
      );
  };
  const handleClearPackages = () => {
    setPackages(undefined);
  };

  const handleDownloadPackages = () => {
    packageSearch.downloadPackages(packages);
  };

  useEffect(() => {
    return () => {
      clearSub$.next(true);
    };
  }, []);

  return (
    <div className="package-search-box">
      <Formik
        initialValues={initialPackageSearchData}
        validationSchema={packageSearchValidationSchema}
        isInitialValid={false}
        validateOnChange
        onSubmit={searchPackage}
      >
        <Form>
          <Accordion expanded={expanded}>
            <PackageSearchFilterSumary
              packageSearchSchemaState={packageSearchSchemaState}
              numberOfAccSumary={numberOfAccSumary}
            />
            <PackageSearchFilter
              packageSearchSchemaState={packageSearchSchemaState}
              numberOfAccSumary={numberOfAccSumary}
            />
            <CollapseButton type="button" onClick={toggleExpanded}>
              {expanded ? (
                <KeyboardArrowUp color="secondary" />
              ) : (
                <KeyboardArrowDown color="secondary" />
              )}
            </CollapseButton>
          </Accordion>
        </Form>
      </Formik>

      <PackageSearchResult
        packagesLength={packages?.length}
        clearPackages={handleClearPackages}
        downloadPackages={handleDownloadPackages}
      />
      {isLoading ? <Spinner /> : null}
    </div>
  );
};

export default PackageSearch;
