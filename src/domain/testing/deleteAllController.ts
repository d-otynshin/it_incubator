import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const deleteAllController = async (
  _: Request,
  response: Response
) => {
  try {
    const models = mongoose.models;

    for (const modelName in models) {
      if (Object.prototype.hasOwnProperty.call(models, modelName)) {
        const model = models[modelName];
        await model.deleteMany({});
      }
    }

    return response.status(204).send({});
  } catch (error) {
    console.error('Error deleting collections:', error);
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
