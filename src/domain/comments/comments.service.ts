import { TCommentInput } from './type';
import { commentsRepository, ICommentsRepository } from './comments.repository';

export class CommentsService {
  constructor(private readonly commentsRepository: ICommentsRepository) {}

  async update(data: TCommentInput): Promise<boolean> {
    return this.commentsRepository.update(data);
  }

  async delete(id: string): Promise<boolean> {
    return this.commentsRepository.delete(id);
  }
}

export const commentsService = new CommentsService(commentsRepository)
