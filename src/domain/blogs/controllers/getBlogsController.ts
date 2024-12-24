import { Request, Response } from 'express'
import { blogsRepository } from '../blogs-repository';
import mongoose from 'mongoose';

export const getBlogsController = async (
  req: Request,
  res: Response
) => {
  const { query } = req;
  const blogs = await blogsRepository.get(query);

  const MONGO_DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

  try {
    await mongoose.connect(MONGO_DB_URI);
    res.status(200).json(blogs)
  } catch (err) {
    res.status(500).json(err)
  }

  // res.status(200).json(blogs)
}
