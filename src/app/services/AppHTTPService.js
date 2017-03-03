import HTTPService from '../../core/services/HTTPService';

const BASE_PATH = './xml/';

export default class AppHTTPService {

  constructor(config){

    this._ajax = new HTTPService(config);

  }

  getInitXML() {

    this.get

  }

}
