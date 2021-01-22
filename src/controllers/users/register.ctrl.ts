import { Request, Response } from 'express';

import {
  DatabaseConnErr,
  BadRequest,
  ResourceCreated
} from '@/models/normalizers';

import User from '@/models/User.model';
import { generateJwt } from '@/utils';

async function register (req: Request, res: Response) {
  const { email, password } = req.body;
  // TODO check uname
  const userExists = await User.findOne({
    email
  });

  if (userExists) {
    throw new BadRequest(`Email ${email} is already in use`);
  }

  const newUser = User.construct({
    email,
    password
  });

  try {
    await newUser.save();
  } catch (ex) {
    throw new DatabaseConnErr();
  }

  const userAuthToken = await generateJwt({
    id: newUser.id,
    email: newUser.email
  });

  const response = new ResourceCreated(newUser);

  res
    .status(response.statusCode)
    .send(Object.assign(response.serialize(), { token: userAuthToken }));
}

export default register;
