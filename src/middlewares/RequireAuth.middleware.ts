import {
  Request,
  Response,
  NextFunction
} from 'express';

import {
  NotAuthorized
} from '@/models/normalizers';

function RequireAuthorization (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.currentUser) {
    throw new NotAuthorized();
  }
  next();
}

export default RequireAuthorization;
