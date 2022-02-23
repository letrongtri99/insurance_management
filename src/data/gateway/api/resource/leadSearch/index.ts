type FilterValueDateType = {
  criteria: string;
  range: {
    startDate: Date;
    endDate: Date;
  };
};

export type FilterMapType = {
  filter: string;
  type: string;
  field?: string;
  options?: any[];
  callback?: any;
};

export const getFilterData = (filters: any, path: string): any => {
  const pathParts = path.split('.');
  let value = filters;
  for (let i = 0; i < pathParts.length; i += 1) {
    if (typeof value[pathParts[i]] === 'undefined') {
      return null;
    }
    value = value[pathParts[i]];
  }
  return value;
};

const getFilters = (body: any, map: Array<FilterMapType>) => {
  const filters: string[] = [];

  map.forEach((filter: any) => {
    let filterValue: any | FilterValueDateType;
    if (filter.type === 'choiceDate') {
      filterValue = body[filter.filter];
    } else {
      filterValue = getFilterData(body, filter.filter);
    }

    filterValue =
      filterValue && typeof filterValue === 'string'
        ? filterValue.trim()
        : filterValue;

    switch (filter.type) {
      case 'contain':
        if (filterValue) {
          const value = filter.escape
            ? encodeURIComponent(filterValue)
            : filterValue;
          filters.push(`${filter.field}:"${value}"`);
        }
        break;
      case 'match':
        if (filterValue) {
          const value = filter.escape
            ? encodeURIComponent(filterValue)
            : filterValue;
          filters.push(`${filter.field}="${value}"`);
        }
        break;
      case 'choiceDate':
        filter.options.forEach((option: any) => {
          if (option.filter === filterValue?.criteria) {
            if (filterValue.range.startDate) {
              filters.push(
                `${
                  option.field
                }>="${filterValue.range.startDate.toISOString()}"`
              );
            }
            if (filterValue.range.endDate) {
              filters.push(
                `${option.field}<="${filterValue.range.endDate.toISOString()}"`
              );
            }
          }
        });
        break;
      case 'multi':
        if (filterValue && filterValue.length) {
          const items = filterValue.map((item: any) => {
            return filter.callback ? filter.callback(item) : item;
          });

          filters.push(`${filter.field} in ("${items.join('","')}")`);
        }
        break;
      case 'range':
        if (body[filter.filter]) {
          if (filterValue[1] !== 0) {
            filters.push(`${filter.field}>=${filterValue[0]}`);
            filters.push(`${filter.field}<=${filterValue[1]}`);
          }
        }
        break;
      default:
    }
  });

  return filters;
};

export const buildFilter = (
  filterValues: any,
  map: FilterMapType[],
  decorators: any[] = []
) => {
  let filters = getFilters(filterValues, map);
  decorators.forEach((decorator) => {
    filters = decorator(filters);
  });

  return filters;
};

export const getQueryParts = (
  product: string,
  filters: string[] = [],
  pageSize: number,
  page: number,
  orderBy: string
) => {
  if (window.location.href.indexOf('leads/rejection') !== -1) {
    filters.push(
      encodeURIComponent('rejections.decideTime="0001-01-01T00:00:00Z"')
    );
  }

  if (window.location.href.indexOf('lead/my-leads') !== -1) {
    filters.push(encodeURIComponent('lead.isRejected!=true'));
  }

  const pageFrom = (page - 1) * pageSize;
  const queryParts = [`product=${product}`, `page_size=${pageSize}`];

  if (page > 1) {
    queryParts.push(`page_from=${pageFrom}`);
  }

  if (filters.length > 0) {
    queryParts.push(`filter=${filters.join(' ')}`);
  }

  if (orderBy) {
    queryParts.push(orderBy);
  }

  return queryParts;
};
