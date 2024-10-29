import { ObjectId, WithId } from 'mongodb';

export const mapId = <T>(document: WithId<T>) => {
  if (!document) return null;

  delete (document as { _id?: ObjectId })._id;

  return document;
}
