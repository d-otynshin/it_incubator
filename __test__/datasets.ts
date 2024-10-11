import { ADMIN_AUTH, fromUTF8ToBase64 } from '../src/middlewares/auth';

export const codedAuth = fromUTF8ToBase64(ADMIN_AUTH)
