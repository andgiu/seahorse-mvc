import AppRouter from '../router/AppRouter';
import View from '../../core/view/View';
import Template from './templates/default.html';


let button;

export default class AboutView extends View {

  constructor(...args) {
    super(args);
    this._template = this._template = _.template(Template);
  }

  render() {
    this._html = this._template();
    this._el.innerHTML = this._html;

    button = this._el.querySelector('sh-button');
    button.addEventListener('click',this.onClickHandler.bind(this));

    this.rendered();
  }

  onClickHandler() {
    AppRouter.navigate('third');
  }

  transitionIn() {

    this.ready();
  }

  transitionOut() {
    this.remove();
  }

}
