import axios from 'axios';

const GET = 'get';
const POST = 'post';

const TYPE_JSON = 'json';
const TYPE_TEXT = 'text';

export default class HTTPService {

  constructor(config) {

    this._busy = false;

    this._method = GET;

    this._responseType = 'json';

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);


  }

  get(url, params, success, error) {

    this._method = GET;
    this._responseType = TYPE_TEXT;
    this.call(url, params, success || this.success, error || this.error)

  }

  post(url, params, success, error) {

    this._method = POST;
    this._responseType = TYPE_TEXT;
    this.call(url, params, success || this.success, error || this.error)

  }

  call(url, params, success, error) {

    this._busy = true;

    return axios({

      crossDomain: true,
      url: url,
      method: this._method,
      data: params,
      responseType: this._responseType

    })
    .then(success)
    .catch(error);

  }

  success(response) {

    this._busy = false;
    console.log(response);

  }

  error(err) {
    throw(err);
  }

}
