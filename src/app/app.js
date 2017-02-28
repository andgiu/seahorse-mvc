import { RESIZE } from '../core/events/Events';
import AppSignals from './signal/AppSignals';
import AppRouter from './router/AppRouter';

export default class App {

  constructor() {

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

  }

}
