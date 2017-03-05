import Helpers from '../core/helpers/JSHelpers';
import Console from '../core/helpers/Console';
import { RESIZE } from '../core/events/Events';
import config from './config/Config';

// Initialize SectionManager
import AppSectionManager from './manager/AppSectionManager';

// Initialize Signals
import AppSignals from './signal/AppSignals';

// Initialize Router
import AppRouter from './router/AppRouter';

// Initialize HTTPService
import AppHTTPService from './services/AppHTTPService';

// Section Controllers
import IndexController from './controller/IndexController';
import AboutController from './controller/AboutController';

import '../scss/style.scss';

export default class App {

  constructor() {

    /**
     *  Set language
     */
    window.lang = config.lang;

    /**
     * Initialize the Console helper class
     */
    window.$Console = new Console(config.debug);

    /**
     * Initialize the Signals and default handlers
     * Define global var $Signal
     */
    window.addEventListener(RESIZE,_.debounce(() => { AppSignals.resize }, 150));


    /**
     * Initialize the SectionManager
     * @param {Array} sections
     * @param {Array} Controller
     */
    this._sectionManager = new AppSectionManager(

      config.sections,
      [new IndexController(), new AboutController()]

    );


    this.initialize();

  }

  initialize() {

    $Console.intro(' *** Seahorse MVCS *** ');
    AppHTTPService.getInitXML(window.lang,() => {
      AppSignals.initialize();
    });

  }

}
