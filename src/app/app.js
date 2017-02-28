import { RESIZE } from '../core/events/Events';
import AppSignals from './signal/AppSignals';


export default class App {

  constructor() {

    /*
     * Initialize Signals and default handlers
     */
    window.Signal = new AppSignals();
    window.addEventListener(RESIZE,Signal.resize);

    

  }

}
