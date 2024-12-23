import { commentsRepository, ICommentsRepository } from './comments.repository';
import { TCommentDto } from './comments.entity';

export class CommentsService {
  constructor(private readonly commentsRepository: ICommentsRepository) {}

  async update(data: TCommentDto): Promise<boolean> {
    return this.commentsRepository.update(data);
  }

  async delete(id: string): Promise<boolean> {
    return this.commentsRepository.delete(id);
  }
}

export const commentsService = new CommentsService(commentsRepository)
