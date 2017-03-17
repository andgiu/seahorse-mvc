import * as SectionEvent from '../events/SignalEvents';

export default class SectionManager {

  constructor(sections, controllers) {

    this.$app = document.getElementById('app');
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


  }

  onInit(e) {

    /*
     * Once the site is initalized
     * we call the Router start method
     */

  }

  onUrlChange(fragment) {

    let route = String(fragment[0]).toLowerCase();
    let section = _.find(this._sections,(s) => { return s.route == route; });
    __Console.log(`route: ${route}`,section);

    if(section) {

      if(this.current)
        this.current.controller.remove();


      if(!section.controller.isActive()) {

        [section.model,section.view] = section.controller.create(section.name, section.params);

        this.current = section;
        section.controller.build();

      } else {

        this.current = section;
        this.current.controller.rendered(true);

      }


    } else {

      __Console.warning('----- Router address not defined ----- ');

    }

  }

  onSectionUpdated(type, args) {

    switch(type) {

      case SectionEvent.SECTION_BUILD:

        this._signal._toggle.dispatch(false);

      break;

      case SectionEvent.SECTION_RENDERED:

        let added = args;

        if(!added)
          fastdom.mutate(() => { this.$root.appendChild(this.current.controller.content); });

      break;

      case SectionEvent.SECTION_READY:

        this._signal._toggle.dispatch(true);

      break;

      case SectionEvent.SECTION_DESTROYED:



      break;

    }

  }

  create(controller, name = _.uniqueId('instance'), params = {}) {

    let _controller = new controller();
    let [_model, _view] = _controller.create(name, params);
    return _view;

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
