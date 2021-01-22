import { Request, Response } from 'express';

import {
  AuthOk,
  BadRequest
} from '@/models/normalizers';

import { User } from '@/database';
import CryptUtil from '@/utils/CryptUtil';

import { generateJwt } from '@/utils';

async function login (req: Request, res: Response) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    email
  });

  if (!existingUser) {
    throw new BadRequest('Invalid credentials');
  }

  const compare = await CryptUtil.compare(
    existingUser.password,
    password
  );

  if (!compare) {
    throw new BadRequest('Invalid credentials');
  }

  const token = await generateJwt({
    email,
    id: existingUser.id
  });

  const response = new AuthOk(token);

  res
    .status(response.statusCode)
    .send(response.serialize());
}

export default login;
