import { connect, request, closeDatabase, clearDatabase } from './test-helpers';
import { SETTINGS } from '../src/settings'
import { codedAuth } from './datasets';

describe('/users', () => {
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
    .get(SETTINGS.PATH.USERS)

    expect(response.status).toBe(200)
  })

  it('should return 200 for getting valid user data', async () => {
    const validUser = {
      email: 'user@mail.com',
      login: 'user',
      password: '123',
    };

    await request
      .post(SETTINGS.PATH.USERS)
      .send(validUser);

    const users = await request.get(SETTINGS.PATH.USERS);

    console.log('users', users.body);

    expect(users.status).toBe(200);
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

  it('should return success status with pagination', async () => {
    const response = await request
    .get(`${SETTINGS.PATH.USERS}?pageSize=5&pageNumber=1&searchNameTerm=Tim&sortDirection=asc&sortBy=name`)

    expect(response.status).toBe(200)
  })
})
