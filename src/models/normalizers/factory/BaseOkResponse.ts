abstract class BaseOkResponse {
  abstract statusCode: number;

  constructor () {}

  abstract serialize (): {
    message?: string,
    token?: string,
    payload?: { payload: any}
  };
}

export default BaseOkResponse;
