import express from 'express';

import { ValidateRequest } from '@/middlewares';

import { PATHS } from '@/config';

import { loginValidators } from '@/validators';
import { login } from '@/controllers';

const loginRouter = express.Router();

loginRouter.post(
  PATHS.LOGIN,
  loginValidators,
  ValidateRequest,
  login
);

export default loginRouter;
