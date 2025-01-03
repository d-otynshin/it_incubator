import { connect, request, closeDatabase, clearDatabase, createBlog, createPost } from './test-helpers';
import { SETTINGS } from '../src/settings'
import { codedAuth } from './datasets';

describe('/blogs', () => {
  beforeAll(async () => { await connect() })
  afterAll(async () => { await closeDatabase() })

  beforeEach(async () => { await clearDatabase() });

  it('should delete all data', async () => {
    const response = await request
      .delete(`${SETTINGS.PATH.TESTING}/all-data`)

    expect(response.status).toBe(204)
  })

  it('should return success status', async () => {
    const response = await request
    .get(SETTINGS.PATH.BLOGS)

    expect(response.status).toBe(200)
  })

  it('should return 200 for getting valid blog data', async () => {
    const validBlog = {
      name: 'name_from_test',
      description: 'Sample Description',
      websiteUrl: 'valid-url.com',
    };

    const createBlogResponse = await request
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .post(SETTINGS.PATH.BLOGS)
      .send(validBlog);

    const blogId = createBlogResponse.body.id

    const getBlogResponse = await request.get(`${SETTINGS.PATH.BLOGS}/${blogId}`);

    expect(getBlogResponse.status).toBe(200);
  });


  it('should return 400 for valid blog data', async () => {
    const validBlog = {
      name: 'somename',
      description: 'Sample Description',
      websiteUrl: 'invalid-url',
    };

    const response = await request
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .post(SETTINGS.PATH.BLOGS)
      .send(validBlog);

    expect(response.status).toBe(400);
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

  it('PUT => should return 404 for not found blog', async () => {
    const validBlog = {
      name: 'somename',
      description: 'Sample Description',
      websiteUrl: 'sample-website.com',
    };

    const createBlogResponse = await request
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .post(SETTINGS.PATH.BLOGS)
      .send(validBlog);

    expect(createBlogResponse.status).toBe(201);

    const updateBlogBody = {
      name: 'new',
      description: 'new Description',
      websiteUrl: 'new-website.com',
    };

    const responseUpdate = await request
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .put(`${SETTINGS.PATH.BLOGS}/12345`)
      .send(updateBlogBody);

    expect(responseUpdate.status).toBe(404);
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

  it('should return 200, for posts by blogId', async () => {
    const createBlogResponse = await createBlog()
    const blogId = createBlogResponse.body.id;

    await createPost(blogId)

    const getPostsResponse = await request
    .get(`${SETTINGS.PATH.BLOGS}/${blogId}/posts`)

    expect(getPostsResponse.status).toBe(200);
  });

  it('should return 200, for posts by blogId equal to empty string', async () => {
    const createBlogResponse = await createBlog()
    await createPost('')

    const blogId = createBlogResponse.body.id;

    const getPostsResponse = await request
      .get(`${SETTINGS.PATH.BLOGS}/${blogId}/posts`)

    console.log(getPostsResponse.body);

    expect(getPostsResponse.status).toBe(200);
  });

  it('should return success status', async () => {
    const response = await request
      .get(`${SETTINGS.PATH.BLOGS}?pageSize=5&pageNumber=1&searchNameTerm=Tim&sortDirection=asc&sortBy=name`)

    expect(response.status).toBe(200)
  })
})
