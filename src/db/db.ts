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

export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    db.videos = []
    return
  }

  db.videos = dataset.videos || db.videos
}
