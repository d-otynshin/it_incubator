import { PostDBType } from '../db/post-db-type';
import { generateRandomId } from '../helpers';
import { TPostInput } from './types';
import { Collection, WithId } from 'mongodb';
import { db } from '../db/monogo-db';
import { blogsRepository } from '../blogs/blogs-repository';
import { fetchPaginated } from '../helpers/fetchPaginated';
import { QueryParams } from '../helpers/parseQuery';
import { BlogDBType } from '../db/blog-db-type';
import { CommentDbType } from '../db/comment-db-type';

type TCreateComment = {
  id: string;
  content: string;
  user: {
    id: string;
    login: string;
  }
}

const postsCollection: Collection<PostDBType> = db.collection<PostDBType>('posts');
const commentsCollection: Collection<CommentDbType> = db.collection<CommentDbType>('comments');

export const postsRepository = {
  create: async (body: TPostInput): Promise<WithId<PostDBType> | null> => {
    let blog = await blogsRepository.getById(body.blogId)

    if (!blog) {
      blog = { name: 'blog name' } as WithId<BlogDBType>
    }

    const createdPost: PostDBType = {
      id: generateRandomId().toString(),
      createdAt: new Date().toISOString(),
      blogName: blog?.name,
      ...body,
    }

    await postsCollection.insertOne(createdPost)

    return createdPost as WithId<PostDBType>;
  },
  delete: async (id: string): Promise<boolean> => {
    const result = await postsCollection.deleteOne({ id })

    return result.deletedCount === 1;
  },
  getById: async (id: string): Promise<WithId<PostDBType> | null> => {
    return postsCollection.findOne({ id })
  },
  getByBlogId: async (blogId: string): Promise<PostDBType | null> => {
    return postsCollection.findOne({ blogId })
  },
  get: async (query: QueryParams) => {
    return fetchPaginated(postsCollection, query)
  },
  getComments: async (postId: string, query: QueryParams) => {
    // const filter: { blogId: string } | {} = {
    //   blogId: '',
    //   title: {
    //     $ne: 'post title',
    //   }
    // };

    const filter: { postId: string } | {} = { postId };

    return fetchPaginated(commentsCollection, query, filter)
  },
  createComment: async ({ id, content, user }: TCreateComment): Promise<WithId<CommentDbType> | null> => {
    const post = await postsRepository.getById(id)

    // if (!post) {
    //   blog = { name: 'blog name' } as WithId<BlogDBType>
    // }

    if (!post) {
      return null
    }

    const commentatorInfo = {
      userId: user.id,
      userLogin: user.login,
    }

    const createdComment: { postId: string } & CommentDbType = {
      id: generateRandomId().toString(),
      createdAt: new Date(),
      content: content,
      postId: post.id,
      commentatorInfo
    }

    await commentsCollection.insertOne(createdComment)

    return createdComment as unknown as WithId<CommentDbType>;
  },
  update: async (id: string, body: TPostInput): Promise<boolean> => {
    const result = await postsCollection.updateOne({ id }, { $set: body })

    return result.matchedCount === 1;
  }
}
