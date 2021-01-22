/****************************
 *
 * Base Dependencies / Imports
 *
 ****************************/

/* Base Dependencies */
import express from 'express';
import 'express-async-errors'; // catch thrown errors in async handlers
import { json } from 'body-parser';

/* Transitive Dependencies */
import { NormalizeError } from '@/middlewares';
import { NotFound } from '@/models/normalizers';

/* Routers and Local Middlewares */
import {
  loginRouter,
  registerRouter,
  renewRouter
} from '@/routes';

/****************************
 *
 * Server Configurations
 *
 ****************************/

const app = express();

/*  Middlewares */
app.use(json());

/* Router Associations */
app.use(loginRouter);
app.use(registerRouter);
app.use(renewRouter);

/* Fallback */
app.all('*', () => {
  throw new NotFound();
});

/* Error-handling */

// will catch all thrown errors, even those in async fns
app.use(NormalizeError);

export default app;
