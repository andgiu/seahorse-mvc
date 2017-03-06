import AppRouter from '../router/AppRouter';
import View from '../../core/view/View';
import Template from './templates/header.html';

export default class HeaderView extends View {

  constructor(...args) {
    super(args);
    this._template = this._template = _.template(Template);
  }

  render() {
    this._html = this._template();
    this._el = this.htmlToElement(this._html);

    this.rendered();
  }

  onClickHandler() {
    AppRouter.navigate('');
  }

  transitionIn() {
    this.ready();
  }

  transitionOut() {
    this.remove();
  }

}
