export default class View {

  constructor(...args) {

    this._html = null;
    this._template = null;

  }

  build() {
    this.built();
  }

  built() {
    this.controller.built();
  }

  render() {
    this.rendered();
  }

  rendered() {
    this.controller.rendered();
  }

  transitionIn() {
    this.ready();
  }

  ready() {
    this.controller.ready();
  }


}
