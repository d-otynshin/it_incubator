import { request } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { setDB } from '../src/db/db';
import { codedAuth } from './datasets';

describe('/blogs', () => {
  beforeAll(() => setDB())
  afterAll(() => setDB())

  it('should delete all data', async () => {
    const response = await request
      .delete(`${SETTINGS.PATH.TESTING}/all-data`)

    expect(response.status).toBe(204)
  })

  it('should return 400 for valid blog data', async () => {
    const validBlog = {
      nam: 'somename',
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
})
