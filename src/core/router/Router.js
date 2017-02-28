/**
 * Router Class
 * @name Signal
 * @author Andrea Giuffrida
 * @constructor
 */

import { MODE_HISTORY, MODE_HASH } from './RouterType';
export default class Router {

  constructor(options) {

    this._interval = null;

    /**
     * @type array
     * @private
     */
    this._routes =[];

    /**
     * @type string
     * @private
     */
    this._mode = options && options.mode && options.mode == MODE_HISTORY && !!(history.pushState) ? MODE_HISTORY : MODE_HASH;

    /**
     * @type string
     * @private
     */
    this._root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';

  }

  /**
   * Get the current fragment
   * @param {}
   * @return {string}
   */
  getFragment() {

    let fragment = '';

    if(this._mode === MODE_HISTORY) {

      fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;

    } else {

      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';

    }

    return this.clearSlashes(fragment);

  }

  /**
   * Add the routing function
   * @param {route} string
   * @param {handler} function
   * @return {Router}
   */
  add(route, handler) {

    if(typeof route == 'function') {
      handler = route;
      route = '';
    }

    this._routes.push({ route: route, handler: handler });
    return this;
  }


  /**
   * Remove the routing function
   * @param {param} string
   * @return {Router}
   */
  remove(param) {

    _.each(this._routes, function(r,i) {
      if(r.handler === param || r.route.toString() === param.toString()) {
          this._routes.splice(i, 1);
          return this;
      }
    })

    return this;

  }

  /**
   * Destroy the Router object
   * @param {param} string
   * @return {Router}
   */
  dispose() {

    this._routes = [];
    this._mode = null;
    this._root = '/';

  }

  /**
   * Check the current fragment
   * @param {f} string
   * @return {Router}
   */
  check(f) {

    let fragment = f || this.getFragment();
    
    _.each(this._routes, function(r) {

      let match = fragment.match(r.route);
      if(match) {
        match.shift();
        r.handler.apply({}, match);
        return this;
      }

    })

  }

  /**
   * URL Listener
   * @param {}
   * @return {Router}
   */
  listen() {

    let self = this;
    let current = this.getFragment();
    let fn = function() {
      if(current !== self.getFragment()) {
          current = self.getFragment();
          self.check(current);
      }
    }

    clearInterval(this._interval);
    this._interval = setInterval(fn, 100);

    return this;
  }

  /**
   * Navigate function
   * @param {path} string
   * @return {Router}
   */
  navigate(path) {

    path = path ? path : '';

    if(this._mode === MODE_HISTORY)
      history.pushState(null, null, this._root + this.clearSlashes(path));
    else
      window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;

    return this;
  }

  /**
   * Clear slashes helper function
   * @param {path} string
   * @return {string}
   */
  clearSlashes(path) {

    return path.toString().replace(/\/$/, '').replace(/^\//, '');

  }

}
