import {
  Request,
  Response,
  NextFunction
} from 'express';
import { validationResult } from 'express-validator';

import { RequestValidation } from '@/models/normalizers';

/**
 * Validates request body parameters
 */
const ValidateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validation error objects, as captured by the express-validator middleware
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidation(errors.array());
  }

  next();
};

export default ValidateRequest;
