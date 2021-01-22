import express from 'express';

import {
  CurrentUser,
  RequireAuthorization
} from '@/middlewares';

import { PATHS } from '@/config';

import { renew } from '@/controllers';

const renewRouter = express.Router();

renewRouter.post(
  PATHS.RENEW,
  CurrentUser,
  RequireAuthorization,
  renew
);

export default renewRouter;


