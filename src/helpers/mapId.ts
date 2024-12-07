import { ObjectId, WithId } from 'mongodb';

export const mapId = <T>(document: WithId<T>) => {
  delete (document as { _id?: ObjectId })._id;

  return document;
}
