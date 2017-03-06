import { SECTION_BUILD, SECTION_RENDERED, SECTION_READY, SECTION_DESTROYED } from '../events/SignalEvents';

export default class Controller {

  constructor(Model, View, Signal) {

    this._static = false;

    this._built = false;
    this._drawn = false;
    this._ready = false;

    this._signal = Signal;
    this._modelClass = Model;
    this._viewClass = View;
  }

  create(name, params) {

    this._name = name;
    this._params = params;

    this._model = new this._modelClass();
    this._view = new this._viewClass();


    this._view.controller = this;
    this._model.controller = this;

    return [this._model, this._view];
  }

  build() {
    if(this._static) return 0;

    $Console.log(`----- build section ${this._name} `);
    this._view.build(this._name);
    this._signal._section.dispatch(SECTION_BUILD);
  }

  built() {
    if(this._static) return 0;

    $Console.log(`---- render section ${this._name} `);
    this._built = true;
    this._view.render();
  }

  rendered(added) {
    if(this._static) return 0;

    $Console.log(`--- transitionIn section ${this._name} `);
    this._drawn = true;
    this._view.transitionIn();
    this._signal._section.dispatch(SECTION_RENDERED, added);
  }

  ready() {
    if(this._static) return 0;
    
    this._ready = true;
    this._signal._section.dispatch(SECTION_READY);
  }

  remove() {
    this._view.transitionOut();
  }

  isActive() {
    return this._ready;
  }

  dispose() {

    this._signal._section.dispatch(SECTION_DESTROYED, this._name);

    this._built = false;
    this._drawn = false;
    this._ready = false;

    this._view.dispose();
    this._model.dispose();

    this._view = null;
    this._model = null;

  }

  get content() {
    return this._view._el;
  }

}
