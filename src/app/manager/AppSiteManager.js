import SectionManager from '../../core/manager/SiteManager';
import AppSignals from '../signal/AppSignals';
import AppRouter from '../router/AppRouter';

import HeaderController from '../controller/_HeaderController';


export default class AppSiteManager extends SectionManager {

  constructor(sections, controllers) {
    super(sections, controllers);

    this._signal = AppSignals;
    this._signal._initialize.addOnce(this.onInit.bind(this));
    this._signal._routing.add(this.onUrlChange.bind(this));
    this._signal._section.add(this.onSectionUpdated.bind(this));

    this.addHeader();

  }

  onInit(e) {
    AppRouter.start();
  }

  addHeader() {

    let $headerView = this.create(HeaderController, 'nav');
    $headerView.render();

    this.$app.appendChild($headerView.$el);

  }


}
