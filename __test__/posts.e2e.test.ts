import { request } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { setDB } from '../src/db/db';
import { codedAuth, invalidPost, validBlog, validPost } from './datasets';

const createBlog = async (expectedStatus = 201) => {
  const createBlogResponse = await request
    .set({ 'Authorization': 'Basic ' + codedAuth })
    .post(SETTINGS.PATH.BLOGS)
    .send(validBlog);

  expect(createBlogResponse.status).toBe(expectedStatus);

  return createBlogResponse;
}

const createPost = async (blogId: string, expectedStatus = 201) => {
  const createPostResponse = await request
    .set({ 'Authorization': 'Basic ' + codedAuth })
    .post(SETTINGS.PATH.POSTS)
    .send({ blogId, ...validPost });

  expect(createPostResponse.status).toBe(expectedStatus);

  return createPostResponse;
}

describe('/posts', () => {
  beforeAll(() => setDB())
  afterAll(() => setDB())

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

  it('should return status 404 with invalid blogId', async () => {
    const createBlogResponse = await createBlog()
    const blogId = createBlogResponse.body.id;

    const createPostResponse = await createPost(blogId)
    const postId = createPostResponse.body.id;

    const putPostResponse = await request
      .put(`${SETTINGS.PATH.POSTS}/${postId}`)
      .send({ ...validPost, blogId: '12345' })

    expect(putPostResponse.status).toBe(404);
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

  it('should return 400 with invalid name', async () => {
    const invalidBlog = {
      name: 'length_21-weqweqweqwq',
      description: 'Sample Description',
      websiteUrl: 'sample-website.com',
    }

    const response = await request
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .post(SETTINGS.PATH.BLOGS)
      .send(invalidBlog);

    expect(response.status).toBe(400);
  });
})
