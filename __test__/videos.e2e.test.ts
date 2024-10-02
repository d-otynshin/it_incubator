import { req } from './test-helpers'
// import {setDB} from '../src/db/db'
// import {dataset1} from './datasets'
import { SETTINGS } from '../src/settings'

describe('/videos', () => {
  // beforeAll(async () => { // очистка базы данных перед началом тестирования
  //     setDB()
  // })

  it('should get empty array', async () => {
    // setDB() // очистка базы данных если нужно

    const res = await req
    .get(SETTINGS.PATH.VIDEOS)
    .expect(200) // проверяем наличие эндпоинта

    console.log(res.body) // можно посмотреть ответ эндпоинта

    // expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
  })

  it('should get not empty array', async () => {
    // setDB(dataset1) // заполнение базы данных начальными данными если нужно

    const res = await req.get(SETTINGS.PATH.VIDEOS).expect(200)

    console.log(res.body)

    // expect(res.body.length).toBe(1)
    // expect(res.body[0]).toEqual(dataset1.videos[0])
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

    const response = await req
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

    const response = await req
      .post(SETTINGS.PATH.VIDEOS)
      .send(validVideo);

    expect(response.status).toBe(201);
  });
})
