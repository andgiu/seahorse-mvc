import Signal from '../../core/signal/Signal';

class AppSignals {

  constructor(){

    this._initialize = new Signal();
    this._resize = new Signal();
    this._urlchanged = new Signal();
    this._toggle = new Signal();
    this._section = new Signal();
    this._social = new Signal();
    this._http = new Signal();

    this.initialize = this.initialize.bind(this);
    this.resize = this.resize.bind(this);


  }

  initialize(...args) {
    if(this._initialize) {
      this._initialize.dispatch(args);
      this._initialize.dispose();
      this._initialize = null;
    }
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

export default (new AppSignals);
