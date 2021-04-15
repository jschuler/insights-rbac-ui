export const defaultSettings = {
  limit: 20,
  offset: 0,
  itemCount: 0,
};

export const defaultCompactSettings = {
  limit: 10,
  offset: 0,
  itemCount: 0,
};

export const getCurrentPage = (limit = 1, offset = 0) => Math.floor(offset / limit) + 1;

export const getNewPage = (page = 1, offset) => (page - 1) * offset;

export const syncDefaultPaginationWithUrl = (history, defaultPagination, initialLoad) => {
  const searchParams = new URLSearchParams(history.location.search);

  isNaN(parseInt(searchParams.get('per_page'))) && searchParams.set('per_page', defaultPagination.limit);
  const limit = parseInt(searchParams.get('per_page'));
  isNaN(parseInt(searchParams.get('page'))) && searchParams.set('page', initialLoad ? 1 : defaultPagination.offset / limit + 1);
  const offset = (parseInt(searchParams.get('page')) - 1) * limit;

  history.replace({
    pathname: history.location.pathname,
    search: searchParams.toString(),
  });
  return { limit, offset };
};

export const applyPaginationToUrl = (history, limit, offset = 0) => {
  const searchParams = new URLSearchParams(history.location.search);
  searchParams.set('per_page', limit);
  searchParams.set('page', offset / limit + 1);

  history.replace({
    pathname: history.location.pathname,
    search: searchParams.toString(),
  });
};
