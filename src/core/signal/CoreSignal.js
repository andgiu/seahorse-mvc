import Signal from './Signal';
export default class ApplicationSignal {

  constructor() {

    this._initialize = new Signal();
    this._toggle = new Signal();
    this._resize = new Signal();
    this._routing = new Signal();
    this._section = new Signal();

  }

  initialize(...args) {
    this._initialize.dispatch(args);
    this._initialize.dispose();
    this._initialize = null;
  }

}
