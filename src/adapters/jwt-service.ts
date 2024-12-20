import jwt from 'jsonwebtoken';
import { isBefore } from 'date-fns';

type TRefreshTokenPayload = {
  userId: string;
  exp: number;
  iat: number;
  deviceId: string;
  ip: string;
  name: string;
}

type TCreateTokenPayload = {
  userId: string;
  expirationTime: string | number;

  ip?: string;
  name?: string;
  deviceId?: string;
}

export const jwtService = {
  async createAccessToken({ userId, expirationTime }: TCreateTokenPayload): Promise<string> {
    return jwt.sign(
      { userId },
      'SECRET',
      { expiresIn: expirationTime }
    );
  },
  async createRefreshToken(
    {
      userId,
      deviceId,
      name,
      ip,
      expirationTime,
    }: TCreateTokenPayload
  ): Promise<string> {
    return jwt.sign(
      {
        userId,
        deviceId,
        ip,
        name
      },
      'REFRESH',
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
  async verifyToken(token: string, secret: string): Promise<TRefreshTokenPayload | null> {
    try {
      return jwt.verify(token, secret) as TRefreshTokenPayload;
    } catch (error) {
      console.log(error);
      console.error('Token verify some error');
      return null;
    }
  },
  async isExpired(token: string, secret: string): Promise<boolean | null> {
    const decodedToken = await this.verifyToken(token, secret);
    if (!decodedToken) return null;

    const { exp } = decodedToken;

    return isBefore(exp * 1000, Date.now());
  }
};
