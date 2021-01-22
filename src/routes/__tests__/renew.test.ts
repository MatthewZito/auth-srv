import request from 'supertest';
import jwt_decode from 'jwt-decode';

import app from '../../app';

import { PATHS } from '@/config';

interface Token {
  email: string;
  id: string;
  iat: number;
  exp: number;
  iss: string;
}

const mockUser = {
  email: 'email@email.com',
  password: 'i_am_damo_suzuki'
};

describe('evaluation of token renewal route handler', () => {
  it('returns a 200 status response and a new token when provided a valid jwt', async () => {
    // NOTE token should be same given within the exp range
    const r1 = await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(201);

    const { token } = r1.body;

    const r2 = await request(app)
      .post(PATHS.RENEW)
      .set('Authorization', 'Bearer ' + token)
      .expect(200);

    expect(r2.body).toHaveProperty('token');
    expect(token).toEqual(r2.body.token);
  });

  it('returns a jwt with an expiration', async () => {
    const response = await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(201);

    const { token } = response.body;

    const payload: Token = jwt_decode(token);

    expect(payload).toHaveProperty('exp');
  });

  it('returns a jwt with an exp less than 1h', async () => {
    const response = await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(201);

    const { token } = response.body;

    const payload: Token = jwt_decode(token);

    const now = Date.now() / 1000;
    // NOTE exp claim is represented as *seconds* since UNIX epoch
    const timeUntilRenewal = payload.exp - now;

    expect(timeUntilRenewal / 60).toBeLessThan(60);
  });

  it('returns a 401 status response when provided an invalid token', async () => {
    const r1 = await request(app)
      .post(PATHS.REGISTER)
      .send({
        email: mockUser.email,
        password: mockUser.password
      })
      .expect(201);

    const { token } = r1.body;

    const manipulated = token.slice(0, token.length - 1);

    const r2 = await request(app)
      .post(PATHS.RENEW)
      .set('Authorization', 'Bearer ' + manipulated)
      .expect(401);

    expect(r2.body).toHaveProperty('errors');
  });
});
