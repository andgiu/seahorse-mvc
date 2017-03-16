const COLOR_INTRO = '#ff324f';
const COLOR_WARNING = '#e65700';
const COLOR_SECTION = ['#fe045c','#eb7c33','#9dd72e'];

export default class Console {

  constructor(debug = true) {
    this._debug = __isMobile() ? false : debug;
  }

  log(...args) {
    if(!this._debug) return 0;
    console.log.apply(this,args);
  }

  section(level, message) {
    this.log(message);
    //this.log(`%c ${message}`, `color: ${COLOR_SECTION[level]}; padding:0px`);
  }

  intro(...args) {
    this.log(`%c ${args[0]}`, `font-size:14px; color: ${COLOR_INTRO}; padding:0px`);
  }

  warning(...args) {
    this.log(`%c ${args[0]}`, `color: ${COLOR_WARNING}`);
  }

}
