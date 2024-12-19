import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { authRouter } from './domain/auth';
import { usersRouter } from './domain/users';
import { postsRouters } from './domain/posts';
import { blogsRouters } from './domain/blogs';
import { testingRouter } from './domain/testing';
import { commentsRouter } from './domain/comments';
import { securityRouter } from './domain/security';

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
