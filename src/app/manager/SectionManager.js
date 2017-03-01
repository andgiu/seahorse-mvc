import IndexController from '../controller/IndexController';

export default class SectionManager {

  constructor(sections) {

    this._current = null;

    /*
     * Section array containers
     */
    this._sections = new Array();

    /*
     * Defines all sections used in the site.
     */
    this._controllers = [ new IndexController() ];


    _.each(sections,(s, i) => { this.add(s, this._controllers[i]); });

    /*
     * Initialize Signals
     */
    $Signal._initialize.addOnce(this.onInit.bind(this));
    $Signal._urlchanged.add(this.onUrlChange.bind(this));

  }

  onInit(e) {

    /*
     * Once the site is initalized
     * we call the Router start method
     */
    $Router.start();

  }

  onUrlChange(fragment) {

    let route = String(fragment[0]).toLowerCase();
    let section = _.find(this._sections,(s) => { return s.route == route; });

    [section.model,section.view] = section.controller.create(section.name, section.params);
    this.current = section;

    section.controller.build();

  }



  add(s, controller) {
    this._sections.push({
      route: s.route,
      name: s.name,
      params: s.params,
      controller: controller,
      model: null,
      view: null
    });
  }

  get current() {
    return this._current;
  }

  set current(section) {
    this._current = section;
  }

}
