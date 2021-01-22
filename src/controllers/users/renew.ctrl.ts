import { Request, Response } from 'express';

import { NotAuthorized, AuthOk } from '@/models/normalizers';

import generateJwt from '@/utils/generateJwt';

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

async function renew (req: Request, res: Response) {
  if (!req.currentUser?.email || !req.currentUser.id) {
    throw new NotAuthorized();
  }

  const { email, id } = req.currentUser;

  const token = await generateJwt({
    email,
    id
  });

  const response = new AuthOk(token);

  res
    .status(response.statusCode)
    .send(response.serialize());
}

export default renew;
