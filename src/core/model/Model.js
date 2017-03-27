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
    let observer = Object.observe(this.state,this.onStateChangeHandler.bind(this));
    return observer;
  }

  onStateChangeHandler(change) {
    console.log(change);
    this.controller._view.render();
  }

  dispose() {

  }


}
