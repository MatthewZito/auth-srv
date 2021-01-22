import request from 'supertest';
import app from '../../app';

import { PATHS } from '@/config';

const mockUser = {
  email: 'email@email.com',
  password: 'i_am_damo_suzuki'
};

describe('evaluation of login route handler', () => {
  it('returns a 200 status response when a registered user provides the proper credentials', async () => {
    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(201);

    await request(app)
      .post(PATHS.LOGIN)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(200);
  });

  it('returns a 400 status response when a non-registered user attempts to login', async () => {
    await request(app)
      .post(PATHS.LOGIN)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(400);
  });

  it('returns a 400 status response when a registered user provides an invalid email', async () => {
    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(201);

    await request(app)
      .post(PATHS.LOGIN)
      .send({
        email: 'wrong@email.com',
        password: mockUser.password
      })
      .expect(400);
  });

  it('returns a 400 status response when a registered user provides an invalid password', async () => {
    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(201);

    await request(app)
      .post(PATHS.LOGIN)
      .send({
        email: mockUser.email,
        password: 'wrong_password'
      })
      .expect(400);
  });

  it('returns error data when a registered user does not provide an email or password', async () => {
    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(201);

    const r1 = await request(app)
      .post(PATHS.LOGIN)
      .send({
        email: mockUser.email,
        password: null
      })
      .expect(400);

    expect(r1.body.errors[0]).toHaveProperty('message');
    expect(r1.body.errors[0]).toHaveProperty('field');

    const r2 = await request(app)
      .post(PATHS.LOGIN)
      .send({
        email: null,
        password: mockUser.password
      })
      .expect(400);

    expect(r2.body.errors[0]).toHaveProperty('message');
    expect(r2.body.errors[0]).toHaveProperty('field');
  });

  it('returns a jwt when a registered user successfully logs in', async () => {
    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(201);

    const response = await request(app)
      .post(PATHS.LOGIN)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });
});
