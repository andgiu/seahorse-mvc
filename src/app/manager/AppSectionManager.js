import SectionManager from '../../core/manager/SectionManager';
import AppSignals from '../signal/AppSignals';
import AppRouter from '../router/AppRouter';
import IndexController from '../controller/IndexController';


export default class AppSectionManager extends SectionManager {

  constructor(sections, controllers) {
    super(sections, controllers);

    /*
     * Initialize Signals
     */
    AppSignals._initialize.addOnce(this.onInit.bind(this));
    AppSignals._urlchanged.add(this.onUrlChange.bind(this));
    AppSignals._section.add(this.onSectionUpdated.bind(this));

  }

  onInit(e) {

    AppRouter.start();
  }


}
