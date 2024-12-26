import { commentsRepository, ICommentsRepository } from './comments.repository';
import { TCommentDto, TCommentInteractionDto, TInteraction } from './comments.types';

export class CommentsService {
  constructor(private readonly commentsRepository: ICommentsRepository) {}

  async update(dto: TCommentDto): Promise<boolean> {
    return this.commentsRepository.update(dto);
  }

  async delete(id: string): Promise<boolean> {
    return this.commentsRepository.delete(id);
  }

  async interact(
    {
      commentId,
      userId,
      action
    }: TCommentInteractionDto): Promise<boolean> {
    const interactions: TInteraction[] | null = await commentsRepository.getInteractions(commentId);
    if (!interactions) return false;

    const interaction: TInteraction | undefined = interactions.find((interaction: TInteraction): boolean => interaction.id === userId);
    if (!interaction) {
      return this.commentsRepository.createInteraction({
        commentId,
        userId,
        action
      });
    }

    if (interaction.action === action) {
      // return this.commentsRepository.removeInteraction({ commentId, userId });
      return true;
    }

    return this.commentsRepository.updateInteraction({
      commentId,
      userId,
      action
    });
  }
}

export const commentsService = new CommentsService(commentsRepository)
