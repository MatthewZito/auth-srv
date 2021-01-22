import BaseError from './factory/BaseError';

/**
 * Denotes a request for a restricted resource to which the requester does not have access
 */
class NotAuthorized extends BaseError {
  statusCode = 401;
  constructor () {
    super(new Date () + ' ERROR:REQ:NOT_AUTHORIZED:');

    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }

  serialize () {
    return [
      { message: 'Not authorized' }
    ];
  }
}

export default NotAuthorized;
