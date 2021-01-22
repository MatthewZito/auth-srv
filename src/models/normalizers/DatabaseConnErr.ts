import BaseError from './factory/BaseError';

/**
 * Denotes errors pertaining to database connections and procedures
 */
class DatabaseConnErr extends BaseError {
  statusCode = 500;
  reason = 'Unable to initialize database connection';
  constructor () {
    super(new Date () + ' ERROR:DATABASE:CONN');

    Object.setPrototypeOf(this, DatabaseConnErr.prototype);
  }

  serialize () {
    return [
      { message: this.reason }
    ];
  }
}

export default DatabaseConnErr;
