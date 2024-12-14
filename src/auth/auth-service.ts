import { usersRepository } from '../users/users-repository';
import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken'
import { jwtService } from '../adapters/jwt-service';
import { add } from 'date-fns/add';
import { nodemailerService } from '../adapters/nodomailer-service';
import { generateRandomId } from '../helpers';
import { emailTemplates } from '../helpers/emailTemplates';
import { authRepository } from './auth-repository';

export const EXPIRATION_TIME = {
  ACCESS: 10,
  REFRESH: 20,
}

export const authService = {
  checkCredentials: async (loginOrEmail: string, password: string) => {
    const user = await usersRepository.findOne(loginOrEmail);
    if (!user) return null;

    const passwordHash = await hash(password, user.salt)
    const isCorrect = passwordHash === user.passwordHash;

    return isCorrect ? user : null;
  },
  login: async (loginOrEmail: string, password: string) => {
    const user = await authService.checkCredentials(loginOrEmail, password);
    if (!user) return null;

    const { id } = user;

    const accessToken = await jwtService.createToken(id, 'SECRET', EXPIRATION_TIME.ACCESS);
    const refreshToken = await jwtService.createToken(id, 'REFRESH', EXPIRATION_TIME.REFRESH);

    return { accessToken, refreshToken };
  },
  registerUser: async (login: string, password: string, email: string): Promise<Boolean | null> => {
    const user = await usersRepository.findOne(email);
    if (user) return null;


    const salt = await genSalt();
    const passwordHash = await hash(password, salt)
    const token = sign({ login }, 'SECRET', { expiresIn: EXPIRATION_TIME.ACCESS });

    const createdUser: any = {
      login,
      email,
      salt,
      passwordHash,
      id: generateRandomId().toString(),
      createdAt: new Date(),
      emailConfirmation: {
        code: token,
        expirationDate: add(new Date(), {
          hours: 1,
          minutes: 30,
        }),
        isConfirmed: false
      }
    };

    await usersRepository.create(createdUser);

    try {
      await nodemailerService.sendEmail(
        createdUser.email,
        token,
        'register',
        emailTemplates.registrationEmail
      );

      return true;
    } catch (e: unknown) {
      console.error('Send email error', e);

      return null;
    }
  },
  confirmEmail: async (code: string) => {
    try {
      const decodedToken = await jwtService.decodeToken(code);
      const { login } = decodedToken;

      if (!login) return null;

      const user = await usersRepository.findOne(login);
      if (!user) return null;

      const { emailConfirmation: { isConfirmed } } = user;
      if (isConfirmed) return null

      if (code === user.emailConfirmation.code) {
        const isChanged = await usersRepository.setConfirmed(login)
        if (!isChanged) return null;

        return true;
      }

      return null;
    } catch (error) {
      return null;
    }
  },
  resendEmail: async (email: string) => {
    const user = await usersRepository.findOne(email);
    if (!user) return null;

    const { login, emailConfirmation: { isConfirmed } } = user;
    if (isConfirmed) return null

    const token = sign(
      { login },
      'SECRET',
      { expiresIn: EXPIRATION_TIME.ACCESS },
    );

    try {
      const isChanged = await usersRepository.setConfirmationCode(login, token);
      if (!isChanged) return null;

      await nodemailerService.sendEmail(
        email,
        token,
        'resend',
        emailTemplates.registrationEmail
      );

      return true;
    } catch (e: unknown) {
      console.error('Send email error', e);

      return null;
    }
  },
  refreshToken: async (token: string) => {
    try {
      const decodedToken = await jwtService.verifyToken(token, 'REFRESH');
      if (!decodedToken) return null;

      const { userId } = decodedToken;
      if (!userId) return null;

      const isInvalid = await authRepository.getInvalidToken(token);
      if (isInvalid) return null;

      const validToken = await authRepository.getValidToken(userId);
      if (!validToken) return null;

      if (validToken.token !== token) return null;

      const isInvalidTokenSet = await authRepository.setInvalidToken(token)
      if (!isInvalidTokenSet) return null;

      const accessToken = await jwtService.createToken(userId, 'SECRET', EXPIRATION_TIME.ACCESS);
      const refreshToken = await jwtService.createToken(userId, 'REFRESH', EXPIRATION_TIME.REFRESH);

      const isValidTokenUpdated = await authRepository.setValidToken(userId, refreshToken);
      if (!isValidTokenUpdated) return null;

      return { accessToken, refreshToken };
    } catch (error) {
      return null;
    }
  }
}
