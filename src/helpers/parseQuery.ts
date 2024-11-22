export type QueryParams = {
  pageNumber?: string;
  pageSize?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  searchNameTerm?: string | null;
}

export function parseQuery(query: QueryParams) {
  const {
    pageNumber = '1', // Default pageNumber
    pageSize = '10', // Default pageSize
    sortBy = 'createdBy', // Default sortBy field
    sortDirection = 'desc', // Default sort direction
  } = query;

  return {
    pageNumber: parseInt(pageNumber, 10),
    pageSize: parseInt(pageSize, 10),
    sortBy,
    sortDirection: sortDirection.toLowerCase() === 'asc' ? 'asc' : 'desc',
  };
}
