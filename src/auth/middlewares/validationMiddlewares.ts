import { body } from 'express-validator';

export const emailValidator = body('email')
  .trim()
  .isString().withMessage('not a string')
  .isEmail().withMessage('not an email')

export const loginValidator = body('login')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 1 }).withMessage('empty')

export const passwordValidator = body('password')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 1 }).withMessage('empty')

export const codeValidator = body('code')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 1 }).withMessage('empty')

export const loginOrEmailValidator = body('loginOrEmail')
.trim()
.isString().withMessage('not a string')
.isLength({ min: 1 }).withMessage('empty')
