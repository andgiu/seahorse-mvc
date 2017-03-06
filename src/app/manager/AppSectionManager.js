import SectionManager from '../../core/manager/SectionManager';
import AppSignals from '../signal/AppSignals';
import AppRouter from '../router/AppRouter';

import HeaderController from '../controller/_HeaderController';

let $headerModel, $headerView;

export default class AppSectionManager extends SectionManager {

  constructor(sections, controllers) {
    super(sections, controllers);

    /*
     * Initialize Signals
     */
    this._signal = AppSignals;
    this._signal._initialize.addOnce(this.onInit.bind(this));
    this._signal._urlchanged.add(this.onUrlChange.bind(this));
    this._signal._section.add(this.onSectionUpdated.bind(this));

    this.addHeader();
  }

  onInit(e) {
    AppRouter.start();
  }

  addHeader() {

    let _headerController = new HeaderController();
    [$headerModel, $headerView] = _headerController.create('nav',{});
    $headerView.render();

    this.$app.appendChild($headerView.$el);
    
  }


}
