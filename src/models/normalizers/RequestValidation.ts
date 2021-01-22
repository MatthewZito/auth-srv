import { ValidationError } from 'express-validator';

import BaseError from './factory/BaseError';

/**
 * Denotes a request with invalid parameters / payload
 */
class RequestValidation extends BaseError {
  statusCode = 400;
  constructor (private errors: ValidationError[]) { // eslint-disable-line no-unused-vars
    super(new Date () + ' ERROR:REQ:VALIDATION');

    Object.setPrototypeOf(this, RequestValidation.prototype);
  }

  serialize () {
    return this.errors.map(e => ({
      message: e.msg,
      field: e.param
    }));
  }
}

export default RequestValidation;
