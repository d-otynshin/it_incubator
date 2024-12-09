import { commentsRepository } from './comments-repository';
import { TCommentInput } from './type';

export const commentsService = {
  update: async ({ id, content }: TCommentInput) => {
    return commentsRepository.update({ id, content });
  },
  delete: async (id: string) => {
    return commentsRepository.delete(id);
  }
}
