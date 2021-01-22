import mongoose from 'mongoose';
import { CryptUtil } from '@/utils';

/* Extensions for Type-checking Resolution */
interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  construct(attrs: UserAttrs): UserDocument; // eslint-disable-line no-unused-vars
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

/* Base Model / Schema */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  // override stringification of user obj to remove specified props
  toJSON: {
    transform (doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  }
});

/* Hooks */

// hash password prior to persisting in local db
userSchema.pre('save', async function (next) {
  // `isModified` will return true upon user creation
  if (this.isModified('password')) {
    const hashed = await CryptUtil.hash(this.get('password'));
    this.set('password', hashed);
  }
  // if not modified, the pw is already hashed - we don't want to hash the hash
  next();
});

/* Statics */

// necessary workaround to resolve TypeScript type conflicts w/ Mongoose
// accords to type-checking resolution, as noted above
userSchema.statics.construct = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
