import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// generate an async/await scrypt
const crypt = promisify(scrypt);

/**
 * @summary Provides a utility for hashing and comparing password strings
 */
class CryptUtil {

  /**
   * @summary Hashes a given password and returns a buffer / salt pairing
   * @param password The user-supplied password
   */
  static async hash (password: string) {
    const salt = randomBytes(9).toString('hex');
    const buffer = (await crypt(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  /**
   * @summary Hashes a user-supplied password and compares it to the stored hash value
   * @param stored The hashed user password stored in the auth database
   * @param supplied The user-supplied password
   */
  static async compare (stored: string, supplied: string) {
    const [ hashed, salt ] = stored.split('.');
    const buffer = (await crypt(supplied, salt, 64)) as Buffer;

    return buffer.toString('hex') === hashed;
  }
}

export default CryptUtil;
