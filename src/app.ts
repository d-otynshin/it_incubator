import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { authRouter } from './auth';
import { usersRouter } from './users';
import { postsRouters } from './posts';
import { blogsRouters } from './blogs';
import { testingRouter } from './testing';
import { commentsRouter } from './comments';
import { securityRouter } from './security';

import { SETTINGS } from './settings';
import { router } from './helpers/router';

export const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get(SETTINGS.PATH.INDEX, router)
app.use(SETTINGS.PATH.TESTING, testingRouter)
app.use(SETTINGS.PATH.BLOGS, blogsRouters)
app.use(SETTINGS.PATH.POSTS, postsRouters)
app.use(SETTINGS.PATH.USERS, usersRouter)
app.use(SETTINGS.PATH.AUTH, authRouter)
app.use(SETTINGS.PATH.COMMENTS, commentsRouter)
app.use(SETTINGS.PATH.SECURITY, securityRouter)
