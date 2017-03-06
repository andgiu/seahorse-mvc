import Controller from '../../core/controller/Controller';
import Model from '../model/_HeaderModel';
import View from '../view/_HeaderView';
import AppSignals from '../signal/AppSignals';

export default class HeaderController extends Controller {

  constructor() {
    super(Model, View, AppSignals);
    this._static = true;
  }

}
