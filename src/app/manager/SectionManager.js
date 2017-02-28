import IndexController from '../controller/IndexController';

export default class SectionManager {

  constructor() {

    this._current = null;
    
    this._sections = new Array();


    this.add('',new IndexController());

  }

  add(route, controller) {
    this._sections.push({
      route: route,
      section: controller
    });
  }

}
