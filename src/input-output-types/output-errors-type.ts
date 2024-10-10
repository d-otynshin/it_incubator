import { BlogInputModel } from './blogs-types';
import { PostInputModel } from './posts-types';

export type Error = {
  message: string;
  field: string;
}

export type OutputErrorsType = {
  errorsMessages: Error[]
}

export type FieldNamesType = keyof BlogInputModel | keyof PostInputModel

