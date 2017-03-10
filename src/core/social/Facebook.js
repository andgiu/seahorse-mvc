const FB_STATUS_CONNECTED = 'connected';
const FB_STATUS_NOT_AUTHORIZED = 'not_authorized';
const FB_STATUS_NOT_CONNECTED = 'not_connected';

const FB_API_ME = '/me';

export default class Facebook {

  constructor(_appId, _AppSignal = null, _cookie = true, _xfbml = true, _version = 'v2.8') {


    if(!FB) {
      $Console.warning('Facebook instance is not defined.');
      return this;
    }

    if(!_appId) {
      $Console.warning('You must define an application ID in order to continue.');
      return this;
    }

    this._signal = _AppSignal;
    this._status = FB_STATUS_NOT_CONNECTED;
    this._user = {};

    FB.init({
      appId: _appId,
      cookie: _cookie,
      xfbml: _xfbml,
      version: _version
    })


    this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this);
    this.onApiHandler = this.onApiHandler.bind(this);

    this.getFBStatus();

  }

  getFBStatus() {
    FB.getLoginStatus(this.onStatusChangeHandler);
  }

  onStatusChangeHandler(response) {
    this._status = response.status;

    if(this.connected) {
      this._user = response.authResponse;
      this.getUserInfo();
    }
  }

  login() {
    if(!this.connected) {
      FB.login(this.onStatusChangeHandler,{scope:'email'});
    }
  }

  onApiHandler(response) {
  
    this._user = {
      id: response.id,
      name: response.name,
      email: response.email,
      firstname: response.first_name,
      lastname: response.last_name
    };

    if(this._signal && this._signal._social) {
      this._signal._social.dispatch('fb','login',this.user);
    }
  }

  getUserInfo() {
    FB.api(FB_API_ME,{fields:'name, first_name, last_name, email'},this.onApiHandler);
  }

  get user() {
      return this._user;
  }

  get connected() {
    return this._status == FB_STATUS_CONNECTED;
  }

}
