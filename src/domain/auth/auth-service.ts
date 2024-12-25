import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken'
import { jwtService } from '../../adapters/jwt-service';
import { add } from 'date-fns/add';
import { nodemailerService } from '../../adapters/nodomailer-service';
import { generateRandomId } from '../../helpers';
import { emailTemplates } from '../../helpers/emailTemplates';
import { securityService } from '../security/security-service';
import { usersRepository } from '../users/users.repository';

export const EXPIRATION_TIME = {
  ACCESS: 10000,
  REFRESH: 20000,
}

type TRefreshTokenInput = {
  userId: string;
  ip: string;
  name: string;
  deviceId: string;
}

type TAccessTokenInput = Pick<TRefreshTokenInput, 'userId'>;

export const authService = {
  checkCredentials: async (loginOrEmail: string, password: string) => {
    const user = await usersRepository.findOne(loginOrEmail);
    if (!user) return null;

    const passwordHash = await hash(password, user.salt)
    const isCorrect = passwordHash === user.passwordHash;

    return isCorrect ? user : null;
  },
  createAccessToken: async ({ userId }: TAccessTokenInput) => {
    return jwtService.createRefreshToken({ userId, expirationTime: EXPIRATION_TIME.ACCESS });
  },
  createRefreshToken: async ({ userId, ip, name, deviceId }: TRefreshTokenInput) => {
    return jwtService.createRefreshToken(
      {
        userId,
        ip,
        name,
        deviceId,
        expirationTime: EXPIRATION_TIME.REFRESH
      }
    );
  },
  login: async (
    loginOrEmail: string,
    password: string,
    ip: string,
    name?: string
  ) => {
    const user = await authService.checkCredentials(loginOrEmail, password);
    if (!user) return null;

    const { id: userId } = user;
    const deviceId = String(generateRandomId())

    const accessToken = await authService.createAccessToken({ userId });
    const refreshToken = await authService.createRefreshToken(
      {
        userId,
        ip,
        name: name || 'Device',
        deviceId,
      }
    );

    const decodedToken = await jwtService.verifyToken(refreshToken, 'REFRESH')
    if (!decodedToken) return null;

    const isCreated = await securityService.createSession({
      userId,
      deviceId,
      ip,
      name: name || 'Device',
      exp: decodedToken.exp,
      iat: decodedToken.iat,
    })

    if (!isCreated) return null;

    return { accessToken, refreshToken };
  },
  registerUser: async (login: string, password: string, email: string) => {
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

    nodemailerService.sendEmail(
      createdUser.email,
      token,
      'register',
      emailTemplates.registrationEmail
    ).catch(() => {
      return null
    })

    return true;
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
      console.error('Confirm email error', error);
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

    const isChanged = await usersRepository.setConfirmationCode(login, token);
    if (!isChanged) return null;

    nodemailerService.sendEmail(
      email,
      token,
      'resend',
      emailTemplates.registrationEmail
    ).catch(() => {
      return null
    })

    return true;
  },
  updateRefreshToken: async (token: string) => {
    try {
      const decodedOldToken = await jwtService.verifyToken(token, 'REFRESH');
      if (!decodedOldToken) return null;

      const { userId, deviceId, ip, name } = decodedOldToken;

      const accessToken = await authService.createAccessToken({ userId });

      const refreshToken = await authService.createRefreshToken({ userId, ip, name, deviceId });
      if (!refreshToken) return null;

      const decodedNewToken = await jwtService.verifyToken(refreshToken, 'REFRESH');
      if (!decodedNewToken) return null;

      const { iat } = decodedNewToken;

      const isUpdated = await securityService.updateSession(deviceId, iat)
      if (!isUpdated) return null;

      return { accessToken, refreshToken };
    } catch (error) {
      return null;
    }
  },
  passwordRecovery: async (email: string) => {
    try {
      const user = await usersRepository.findOne(email);
      if (!user) return null;

      const { login } = user;

      const passwordRecoveryToken = sign(
        { login },
        'SECRET',
        { expiresIn: 1000 },
      );

      const isSent = await nodemailerService.sendEmail(
        email,
        passwordRecoveryToken,
        'Password recovery',
        emailTemplates.passwordRecoveryEmail
      )
      if (!isSent) return null

      const isChanged = await usersRepository.setConfirmationCode(login, passwordRecoveryToken);
      if (!isChanged) return null;

      return true;
    } catch (error) {
      return null
    }
  },
  newPassword: async (newPassword: string, recoveryCode: string) => {
    try {
      const decodedRecoveryToken = await jwtService.verifyToken(recoveryCode, 'SECRET');
      if (!decodedRecoveryToken) return null;

      const { login } = decodedRecoveryToken;

      const salt = await genSalt();
      const passwordHash = await hash(newPassword, salt)

      return usersRepository.setNewPassword({ login, salt, passwordHash })
    } catch (error) {
      return null;
    }
  }
}
