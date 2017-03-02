import Console from '../core/helpers/Console';
import { RESIZE } from '../core/events/Events';
import SectionManager from '../core/manager/SectionManager';
import config from './config/Config';
import AppSignals from './signal/AppSignals';
import AppRouter from './router/AppRouter';


/**
 * Section Controllers
 */
import IndexController from './controller/IndexController';


export default class App {

  constructor() {

    window.$Console = new Console(config.debug);

    /**
     * Initialize the Signals and default handlers
     * Define global var $Signal
     */
    window.$Signal = new AppSignals();
    window.addEventListener(RESIZE,_.debounce(() => { $Signal.resize }, 150));


    /**
     * Initialize the Routing and default handlers
     * Define global var $Router
     */
    window.$Router = new AppRouter();

    /**
     * Initialize the SectionManager
     * @param {Array} sections
     * @param {Array} Controller
     */
    this._sectionManager = new SectionManager(

      config.sections,
      [new IndexController()]

    );


    this.initialize();

  }

  initialize() {

    $Console.log('** Seahorser MVCS **');
    $Signal.initialize();

  }

}
