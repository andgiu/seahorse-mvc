export default class View {

  constructor(...args) {

    this._el = null;
    this._html = null;
    this._template = null;

  }

  build(name) {
    this._el = document.createElement('section');
    this._el.setAttribute('id',name);
    //$addClass(this._el,'disabled');
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
    //$removeClass(this._el,'disabled');
    this.controller.ready();
  }

  transitionOut() {
    this.dispose();
  }

  remove() {
    this.controller.dispose();
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
