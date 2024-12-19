import { body } from 'express-validator';

export const emailValidator = body('email')
  .trim()
  .isString().withMessage('not a string')
  .isEmail().withMessage('not an email')

export const loginValidator = body('login')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 3, max: 10 }).withMessage('less than 3 or more than 10')

export const passwordValidator = body('password')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 6, max: 20 }).withMessage('less than 3 or more than 20')

export const codeValidator = body('code')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 1 }).withMessage('empty')

export const loginOrEmailValidator = body('loginOrEmail')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 1 }).withMessage('empty')

export const newPasswordValidation = body('newPassword')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 6, max: 20 }).withMessage('less than 3 or more than 20')

export const recoveryCodeValidation = body('recoveryCode')
  .trim()
  .isString().withMessage('not a string')
  .isLength({ min: 1 }).withMessage('recovery code is required')
