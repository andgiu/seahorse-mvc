import HTTPService from '../../core/services/HTTPService';
import XmlToJson from '../../core/helpers/XmlToJson';
import AppSignals from '../signal/AppSignals';
import * as Event from '../events/Events';

const BASE_XML_PATH = './xml/';
const BASE_API_PATH = 'http://fucecchio.local-heroes.it/public/api/';
const POST_LOGIN = BASE_API_PATH + 'login';
const POST_SAVE_STORY = BASE_API_PATH + 'SaveStory';
const GET_GALLERY = BASE_API_PATH + 'GetGallery';
const GET_STORY = BASE_API_PATH + 'GetStory';
const POST_VOTE = BASE_API_PATH + 'Vote';


class AppHTTPService {

  constructor(config){

    this._ajax = new HTTPService(config);
    this._xmltojson = new XmlToJson();
    this._http = AppSignals._http;

    this._call = null;
    this.apiSuccess = this.apiSuccess.bind(this);
    this.apiError = this.apiError.bind(this);
  }

  getInitXML(lang, callback) {

    this._ajax.get(BASE_XML_PATH + `sog_${lang}.xml`, null, (result) => {
      window.$Locale = this._xmltojson.parse(result.data, true).xml;
      callback();
    });

  }

  login(user) {

    this._user = user;
    this._call = POST_LOGIN;
    return this._ajax.post(POST_LOGIN, user, this.apiSuccess, this.apiError);


  }

  postStory(formData) {

    this._call = POST_SAVE_STORY;
    return this._ajax.post(POST_SAVE_STORY, formData, this.apiSuccess, this.apiError);

  }

  apiSuccess(result) {

    let json = JSON.parse(result);

    switch(this._call) {

      // Login Handler
      case POST_LOGIN:

        if(json.status) this._http.dispatch(Event.LOGIN_SUCCESSFUL);
        else this._http.dispatch(Event.LOGIN_ERROR, json.message);

      break;

      case POST_SAVE_STORY:


      break;

    }

    this._call = null;

  }

  apiError() {

  }

}


export default (new AppHTTPService);
