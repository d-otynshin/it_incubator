export type QueryParams = {
  pageNumber?: string;
  pageSize?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  searchNameTerm?: string | null;
  searchLoginTerm?: string | null;
  searchEmailTerm?: string | null;

}

export function parseQuery(query: QueryParams) {
  const {
    pageNumber,
    pageSize,
    sortBy = 'createdAt',
    sortDirection = 'desc',
  } = query;

  return {
    pageNumber: pageNumber ? parseInt(pageNumber, 10) : 1,
    pageSize: pageSize? parseInt(pageSize, 10) : 10,
    sortBy: sortBy ? sortBy : 'createdBy',
    sortDirection: sortDirection.toLowerCase() === 'asc' ? 'asc' : 'desc',
  };
}
