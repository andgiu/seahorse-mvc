import Signal from '../../core/signal/Signal';
import CoreSignal from '../../core/signal/CoreSignal';

class AppSignals extends CoreSignal {

  constructor(){
    super();

    this._social = new Signal();
    this._http = new Signal();

    this.initialize = this.initialize.bind(this);
    this.resize = this.resize.bind(this);

  }

  resize(e) {
    fastdom.measure(() => {
      const [w, h] = [window.innerWidth, window.innerHeight];
      this._resize.dispatch([w, h]);
    });
  }

  urlHasChanged(fragment) {
    this._routing.dispatch(fragment);
  }

}

export default (new AppSignals);
