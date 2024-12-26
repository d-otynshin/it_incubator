import {
  clearDatabase,
  closeDatabase,
  connect,
  createBlog,
  createLogin,
  createPost,
  createUser,
  request
} from './test-helpers';
import { SETTINGS } from '../src/settings'
import { codedAuth, invalidPost, validPost } from './datasets';

describe('/posts', () => {
  beforeAll(async () => { await connect() })
  afterAll(async () => { await closeDatabase() })

  beforeEach(async () => { await clearDatabase() });

  it('should return 201 for valid post data', async () => {
    const createBlogResponse = await createBlog()
    const blogId = createBlogResponse.body.id;

    await createPost(blogId)
  });

  it('should return status 200, content: post by id', async () => {
    const createBlogResponse = await createBlog()
    const blogId = createBlogResponse.body.id;

    const createPostResponse = await createPost(blogId)
    const postId = createPostResponse.body.id;

    const getPostResponse = await request
      .get(`${SETTINGS.PATH.POSTS}/${postId}`)

    expect(getPostResponse.status).toBe(200);
  });

  it('should update post by id', async () => {
    const createBlogResponse = await createBlog()
    const blogId = createBlogResponse.body.id;

    const createPostResponse = await createPost(blogId)
    const postId = createPostResponse.body.id;

    const getPostResponse = await request
      .get(`${SETTINGS.PATH.POSTS}/${postId}`)

    expect(getPostResponse.status).toBe(200);

    const updatePostResponse = await request
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .put(`${SETTINGS.PATH.POSTS}/${postId}`)
      .send(validPost)

    expect(updatePostResponse.status).toBe(204);
  });

  it('should return status 404 with invalid blogId', async () => {
    const createBlogResponse = await createBlog()
    const blogId = createBlogResponse.body.id;

    const createPostResponse = await createPost(blogId)
    const postId = createPostResponse.body.id;

    const putPostResponse = await request
      .put(`${SETTINGS.PATH.POSTS}/${postId}`)
      .send({ ...validPost, blogId: '12345' })

    // TODO: recheck!
    expect(putPostResponse.status).toBe(400);
  });

  it('should return error if passed body is incorrect; status 400; ', async () => {
    const createBlogResponse = await createBlog()
    const blogId = createBlogResponse.body.id;

    const createPostResponse = await createPost(blogId)
    const postId = createPostResponse.body.id;

    const putPostResponse = await request
      .put(`${SETTINGS.PATH.POSTS}/${postId}`)
      .send({ ...invalidPost, blogId })

    expect(putPostResponse.status).toBe(400);
  });

  it('should return error if passed body is incorrect and blogId is invalid; ', async () => {
    await createBlog()
    await createPost('12345', 400)
  });

  it('should return error 400 if :id from uri param not found, and post is invalid', async () => {
    const putPostResponse = await request
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .put(`${SETTINGS.PATH.POSTS}/12345`)
      .send(invalidPost)

    expect(putPostResponse.status).toBe(404);
  });

  it('should return error 404 if :id from uri param not found', async () => {
    const putPostResponse = await request
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .put(`${SETTINGS.PATH.POSTS}/12345`)
      .send(validPost)

    expect(putPostResponse.status).toBe(404);
  });

  it('should return error if passed body is incorrect', async () => {
    const createBlogResponse = await createBlog()
    const blogId = createBlogResponse.body.id;

    const createPostResponse = await createPost(blogId)
    const postId = createPostResponse.body.id;

    const invalidPost = {
      title: 'valid',
      content: 'valid',
      blogId: 12345,
      shortDescription: 'length_101-DnZlTI1cwedwedweqdekhUHpqOqCzftIYiSHCV8fKjYFQOoCIwmUczzW9V5K8cqY3aPKo3XKwbfrmeWOJyQgGnlX5sP3aW3RlaRS'
    }

    const updatePostResponse = await request
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .put(`${SETTINGS.PATH.POSTS}/${postId}`)
      .send(invalidPost)

    expect(updatePostResponse.status).toBe(400);

    expect(updatePostResponse.body.errorsMessages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'shortDescription',
          message: expect.any(String),
        }),
        expect.objectContaining({
          field: 'blogId',
          message: expect.any(String),
        }),
      ])
    );
  });

  it('should return success status on comment creation', async () => {
    const createBlogResponse = await createBlog()

    const blogId = createBlogResponse.body.id;

    const createPostResponse = await createPost(blogId)
    const postId = createPostResponse.body.id;

    const createdUserResponse = await createUser()

    expect(createdUserResponse.status).toBe(201);

    const validLogin = {
      loginOrEmail: 'user@mail.com',
      password: '123456',
    }

    const loginResponse = await createLogin(validLogin)

    const accessToken = loginResponse.body.accessToken;

    const validComment = {
      content: 'test comment_12345678910',
    }

    const createCommentResponse = await request
      .set({ 'Authorization': `Bearer ${accessToken}` })
      .post(`${SETTINGS.PATH.POSTS}/${postId}/comments`)
      .send(validComment)

    console.log(createCommentResponse.body);

    expect(createCommentResponse.status).toBe(201);

    const commentResponse = await request.get(`${SETTINGS.PATH.POSTS}/${postId}/comments`)

    expect(commentResponse.status).toBe(200);
  })
})
