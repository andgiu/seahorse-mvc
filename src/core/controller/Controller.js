export default class Controller {

  constructor(Model, View) {

    this._modelClass = Model;
    this._viewClass = View;
  }

  create(name, params) {

    this._name = name;
    this._params = params;

    this._model = new this._modelClass();
    this._view = new this._viewClass();
    return [this._model, this._view];
  }

  build() {

    $Console.log("--")

  }

}
