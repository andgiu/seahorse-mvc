export default class Console {

  constructor(debug) {
    this._debug = debug;
  }

  log(...args) {

    if(!this._debug) return 0;
    console.log.apply(this,args);

  }

}
