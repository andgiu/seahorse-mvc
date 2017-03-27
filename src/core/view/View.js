const DISABLED_CLASS = 's-disabled';
import hyperHTML from 'hyperhtml';


export default class View {

  constructor(controller) {


    this._el = null;
    this._html = null;
    this._template = null;
    this._rendered = false;

    this.controller = controller;

  }

  build(name) {

    this._el = document.createElement('section');
    this._el.setAttribute('id',name);
    this._el.addClass(DISABLED_CLASS);
    this.$render = hyperHTML.bind(this._el);
    this.built();
  }

  built() {
    this.controller.built();
  }

  render() {
    this.rendered();
  }

  rendered() {
    if(!this._rendered) {
      this._rendered = true;
      this.controller.rendered();
    }
  }

  transitionIn() {
    this.ready();
  }

  ready() {
    this._el.removeClass(DISABLED_CLASS);
    this.controller.ready();
  }

  transitionOut() {
    this.dispose();
  }

  remove() {
    this.controller.dispose();
  }

  disable() {;
    this._el.addClass(DISABLED_CLASS);
  }

  dispose() {

    this._el.innerHTML = '';
    this._el.parentNode.removeChild(this._el);

    this._el = null;
    this._html = null;
    this._template = null;

  }

  setState(stateOBJ) {
    return this.controller.setState(stateOBJ);
  }

  htmlToElement(html) {
    let template = document.createElement('template');
    template.innerHTML = html;

    let node = template.content.firstChild;
    template = null;
    return node;
  }


  get $el() {
    return this._el;
  }


}
