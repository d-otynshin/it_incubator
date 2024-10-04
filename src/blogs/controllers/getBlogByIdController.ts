import { Request, Response } from 'express';
import { getBlogByIdRepository } from '../repositories/getBlogByIdRepository';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const getBlogByIdController = (req: FindByIdRequest, res: Response) => {
  const { id } = req.params;

  const blog = getBlogByIdRepository(id)

  if (blog) {
    return res.status(200).json(blog);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
}
