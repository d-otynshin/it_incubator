import jwt from 'jsonwebtoken';

export const jwtService = {
  async createToken(userId: string): Promise<string> {
    return jwt.sign(
      { userId },
      'SECRET',
      { expiresIn: '1h' }
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
  async verifyToken(token: string): Promise<{ userId: string } | null> {
    try {
      return jwt.verify(token, 'SECRET') as { userId: string };
    } catch (error) {
      console.error('Token verify some error');
      return null;
    }
  },
};
