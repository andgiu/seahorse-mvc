export default class GooglePlus {

  constructor(_appId, _AppSignal = null, _scope = 'profile', _cookie_policy = 'single_host_origin') {

    if(!gapi) {
      $Console.warning('GooglePlus instance is not defined.');
      return this;
    }

    if(!_appId) {
      $Console.warning('You must define an application ID in order to continue.');
      return this;
    }

    this._user = null;
    this._initialized = false;
    this._connected = false;
    this._auth2 = null;
    this._signal = _AppSignal;

    gapi.load('auth2',() => {

      let auth2 = gapi.auth2.init({

        client_id: _appId,
        scope: _scope,
        cookiepolicy: _cookie_policy

      }).then(() => {

        this._initialized = true;
        this._auth2 = gapi.auth2.getAuthInstance();
        this._auth2.isSignedIn.listen(this.onSignInChangedHandler.bind(this));
        this._auth2.currentUser.listen(this.onUserChangedHandler.bind(this));

      })

    });

  }

  onSignInChangedHandler(...args) {

  }

  onUserChangedHandler(response) {
    if(this._auth2.isSignedIn.get()) {
      this._connected = true;
      let profile = this._auth2.currentUser.get().getBasicProfile();
      this._user = {
        id: profile.getId(),
        name: profile.getName(),
        firstname: profile.getGivenName(),
        lastname: profile.getFamilyName(),
        email: profile.getEmail()
      }

      if(this._signal && this._signal._social) {
        this._signal._social.dispatch('gp','login',this.user);
      }

    }

  }

  login() {

    if(!this.initialized) {
      $Console.warning('GooglePlus not initialized.');
      return this;
    }

    this._auth2.signIn();

  }

  get user() {
    return this._user;
  }

  get connected() {
    return this._connected;
  }

  get initialized() {
    return this._initialized;
  }

}
