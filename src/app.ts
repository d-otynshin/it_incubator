import express from 'express'
import cors from 'cors'
import { SETTINGS } from './settings';
import { testingRouter } from './testing';
import { blogsRouters } from './blogs';
import { postsRouters } from './posts';
import { router } from './helpers/router';

export const app = express()

app.use(express.json())
app.use(cors())

app.get(SETTINGS.PATH.INDEX, router)
app.use(SETTINGS.PATH.TESTING, testingRouter)
app.use(SETTINGS.PATH.BLOGS, blogsRouters)
app.use(SETTINGS.PATH.POSTS, postsRouters)
