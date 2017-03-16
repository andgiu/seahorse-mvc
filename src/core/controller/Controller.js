import { SECTION_BUILD, SECTION_RENDERED, SECTION_READY, SECTION_DESTROYED } from '../events/SignalEvents';

/**
 * Base Controller
 * @name Controller
 * @author Andrea Giuffrida
 * @constructor
 */


export default class Controller {

  constructor(Model, View, Signal) {

    /**
     * if true it doesn't dispatch signals
     * @type boolean
     * @private
     */
    this._static = false;

    /**
     * @type boolean
     * @private
     */
    this._built = false;

    /**
     * @type boolean
     * @private
     */
    this._drawn = false;

    /**
     * @type boolean
     * @private
     */
    this._ready = false;

    /**
     * Signal class assigned to the controller
     * @type Signal
     * @private
     */
    this._signal = Signal;

    /**
     * Model class assigned to the controller
     * @type Model
     * @private
     */
    this._modelClass = Model;

    /**
     * View class assigned to the controller
     * @type View
     * @private
     */
    this._viewClass = View;
  }


  /**
   * Create the section instance
   * @param {name} String Name of the section
   * @return {Array} Return the model and the view instances
   */
  create(name, params) {

    this._name = name;

    this._params = params;

    this._model = new this._modelClass();
    this._view = new this._viewClass();

    this._view.controller = this;
    this._model.controller = this;

    return [this._model, this._view];
  }

  /**
   * Called by the SectionManager after the section instance has been created
   * @param {}
   * @return {Controller}
   */
  build() {
    if(this._static) return 0;

    __Console.section(0,`••• build section ${this._name} `);
    this._view.build(this._name);
    this._signal._section.dispatch(SECTION_BUILD);

    return this;
  }

  /**
   * Called by the View after the section node has been created
   * @param {}
   * @return {Controller}
   */
  built() {
    if(this._static) return 0;

    __Console.section(1,`••• render section ${this._name} `);
    this._built = true;
    this._view.render();

    return this;
  }

  /**
   * Called by the View after the section has been rendered
   * @param {}
   * @return {Controller}
   */
  rendered(added) {
    if(this._static) return 0;

    __Console.section(2,`••• transitionIn section ${this._name} `);
    this._drawn = true;
    this._view.transitionIn();
    this._signal._section.dispatch(SECTION_RENDERED, added);

    return this;
  }

  /**
   * Called by the View once the section is ready to be shown in the DOM
   * @param {}
   * @return {Controller}
   */
  ready() {
    if(this._static) return 0;

    this._ready = true;
    this._signal._section.dispatch(SECTION_READY);

    return this;
  }

  /**
   * Called by the View once you want to remove the section
   * @param {}
   * @return {Controller}
   */
  remove() {
    this._view.disable();
    this._view.transitionOut();
    return this
  }

  /**
   * Check whether a section is active or less
   * @param {}
   * @return {Controller}
   */
  isActive() {
    return this._ready;
  }

  /**
   * Destroy the section
   * @param {}
   * @return {Controller}
   */
  dispose() {

    this._signal._section.dispatch(SECTION_DESTROYED, this._name);

    this._built = false;
    this._drawn = false;
    this._ready = false;

    this._view.dispose();
    this._model.dispose();

    this._view = null;
    this._model = null;

    return this;

  }

  /**
   * Get the content node
   * @param {}
   * @return {HTMLNode}
   */
  get content() {
    return this._view._el;
  }

}
