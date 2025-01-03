import { ADMIN_AUTH, fromUTF8ToBase64 } from '../src/infrastructure/middlewares/auth';

export const codedAuth = fromUTF8ToBase64(ADMIN_AUTH)

export const validBlog = {
  name: 'Sample',
  description: 'Sample Description',
  websiteUrl: 'sample-website.com',
};

export const validPost = {
  title: 'Sample Post',
  content: 'Sample Content',
  shortDescription: 'Sample Short Description',
};

export const invalidPost = {
  title: 'length_31-DrmM8lHeNjSykwSzQ7Her',
  content: 'valid',
};

export const validUser = {
  email: 'user@mail.com',
  login: 'user',
  password: '123456',
};

export type TValidLogin = {
  loginOrEmail: string;
  password: string;
}
