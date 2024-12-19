export type TEmailConfirmation = {
  code: string;
  isConfirmed: boolean;
  expirationDate: Date;
}

export type TUserDb = {
  id: string;
  login: string;
  passwordHash: string;
  salt: string;
  email: string;
  createdAt: Date;
  emailConfirmation: TEmailConfirmation
}
