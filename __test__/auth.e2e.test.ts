import { connect, request, closeDatabase, clearDatabase, createUser, createLogin } from './test-helpers';
import { SETTINGS } from '../src/settings'
import jwt from 'jsonwebtoken';
import { validUser } from './datasets';
import { EXPIRATION_TIME } from '../src/auth/auth-service';
import { jwtService } from '../src/adapters/jwt-service';
import { isBefore } from 'date-fns';

describe('/auth', () => {
  beforeAll(async () => { await connect() })
  afterAll(async () => { await closeDatabase() })

  beforeEach(async () => { await clearDatabase() });

  it('/login => POST, should return success status, 200, accessToken and refresh cookie', async () => {
    await createUser()
    const loginResponse = await createLogin({ loginOrEmail: 'user', password: '123456' })

    console.log(loginResponse.headers);

    expect(loginResponse.status).toBe(200)
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

  it('should return error, if accessToken is expired', async () => {
    await createUser()
    const loginResponse = await createLogin({ loginOrEmail: 'user', password: '123456' })

    expect(loginResponse.status).toBe(200)

    const { body: { accessToken } } = loginResponse;

    const verifiedToken = await jwtService.verifyToken(accessToken)

    if (verifiedToken) {
      const { exp } = verifiedToken;

      expect(isBefore(exp, Date.now())).toBe(true)
    }

  });

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
      { expiresIn: EXPIRATION_TIME.ACCESS }
    );

    const confirmationResponse = await request
      .post(`${SETTINGS.PATH.AUTH}/registration-confirmation`)
      .send({ code: testCode })

    console.log(confirmationResponse.body);

    expect(confirmationResponse.status).toBe(204)
  })
})
