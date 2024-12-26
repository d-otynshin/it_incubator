import { Sort } from 'mongodb';
import { parseQuery, type QueryParams } from './parseQuery';
import { mapId } from './mapId';
import { Model } from 'mongoose';

export async function fetchModelPaginated<TSchema>(
  model: Model<TSchema>,
  query: QueryParams,
  filter = {}
) {
  const { pageSize, pageNumber, sortBy, sortDirection } = parseQuery(query);
  const sortOption: Sort = { [sortBy]: sortDirection === 'asc' ? 1 : -1 };

  let totalCount = await model.countDocuments(filter);

  const data = await model
    .find(filter)
    .sort(sortOption)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .lean()

  return {
    pagesCount: Math.ceil(totalCount / pageSize),
    page: pageNumber,
    pageSize,
    totalCount,
    // @ts-ignore
    items: data.map(mapId),
  };
}
