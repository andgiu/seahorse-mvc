import 'proxy-observe';

export default class Model {

  constructor(controller) {

    this.controller = controller;

  }

  getState() {
    return this.state;
  }

  setState(stateOBJ) {
    this.state = stateOBJ;
    const observer = Object.observe(this.state,this.onStateChangeHandler.bind(this));
    return observer;
  }

  onStateChangeHandler(change) {
    this.controller._view.render();
  }

  dispose() {

  }


}
