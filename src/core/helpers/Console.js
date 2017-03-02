const COLOR_WARNING = '#e65700';

export default class Console {

  constructor(debug) {
    this._debug = debug;
  }

  log(...args) {

    if(!this._debug) return 0;
    console.log.apply(this,args);

  }

  warning(...args) {
    let warningMessage = [`%c ${args}`];
    console.log(`%c ${args[0]}`, `background: #111; color: ${COLOR_WARNING}`);
  }

}
