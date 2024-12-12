import { config } from 'dotenv'
config()

export const SETTINGS = {
  PORT: process.env.PORT || 3003,
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD as string,
  PATH: {
    INDEX: '/',
    AUTH: '/auth',
    VIDEOS: '/videos',
    TESTING: '/testing',
    BLOGS: '/blogs',
    POSTS: '/posts',
    USERS: '/users',
    COMMENTS: '/comments'
  },
}
