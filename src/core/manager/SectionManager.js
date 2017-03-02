import { SECTION_BUILD, SECTION_RENDERED, SECTION_READY, SECTION_DESTROYED } from '../events/SignalEvents';

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


    if(section) {

      if(this.current)
        this.current.controller.remove();


      if(!section.controller.isActive()) {

        [section.model,section.view] = section.controller.create(section.name, section.params);

        this.current = section;
        section.controller.build();

      } else {

        this.current = section;
        this.current.controller.rendered();

      }


    } else {

      $Console.warning('----- Router address not defined ----- ');

    }


  }

  onSectionUpdated(type, args) {

    switch(type) {

      case SECTION_BUILD:

        $Signal._toggle.dispatch(false);

      break;

      case SECTION_RENDERED:

        fastdom.mutate(() => { this.$root.appendChild(this.current.controller.content); });

      break;

      case SECTION_READY:

        $Signal._toggle.dispatch(true);

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
