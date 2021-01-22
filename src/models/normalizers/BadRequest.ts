import BaseError from './factory/BaseError';

/**
 * Denotes malformed or otherwise invalid requests
 */
class BadRequest extends BaseError {
  statusCode = 400;
  constructor (public message: string) { // eslint-disable-line no-unused-vars
    super(new Date () + ' ERROR:REQ:MALFORMED:');

    Object.setPrototypeOf(this, BadRequest.prototype);
  }

  serialize () {
    return [
      { message: this.message }
    ];
  }
}

export default BadRequest;
