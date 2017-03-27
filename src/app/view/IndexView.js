import AppRouter from '../router/AppRouter';
import View from '../../core/view/View';
import IScroll from 'iscroll';

import Preloader from '../../core/helpers/Preloader';

let button, iscroll;



export default class IndexView extends View {

  constructor(controller) {

    super(controller);

    this.state = this.setState({
      name: 'button'
    });

    console.log(this.state)
  }


  render() {

    this.$render`
      <sh-button onclick="${this.onClickHandler.bind(this)}">${this.state.name}</sh-button>
    `;

    this.rendered();
  }



  onClickHandler() {

    this.state.name = "Ciao";
    
    //this.
    //this._el.querySelector('sh-button').innerHTML = 'aaa';
    //this.controller.FBlogin();
    //AppRouter.navigate('about');

  }

  transitionIn() {

    this.ready();
  }

  transitionOut() {
    this.remove();
  }


}
