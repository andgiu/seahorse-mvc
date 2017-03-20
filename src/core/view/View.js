const DISABLED_CLASS = 's-disabled';


export default class View {

  constructor(...args) {

    this._el = null;
    this._html = null;
    this._template = null;

  }

  build(name) {

    this._el = document.createElement('section');
    this._el.setAttribute('id',name);
    this._el.addClass(DISABLED_CLASS);
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
