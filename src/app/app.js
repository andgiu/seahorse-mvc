import Console from '../core/helpers/Console';
import { RESIZE } from '../core/events/Events';
import config from './config/Config';
import AppSignals from './signal/AppSignals';
import AppRouter from './router/AppRouter';
import SectionManager from './manager/SectionManager';

export default class App {

  constructor() {

    window.$Console = new Console(config.debug);

    /*
     * Initialize the Signals and default handlers
     * Define global var $Signal
     */
    window.$Signal = new AppSignals();
    window.addEventListener(RESIZE,$Signal.resize);

    /*
     * Initialize the Routing and default handlers
     * Define global var $Router
     */
    window.$Router = new AppRouter();

    /*
     * Initialize the SectionManager
     */
    this._sectionManager = new SectionManager(config.sections);
    $Signal.initialize();

  }

}
