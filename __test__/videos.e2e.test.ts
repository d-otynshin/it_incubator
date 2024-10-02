import { request } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { setDB } from '../src/db/db';

describe('/videos', () => {
  beforeAll(() => setDB())

  it('should delete all data', async () => {
    const response = await request
      .delete(`${SETTINGS.PATH.TESTING}/all-data`)

    expect(response.status).toBe(204)
  })

  it('should return 201 for valid video data', async () => {
    const validVideo = {
      id: 1,
      title: 'Sample Video',
      author: 'John Doe',
      canBeDownloaded: true,
      minAgeRestriction: 15,
      createdAt: '2023-10-01T12:00:00.000Z',
      publicationDate: '2023-10-02T12:00:00.000Z',
      availableResolutions: ['P720', 'P1080']
    };

    const response = await request
      .post(SETTINGS.PATH.VIDEOS)
      .send(validVideo);

    expect(response.status).toBe(201);
  });

  it('should return 201 for valid video with only some fields', async () => {
    const validVideo = {
      title: 'Sample Video',
      author: 'John Doe',
      availableResolutions: ['P720']
    };

    const response = await request
      .post(SETTINGS.PATH.VIDEOS)
      .send(validVideo);

    expect(response.status).toBe(201);
  });
})
