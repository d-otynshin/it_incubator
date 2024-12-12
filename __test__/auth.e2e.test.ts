import { connect, request, closeDatabase, clearDatabase, createUser, createLogin } from './test-helpers';
import { SETTINGS } from '../src/settings'

describe('/auth', () => {
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

  it('POST => /register, should return success status: 204', async () => {
    const validRegister = {
      login: 'd-otynshin',
      email: 'daniyar.otynshin@gmail.com',
      password: 'qwerty1'
    }

    const registerResponse = await request
      .post(`${SETTINGS.PATH.AUTH}/registration`)
      .send(validRegister)

    expect(registerResponse.status).toBe(204)
  })
})
