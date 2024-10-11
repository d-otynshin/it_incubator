import { VideoDBType } from './video-db-type';
import { PostDBType } from './post-db-type';
import { BlogDBType } from './blog-db-type';

export type DBType = {
  videos: VideoDBType[]
  blogs: BlogDBType[]
  posts: PostDBType[]
}

export const db: DBType = {
  videos: [],
  blogs: [],
  posts: [],
}

export type ReadonlyDBType = {
  blogs: Readonly<BlogDBType[]>
  posts: Readonly<PostDBType[]>
}

export const setDB = (dataset?: Partial<ReadonlyDBType>) => {
  if (!dataset) {
    db.blogs = []
    db.posts = []

    return
  }

  db.blogs = dataset.blogs?.map(b => ({...b})) || db.blogs
  db.posts = dataset.posts?.map(p => ({...p})) || db.posts
}
