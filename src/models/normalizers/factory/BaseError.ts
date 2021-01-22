abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor (message: string) {
    super(message);

    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serialize (): { message: string, field?: string }[];
}

export default BaseError;
