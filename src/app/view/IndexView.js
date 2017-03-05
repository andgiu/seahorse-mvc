import AppRouter from '../router/AppRouter';
import View from '../../core/view/View';
import Template from './templates/default.html';
import { TweenMax, Expo } from 'gsap';

import Video from './components/video/Video';

let button;

export default class IndexView extends View {

  constructor(...args) {
    super(args);
    this._template = this._template = _.template(Template);

    this._video = new Video({
      src: './assets/video/intro.mp4',
      autoplay: '0',
      ready: this.onReady.bind(this)
    }).el;

  }

  render() {
    this._html = this._template();
    this._el.innerHTML = this._html;

    this._el.appendChild(this._video);


    button = this._el.querySelector('button');
    button.addEventListener('click',this.onClickHandler.bind(this));

    TweenMax.set(this._el,{x:'100%'});
    this.rendered();
  }

  onReady() {

  }

  onClickHandler() {

    AppRouter.navigate('about');

  }

  transitionIn() {

    //this._video.play();
    TweenMax.to(this._el,.85,{force3D:true, x:'0%', ease:Expo.easeInOut});
    this.ready();

  }

  transitionOut() {
    TweenMax.to(this._el,1.25,{force3D:true, x:'100%', ease:Expo.easeInOut,onComplete:() => {this.remove();}});
  }

}
