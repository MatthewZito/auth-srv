import BaseError from './factory/BaseError';

/**
 * Denotes requests made for non-existent resources
 */
class NotFound extends BaseError {
  statusCode = 404;
  constructor () {
    super(new Date () + ' ERROR:REQ:NOT_FOUND');

    Object.setPrototypeOf(this, NotFound.prototype);
  }

  serialize () {
    return [{ message: 'Path not found' }];
  }
}

export default NotFound;
