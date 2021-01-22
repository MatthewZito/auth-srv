import { body } from 'express-validator';

/* Validator Configurations */

const loginValidators = [
  body('email')
    .isEmail()
    .withMessage('A valid email address is required'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('A valid password is required')
];

const registerValidators = [
  body('email')
    .isEmail()
    .withMessage('A valid email address is required'),
  body('password')
    .trim()
    .isLength({
      min: 8,
      max: 20
    })
    .withMessage('Password must be between 8 and 20 characters')
];

export {
  loginValidators,
  registerValidators
};
