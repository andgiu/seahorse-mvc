import { SECTION_RENDERED, SECTION_READY, SECTION_DESTROYED } from '../events/SignalEvents';

export default class Controller {

  constructor(Model, View) {

    this._built = false;
    this._active = false;
    this._drawn = false;
    this._ready = false;

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
    $Console.log(`----- build section ${this._name} `);
    this._view.build();
  }

  built() {
    $Console.log(`---- render section ${this._name} `);
    this._built = true;
    this._view.render();
  }

  rendered() {
    $Console.log(`--- transitionIn section ${this._name} `);
    this._drawn = true;
    this._view.transitionIn();
    $Signal._section.dispatch(SECTION_RENDERED, this._name);
  }

  ready() {
    this._ready = true;
    $Signal._section.dispatch(SECTION_READY);
  }

  dispose() {

    this._built = false;
    this._active = false;
    this._drawn = false;
    this._ready = false;

    this._view.dispose();
    this._model.dispose();

    this._view = null;
    this._model = null;

  }

  get content() {
    return this._view._html;
  }

}
