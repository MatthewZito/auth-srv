import mongoose from 'mongoose';

import { DatabaseConnErr } from '@/models/normalizers';

import User from '@/models/User.model';

/**
 * @summary Initializes a connection to the auth / user database
 */
async function initMongoConn () {
  try {
    await mongoose.connect(`${process.env.AUTH_MONGO_CONN_STR}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }
  catch (err) {
    throw new DatabaseConnErr();
  }
}

export {
  User
};

export default initMongoConn;
