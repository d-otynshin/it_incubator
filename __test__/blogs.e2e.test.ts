import { request } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { setDB } from '../src/db/db';

describe('/blogs', () => {
  beforeAll(() => setDB())

  it('should delete all data', async () => {
    const response = await request
      .delete(`${SETTINGS.PATH.TESTING}/all-data`)

    expect(response.status).toBe(204)
  })

  it('should return 201 for valid blog data', async () => {
    const validBlog = {
      name: 'Sample',
      description: 'Sample Description',
      websiteUrl: 'sample-website.com',
    };

    const response = await request
      .post(SETTINGS.PATH.BLOGS)
      .send(validBlog);

    expect(response.status).toBe(201);
  });

  it('should return 400 with invalid name', async () => {
    const invalidVideo = {
      name: "length_21-weqweqweqwq",
      description: 'Sample Description',
      websiteUrl: 'sample-website.com',
    }

    const response = await request
      .post(SETTINGS.PATH.VIDEOS)
      .send(invalidVideo);

    expect(response.status).toBe(400);
  });
})
