import {
  Request,
  Response,
  NextFunction
} from 'express';

import { BaseError } from '@/models/normalizers';
/**
 * Normalizes errors into a consistent format and sends said format in a 400 response
 */
const NormalizeError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line no-unused-vars
) => {
  if (err instanceof BaseError) {
    return res
      .status(err.statusCode)
      .send({ errors: err.serialize() });
  }

  res
    .status(400)
    .send({ errors: [{ message: err.message }] });
};

export default NormalizeError;
