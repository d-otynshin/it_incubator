import { connect, request, closeDatabase, clearDatabase, createUser, createLogin } from './test-helpers';
import { SETTINGS } from '../src/settings'
import { EXPIRATION_TIME } from '../src/domain/auth/auth-service';
import { jwtService } from '../src/adapters/jwt-service';
import jwt from 'jsonwebtoken';
import { codedAuth, validUser } from './datasets';

describe('/auth', () => {
  beforeAll(async () => { await connect() })
  afterAll(async () => { await closeDatabase() })

  beforeEach(async () => { await clearDatabase() });

  it('/login => POST, should return success status, 200, accessToken and refresh cookie', async () => {
    await createUser()
    const loginResponse = await createLogin({ loginOrEmail: 'user', password: '123456' })

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

  it('POST => /password-recovery, should return success status: 204', async () => {
    const createdUserResponse = await request
    .set({ 'Authorization': 'Basic ' + codedAuth })
    .post(SETTINGS.PATH.USERS)
    .send({
      login: 'd-otynshin',
      email: 'daniyar.otynshin@gmail.com',
      password: 'qwerty1'
    });

    expect(createdUserResponse.status).toBe(201);

    const recoveryResponse = await request
    .post(`${SETTINGS.PATH.AUTH}/password-recovery`)
    .send({ email: 'daniyar.otynshin@gmail.com' })

    expect(recoveryResponse.status).toBe(204)
  })

  it('should return error, if accessToken is expired', async () => {
    await createUser()
    const loginResponse = await createLogin({ loginOrEmail: 'user', password: '123456' })

    expect(loginResponse.status).toBe(200)

    const { body: { accessToken } } = loginResponse;

    const isExpired = await jwtService.isExpired(accessToken, 'SECRET')
    expect(isExpired).toBe(false)
  });

  it('should return error, if refreshToken is expired', async () => {
    await createUser()
    const loginResponse = await createLogin({ loginOrEmail: 'user', password: '123456' })

    expect(loginResponse.status).toBe(200)
    const { headers } = loginResponse;

    const refreshToken = headers['set-cookie'][0].split('=')[1].split(';')[0];

    const isExpired = await jwtService.isExpired(refreshToken, 'REFRESH');
    expect(isExpired).toBe(false)
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

    expect(confirmationResponse.status).toBe(204)
  })

  it('should return error on delete session', async () => {
    await createUser()
    const loginResponse = await createLogin({ loginOrEmail: 'user', password: '123456' })

    expect(loginResponse.status).toBe(200)

    const deleteResponse = await request
      .delete(`${SETTINGS.PATH.SECURITY}/devices/${123}`)

    expect(deleteResponse.status).toBe(404)
  });

  it('should return error on delete all sessions', async () => {
    await createUser()
    const loginResponse = await createLogin({ loginOrEmail: 'user', password: '123456' })

    expect(loginResponse.status).toBe(200)

    const { headers } = loginResponse;

    const refreshToken = headers['set-cookie'][0].split('=')[1].split(';')[0];

    const deleteResponse = await request
      .set('Cookie', `refreshToken=${refreshToken}`)
      .delete(`${SETTINGS.PATH.SECURITY}/devices`)

    expect(deleteResponse.status).toBe(204)
  });

  it('should return success on get all sessions', async () => {
    await createUser()
    const loginResponse = await createLogin({ loginOrEmail: 'user', password: '123456' })

    expect(loginResponse.status).toBe(200)

    const { headers } = loginResponse;
    const refreshToken = headers['set-cookie'][0].split('=')[1].split(';')[0];

    const getAllActiveSessionsResponse = await request
    .set('Cookie', `refreshToken=${refreshToken}`)
    .get(`${SETTINGS.PATH.SECURITY}/devices`)

    expect(getAllActiveSessionsResponse.status).toBe(200)
  })

  it('should show rate limiter', async () => {
    await createUser()

    await createLogin({ loginOrEmail: 'user', password: '123456' })
    await createLogin({ loginOrEmail: 'user', password: '123456' })
  });
})
