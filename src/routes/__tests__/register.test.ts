import request from 'supertest';
import app from '../../app';

import { PATHS } from '@/config';

describe(`evaluation of register route handler`, () => {
  it('returns a 201 status response upon successful user registration', async () => {
    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: 'test@test.com',
        password: 'test_password'
      })
      .expect(201);
  });

  it('returns a 400 status response when provided an invalid email', async () => {
    return request(app)
      .post(PATHS.REGISTER)
      .send({
        email: 'test',
        password: 'test_password'
      })
      .expect(400);
  });

  it('returns a 400 status response when provided an invalid password', async () => {
    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: 'test@test.com',
        password: 'fail'
      })
      .expect(400);
  });

  it('returns a 400 status response when provided an no email and no password', async () => {
    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: '',
        password: 'test_password'
      })
      .expect(400);

    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: 'test@test.com',
        password: ''
      })
      .expect(400);
  });

  it('returns a 400 status response when provided an email that has already been registered', async () => {
    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: 'test@test.com',
        password: 'test_password'
      })
      .expect(201);

    await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: 'test@test.com',
        password: 'test_password'
      })
      .expect(400);
  });

  it('returns a jwt upon successful registration', async () => {
    const response = await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: 'test@test.com',
        password: 'test_password'
      })
      .expect(201);

    expect(response.body).toHaveProperty('token');

  });

  it('returns a payload object with new user email and id properties upon successful registration', async () => {
    const response = await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: 'test@test.com',
        password: 'test_password'
      })
      .expect(201);

    expect(response.body).toHaveProperty('payload._id');
    expect(response.body).toHaveProperty('payload.email');
  });

  it('returns a the correct email upon successful registration', async () => {
    const email = 'test@test.com';

    const response = await request(app)
      .post(PATHS.REGISTER)
      .send({
        email,
        password: 'test_password'
      })
      .expect(201);

    expect(response.body.payload.email).toBe(email);

  });
});
