const COLOR_INTRO = '#ff324f';
const COLOR_WARNING = '#e65700';

export default class Console {

  constructor(debug) {
    this._debug = $isMobile() ? false : debug;
  }

  log(...args) {
    if(!this._debug) return 0;
    console.log.apply(this,args);
  }

  intro(...args) {
    let warningMessage = [`%c ${args}`];
    this.log(`%c ${args[0]}`, `background: #111; color: ${COLOR_INTRO}; padding:0px`);
  }

  warning(...args) {
    let warningMessage = [`%c ${args}`];
    this.log(`%c ${args[0]}`, `background: #111; color: ${COLOR_WARNING}`);
  }

}
