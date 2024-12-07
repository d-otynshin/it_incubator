export type UserDBType = {
  login: string;
  passwordHash: string;
  salt: string;
  email: string;
  createdAt: Date;
  id: string;
}
