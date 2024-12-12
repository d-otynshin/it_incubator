import { connect, request, closeDatabase, clearDatabase, createUser, createLogin } from './test-helpers';
import { SETTINGS } from '../src/settings'
import jwt from 'jsonwebtoken';
import { validUser } from './datasets';

describe('/auth', () => {
  beforeAll(async () => { await connect() })
  afterAll(async () => { await closeDatabase() })

  beforeEach(async () => { await clearDatabase() });

  it('/login => POST, should return success status, 200 and accessToken', async () => {
    await createUser()
    // await createLogin()
  });

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

  it('POST => /confirm, should return success status: 204', async () => {
    const validRegister = {
      login: 'd-otynshin',
      email: `user${Math.random()}@gmail.com`,
      password: 'qwerty1'
    }

    const registerResponse = await request
      .post(`${SETTINGS.PATH.AUTH}/registration`)
      .send(validRegister)

    expect(registerResponse.status).toBe(204)

    const testCode = jwt.sign(
      { login: validRegister.login },
      'SECRET',
      { expiresIn: '1h' }
    );

    const confirmationResponse = await request
      .post(`${SETTINGS.PATH.AUTH}/registration-confirmation`)
      .send({ code: testCode })

    console.log(confirmationResponse.body);

    expect(confirmationResponse.status).toBe(204)
  })
})
