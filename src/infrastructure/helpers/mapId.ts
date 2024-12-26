import { WithId } from 'mongodb';

export const mapId = <T>(document: WithId<T>): T => {
  const { _id, ...rest } = document;
  return rest as T;
}
