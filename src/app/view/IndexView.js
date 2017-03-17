import AppRouter from '../router/AppRouter';
import View from '../../core/view/View';
import Template from './templates/default.html';
import IScroll from 'iscroll';

import Preloader from '../../core/manager/Preloader';

let button, iscroll;



export default class IndexView extends View {

  constructor(...args) {
    super(args);
    this._template = this._template = _.template(Template);

    this._queue = new Preloader({
      manifest:['./assets/img/test01.jpg','./assets/img/test02.jpg','./assets/img/test03.jpg',]
    });

    this._queue.load().then((result) => {
      console.log(result)
    })

  }

  render() {
    this._html = this._template();
    this._el.innerHTML = this._html;

    button = this._el.querySelector('sh-button');
    button.addEventListener('click',this.onClickHandler.bind(this));



    iscroll = new IScroll(this._el, {
      mouseWheel: true,
      scrollbars: true,
      disableMouse: false,
    });


    this.rendered();
  }

  onClickHandler() {

    //this.controller.FBlogin();
    AppRouter.navigate('about');

  }

  transitionIn() {

    this.ready();
  }

  transitionOut() {
    this.remove();
  }


}
