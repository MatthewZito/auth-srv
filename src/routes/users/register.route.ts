import express from 'express';

import { ValidateRequest } from '@/middlewares';

import { PATHS } from '@/config';

import { registerValidators } from '@/validators';
import { register } from '@/controllers';

const registerRouter = express.Router();

registerRouter.post(
  PATHS.REGISTER,
  registerValidators,
  ValidateRequest,
  register
);

export default registerRouter;
