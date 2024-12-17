import { body } from 'express-validator'

const passwordValidator = body('password')
.isString().withMessage('not a string')
.trim().isLength({ min: 6, max: 20 }).withMessage('more than 20 or less than 6')

const loginValidator = body('login')
.isString().withMessage('not a string')
.trim().isLength({ min: 3, max: 10 }).withMessage('more than 10 or less than 3')

const emailValidator = body('email')
.isString().withMessage('not a string')
.isEmail().withMessage('not email')

export const userValidators = [
  passwordValidator,
  loginValidator,
  emailValidator,
]
