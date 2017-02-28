import Signal from '../../core/signal/Signal';

export default class AppSignals {

  constructor(){

    this._initialize = new Signal();
    this._resize = new Signal();
    this._urlchanged = new Signal();

    this.initialize = this.initialize.bind(this);
    this.resize = this.resize.bind(this);
  }



  initialize() {
    this._initialize.dispatch();
    this._initialize.dispose();
  }

  resize(e) {
    fastdom.measure(() => {
      const [w, h] = [window.innerWidth, window.innerHeight];
      this._resize.dispatch([w, h]);
    });
  }

  urlHasChanged(fragment) {
    this._urlchanged.dispatch(fragment);
  }

}
