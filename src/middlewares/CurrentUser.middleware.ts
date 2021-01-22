import {
  Request,
  Response,
  NextFunction
} from 'express';

import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express { // eslint-disable-line no-unused-vars
    interface Request { // eslint-disable-line no-unused-vars
      currentUser?: JwtPayload
    }
  }
}

function CurrentUser (
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (!req.headers?.authorization) {
    return next();
  }

  const { authorization } = req.headers;

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(
      token,
      `${process.env.JWT_SIGNING_KEY}`,
      { issuer: process.env.JWT_ISSUER }
    ) as JwtPayload;

    req.currentUser = payload;

  } catch (ex) {} // eslint-disable-line no-empty

  next();
}

export default CurrentUser;
