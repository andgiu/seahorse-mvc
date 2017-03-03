import HTTPService from '../../core/services/HTTPService';
import XmlToJson from '../../core/helpers/XmlToJson';

const BASE_PATH = './xml/';

class AppHTTPService {

  constructor(config){

    this._ajax = new HTTPService(config);
    this._xmltojson = new XmlToJson();

  }

  getInitXML(lang) {

    this._ajax.getXML(BASE_PATH + `sog_${lang}.xml`, null, (result) => {
      window.$Locale = this._xmltojson.parse(result.data, true).xml;

    });

  }

}


export default (new AppHTTPService);
