import { Collection, Sort, Document } from 'mongodb';
import { parseQuery, type QueryParams } from './parseQuery';
import { mapId } from './mapId';

export async function fetchPaginated<TCollection extends Document>(
  collection: Collection<TCollection>,
  query: QueryParams,
  filter = {}
) {
  const { pageSize, pageNumber, sortBy, sortDirection } = parseQuery(query);

  const sortOption: Sort = { [sortBy]: sortDirection === 'asc' ? 1 : -1 };

  const totalItems = await collection.countDocuments(filter);
  const data = await collection
    .find(filter)
    .sort(sortOption)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return {
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
    data: data.map(mapId),
  };
}
