import View from '../../core/view/View';
import Template from './templates/index.html';

console.log(Template);

export default class IndexView extends View {

  constructor(...args) {
    super(args);
    this._template = this._template = _.template(Template);
  }

  render() {
    this._html = this._template({user: 'Andrea'});
    this.rendered();
  }

  transitionIn() {
    
  }

}
