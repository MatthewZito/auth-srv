import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import app from '../src/app';
import { PATHS } from '../src/config';

/* Hooks */
let mongo: any;

beforeAll(async () => {
  // map env vars
  process.env.SHARED_JWT_SIGNING_KEY = 'auth_srv_fake_key';
  process.env.SHARED_JWT_ISSUER = 'auth_srv_env';
  process.env.SHARED_JWT_EXPIRATION = '20m';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const colls = await mongoose.connection.db.collections();

  for (const coll of colls) {
    await coll.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

/* Helpers */
declare global {
  namespace NodeJS { // eslint-disable-line no-unused-vars
    interface Global { // eslint-disable-line no-unused-vars
      getJwt(): Promise<string>
    }
  }
}

global.getJwt = async () => {
  const response = await request(app)
    .post(PATHS.REGISTER)
    .send({
      email: 'test@test.com',
      password: 'test_password'
    });

  return response.body.token;
};
