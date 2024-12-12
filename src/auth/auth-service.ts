import { usersRepository } from '../users/users-repository';
import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken'
import { jwtService } from '../adapters/jwt-service';
import { add } from 'date-fns/add';
import { nodemailerService } from '../adapters/nodomailer-service';
import { generateRandomId } from '../helpers';
import { emailTemplates } from '../helpers/emailTemplates';

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

    return jwtService.createToken(user.id);
  },
  registerUser: async (login: string, password: string, email: string): Promise<Boolean | null> => {
    const user = await usersRepository.findOne(email);
    if (user) return null;


    const salt = await genSalt();
    const passwordHash = await hash(password, salt)
    const token = sign({ login }, 'SECRET', { expiresIn: '1h' });

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
        createdUser.emailConfirmation.code,
        emailTemplates.registrationEmail
      );

      return true;
    } catch (e: unknown) {
      console.error('Send email error', e);

      return null;
    }
  },
  confirmEmail: async (code: string) => {
    const decodedToken = await jwtService.decodeToken(code);
    const { login } = decodedToken;

    if (!login) return null;

    const user = await usersRepository.findOne(login);
    if (!user) return null;

    const { emailConfirmation: { isConfirmed } } = user;
    if (isConfirmed) return null

    if (code === user.emailConfirmation.code) {
      await usersRepository.setConfirmed(login)

      return true;
    }

    return null;
  },
  resendEmail: async (email: string) => {
    const user = await usersRepository.findOne(email);
    if (!user) return null;

    const { emailConfirmation: { isConfirmed } } = user;
    if (isConfirmed) return null

    const token = sign(
      { login: user.login },
      'SECRET',
      { expiresIn: '1h' }
    );

    try {
      await usersRepository.setConfirmationCode(
        user.login,
        token
      );

      await nodemailerService.sendEmail(
        email,
        token,
        emailTemplates.passwordRecoveryEmail
      );

      return true;
    } catch (e: unknown) {
      console.error('Send email error', e);

      return null;
    }
  }
}
