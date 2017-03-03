import AppSignals from '../signal/AppSignals';
import { MODE_HISTORY } from '../../core/router/RouterType';
import Router from '../../core/router/Router';


class AppRouter {

  constructor() {


    this._routes = [];
    this._active = false;

    this._route = new Router({mode: MODE_HISTORY});
    this._route.add(this.routerHandler.bind(this)).listen();
    this._fragment = this._route.getFragment();

  }

  initialize() {

    this.active = true;

    let fragments = this._route.getFragment().split('/');
    this.routerHandler(fragments);

  }

  routerHandler(...args) {
    if(!this.active) return false;
    AppSignals.urlHasChanged(args);
  }

  navigate(path) {

    if(!this.active) return this;
    this._route.navigate(path);
    return this;
  }

  start() {
    this.active = true;
    this._route.check();
    return this;
  }

  get active() {
    return this._active;
  }

  set active(value) {
    this._active = value;
  }

}

export default (new AppRouter);
