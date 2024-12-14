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
  async verifyToken(token: string, secret: string): Promise<{ userId: string, exp: number } | null> {
    try {
      return jwt.verify(token, secret) as { userId: string, exp: number };
    } catch (error) {
      console.error('Token verify some error');
      return null;
    }
  },
  async isExpired(token: string, secret: string): Promise<boolean> {
    // @ts-ignore
    const { exp } = await this.verifyToken(token, secret);

    return isBefore(exp * 1000, Date.now());
  }
};
