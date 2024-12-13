import jwt from 'jsonwebtoken';

export const jwtService = {
  async createToken(
    userId: string,
    secret: string,
    expiration: string | number
  ): Promise<string> {
    return jwt.sign(
      { userId },
      secret,
      { expiresIn: expiration }
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
};
