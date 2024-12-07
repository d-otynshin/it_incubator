import { Request, Response } from 'express';
import { usersService } from '../users-service';

export const deleteUsersController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const isDeleted = await usersService.delete(id);

  return isDeleted
    ? res.status(204).send()
    : res.status(404).send({ error: 'Post not found' })
}
