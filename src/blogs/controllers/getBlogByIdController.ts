import { Request, Response } from 'express';
import { blogsRepository } from '../blogsRepository';
import { mapId } from '../../helpers/mapId';
import { BlogDBType } from '../../db/blog-db-type';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const getBlogByIdController = async (req: FindByIdRequest, res: Response) => {
  const { id } = req.params;

  const blog = await blogsRepository.getById(id)

  return blog
    ? res.status(200).json(mapId<BlogDBType>(blog))
    : res.status(404).json({ message: "Blog not found" })
}
