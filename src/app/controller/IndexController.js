import Controller from '../../core/controller/Controller';
import Model from '../model/IndexModel';
import View from '../view/IndexView';
import AppSignals from '../signal/AppSignals';

import Facebook from '../../core/social/Facebook';
import GooglePlus from '../../core/social/GooglePlus';

export default class IndexController extends Controller {

  constructor() {
    super(Model, View, AppSignals);

    AppSignals._social.add(this.onSocialApi.bind(this));
    this._fb = new Facebook('150614948791921',AppSignals);
    this._gp = new GooglePlus('281103183826-jkvdc5ttef6lv8pfgfjo8mgknkobqign.apps.googleusercontent.com',AppSignals);
  }

  FBlogin() {
    this._fb.login();
    //this._gp.login();
  }

  onSocialApi(social, type, args) {
    console.log(social, type, args);
  }

}
