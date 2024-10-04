import { Request, Response } from 'express';
import { getPostByIdRepository } from '../repositories/getPostByIdRepository';

interface FindByIdRequest extends Request {
  params: { id: string };
}

export const getPostByIdController = (req: FindByIdRequest, res: Response) => {
  const { id } = req.params;

  const blog = getPostByIdRepository(id)

  if (blog) {
    return res.status(200).json(blog);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
}
