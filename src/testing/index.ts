import { Router } from 'express';
import { deleteAllController } from './deleteAllController';

export const testingRouter = Router()

testingRouter.delete('/all-data', deleteAllController)
