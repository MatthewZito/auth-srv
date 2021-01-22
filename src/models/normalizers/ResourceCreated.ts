import BaseOkResponse from './factory/BaseOkResponse';

class ResourceCreated extends BaseOkResponse {
  statusCode = 201;
  constructor (public payload: any) { // eslint-disable-line no-unused-vars
    super();
  }

  serialize () {
    return {
      payload: this.payload
    };
  }
}

export default ResourceCreated;
