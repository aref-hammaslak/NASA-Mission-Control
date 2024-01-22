
const DEFAULT_LIMIT_VALUE = 0;
const DEFAULT_PAGE_NUMBER = 1;

type Query= {
  limit: number | undefined;
  page: number | undefined;
}

function getPagination(query:Query ) {
  const limit = Math.abs(query.limit || DEFAULT_LIMIT_VALUE);
  const page = Math.abs(query.page || DEFAULT_PAGE_NUMBER);
  const skip = (page - 1) * limit;
  return {
    limit,
    skip,
  }
}

export {
  getPagination,
  Query
}