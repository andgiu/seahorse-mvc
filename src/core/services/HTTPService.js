/**
 * Custom HTTP Services class
 * @name HTTPService
 * @author Andrea Giuffrida
 * @constructor
 */


import axios from 'axios';

const GET = 'get';
const POST = 'post';

const TYPE_JSON = 'json';
const TYPE_TEXT = 'text';

export default class HTTPService {

  constructor(config) {

    /**
     * @type boolean
     * @private
     */
    this._busy = false;

    /**
     * @type string GET|POST
     * @private
     */
    this._method = GET;

    /**
     * @type string json|text
     * @private
     */
    this._responseType = 'json';

    /**
     * Default success/error functions
     * @type functions
     * @private
     */
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);


  }

  /**
   * Perform a GET call
   * @param {String} url Url of the call
   * @param {Object} params Params to sent to the call
   * @param {Function} success Success callback Function
   * @param {Function} error Error callback Function
   * @return {axios} Axios object
   */
  get(url, params, success, error) {

    this._method = GET;
    this._responseType = TYPE_TEXT;
    return this.call(url, params, success || this.success, error || this.error)

  }

  /**
   * Perform a POST call
   * @param {String} url Url of the call
   * @param {Object} params Params to sent to the call
   * @param {Function} success Success callback Function
   * @param {Function} error Error callback Function
   * @return {axios} Axios object
   */
  post(url, params, success, error) {

    this._method = POST;
    this._responseType = TYPE_TEXT;
    return this.call(url, params, success || this.success, error || this.error)

  }

  /**
   * Perform an axios http call
   * @param {String} url Url of the call
   * @param {Object} params Params to sent to the call
   * @param {Function} success Success callback Function
   * @param {Function} error Error callback Function
   * @return {axios} Axios object
   */
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

  /**
   * Default success function
   * @return {Object} response object
   */
  success(response) {

    this._busy = false;
    return response;

  }

  /**
   * Default error function
   * @return {null}
   */
  error(err) {
    throw(err);
  }

}
