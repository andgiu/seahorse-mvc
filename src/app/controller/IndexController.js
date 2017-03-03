import Controller from '../../core/controller/Controller';
import Model from '../model/IndexModel';
import View from '../view/IndexView';
import AppSignals from '../signal/AppSignals';

export default class IndexController extends Controller {

  constructor() {
    super(Model, View, AppSignals);
  }

}
