import { SECTION_RENDERED, SECTION_READY, SECTION_DESTROYED } from '../events/SignalEvents';

export default class SectionManager {

  constructor(sections, controllers) {

    this.$root = document.getElementById('section-holder');

    this._current = null;

    /*
     * Section array containers
     */
    this._sections = new Array();

    /*
     * Defines all sections used in the site.
     */
    //this._controllers = [ new IndexController() ];
    this._controllers = controllers;

    _.each(sections,(s, i) => { this.add(s, this._controllers[i]); });

    /*
     * Initialize Signals
     */
    $Signal._initialize.addOnce(this.onInit.bind(this));
    $Signal._urlchanged.add(this.onUrlChange.bind(this));
    $Signal._section.add(this.onSectionUpdated.bind(this));
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

  onSectionUpdated(type, args) {

    switch(type) {

      case SECTION_RENDERED:

        let section = document.createElement('section');
        section.setAttribute('id',args);
        section.innerHTML = this.current.controller.content;
        fastdom.mutate(() => { this.$root.appendChild(section); });

      break;

      case SECTION_READY:



      break;

    }

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
