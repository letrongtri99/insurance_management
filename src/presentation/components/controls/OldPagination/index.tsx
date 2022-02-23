import React, { useEffect, useMemo, useState } from 'react';
import { Pagination as MuiPagination } from '@material-ui/lab';
import './index.scss';
import FormControl from '@material-ui/core/FormControl';
import { SelectElement } from 'shared/types/controls';
import { getString } from '../../../theme/localization';
import Controls from '../Control';

interface IProps {
  name?: string;
  page: number;
  changePage: (page: number) => void;
  pageSize: number;
  totalItem: number;
  options: number[];
  changePerPage: (event: React.ChangeEvent<SelectElement>) => void;
  addClass?: string;
}
const Pagination: React.FC<IProps> = ({
  page,
  changePage,
  pageSize,
  totalItem,
  options,
  changePerPage,
  addClass = '',
}) => {
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const total = Math.ceil(totalItem / pageSize);
    setTotalPage((prev) => (totalItem ? total : prev));
  }, [totalItem, pageSize]);

  const pageSizeOptions = useMemo(() => {
    return options.map((size, index) => ({ id: index, title: size }));
  }, [options]);

  return (
    <div className={`old-pagination ${addClass}`}>
      <MuiPagination
        count={totalPage}
        variant="outlined"
        color="secondary"
        page={page}
        onChange={(event, pageValue: number) => changePage(pageValue)}
      />
      <FormControl variant="standard" className="pagination-select-wrapper">
        <span className="pagination-label">{getString('text.show')}</span>
        <Controls.Select
          name="pageSizeSelect"
          value={pageSize}
          selectField="title"
          onChange={changePerPage}
          options={pageSizeOptions}
          className="pagination-select pagination-padding"
        />
        <span className="pagination-label" style={{ whiteSpace: 'nowrap' }}>
          {`of ${totalItem}`}
        </span>
        <span className="pagination-label">{getString('text.entries')}</span>
      </FormControl>
    </div>
  );
};

export default Pagination;
