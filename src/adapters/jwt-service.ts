import jwt from 'jsonwebtoken';
import { isBefore } from 'date-fns';

export const jwtService = {
  async createToken(
    userId: string,
    secret: string,
    expirationTime: string | number
  ): Promise<string> {
    return jwt.sign(
      { userId },
      secret,
      { expiresIn: expirationTime }
    );
  },
  async decodeToken(token: string): Promise<any> {
    try {
      return jwt.decode(token);
    } catch (error: unknown) {
      console.error("Can't decode token", error);
      return null;
    }
  },
  async verifyToken(token: string): Promise<{ userId: string, exp: number } | null> {
    try {
      return jwt.verify(token, 'SECRET') as { userId: string, exp: number };
    } catch (error) {
      console.error('Token verify some error');
      return null;
    }
  },
  async isExpired(token: string): Promise<boolean> {
    const { exp } = await this.decodeToken(token);

    return isBefore(exp, Date.now());
  }
};
