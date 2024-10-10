import express from 'express'
import cors from 'cors'
import { SETTINGS } from './settings';
import { videosRouter } from './videos';
import { testingRouter } from './testing';
import { blogsRouters } from './blogs';
import { authMiddleware } from './middlewares/auth';

export const app = express()

app.use(express.json())
app.use(cors())
app.use(authMiddleware)

app.get('/', (_, res) => {
  res.status(200).json({ version: '1.0' })
})
app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)
app.use(SETTINGS.PATH.BLOGS, blogsRouters)
app.use(SETTINGS.PATH.POSTS, blogsRouters)
