import AppRouter from '../router/AppRouter';
import View from '../../core/view/View';
import Template from './templates/default.html';
import { TweenMax, Expo } from 'gsap';

let button;

export default class AboutView extends View {

  constructor(...args) {
    super(args);
    this._template = this._template = _.template(Template);
  }

  render() {
    this._html = this._template();
    this._el.innerHTML = this._html;

    button = this._el.querySelector('button');
    button.addEventListener('click',this.onClickHandler.bind(this));

    TweenMax.set(this._el,{x:'-100%'});
    this.rendered();
  }

  onClickHandler() {
    AppRouter.navigate('');
  }

  transitionIn() {
    TweenMax.to(this._el,.85,{force3D:true, x:'0%', ease:Expo.easeInOut});
    this.ready();
  }

  transitionOut() {
    TweenMax.to(this._el,1.25,{force3D:true, x:'-100%', ease:Expo.easeInOut,onComplete:() => {this.remove();} });
  }

}
