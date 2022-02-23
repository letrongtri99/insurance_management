import React, { useMemo, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import margin from 'polished/lib/shorthands/margin';
import './index.scss';
import { getString } from 'presentation/theme/localization';
import {
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
} from 'presentation/components/icons';
import { SelectElement } from 'shared/types/controls';
import Controls from '../Control';

interface IPaginationProps {
  page: number;
  nextToken: any | null;
  perPage: number;
  pageSizes: number[];
  onChangePage: (
    page: number,
    nextToken: string | null,
    isPrev?: boolean
  ) => void;
  onChangePerPage: (itemsPerPage: number) => void;
  isLoading: boolean;
  totalItem?: number;
}

interface IPageState {
  savedPage: number;
  savedToken: string | null;
}

const CustomPagination: React.FC<IPaginationProps> = ({
  page,
  nextToken,
  perPage,
  pageSizes,
  onChangePage,
  onChangePerPage,
  isLoading,
  totalItem,
}) => {
  const [pagesStates, setPagesState] = useState<IPageState[]>([
    { savedPage: 1, savedToken: '' },
  ]);

  const handleChangePage = (pg: number, isPrev = false) => {
    const targetPage = pagesStates.find(
      (pageState: IPageState) => pageState.savedPage === pg
    );

    if (targetPage) {
      onChangePage(targetPage.savedPage, targetPage.savedToken, isPrev);
    } else {
      onChangePage(pg, nextToken, isPrev);
    }
  };
  const pageSizeOptions = () =>
    pageSizes.map((size, index) => ({ id: index, title: size }));

  const goToFirst = () => {
    onChangePage(1, '');
  };

  const prevPage = () => {
    handleChangePage(page - 1, true);
  };

  const nextPage = () => {
    handleChangePage(page + 1);
  };

  const changePerPage = (event: React.ChangeEvent<SelectElement>) => {
    onChangePerPage(event.target.value as number);
  };
  const disabledByTotal = () => {
    if (totalItem) {
      return Math.ceil(totalItem / perPage) === page;
    }
    return false;
  };
  useMemo(() => {
    setPagesState([
      ...pagesStates,
      {
        savedPage: page + 1,
        savedToken: nextToken,
      },
    ]);
    // eslint-disable-next-line
  }, [page]);
  return (
    <div className="pagination-wrapper">
      <ButtonGroup>
        {page > 2 && (
          <Controls.Button
            text={getString('text.first')}
            onClick={goToFirst}
            className={`pagination-button ${isLoading ? 'remove-event' : ''}`}
            size="medium"
            style={margin(0)}
          />
        )}
        {page > 1 && (
          <Controls.Button
            onClick={prevPage}
            className={`pagination-button pagination-arrow-button ${
              isLoading ? 'remove-event' : ''
            }`}
            size="medium"
            style={margin(0)}
          >
            <AngleDoubleLeftIcon fontSize="inherit" />
          </Controls.Button>
        )}
        <Controls.Button
          text={page}
          className="pagination-button"
          size="medium"
          style={margin(0)}
        />
        <Controls.Button
          onClick={nextPage}
          className={`pagination-button pagination-arrow-button ${
            isLoading ? 'remove-event' : ''
          }`}
          size="medium"
          disabled={!nextToken || isLoading || disabledByTotal()}
          style={margin(0)}
        >
          <AngleDoubleRightIcon fontSize="inherit" />
        </Controls.Button>
      </ButtonGroup>

      <FormControl variant="standard" className="pagination-select-wrapper">
        <span className="pagination-label">{getString('text.show')}</span>
        <Controls.Select
          name="pageSizeSelect"
          value={perPage}
          selectField="title"
          onChange={changePerPage}
          options={pageSizeOptions()}
          className="pagination-select"
        />
        <span className="pagination-label">{getString('text.entries')}</span>
      </FormControl>
    </div>
  );
};

export default CustomPagination;

/* In component

interface IPageToken {
  currentPage: number;
  nextToken: string | null;
}

const [currentPageTokenState, setCurrentPageTokenState] = useState<
    IPageToken
  >();

  const [perPageState, setPerPateState] = useState<number>(10);

  const handlePageChange = (page: number, token: string | null) => {
    // Make API call below here to get the new page's data, using page and token received, then set state to update pagination

    setCurrentPageTokenState({
      currentPage: page,
      nextToken: 'Token received from response',
    });
  };

  const handlePerPageChange = (itemsPerPage: number) => {
    // Make API call to re-set items per page, then set state to re-render pagination

    setPerPateState(itemsPerPage);
  };

  useEffect(() => {
    //  API call to get data for the first time, then set current page and next token for pagination component

    setCurrentPageTokenState({
      ...currentPageTokenState,
      currentPage: 1,
      nextToken: 'Token for page 2',
    });
  }, []);

*/
